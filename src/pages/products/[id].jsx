import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import Link from "next/link";
import ErrorState from "@/components/ErrorState";

export default function ProductDetailPage({ product, error }) {
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <ErrorState message={error} />
      </Box>
    );
  }

  if (!product) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Button component={Link} href="/products" variant="text">
          Back to Products
        </Button>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={product.category} size="small" />
              <Chip label={`Rating: ${product.rating}`} size="small" />
            </Stack>
            <Typography variant="h6">${product.price}</Typography>
            <Divider />
            <Grid container spacing={1}>
              {product.images?.map((src, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Box
                    component="img"
                    src={src}
                    alt={product.title}
                    sx={{ width: "100%", borderRadius: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/${encodeURIComponent(params.id)}`
    );
    if (!res.ok) {
      return { props: { product: null, error: "Failed to load product" } };
    }
    const product = await res.json();
    return { props: { product } };
  } catch (error) {
    return {
      props: {
        product: null,
        error: error.message || "Failed to load product",
      },
    };
  }
}
