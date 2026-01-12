import { TextField } from "@mui/material";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        sx: { bgcolor: "background.paper" },
      }}
    />
  );
}
