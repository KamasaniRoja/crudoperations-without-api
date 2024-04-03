import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
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
export const DepartmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const departlist = useSelector((state) => state.departments.departmentslist);
  const deptDetails = departlist.find((res) => res.id === parseInt(id));
  const theme = useTheme();
  const classes = useStyles();
  console.log(deptDetails);

  if (!deptDetails) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6">
          No Department Details found
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
            <LocalFireDepartmentIcon />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Department Details
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>

            <Grid sx={{ mr: 2 }} item>
              <Tooltip title="Back to Department list" arrow>
                <IconButton
                  onClick={() => navigate("/departmentlist")}
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
                    Department Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="grey">
                    {deptDetails?.departmentname}
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
                      label={deptDetails?.is_active === 'true' ? 'Active' : 'Inactive'}
                      size="small"
                      color={deptDetails?.is_active === 'true' ? 'primary' : 'error'}
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
