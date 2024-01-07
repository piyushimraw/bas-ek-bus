import { Bus, getSeat } from '../../utils/data';
import PassengerDetailsForm from './passenger-details-form';

const PassengerDetailsCard = ({
  selectedSeats,
  bus,
}: {
  selectedSeats: string[];
  bus: Bus;
}) => {
  return selectedSeats.map((seatId) => {
    getSeat(bus, seatId);
    return (
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6" key={seatId}>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Passenger Details for {seatId}
        </h3>
        <div className="mt-4">
          <PassengerDetailsForm fieldName={`${seatId}`} />
        </div>
      </div>
    );
  });
};

export default PassengerDetailsCard;
