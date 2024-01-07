import { useNavigate, useParams } from "@tanstack/react-router";
import Header from "../../components/header";
import UpdateBooking from "../seats-view/confirm-booking";
import { useBus } from "../seats-view/useBus";
import { getSeat } from "../../utils/data";

const UpdateReservation = () => {
  const { bus, updateSeats } = useBus();
  const params = useParams({ from: "/edit-booking/$seatNumber" });
  const { seatNumber } = params;
  const navigate = useNavigate();

  if (!bus) return <div>loading...</div>;

  const seat = getSeat(bus, seatNumber);
  if (!seat) return <div>No data found</div>;

  if (!seat.isOccupied) return <div>Seat is not occupied</div>;

  const initialValues: Record<
    string,
    {
      name: string;
      email: string;
      phone: string;
    }
  > = {
    [seatNumber]: {
      name: seat.bookedBy?.name || "",
      email: seat.bookedBy?.email || "",
      phone: seat.bookedBy?.phone || "",
    },
  };


  return (
    <div className="py-10">
      <Header text={"Update Passenger Details"} />
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              Update passenger details for the selected seats below. and then
              click the "Update Booking" button to save them.
            </p>
            <UpdateBooking
              onCancel={() => {
                navigate({
                    to: "/dashboard",
                })
              }}
              onSubmit={(payload) => {
                updateSeats(payload);
              }}
              bus={bus}
              initialValues={initialValues}
              selectedSeats={[seatNumber]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateReservation;
