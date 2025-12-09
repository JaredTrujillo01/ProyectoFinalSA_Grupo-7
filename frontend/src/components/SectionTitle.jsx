import { Typography } from "@mui/material";

const SectionTitle = ({ children }) => {
  return (
    <Typography variant="h5" mb={3} textAlign="center">
      {children}
    </Typography>
  );
};

export default SectionTitle;
