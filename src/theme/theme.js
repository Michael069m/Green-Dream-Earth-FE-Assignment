"use client";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import { useMemo } from "react";

const baseTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1c5d3a", // forest green
      light: "#3c7a55",
      dark: "#0f3b23",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c57b57", // earthy clay
      light: "#da9a7a",
      dark: "#8f4f36",
      contrastText: "#0b1a12",
    },
    background: {
      default: "#f4f7f2", // soft earth-toned backdrop
      paper: "#ffffff",
    },
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const responsiveTheme = responsiveFontSizes(baseTheme);

export function AppThemeProvider({ children }) {
  const theme = useMemo(() => responsiveTheme, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default responsiveTheme;
