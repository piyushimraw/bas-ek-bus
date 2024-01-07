import Header from "../../components/header";

const UpdateReservation = () => {
  return (
    <div className="py-10">
      <Header text={"Update Passenger Details"} />
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              Update passenger details for the selected seats below. and then
                click the "Update Booking" button to book them.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UpdateReservation