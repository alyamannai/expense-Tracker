import React from "react";
interface Props {
  color?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  children: string;
  type: "button" | "submit" | "reset" | undefined;
  id?: string;
}

const Button = ({ color, onClick, children, type, id }: Props) => {
  return (
    <button
      id={id}
      className={"btn btn-" + color}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
