import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        inset: 0,
        backdropFilter: "blur(10px)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
