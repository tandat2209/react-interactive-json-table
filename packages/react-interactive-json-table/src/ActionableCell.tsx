import React, { useState } from "react";
export default function ActionableCell({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="action-editable-cell"
    >
      {children}
      {isHovered && actions}
    </div>
  );
}
