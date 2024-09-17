import React, { useState, useRef, useEffect } from "react";

const inputStyle = {
  padding: '2px',
  fontSize: '12px',
  lineHeight: '1',
  border: 'none',
  background: 'transparent',
  width: 'auto',
};

const editingStyle = {
  ...inputStyle,
  border: '1px solid #3b82f6',
};

interface EditableCellProps<T> {
  value: T;
  onUpdate: (value: T) => void;
}

export default function EditableCell<T>({
  value,
  onUpdate,
  ...props
}: EditableCellProps<T> & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState<T>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.style.width = `${String(currentValue).length + 1}ch`;
    }
  }, [isEditing, currentValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdate(currentValue);
      setIsEditing(false);
    }
  };

  return (
    <input
      ref={inputRef}
      readOnly={!isEditing}
      type="text"
      value={String(currentValue)}
      onChange={(e) => {
        setCurrentValue(e.target.value as unknown as T);
        e.target.style.width = `${e.target.value.length + 1}ch`;
      }}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsEditing(false)}
      style={isEditing ? editingStyle : inputStyle}
      onClick={() => setIsEditing(true)}
      {...props}
    />
  );
}
