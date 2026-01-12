import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useStore } from "@/store/useStore";

const DEMO_USERNAME = "emilys";
const DEMO_PASSWORD = "emilyspass";

export default function LoginPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const login = useStore((state) => state.login);
  const authLoading = useStore((state) => state.authLoading);
  const authError = useStore((state) => state.authError);
  const user = useStore((state) => state.user);

  const [username, setUsername] = useState(DEMO_USERNAME);
  const [password, setPassword] = useState(DEMO_PASSWORD);

  // Ensure persisted auth is loaded before checking user so we do not flicker the form.
  useEffect(() => {
    const hasHydrated = useStore.persist?.hasHydrated?.();
    if (hasHydrated) {
      setHydrated(true);
      return undefined;
    }
    const unsub = useStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });
    return unsub;
  }, []);

  // Redirect away from login when already signed in.
  useEffect(() => {
    if (!hydrated || !user) return;
    router.replace("/dashboard");
  }, [hydrated, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Navigate after login without full reload
      window.location.replace("/dashboard");
    } catch (error) {
      // handled by store state
    }
  };

  if (!hydrated) return null;

  if (user) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="h6" fontWeight={700}>
              You are already signed in
            </Typography>
            <Button variant="contained" href="/dashboard">
              Go to dashboard
            </Button>
            <Typography variant="body2" color="text.secondary">
              Redirecting...
            </Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <div>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use DummyJSON demo credentials or your own.
            </Typography>
          </div>

          {authError ? <Alert severity="error">{authError}</Alert> : null}

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={authLoading}
          >
            {authLoading ? "Signing in..." : "Sign In"}
          </Button>
          {user ? (
            <Typography variant="body2">
              Already signed in? <Link href="/dashboard">Go to dashboard</Link>
            </Typography>
          ) : null}
          <Typography variant="caption" color="text.secondary">
            Demo: {DEMO_USERNAME} / {DEMO_PASSWORD}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
