import { Box, Button, TextField } from "@mui/material";
import Form from "../components/Form";
import AutoCompleteDropdown from "../components/AutoCompleteDropdown";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const GiveKudos = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const navigate = useNavigate();

  const fetchUserOptions = async (query) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users?search=${query}`
    );

    return response.data.data.users.map((user) => ({
      value: user._id,
      label: user.name,
    }));
  };

  const fetchBadgeOptions = async (query) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/badges?search=${query}`
    );

    console.log(response.data);

    return response.data.data.badges.map((badge) => ({
      value: badge._id,
      label: badge.label,
    }));
  };

  const onSuccessKudo = (data) => {
    toast.success(data.message);
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = selectedUser?.value;
    const badgeId = selectedBadge?.value;

    const formData = new FormData(e.currentTarget);
    const kudoMessage = formData.get("kudoMessage");

    if (!userId || !badgeId || !kudoMessage) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/give-kudos`,
        {
          userId,
          badgeId,
          kudoMessage,
          loggedInUserId:
            localStorage.getItem("userId") || "67713e3a1273b39dde2c67d5",
        }
      );

      onSuccessKudo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formContent = () => {
    return (
      <>
        <AutoCompleteDropdown
          label="Select User"
          fetchOptions={fetchUserOptions}
          selectedValue={selectedUser}
          setSelectedValue={setSelectedUser}
        />
        <AutoCompleteDropdown
          label="Select Kudo Badge"
          fetchOptions={fetchBadgeOptions}
          selectedValue={selectedBadge}
          setSelectedValue={setSelectedBadge}
        />

        <TextField
          id="kudoMessage"
          multiline
          rows={4}
          name="kudoMessage"
          label="Enter Kudo Message"
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          Give Kudo
        </Button>
      </>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={2}
      position="relative"
    >
      <Form
        title="Give Kudos"
        handleSubmit={handleSubmit}
        formContent={formContent}
      />
    </Box>
  );
};

export default GiveKudos;
