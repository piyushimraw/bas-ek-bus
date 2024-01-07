import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Bus, getBusData, getSeat } from "../../utils/data";

type Params = {
  id: string;
};

type UseBusReturnType = {
  bus?: Bus;
  bookSeats: (seatIds: string[]) => void;
  unbookSeats: (seatIds: string[]) => void;
  isSeatOccupied: (seatId: string) => boolean;
  isSeatSelected: (seatId: string) => boolean;
  selectedSeats: string[];
  totalSelectedSeats: number;
  selectSeat: (seatId: string) => void;
  unselectSeat: (seatId: string) => void;
  resetSelectedSeats: () => void;
  toggleSelectSeat: (seatId: string) => void;

};

const BusContext = createContext<UseBusReturnType | undefined>(undefined);

 function _useBus(params: Params): UseBusReturnType {
  const { id } = params;
  const [bus, setBus] = useState<Bus>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const bus = await getBusData(id);
      if (!bus) return;
      setBus(bus);
    })();
  }, [id]);


  const selectSeat = (seatId: string) => {
    setSelectedSeats((prev) => [...prev, seatId]);
  }

  const unselectSeat = (seatId: string) => {
    setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
  }

  const resetSelectedSeats = () => {
    setSelectedSeats([]);
  }

  const isSeatOccupied = (seatId: string) => {
    if (!bus) return false;
    const seat =  getSeat(bus, seatId);
    return seat?.isOccupied;
  };

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.includes(seatId);
  }
  const toggleSelectSeat = (seatId: string) => {
    if(isSeatOccupied(seatId)) return;
    if (isSeatSelected(seatId)) {
      unselectSeat(seatId);
    } else {
      selectSeat(seatId);
    }
  }


  return {
    bus,
    selectedSeats,
    totalSelectedSeats: selectedSeats.length,
    bookSeats: (seatIds: string[]) => {},
    unbookSeats: (seatIds: string[]) => {},
    isSeatOccupied,
    isSeatSelected: isSeatSelected,
    selectSeat: selectSeat,
    unselectSeat: unselectSeat,
    resetSelectedSeats: resetSelectedSeats,
    toggleSelectSeat: toggleSelectSeat,
  };
}

export function BusProvider({ children, busId = "1" }: { children: ReactNode, busId?: string }) {
  const bus = _useBus({ id: busId });
  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>;
}


// eslint-disable-next-line react-refresh/only-export-components
export const useBus = () => {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error("useBus must be used within a BusProvider");
  }
  return context;
}