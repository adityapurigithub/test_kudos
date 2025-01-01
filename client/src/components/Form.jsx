/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";

const Form = ({ handleSubmit, title, formContent }) => {
  return (
    <Stack
      as="form"
      sx={{
        width: { md: "50%", xs: "100%" },
        gap: 2,
        my: 2,
        p: { md: 4, xs: 2 },
        borderRadius: 3,
        boxShadow: "0 0 4px rgba(14, 10, 27, 0.2)",
        backdropFilter: "blur(12px)",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" mb={2} textAlign={"center"}>
        {title}
      </Typography>
      {formContent()}
    </Stack>
  );
};

export default Form;
