"use client";
import { useState, useRef, useEffect } from "react";

export default function EditableCell({
  value,
  onUpdate,
  className,
}: {
  value: string | null;
  onUpdate: (value: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.style.width = `${(currentValue ?? "").length + 1}ch`;
    }
  }, [isEditing, currentValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdate(currentValue ?? "");
      setIsEditing(false);
    }
  };

  return (
    <input
      ref={inputRef}
      readOnly={!isEditing}
      type="text"
      value={currentValue ?? ""}
      onChange={(e) => {
        setCurrentValue(e.target.value);
        e.target.style.width = `${e.target.value.length + 1}ch`;
      }}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsEditing(false)}
      className={`${className} ${isEditing ? "border border-blue-500" : ""}`}
      style={{ width: `${(currentValue ?? "").length + 1}ch` }}
      onClick={() => setIsEditing(true)}
    />
  );
}
