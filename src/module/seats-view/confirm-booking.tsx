import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { Bus } from "../../utils/data";
import { seatUserValidation } from "./validation";
import PassengerDetailsCard from "./passenger-details";

const ConfirmSeatBooking = ({
  selectedSeats,
  bus,
  onCancel,
}: {
  selectedSeats: string[];
  bus: Bus;
  onCancel: () => void;
}) => {
  const form = useForm({
    defaultValues: selectedSeats.reduce(
      (acc, seatId) => {
        acc[seatId] = {
          name: "",
          email: "",
          phone: "",
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
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-md"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
            onClick={() => {
              form.handleSubmit((data) => {
                console.log(data);
              })();
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
