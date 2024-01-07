import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  htmlFor: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: HTMLInputElement["type"];
};
function Input({
  htmlFor,
  id,
  label,
  placeholder,
  defaultValue,
  error,
  value,
  onChange,
  name,
  type,
}: Props) {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id}
          className={`block w-full rounded-md border-1 py-1.5 pr-10 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${error ? "ring-1 ring-red-500" : ""}`}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${id}-error`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Not a valid email address.
        </p>
      )}
    </div>
  );
}

export default Input;
