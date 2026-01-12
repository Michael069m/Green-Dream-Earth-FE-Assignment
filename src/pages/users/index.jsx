import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";
import { TableSkeleton } from "@/components/LoaderSkeleton";
import ErrorState from "@/components/ErrorState";

export default function UsersPage() {
  const users = useStore((state) => state.users);
  const usersTotal = useStore((state) => state.usersTotal);
  const usersLoading = useStore((state) => state.usersLoading);
  const usersError = useStore((state) => state.usersError);
  const usersQuery = useStore((state) => state.usersQuery);
  const fetchUsers = useStore((state) => state.fetchUsers);

  const [pageSize, setPageSize] = useState(usersQuery?.limit || 10);
  const [page, setPage] = useState(
    usersQuery?.skip ? usersQuery.skip / (usersQuery.limit || 10) + 1 : 1
  );
  const [search, setSearch] = useState(usersQuery?.search || "");

  const skip = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  useEffect(() => {
    fetchUsers({ limit: pageSize, skip, search }).catch(() => {});
  }, [pageSize, skip, search, fetchUsers]);

  const handleRetry = () => {
    fetchUsers({ limit: pageSize, skip, search }).catch(() => {});
  };

  return (
    <Box sx={{ p: 0 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Users
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <SearchBar
              value={search}
              onChange={(val) => {
                setPage(1);
                setSearch(val);
              }}
              placeholder="Search users"
            />
            {usersLoading ? (
              <TableSkeleton rows={6} />
            ) : usersError ? (
              <ErrorState message={usersError} onRetry={handleRetry} />
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id} hover>
                      <TableCell>{`${u.firstName} ${u.lastName}`}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.gender}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell>{u.company?.name}</TableCell>
                      <TableCell align="right">
                        <Button
                          component={Link}
                          href={`/users/${u.id}`}
                          size="small"
                          variant="outlined"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Stack>
        </Paper>
        <PaginationControls
          page={page}
          pageSize={pageSize}
          total={usersTotal}
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
