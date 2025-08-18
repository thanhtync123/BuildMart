import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-medium">{label}</label>
    <textarea
      id={id}
      className={`border rounded px-3 py-2 ${className}`}
      {...props}
    />
  </div>
);

export default Textarea;