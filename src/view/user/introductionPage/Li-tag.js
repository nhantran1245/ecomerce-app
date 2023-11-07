import React from "react";

const Li = ({ title, children }) => {
  return (
    <li>
      <span style={{ fontWeight: "bold" }}>{title}</span> {children}
    </li>
  );
};
export default Li;
