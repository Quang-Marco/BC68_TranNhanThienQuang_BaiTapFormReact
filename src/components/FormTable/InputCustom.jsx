import React from "react";

const InputCustom = ({
  contentLabel,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  errors,
  touched,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {contentLabel}
      </label>
      <input
        type="text"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
          errors && touched ? "border-red-500" : ""
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && touched && <p className="text-red-500 mt-2">{errors}</p>}
    </div>
  );
};

export default InputCustom;
