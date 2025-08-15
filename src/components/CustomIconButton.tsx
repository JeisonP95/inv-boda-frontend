import React from "react";

interface CustomIconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ onClick, icon, text }) => {
  return (
    <button className="custom-icon-button" onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </button>
  );
};

export default CustomIconButton;