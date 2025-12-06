import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function AuthCard({ title, children, subtitle }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card elevation={8} sx={{ width: "100%", maxWidth: 520, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
