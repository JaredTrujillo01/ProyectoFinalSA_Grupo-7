import React from "react";
import { Button } from "@mui/material";

export default function PrimaryButton({ children, onClick, type = "button", color = "primary", disabled }) {
  return (
    <Button variant="contained" color={color} fullWidth onClick={onClick} type={type} sx={{ mt: 2, py: 1.4 }} disabled={disabled}>
      {children}
    </Button>
  );
}
