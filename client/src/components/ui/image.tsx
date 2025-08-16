import React, { useState } from 'react';

interface ImageUploadProps {
  label: string;
  id: string;
  onChange?: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, id, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange && onChange(file);
    } else {
      setPreview(null);
      onChange && onChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">{label}</label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleChange}
        className="border rounded px-3 py-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Xem trước"
          className="mt-2 rounded border w-40 h-40 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUpload;