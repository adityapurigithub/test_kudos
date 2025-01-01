import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import Form from "../components/Form";

const Home = () => {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const onSuccess = (user) => {
    localStorage.setItem("userId", user._id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);

    alert("Login successful");
    navigate("/dashboard");
  };

  const login = async (payload) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        payload
      );
      onSuccess(res.data.data.user);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");

    if (!email || !name) {
      setErr(true);
      return;
    }

    const payload = {
      email: email,
      name: name,
    };

    login(payload);
  };

  const formContent = () => {
    return (
      <>
        <TextField
          id="email"
          name="email"
          label="Enter Email"
          variant="outlined"
          error={err}
          helperText={err && "Please enter your email"}
          onChange={() => setErr(false)}
        />
        <TextField
          id="name"
          name="name"
          label="Enter Your Name"
          variant="outlined"
          error={err}
          helperText={err && "Please enter your name"}
          onChange={() => setErr(false)}
        />

        <Button variant="contained" type="submit" sx={{ p: 1 }}>
          Login
        </Button>
      </>
    );
  };

  return (
    <Box>
      <Stack mt={1} direction="column" alignItems="center" gap={2} p={2}>
        <Form
          handleSubmit={handleSubmit}
          title="Welcome to KudoSpot"
          formContent={formContent}
        />
      </Stack>
    </Box>
  );
};

export default Home;
