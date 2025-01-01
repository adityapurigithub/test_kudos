import { Box, Card, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Dashboard = () => {
  const loggedInUser = localStorage.getItem("userName");
  const loggedInUserId = localStorage.getItem("userId");

  const [allKudos, setAllKudos] = useState([]);

  const getAllKudos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-kudos`);
      const formattedKudos = res.data.data.kudos.map((kudo) => ({
        id: kudo._id,
        sender: kudo.sender || "",
        kudo: kudo.badge || "",
        receiver: kudo.receiver || "",
        kudoIcon: kudo.badge.split(" ")[0] || "",
        msg: kudo.kudoMessage || "",
        likes: kudo.likes || 0,
        isLiked: kudo.isLiked || false,
      }));

      setAllKudos(formattedKudos);
    } catch (error) {
      console.log(error);
    }
  };

  const onLikeSuccess = (data) => {
    console.log(data);
    getAllKudos();
  };

  const handleLike = async (id) => {
    console.log(id);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/like-kudo/${id}`,
        {
          userId: loggedInUserId,
        }
      );

      onLikeSuccess(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKudos();
  }, []);

  return (
    <Box
      maxWidth={{
        xs: "100%",
        md: "90%",
      }}
      mx="auto"
    >
      <Stack gap={2}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Welcome {loggedInUser}
        </Typography>

        {allKudos?.length ? (
          allKudos.map(
            ({ id, sender, kudo, receiver, kudoIcon, msg, likes, isLiked }) => (
              <Card
                key={id}
                elevation={4}
                sx={{
                  p: 0.5,
                  "&:hover": { scale: 1.01 },
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={{ lg: 4, xs: 2 }}
                >
                  <Stack direction="row" gap={2}>
                    <Typography variant="h4">{kudoIcon}</Typography>
                    <Stack gap={1}>
                      <Typography
                        variant="h5"
                        fontSize={{ md: "1.2rem", xs: "1rem" }}
                      >
                        {sender} gave &ldquo;{kudo}&rdquo; badge to {receiver}
                      </Typography>
                      <Typography
                        variant="p"
                        fontSize={{ md: "1rem", xs: ".8rem" }}
                        color="gray"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontStyle: "italic",
                        }}
                      >
                        {msg}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.2}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.1s ease-in-out",
                      ml: 1,
                    }}
                    onClick={() => handleLike(id)}
                  >
                    {isLiked ? (
                      <GoHeartFill color="red" size={20} />
                    ) : (
                      <GoHeart size={20} />
                    )}
                    <Typography variant="subtitle1">{likes}</Typography>
                  </Stack>
                </Box>
              </Card>
            )
          )
        ) : (
          <Typography variant="h5" textAlign="center">
            No Kudos Found! 😒 Be the first one to give kudos!!
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Dashboard;
