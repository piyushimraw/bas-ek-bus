import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { Bus, SeatBookingPayload } from "../../utils/data";
import { seatUserValidation } from "./validation";
import PassengerDetailsCard from "./passenger-details";

const ConfirmSeatBooking = ({
  selectedSeats,
  bus,
  onCancel,
  onSubmit,
  initialValues,
}: {
  selectedSeats: string[];
  bus: Bus;
  onCancel: () => void;
  onSubmit: (data: SeatBookingPayload) => void;
  initialValues?: Record<string, {
    name: string;
    email: string;
    phone: string;
  }>;
}) => {
  const form = useForm({
    defaultValues: selectedSeats.reduce(
      (acc, seatId) => {
        acc[seatId] = {
          name: initialValues?.[seatId]?.name || "",
          email: initialValues?.[seatId]?.email || "",
          phone: initialValues?.[seatId]?.phone || "",
        };
        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          email: string;
          phone: string;
        }
      >
    ),
    resolver: yupResolver(seatUserValidation),
  });

  return (
    <div>
      <FormProvider {...form}>
        <PassengerDetailsCard selectedSeats={selectedSeats} bus={bus} />
      </FormProvider>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              form.handleSubmit((data) => {onSubmit(data)})();
            }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSeatBooking;
