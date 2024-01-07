import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Bus, Seat, SeatBookingPayload, getBusData, getSeat, parseSeatNumber, setBusData } from "../../utils/data";
import { useNavigate } from "@tanstack/react-router";

type Params = {
  id: string;
};

type UseBusReturnType = {
  bus?: Bus;
  bookSeats: (seatIds: SeatBookingPayload) => void;
  updateSeats: (seatIds: SeatBookingPayload) => void;
  unbookSeats: (seatIds: string[]) => void;
  isSeatOccupied: (seatId: string) => boolean;
  isSeatSelected: (seatId: string) => boolean;
  getBookedSeats: () => Seat[],
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

  const navigate =  useNavigate();

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
    return seat?.isOccupied ?? false;
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
      const [floor, seatNumber] = parseSeatNumber(seatId);
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].isOccupied = true;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedBy = payload[seatId];
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedAt = new Date();
    });
    setBus(newBus);
    setSelectedSeats([]);
    setBusData(newBus).then(() => {
      navigate({
        to: "/dashboard"
      });
    });
  };

  const unbookSeats = (payload: string[]) => {
    if (!bus) return;
    const newBus = { ...bus };
    const seatIds = payload;
    seatIds.forEach((seatId) => {
      const [floor, seatNumber] =  parseSeatNumber(seatId);
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].isOccupied = false;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedBy = undefined;
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedAt = undefined;
    });
    setBus(newBus);
    setSelectedSeats([]);
    setBusData(newBus);
  };

  const updateSeats = (payload: SeatBookingPayload) => {
    if (!bus) return;
    const newBus = { ...bus };
    const seatIds = Object.keys(payload);
    seatIds.forEach((seatId) => {
      const [floor, seatNumber] = parseSeatNumber(seatId);
      newBus.seats[floor][Number.parseInt(seatNumber, 10)].bookedBy = payload[seatId];
    });
    setBus(newBus);
    setSelectedSeats([]);
    setBusData(newBus).then(() => {
      navigate({
        to: "/dashboard"
      });
    });
  }

  const getBookedSeats = () => {
    if (!bus) return [];
    const bookedSeats: Seat[] = [];
    const floors = Object.keys(bus.seats) as ["L", "U"];
    floors.forEach((floor: "L" | "U") => {
      bus.seats[floor].forEach((seat) => {
        if (seat.isOccupied) {
          bookedSeats.push(seat);
        }
      });
    });
    return bookedSeats;
  }


  return {
    bus,
    selectedSeats,
    totalSelectedSeats: selectedSeats.length,
    bookSeats: bookSeats,
    updateSeats: updateSeats,
    unbookSeats: unbookSeats,
    isSeatOccupied,
    isSeatSelected: isSeatSelected,
    selectSeat: selectSeat,
    unselectSeat: unselectSeat,
    resetSelectedSeats: resetSelectedSeats,
    toggleSelectSeat: toggleSelectSeat,
    getBookedSeats
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