/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles, useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Iconify from "../components/Iconify";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import * as Yup from 'yup';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  createRolesList,
  updateRolesList,
  deleteRolesList,
} from "../store/roleSlice";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import {
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from "../components/formsy/RHFTextField";
import FormProvider from '../components/formsy/FormProvider';
import RHFRadioGroup from '../components/formsy/RHFRadioGroup';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from "../routes/paths";
import ReplyIcon from '@mui/icons-material/Reply';

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

const status = [
  { label: "All", value: "all" },
  { label: "Manager", value: "Manager" },
  { label: "Admin", value: "Admin" },
  { label: "Staff", value: "Staff" },
];

const Active = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' }
];

const RolesList = () => {
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const rolesList = useSelector(({ roles }) => roles.roleslist);
  const rolesCount = useSelector(({ roles }) => roles.rolesCount);
  console.log(rolesCount);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const initialFields = {
    id: "",
    rolename: "",
    is_active: "",
  };

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [removeData, setRemoveData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filteredRoleList, setFilteredRoleList] = useState(rolesList);
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [order, setOrder] = useState({
    direction: "desc",
    id: "createdAt",
  });

  const RoleSchema = Yup.object().shape({
    rolename: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be atleast 3 characters')
      .max(50, 'Name Should not exceed 50'),
  });

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    initialFields
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const deleteFun = (data) => {
    console.log(data);
    setRemoveData(data.id);
    setOpen(true);
  };

  const deleteDialogClose = () => {
    setOpen(false);
  };
  const roledelete = () => {
    dispatch(deleteRolesList(removeData)).then((res) => {
      if (res && res.payload) {
        setOpen(false);
      }
    });
  };

  const rows = [
    {
      id: "id",
      align: "left",
      disablePadding: false,
      label: "ID",
      sort: true,
    },
    {
      id: "rolename",
      align: "left",
      disablePadding: false,
      label: "Role Name",
      sort: true,
    },
    {
      id: " is_active",
      align: "left",
      disablePadding: false,
      label: "Status",
      sort: true,
    },
    {
      id: "actions",
      align: "left",
      disablePadding: false,
      label: "Actions",
      sort: false,
    },
  ];

  const handleFilterRole = (event) => {
    const selectedRole = event.target.value;
    setFilterRole(selectedRole);
    const filteredList = rolesList.filter((role) => {
      if (selectedRole === "all") {
        return true;
      }
      return role.rolename.toLowerCase() === selectedRole.toLowerCase();
    });
    setFilteredRoleList(filteredList);
  };

  useEffect(() => {
    setFilteredRoleList(rolesList);
  }, [rolesList]);


  const handleViewOpen = (data) => {
    navigate(`/roleslist/${data.id}`, { state: { roleDetails: data } });
  };



  const createFun = () => {
    reset();
    setCreateStatus(true);
    setOpenDialog(true);
  };

  const closeFun = () => {
    setCreateStatus(false);
    setOpenDialog(false);
    reset();
  };

  const updateFun = (data) => {
    Object.keys(initialFields).map((res) => setValue(res, data[res] || ''));
    setValue(' is_active', String(data.is_active));
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  };

  const handleRequestSort = (property) => () => {
    const isAsc = order.id === property && order.direction === 'asc';
    const sortedList = [...filteredRoleList].sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setFilteredRoleList(sortedList);
    setOrder({ id: property, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleSearch = (data) => {
    setSearch(data);
    const filteredList = rolesList.filter((roles) =>
      roles.name.toLowerCase().includes(data.toLowerCase()) ||
      roles.rolename.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredRoleList(filteredList);
    setNoDataAvailable(filteredList.length === 0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedRoleList = filteredRoleList.slice(startIndex, endIndex);

  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    if (createStatus) {
      delete data.id;
      dispatch(createRolesList(data)).then((res) => {
        if (res && res.payload) {
          setOpenDialog(false);
          reset();
          setCreateStatus(false);
        }
      });
    } else {
      console.log(data);
      dispatch(updateRolesList(data)).then((res) => {
        if (res && res.payload) {
          setOpenDialog(false);
          reset();
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
            <FormatListNumberedIcon />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Roles List
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Grid item>
              <Tooltip title="Add" arrow>
                <IconButton
                  onClick={() => createFun()}
                  disableRipple
                  sx={{ bgcolor: theme.palette.primary.main, color: "#fff" }}
                >
                  <AddSharpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid sx={{ mr: 2 }} item>
              <Tooltip title="Back to Dashboard" arrow>
                <IconButton
                  onClick={() => navigate(PATH_DASHBOARD.dashboard)}
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
      <br />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ py: 1.5, px: 2 }}
        >
          <TextField
            fullWidth
            select
            label="Roles"
            value={filterRole}
            onChange={handleFilterRole}
            SelectProps={{
              MenuProps: {
                sx: { "& .MuiPaper-root": { maxHeight: 260 } },
              },
            }}
            sx={{
              maxWidth: { sm: 240 },
              textTransform: "capitalize",
            }}
          >
            {status.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: "body2",
                  textTransform: "capitalize",
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Grid item />
            <Grid item>
              <TextField
                fullWidth
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon={"eva:search-fill"}
                        sx={{ color: "text.disabled", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Stack>
        <TableContainer>
          {noDataAvailable ? (
            <Typography
              variant="subtitle1"
              sx={{ p: 2, textAlign: "center" }}
            >
              No Data Available
            </Typography>
          ) : (
            <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  {rows.map((row) => (
                    <TableCell
                      key={row.id}
                      align={row.align}
                      padding={row.disablePadding ? "none" : "normal"}
                      sortDirection={
                        order.id === row.id ? order.direction : false
                      }
                    >
                      {row.sort ? (
                        <Tooltip
                          title="Sort"
                          placement={
                            row.align === "right" ? "bottom-end" : "bottom-start"
                          }
                          enterDelay={300}
                        >
                          <TableSortLabel
                            active={order.id === row.id}
                            direction={order.direction}
                            onClick={handleRequestSort(row.id)}
                          >
                            {row.label}
                            {order.id === row.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        </Tooltip>
                      ) : (
                        <>{row.label}</>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedRoleList.map((res, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:nth-of-type(odd)": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell>
                      <Tooltip title={res.id} placement="top" arrow>
                        <ViewArrayIcon />
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="title">{res.rolename}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={res.is_active === 'true' ? 'Active' : 'Inactive'}
                        size="small"
                        color={res.is_active === 'true' ? 'primary' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="inherit">
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            onClick={() => updateFun(res)}
                            size="small"
                            disableRipple
                            sx={{
                              bgcolor: theme.palette.info.main,
                              color: "#fff",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={() => deleteFun(res)}
                            size="small"
                            disableRipple
                            sx={{
                              bgcolor: theme.palette.error.main,
                              color: "#fff",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View" arrow>
                          <IconButton
                            onClick={() => handleViewOpen(res)}
                            size="small"
                            disableRipple
                            sx={{
                              bgcolor: theme.palette.info.main,
                              color: "#fff",
                            }}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredRoleList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: "rounded-8",
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="primary">
            {createStatus ? "Create" : "Update"} Role
          </Typography>
        </Toolbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              "& .MuiTextField-root": { mb: 1, mt: 1 },
              "& .react-tel-input.focused": {
                borderColor: theme.palette.primary.main,
              },
              m: 2,
            }}
          >
            <RHFTextField
              id="rolename"
              name="rolename"
              type="text"
              label="Role Name"
              InputLabelProps={{
                shrink: true
              }}
            />

            <Box>
              <LabelStyle>Status</LabelStyle>
              <RHFRadioGroup
                id="is_active"
                name="is_active"
                size="small"
                options={Active}
                sx={{
                  '& .MuiFormControlLabel-root': { mr: 2 },
                }}
              />
            </Box>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 4, backgroundColor: 'primary.main' }}
                  variant="contained"
                  type="submit"
                  disabled={loading1}
                  color="primary"
                  loading={isSubmitting}
                >
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 6 }}
                  variant="contained"
                  onClick={() => closeFun()}
                  color="warning"
                  style={{ textTransform: "capitalize", fontSize: "16px" }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Dialog>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: "rounded-8",
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="error">
            Alert
          </Typography>
        </Toolbar>
        <Typography margin="0px 15px 15px 21px">
          Are you sure want to delete?
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { mb: 1, mt: 1 },
            "& .react-tel-input.focused": {
              borderColor: theme.palette.primary.main,
            },
            m: 2,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Grid item>
              <Button
                sx={{ mt: 1, mb: 1, px: 4 }}
                type="button"
                variant="contained"
                color="primary"
                onClick={roledelete}
                aria-label="button"
                style={{ textTransform: "capitalize", fontSize: "16px" }}
              >
                {loading1 ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Yes"
                )}
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: 1, mb: 1, px: 4 }}
                variant="contained"
                onClick={deleteDialogClose}
                color="warning"
                style={{ textTransform: "capitalize", fontSize: "16px" }}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

    </div>
  );
};

export default RolesList;
