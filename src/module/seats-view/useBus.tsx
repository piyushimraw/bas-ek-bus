import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Bus, SeatBookingPayload, SeatNumber, getBusData, getSeat, setBusData } from "../../utils/data";

type Params = {
  id: string;
};

type UseBusReturnType = {
  bus?: Bus;
  bookSeats: (seatIds: SeatBookingPayload) => void;
  unbookSeats: (seatIds: SeatBookingPayload) => void;
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


  const bookSeats = (payload: SeatBookingPayload) => {
    if (!bus) return;
    const newBus = { ...bus };
    const seatIds = Object.keys(payload);
    seatIds.forEach((seatId) => {
      const [floor, seatNumber]: SeatNumber = seatId.split("") as SeatNumber;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].isOccupied = true;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedBy = payload[seatId];
    });
    setBus(newBus);
    setSelectedSeats([]);
    setBusData(newBus);
  };

  const unbookSeats = (payload: SeatBookingPayload) => {
    if (!bus) return;
    const newBus = { ...bus };
    const seatIds = Object.keys(payload);
    seatIds.forEach((seatId) => {
      const [floor, seatNumber]: SeatNumber = seatId.split("") as SeatNumber;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].isOccupied = false;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedBy = undefined;
    });
    setBus(newBus);
    setSelectedSeats([]);
    setBusData(newBus);
  };


  return {
    bus,
    selectedSeats,
    totalSelectedSeats: selectedSeats.length,
    bookSeats: bookSeats,
    unbookSeats: unbookSeats,
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