/* eslint-disable react/prop-types */
import { Box, Container, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import GiveKudos from "../pages/GiveKudos";
import Analytics from "../pages/Analytics";

const PrivateRoute = ({ element: Component }) => {
  const userId = localStorage.getItem("userId");
  return userId ? Component : <Navigate to="/auth" replace />;
};

const routes = [
  {
    path: "/auth",
    element: <Home />,
    meta: { restricted: false },
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    meta: { restricted: false },
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: { restricted: true },
  },
  {
    path: "/give-kudos",
    element: <GiveKudos />,
    meta: { restricted: true },
  },
  {
    path: "/analytics",
    element: <Analytics />,
    meta: { restricted: true },
  },
  {
    path: "*",
    element: (
      <Box>
        <Typography variant="h4" fontStyle="italic" textAlign="center">
          404! Page Not Found, Please Click <Link to="/">here</Link> to go back.
        </Typography>
      </Box>
    ),
  },
];

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Box className="bg-wrapper" />
      <Navbar />
      <Container maxWidth="xl">
        <Box mt={12} p={2}>
          <Routes>
            {routes.map(({ path, element, meta }) => (
              <Route
                key={path}
                path={path}
                element={
                  meta?.restricted ? (
                    <PrivateRoute element={element} />
                  ) : (
                    element
                  )
                }
              />
            ))}
          </Routes>
        </Box>
      </Container>
      <Box className="bg-wrapper bg-wrapper-bottom" />
    </BrowserRouter>
  );
};

export default AppRouter;
