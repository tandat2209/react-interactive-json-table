import React, { useState, useRef, useEffect } from "react";
import { Pencil1Icon, CheckIcon } from "@radix-ui/react-icons";

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
  const [isHovering, setIsHovering] = useState(false);
  const [currentValue, setCurrentValue] = useState<T>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.style.width = `${String(currentValue).length + 1}ch`;
      inputRef.current.focus();
    }
  }, [isEditing, currentValue]);

  const handleSubmit = () => {
    onUpdate(currentValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (isEditing) {
    return (
      <div className="editable-cell editable-cell-editing">
        <input
          ref={inputRef}
          type="text"
          value={String(currentValue)}
          onChange={(e) => {
            setCurrentValue(e.target.value as unknown as T);
            e.target.style.width = `${e.target.value.length + 1}ch`;
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleSubmit}
          className="editable-cell-input"
          {...props}
        />
        <CheckIcon onClick={handleSubmit} style={{ cursor: 'pointer' }} />
      </div>
    );
  }

  return (
    <div
      className="editable-cell"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span>{String(currentValue)}</span>
      {isHovering && (
        <Pencil1Icon
          onClick={() => setIsEditing(true)}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
}
