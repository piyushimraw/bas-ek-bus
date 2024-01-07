import Header from "../../components/header";
import { Bus, Deck } from "../../utils/data";
import { useBus } from "./useBus";

function SeatsView() {
  const {bus} =  useBus({ id: '1' });
  return (
    <div className="py-10">
      <Header text="Choose Seats" />
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              Choose your seats from the available seats below. You can choose
              multiple seats and then click the "Book" button to book them.
            </p>
          </div>
          {
            bus && <SeatSelector bus={bus} onSeatsConfirm={(bus) => {
              console.log(bus);
            }} />

          }
        </div>
      </main>
    </div>
  );
}

// displays the seats in a bus layout
type Props = {
  bus: Bus;
  onSeatsConfirm: (bus: Bus) => void;
};
function SeatSelector({bus}: Props) {
  const { isSeatSelected, toggleSelectSeat, totalSelectedSeats } = useBus({ id: bus.id });
  const decks  =  Object.keys(bus.seats).map<Deck>((deck) => deck as Deck)   
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
            className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${totalSelectedSeats === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} text-white`}
            disabled={totalSelectedSeats === 0}
            onClick={() => {
              console.log("booked");
            }}
          >Confirm Booking
          </button>
        </div>
      </div>
      {
            decks.map((deck) => (
                <div key={deck}
                className="ml-4 mt-8 flex-shrink-0">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Deck {deck}
                    </h3>
                    <div className="grid grid-rows-3 grid-flow-col gap-4 odd:py-10 mt-4">
                        {
                            bus.seats[deck].map((seat) => (
                                <div onClick={() => toggleSelectSeat(seat.id)} key={seat.id} className={`${isSeatSelected(seat.id) ? "bg-green-200" : "bg-gray-100"} p-2 rounded-md cursor-pointer [&:nth-child(3n)]:mt-8 last:row-span-3 last:self-center last:h-max`}>
                                    {seat.id}
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
    </div>
  );
}

export default SeatsView;
