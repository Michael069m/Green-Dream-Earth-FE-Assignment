import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { memo, useMemo, useState } from "react";
import { useStore } from "@/store/useStore";

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 78;

export function MainLayout({ title, children }) {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // On mobile, always keep drawer expanded and hide collapse control to avoid broken layout
  if (!isDesktop && collapsed) {
    setCollapsed(false);
  }

  const navItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
      { label: "Users", href: "/users", icon: <PeopleIcon /> },
      { label: "Products", href: "/products", icon: <Inventory2Icon /> },
    ],
    []
  );

  const initials = useMemo(() => {
    if (!user) return "";
    const first = user.firstName?.[0] || user.username?.[0] || "";
    const last = user.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [user]);

  const drawerWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const renderNavList = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        sx={{
          px: collapsed ? 1 : 2,
          minHeight: 72,
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          noWrap
          sx={{
            transition: "opacity 0.2s ease, width 0.2s ease",
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
            overflow: "hidden",
          }}
        >
          Admin Panel
        </Typography>
        {isDesktop ? (
          <IconButton
            size="small"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        ) : null}
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 0.5 }}>
        {navItems.map((item) => {
          const selected = router.pathname.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={selected}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                color: selected ? "primary.main" : "text.primary",
                px: collapsed ? 1.5 : 2,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 40,
                  color: selected ? "primary.main" : "text.secondary",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  display: collapsed ? "none" : "block",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ flex: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction={collapsed ? "column" : "row"}
          spacing={collapsed ? 0.5 : 1.5}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            src={user?.image || undefined}
            alt={user?.firstName || user?.username || "User"}
            sx={{
              bgcolor: user?.image ? undefined : "primary.light",
              color: "primary.dark",
            }}
          >
            {!user?.image ? initials : null}
          </Avatar>
          <Box sx={{ minWidth: 0, display: collapsed ? "none" : "block" }}>
            <Typography variant="body1" fontWeight={700} noWrap>
              {user?.firstName || "User"} {user?.lastName || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email || ""}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          ml: isDesktop ? `${drawerWidth}px` : 0,
          width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%",
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {!isDesktop && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open navigation"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight={700} noWrap>
              {title}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            sx={{ borderColor: "grey.300" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: isDesktop ? drawerWidth : 0, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {renderNavList}
        </Drawer>
        {/* Desktop drawer */}
        {isDesktop && (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                borderRight: "1px solid",
                borderColor: "divider",
              },
            }}
            open
          >
            {renderNavList}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Spacer to offset fixed AppBar */}
        <Toolbar sx={{ mb: { xs: 1, md: 2 } }} />
        {children}
      </Box>
    </Box>
  );
}

// Memoize layout to avoid rerenders when parent re-renders without prop changes
const MemoizedMainLayout = memo(MainLayout);

export default MemoizedMainLayout;
