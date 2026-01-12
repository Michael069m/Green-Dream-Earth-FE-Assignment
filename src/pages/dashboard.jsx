import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Container,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useStore } from "@/store/useStore";

export default function DashboardPage() {
  const user = useStore((state) => state.user);
  const users = useStore((state) => state.users);
  const products = useStore((state) => state.products);

  const avgRating =
    products.length > 0
      ? products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length
      : 0;

  const recentUsers = users.slice(0, 5);

  return (
    <Container maxWidth="xl" sx={{ pb: 0 }}>
      <Stack spacing={2.5} sx={{ mb: 1 }}>
        <Typography variant="h4" fontWeight={800}>
          {user
            ? `Welcome back, ${user.firstName || user.username}`
            : "Welcome"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quick stats, recent activity, and shortcuts to keep you moving.
        </Typography>
      </Stack>

      <Grid container spacing={3.5}>
        {/* Stat Summary Row */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", maxHeight: "180px", p: 1.5 }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{ bgcolor: "primary.light", color: "primary.main" }}
                >
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h3" fontWeight={800}>
                    {users.length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", maxHeight: "180px", p: 1.5 }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{ bgcolor: "success.light", color: "success.main" }}
                >
                  <Inventory2Icon />
                </Avatar>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h3" fontWeight={800}>
                    {products.length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", maxHeight: "180px", p: 1.5 }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{ bgcolor: "warning.light", color: "warning.main" }}
                >
                  <StarRateIcon />
                </Avatar>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Average Rating
                  </Typography>
                  <Typography variant="h3" fontWeight={800}>
                    {avgRating.toFixed(1)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Navigation Shortcuts */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6} lg={12}>
              <Card
                sx={{
                  height: "100%",
                  p: 1.5,
                  maxHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader title="Manage Users" />
                <CardContent
                  sx={{
                    pt: 0,
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href="/users"
                  >
                    Go to Users
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <Card
                sx={{
                  height: "100%",
                  p: 1.5,
                  maxHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader title="Manage Products" />
                <CardContent
                  sx={{
                    pt: 0,
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    href="/products"
                  >
                    Go to Products
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: "100%" }} elevation={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
            >
              <Typography variant="h6" fontWeight={700}>
                Recent Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last 5 fetched
              </Typography>
            </Stack>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentUsers.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {u.gender}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {recentUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary" mt={2}>
                No recent users yet.
              </Typography>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
