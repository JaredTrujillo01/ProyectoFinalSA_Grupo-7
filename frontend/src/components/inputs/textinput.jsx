import React from "react";
import { TextField } from "@mui/material";

export default function TextInput({ label, value, onChange, name, type = "text", placeholder }) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
    />
  );
}
