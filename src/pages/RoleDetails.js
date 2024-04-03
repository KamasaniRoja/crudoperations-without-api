import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
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
import ApiIcon from '@mui/icons-material/Api';
import { useSelector } from "react-redux";

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
export const RoleDetails = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const roleslist = useSelector((state) => state.roles.roleslist)
  const roleDetails = roleslist.find((role) => role.id === parseInt(id));
  console.log(roleDetails);
  if (!roleDetails) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6">
          No Role Data found
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
            <ApiIcon />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Role Details
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>

            <Grid sx={{ mr: 2 }} item>
              <Tooltip title="Back to Roleslist" arrow>
                <IconButton
                  onClick={() => navigate("/roleslist")}
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
                    Role Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    {roleDetails?.rolename}
                  </Typography>
                </TableCell>
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
                      label={roleDetails?.is_active === 'true' ? 'Active' : 'Inactive'}
                      size="small"
                      color={roleDetails?.is_active === 'true' ? 'primary' : 'error'}
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>
    </div>
  )
};
