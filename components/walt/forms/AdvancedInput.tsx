type Props = {
    value: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    type: 'text' | 'date' | 'boolean' | 'number';
    name: string;
    label: string;
    placeholder: string;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
    showLabel?: boolean;
  };
  
  export default function AdvancedInputField({
    value,
    onChange,
    type,
    label,
    placeholder,
    name,
    error = false,
    errorText,
    disabled = false,
    showLabel = false,
  }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: string | boolean | number = e.target.value;
      if (type === 'boolean') {
        newValue = e.target.checked;
      } else if (type === 'number') {
        newValue = parseInt(e.target.value);
      }
      onChange(newValue);
    };
  
    return (
      <div>
        <label
          htmlFor={name}
          className={`${!showLabel ? 'sr-only' : 'text-sm text-gray-800'}`}
        >
          {label}
        </label>
        {type === 'text' && (
          <input
            disabled={disabled}
            onChange={handleChange}
            type="text"
            name={name}
            id={name}
            className={`${
              !error
                ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                : 'border-red-400'
            } border block w-full rounded-md shadow-sm  sm:text-sm py-1 px-1 mt-1`}
            placeholder={placeholder}
            value={value as string}
            aria-invalid={error}
            aria-describedby={`${name}-error`}
          />
        )}
        {type === 'date' && (
          <input
            disabled={disabled}
            onChange={handleChange}
            type="date"
            name={name}
            id={name}
            className={`${
              !error
                ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                : 'border-red-400'
            } border block w-full rounded-md shadow-sm  sm:text-sm py-1 px-1 mt-1`}
            placeholder={placeholder}
            value={value as string}
            aria-invalid={error}
            aria-describedby={`${name}-error`}
          />
        )}
        {type === 'boolean' && (
          <input
            disabled={disabled}
            onChange={handleChange}
            type="checkbox"
            name={name}
            id={name}
            checked={value as boolean}
            aria-invalid={error}
            aria-describedby={`${name}-error`}
          />
        )}
        {type === 'number' && (
          <input
            disabled={disabled}
            onChange={handleChange}
            type="number"
            name={name}
            id={name}
            className={`${
              !error
                ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                : 'border-red-400'
            } border block w-full rounded-md shadow-sm  sm:text-sm py-1 px-1 mt-1`}
            placeholder={placeholder}
            value={value as number}
            aria-invalid={error}
            aria-describedby={`${name}-error`}
          />
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
  