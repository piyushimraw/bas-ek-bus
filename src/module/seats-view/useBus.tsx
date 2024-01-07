import { ReactNode, createContext, useEffect, useState } from "react";
import { Bus, getBusData } from "../../utils/data";


type Params   = {
    id: string;
}


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
    isSeatAvailable: (seatId: string) => boolean;
}

const BusContext = createContext<UseBusReturnType | undefined>(undefined);


export function useBus(params: Params): UseBusReturnType {
  const { id } = params;
  const [
    bus,
    setBus,
  ] =  useState<Bus>();

  useEffect(() => {
    (async() => {
      const bus = await getBusData(id)
      if (!bus) return;
      setBus(bus);
    })()
  }, [id]
  );
  return{
    bus,
    selectedSeats: [],
    totalSelectedSeats: 0,
    bookSeats: (seatIds: string[]) => {},
    unbookSeats: (seatIds: string[]) => {},
    isSeatOccupied: (seatId: string) => false,
    isSeatSelected: (seatId: string) => false,
    selectSeat: (seatId: string) => {},
    unselectSeat: (seatId: string) => {},
    resetSelectedSeats: () => {},
    isSeatAvailable: (seatId: string) => true,
  }
}


export function BusProvider({ children }: { children: ReactNode }) {
    const bus = useBus({ id: '1' });
    return <BusContext.Provider value={bus}>{children}</BusContext.Provider>;
}

