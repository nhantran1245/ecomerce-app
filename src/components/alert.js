import React from "react"

const alertClassName = {
  primary: "alert alert-primary",
  secondary: "alert alert-secpndary",
  success: "alert alert-success",
  danger: "alert alert-danger",
  warning: "alert alert-warning",
  info: "alert alert-info",
  light: "alert alert-light",
  dark: "alert alert-dark",  
}
export default function alert(props) {
  const { type, text } = props;
  const className = alertClassName[type];
  return (
    <div className={className} role="alert">
      {text}
    </div>
  )
}
