import { Stack, Typography } from "@mui/material";

const InfoRow = ({ label, value }) => {
  return (
    <Stack direction="row" justifyContent="space-between" my={1}>
      <Typography fontWeight={600}>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

export default InfoRow;
