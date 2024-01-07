import { useFormContext, useFormState } from "react-hook-form";
import Input from "../../components/input";

const PassengerDetailsForm = ({ fieldName }: { fieldName: string }) => {
    const { watch, setValue } = useFormContext();
    const { errors } = useFormState<{
      [key: string]: {
        name: string;
        email: string;
        phone: string;
      };
    }>();
  
  
    const { name, email, phone } = watch(fieldName);
    const emailError = errors[fieldName]?.email?.message;
    const nameError = errors[fieldName]?.name?.message;
    const phoneError = errors[fieldName]?.phone?.message;

    return (
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <Input
            name="name"
            htmlFor="name"
            id="name"
            label="Name"
            placeholder="Name"
            defaultValue={name}
            onChange={(e) => {
              setValue(`${fieldName}.name`, e.target.value);
            }}
            type="text"
            error={nameError}
          />
          <Input
            name="email"
            htmlFor="email"
            id="email"
            label="Email"
            placeholder="Email"
            defaultValue={email}
            onChange={(e) => {
              setValue(`${fieldName}.email`, e.target.value);
            }}
            type="email"
            error={emailError}
  
          />
          <Input
            name="phone"
            htmlFor="phone"
            id="phone"
            label="Phone"
            placeholder="Phone"
            defaultValue={phone}
            onChange={(e) => {
              setValue(`${fieldName}.phone`, e.target.value);
            }}
            type="text"
            error={phoneError}
          />
        </div>
      </div>
    );
  };
  

  export default PassengerDetailsForm;