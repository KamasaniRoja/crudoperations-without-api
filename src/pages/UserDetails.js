import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Chip,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tooltip,
  Stack,
  Box,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import { makeStyles, useTheme } from "@mui/styles";
import ReplyIcon from '@mui/icons-material/Reply';
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    minHeight: "80vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
  },
}));

export const UserDetails = () => {
  const { id } = useParams();
  console.log(id);
  const userslist = useSelector((state) => state.users.userslist);
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const userDetails = userslist.find((user) => user.id === parseInt(id));
  if (!userDetails) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6">
          No user found
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Grid item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-start",
              color: theme.palette.primary.main,
            }}
          >
            <PersonIcon />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              User Details
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Grid sx={{ mr: 2 }} item>
              <Tooltip title="Back to UserManagement" arrow>
                <IconButton
                  onClick={() => navigate("/usermanagement")}
                  disableRipple
                  sx={{ bgcolor: theme.palette.primary.main, color: "#fff" }}
                >
                  <ReplyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <TableContainer sx={{ px: 2, py: 2, maxWidth: "sm" }}>
        <Paper>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    {userDetails?.name}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>{userDetails?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    Phone Number
                  </Typography>
                </TableCell>
                <TableCell>{userDetails?.phone_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    Role
                  </Typography>
                </TableCell>
                <TableCell>{userDetails?.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    <Chip
                      label={userDetails?.is_active === 'true' ? 'Active' : 'Inactive'}
                      size="small"
                      color={userDetails?.is_active === 'true' ? 'primary' : 'error'}
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>
    </div>
  );
};
