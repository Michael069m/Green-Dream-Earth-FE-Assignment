import { Box, Pagination, Stack, TextField, MenuItem } from "@mui/material";

export default function PaginationControls({
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30],
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Pagination
        count={pageCount}
        page={page}
        color="primary"
        onChange={(_, value) => onPageChange?.(value)}
      />
      <Box>
        <TextField
          select
          size="small"
          label="Page size"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          sx={{ minWidth: 140 }}
        >
          {pageSizeOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
}
