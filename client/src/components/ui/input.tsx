import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  return (
<div className="mb-4 flex items-center gap-2 whitespace-nowrap">

  <label htmlFor={id} className="font-medium min-w-max">
    {label}
  </label>
  <input
    id={id}
    className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
</div>
  );
};

export default Input;
