import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Chip,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ErrorState from "@/components/ErrorState";

export default function UserDetailPage({ user, error }) {
  // 1. Handle Error State
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ErrorState message={error} />
      </Box>
    );
  }

  // 2. Handle Loading/Null State
  if (!user) return null;

  return (
    <Box sx={{ bgcolor: "#f4f7f9", minHeight: "100vh", py: { xs: 2, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Top Navigation */}
          <Button
            component={Link}
            href="/users"
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14 }} />}
            sx={{
              alignSelf: "flex-start",
              color: "text.secondary",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "transparent", color: "primary.main" },
            }}
          >
            Back to Directory
          </Button>

          {/* Profile Header Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 8,
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)",
              position: "relative",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            {/* Decorative background circle */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(25, 118, 210, 0.03)",
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems="center"
            >
              <Avatar
                src={user.image}
                alt={user.firstName}
                sx={{
                  width: 140,
                  height: 140,
                  border: "6px solid #fff",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                }}
              />
              <Stack
                spacing={1.5}
                sx={{ textAlign: { xs: "center", sm: "left" }, zIndex: 1 }}
              >
                <Typography
                  variant="h3"
                  fontWeight={900}
                  letterSpacing="-1.5px"
                  color="text.primary"
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  flexWrap="wrap"
                  useFlexGap
                >
                  <Chip
                    label={user.role || "Administrator"}
                    color="primary"
                    sx={{ fontWeight: 700, px: 1 }}
                  />
                  <Chip
                    label={user.gender}
                    variant="outlined"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  />
                  <Chip
                    label={`Age: ${user.age}`}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Paper>

          {/* Details Grid */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 6,
                  height: "100%",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Typography variant="h6" fontWeight={800} sx={{ mb: 4 }}>
                  Contact Details
                </Typography>
                <Stack spacing={3.5}>
                  <InfoItem
                    icon={<EmailIcon />}
                    label="Email"
                    value={user.email}
                  />
                  <InfoItem
                    icon={<PhoneIcon />}
                    label="Phone"
                    value={user.phone}
                  />
                  <InfoItem
                    icon={<LocationOnIcon />}
                    label="Location"
                    value={`${user.address?.address}, ${user.address?.city}`}
                  />
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 6,
                  height: "100%",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Typography variant="h6" fontWeight={800} sx={{ mb: 4 }}>
                  Work Information
                </Typography>
                <Stack spacing={3.5}>
                  <InfoItem
                    icon={<BusinessIcon />}
                    label="Company"
                    value={user.company?.name}
                  />
                  <InfoItem
                    label="Department"
                    value={user.company?.department}
                  />
                  <InfoItem label="Job Title" value={user.company?.title} />
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

// Internal Helper Component
function InfoItem({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {icon ? (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2.5,
            bgcolor: "primary.light",
            display: "flex",
            color: "primary.contrastText",
            opacity: 0.9,
          }}
        >
          {icon}
        </Box>
      ) : (
        <Box sx={{ width: 48 }} />
      )}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
          {value || "Not Available"}
        </Typography>
      </Box>
    </Stack>
  );
}

// 3. Server Side Data Fetching
export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const res = await fetch(`https://dummyjson.com/users/${id}`);

    if (!res.ok) {
      return { props: { user: null, error: "The user could not be found." } };
    }

    const user = await res.json();
    return { props: { user, error: null } };
  } catch (err) {
    return {
      props: { user: null, error: "Connection error. Please try again." },
    };
  }
}
