import { Box, Button, Stack, Typography } from "@mui/material";

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" color="error.main">
          {message}
        </Typography>
        {onRetry ? (
          <Button variant="contained" color="primary" onClick={onRetry}>
            Try Again
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}
