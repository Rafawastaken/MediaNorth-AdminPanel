// AddSiteFormInput.jsx
export const AddSiteFormInputCol = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div className="flex flex-col items-start gap-1 flex-1">
      <label htmlFor="siteName" className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name="siteName"
        id="siteName"
        placeholder={placeholder}
        value={value}
        className="text-sm font-normal border border-gray-200 w-full px-2 py-2 rounded-md focus:outline-1 focus:outline-blue-500/50"
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export const AddSiteFormInputRow = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div className="flex flex-col items-start gap-1 flex-1 ">
      <label htmlFor="siteName" className={"text-sm font-medium"}>
        {label}
      </label>
      <input
        type={type}
        name="siteName"
        id="siteName"
        placeholder={placeholder}
        value={value}
        className={
          "text-sm font-normal border-1 border-gray-200 w-full px-2 py-2 rounded-md focus:outline-1 focus:outline-blue-500/50"
        }
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};
