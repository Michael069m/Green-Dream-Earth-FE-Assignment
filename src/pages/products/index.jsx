import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";
import { CardGridSkeleton } from "@/components/LoaderSkeleton";
import ErrorState from "@/components/ErrorState";

export default function ProductsPage() {
  const products = useStore((state) => state.products);
  const productsTotal = useStore((state) => state.productsTotal);
  const productsLoading = useStore((state) => state.productsLoading);
  const productsError = useStore((state) => state.productsError);
  const productsQuery = useStore((state) => state.productsQuery);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const categories = useStore((state) => state.categories);
  const categoriesLoading = useStore((state) => state.categoriesLoading);
  const fetchCategories = useStore((state) => state.fetchCategories);

  const [pageSize, setPageSize] = useState(productsQuery?.limit || 10);
  const [page, setPage] = useState(
    productsQuery?.skip
      ? productsQuery.skip / (productsQuery.limit || 10) + 1
      : 1
  );
  const [search, setSearch] = useState(productsQuery?.search || "");
  const [category, setCategory] = useState(productsQuery?.category || "");

  const skip = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  useEffect(() => {
    fetchProducts({ limit: pageSize, skip, search, category }).catch(() => {});
  }, [pageSize, skip, search, category, fetchProducts]);

  useEffect(() => {
    if (!categories.length) fetchCategories().catch(() => {});
  }, [categories.length, fetchCategories]);

  const handleRetry = () => {
    fetchProducts({ limit: pageSize, skip, search, category }).catch(() => {});
  };

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, width: "100%" }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={800}>
          Products
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={4}>
            {/* Search and Filter Section */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <SearchBar
                  value={search}
                  onChange={(val) => {
                    setPage(1);
                    setSearch(val);
                  }}
                  placeholder="Search products..."
                />
              </Box>
              <TextField
                select
                size="small"
                label="Category"
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e.target.value);
                }}
                sx={{ minWidth: { xs: "100%", sm: 240 } }}
                disabled={categoriesLoading}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Products Grid Section - CSS grid version */}
            {productsLoading ? (
              <CardGridSkeleton count={8} />
            ) : productsError ? (
              <ErrorState message={productsError} onRetry={handleRetry} />
            ) : (
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
                {products.map((p) => (
                  <Card
                    key={p.id}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "grey.200",
                      boxShadow: "none",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={p.thumbnail}
                      alt={p.title}
                      sx={{
                        height: 200,
                        objectFit: "contain",
                        bgcolor: "grey.50",
                        p: 2,
                      }}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={700} noWrap>
                        {p.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: "40px",
                        }}
                      >
                        {p.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Typography
                          variant="h6"
                          color="primary.main"
                          fontWeight={700}
                        >
                          ${p.price}
                        </Typography>
                        <Chip
                          label={p.category}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: "auto", pt: 2 }}
                      >
                        <Typography variant="body2">⭐ {p.rating}</Typography>
                        <Button
                          component={Link}
                          href={`/products/${p.id}`}
                          size="small"
                          variant="contained"
                          disableElevation
                        >
                          View
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Stack>
        </Paper>

        <PaginationControls
          page={page}
          pageSize={pageSize}
          total={productsTotal}
          onPageChange={(val) => setPage(val)}
          onPageSizeChange={(size) => {
            setPage(1);
            setPageSize(size);
          }}
        />
      </Stack>
    </Box>
  );
}
