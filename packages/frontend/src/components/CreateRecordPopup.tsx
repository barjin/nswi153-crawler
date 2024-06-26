import { useNavigate } from "react-router-dom";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  className: string;
  minValue?: string;
}

function InputField({
  label,
  name,
  type,
  placeholder,
  required,
  className,
  minValue,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label} {required ? "(required)" : ""}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
        min={minValue}
      />
    </div>
  );
}

interface CreateRecordModalProps {
  showPopup: boolean;
  closePopup: () => void;
  createNewRecord: (data: FormData) => Promise<void>;
}

export function CreateRecordPopup({
  showPopup,
  closePopup,
  createNewRecord,
}: CreateRecordModalProps) {
  const navigate = useNavigate();

  return !showPopup ? (
    ""
  ) : (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black/50">
        <form
          className="relative p-8 w-full max-w-2xl bg-white rounded"
          onSubmit={async (e) => {
            e.preventDefault();
            await createNewRecord(new FormData(e.currentTarget));
            navigate("/website-records");
          }}
        >
          <InputField
            label="Starting point URL"
            name="url"
            type="text"
            placeholder="URL"
            required={true}
            className="mb-4"
          />
          <InputField
            label="Boundary Regular Expression"
            name="regex"
            type="text"
            placeholder="RegExp"
            required={true}
            className="mb-4"
          />
          <InputField
            label="Label"
            name="label"
            type="text"
            placeholder="Label"
            required={true}
            className="mb-4"
          />
          <InputField
            label="Tags"
            name="tags"
            type="text"
            placeholder="Tags"
            required={true}
            className="mb-4"
          />

          <div className="grid grid-cols-3 gaps-4">
            <InputField
              label="Periodicity"
              name="periodicity-number"
              type="number"
              minValue="0"
              placeholder="Number"
              required={true}
              className="mb-6"
            />

            <div className="py-7">
              <select
                className="ml-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-2xl"
                name="periodicity-type"
              >
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
                <option value="days">days</option>
              </select>
            </div>
            <div className="flex items-center mb-6 pt-6">
              <div className="w-1/3"></div>
              <label className="w-2/3 block font-bold">
                <input
                  className="mr-2 leading-tight"
                  name="active"
                  type="checkbox"
                  defaultChecked
                />
                <span className="text-sm">Active?</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gaps-4">
            <button
              className="mr-1 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl"
              type="submit"
            >
              Create
            </button>
            <button
              className="ml-1 bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-2xl"
              type="button"
              onClick={() => closePopup()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
