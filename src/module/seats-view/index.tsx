import { useState } from 'react';
import Header from '../../components/header';

import ConfirmSeatBooking from './confirm-booking';
import { SeatSelector } from './seats-selector';
import { useBus } from './useBus';

function SeatsView() {
  const { bus, selectedSeats, bookSeats } = useBus();
  const [showPassengerForm, setShowPassengerForm] = useState<boolean>();
  let text = 'Choose Seats';
  if (showPassengerForm) {
    text = 'Passenger Details';
  }

  let description =
    'Choose your seats from the available seats below. You can choose multiple seats and then click the "Book" button to book them.';
  if (showPassengerForm) {
    description =
      'Enter passenger details for the selected seats below. and then click the "Confirm Booking" button to book them.';
  }
  return (
    <div className="py-10">
      <Header text={text} />
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
          </div>
          {bus && showPassengerForm && (
            <ConfirmSeatBooking
              bus={bus}
              selectedSeats={selectedSeats}
              onCancel={() => setShowPassengerForm(false)}
              onSubmit={bookSeats}
            />
          )}
          {bus && !showPassengerForm && (
            <SeatSelector
              bus={bus}
              onSeatsConfirm={() => {
                setShowPassengerForm(true);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default SeatsView;
