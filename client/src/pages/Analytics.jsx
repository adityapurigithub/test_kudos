import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  Box,
  Card,
  CardHeader,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { GoHeart, GoHeartFill } from "react-icons/go";

Chart.register(CategoryScale);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mostLikedKudo, setMostLikedKudo] = useState(null);

  const getAnalyticsData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`);
      setChartData(res.data.data.chartsData);
      setTableData(res.data.data.tableData);
      setMostLikedKudo(res.data.data.mostLikedKudo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => getAnalyticsData(), 1000);
  }, []);

  console.log(mostLikedKudo);

  const rows = tableData.map((row) => {
    return {
      name: row._id,
      count: row.totalKudos,
    };
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={{ md: 4, xs: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ md: 8, xs: 12 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 0 4px rgba(14, 10, 27, 0.2)",
            }}
          >
            <Bar
              height={140}
              data={{
                labels: chartData.map((d) => d._id),
                datasets: [
                  {
                    label: "Total Kudos",
                    data: chartData.map((d) => d.totalKudos),
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      "#c45850",
                    ],
                  },
                ],
              }}
              options={{
                hoverBorderColor: "red",
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </Card>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 0 4px rgba(14, 10, 27, 0.2)",
            }}
          >
            <TableContainer component={Box} sx={{ maxHeight: 350 }}>
              <Table stickyHeader>
                <TableHead
                  sx={{
                    fontWeight: "bolder",
                    backgroundColor: "rgba(72, 32, 205, 0.2)",
                  }}
                >
                  <TableRow>
                    <TableCell>Users</TableCell>
                    <TableCell align="right">Kudos Received</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 0 4px rgba(14, 10, 27, 0.2)",
        }}
      >
        <CardHeader
          title={
            <>
              <GoHeartFill size={30} color="red" /> Most Liked Kudo{" "}
              <GoHeartFill size={30} color="red" />
            </>
          }
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(72, 32, 205, 0.2)",
            "& .MuiCardHeader-title": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            },
          }}
        />
        {mostLikedKudo && (
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {mostLikedKudo.sender} gave &ldquo;{mostLikedKudo.badge}&rdquo;
              badge to {mostLikedKudo.receiver}
            </Typography>
            <Typography
              variant="body1"
              color="gray"
              sx={{
                wordBreak: "break-word",
                fontSize: { md: "1rem", xs: "0.8rem", fontStyle: "italic" },
              }}
            >
              {mostLikedKudo.kudoMessage}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Analytics;
