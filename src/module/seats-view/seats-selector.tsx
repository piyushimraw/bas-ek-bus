import { Bus, Deck } from "../../utils/data";
import { useBus } from "./useBus";

// displays the seats in a bus layout
type Props = {
  bus: Bus;
  onSeatsConfirm: (bus: Bus) => void;
};
export function SeatSelector({ bus, onSeatsConfirm }: Props) {
  const {
    isSeatSelected,
    toggleSelectSeat,
    totalSelectedSeats,
    isSeatOccupied,
  } = useBus();
  const decks = Object.keys(bus.seats).map<Deck>((deck) => deck as Deck);
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {bus.name}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              totalSelectedSeats === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            } text-white`}
            disabled={totalSelectedSeats === 0}
            onClick={() => {
              onSeatsConfirm(bus);
            }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
      {decks.map((deck) => (
        <div key={deck} className="ml-4 mt-8 flex-shrink-0">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Deck {deck}
          </h3>
          <div className="grid grid-rows-3 grid-flow-col gap-4 odd:py-10 mt-4">
            {bus.seats[deck].map((seat) => {
              return (
                <div
                  onClick={() => toggleSelectSeat(seat.id)}
                  key={seat.id}
                  className={`${isSeatSelected(seat.id) && "bg-green-200"} ${
                    isSeatOccupied(seat.id) && " bg-red-300"
                  } ${
                    isSeatOccupied(seat.id)
                      ? " cursor-not-allowed"
                      : " cursor-pointer"
                  } bg-gray-100 p-2 rounded-md [&:nth-child(3n)]:mt-8 last:row-span-3 last:self-center last:h-max`}
                >
                  {seat.id}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
