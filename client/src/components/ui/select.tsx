import React from 'react';

type Option = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  label: string;
  options: Option[];
  onChange?: (value: string) => void;
  selected: string;
  name?: string;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  onChange,
  selected,
  name,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="min-w-max">{label}</label>
      <select
        className="rounded border px-3 py-2"
        name={name}
        value={selected}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
