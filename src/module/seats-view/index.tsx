import React from "react";
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

// displays the seatsh in a bus layout

type Props = {
  bus: Bus;
  onSeatsConfirm: (bus: Bus) => void;
};
function SeatSelector({bus}: Props) {
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
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Confirm Seats</button>
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
                                <div key={seat.id} className="bg-gray-100 p-2 rounded-md cursor-pointer [&:nth-child(3n)]:mt-8 last:row-span-3 last:self-center last:h-max">
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
