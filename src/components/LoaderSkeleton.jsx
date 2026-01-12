import { Box, Skeleton, Card, Stack, Grid } from "@mui/material";

export function TableSkeleton({ rows = 5 }) {
  return (
    <Stack spacing={1}>
      {[...Array(rows)].map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={48}
          sx={{ borderRadius: 1 }}
        />
      ))}
    </Stack>
  );
}

export const CardGridSkeleton = ({ count = 8 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        width: "100%",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <Card
          key={index}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "none",
            border: "1px solid",
            borderColor: "grey.100",
          }}
        >
          {/* Image Area */}
          <Skeleton
            variant="rectangular"
            height={200}
            animation="wave"
            sx={{ bgcolor: "grey.50" }}
          />

          <Box sx={{ p: 2, flex: 1 }}>
            {/* Title */}
            <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />

            {/* Description lines */}
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />

            {/* Price and Chip area */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Skeleton
                variant="rectangular"
                width={60}
                height={32}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={80}
                height={24}
                sx={{ borderRadius: 4 }}
              />
            </Stack>

            {/* Bottom Row (Rating and Button) */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: "auto" }}
            >
              <Skeleton variant="text" width={70} height={20} />
              <Skeleton
                variant="rectangular"
                width={80}
                height={36}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export function DetailSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
      <Skeleton height={36} width="60%" />
      <Skeleton height={20} width="40%" />
      <Skeleton height={18} width="80%" />
      <Skeleton height={18} width="75%" />
    </Stack>
  );
}

export default function LoaderSkeleton() {
  return (
    <Box>
      <TableSkeleton />
    </Box>
  );
}
