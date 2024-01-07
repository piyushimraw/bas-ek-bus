export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Seat = {
  id: string;
  number: string;
  isOccupied: boolean;
  bookedBy?: User;
};
export type Bus = {
  id: string;
  name: string;
  seats: {
    L: Seat[];
    U: Seat[];
  };
};

export const getBusData = async (id: string) => {
  const bus: string | null = localStorage.getItem(`bus:${id}`);
  if (bus) {
    return JSON.parse(bus) as Bus;
  }
  return null;
};

export const bookSeat = async (busId: string, seatId: string, user: User) => {
  const bus: Bus | null = await getBusData(busId);
  if (bus) {
    const seat = getSeat(bus, seatId);
    seat.isOccupied = true;
    seat.bookedBy = user;
    localStorage.setItem(`bus:${busId}`, JSON.stringify(bus));
  }
return null;
};

type SeatNumber = [
    "L" | "U",
    string
];

const getSeat = (bus: Bus, seatId: string) => {
    const [floor, seatNumber]: SeatNumber = seatId.split("") as SeatNumber;
    const seat = bus.seats[floor][Number.parseInt(seatNumber, 10)];
    return seat;
}

const floorIdentifier = (n: number) => {
  switch (n) {
    case 0:
      return "L";
    case 1:
      return "U";
    default:
        return "L";
  }
};
export const PopulateBusData = async (id: string) => {
  if (localStorage.getItem(`bus:${id}`)) {
    return JSON.parse(localStorage.getItem(`bus:${id}`)!) as Bus;
  }
  const bus: Bus = {
    id: id,
    name: `Delhi Manali Volvo${id}`,
    seats: {
        L: [],
        U: [],
    },
  };
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 15; j++) {
      bus.seats[floorIdentifier(i)][j] = {
        id: `${floorIdentifier(i)}${j}`,
        number: `${floorIdentifier(i)}${j}`,
        isOccupied: false,
      };
    }
  }
  localStorage.setItem(`bus:${id}`, JSON.stringify(bus));
  return bus;
};
