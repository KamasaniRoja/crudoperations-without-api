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
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import Iconify from "../components/Iconify";
import ListIcon from "@mui/icons-material/List";
import CircularProgress from "@mui/material/CircularProgress";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { styled } from '@mui/material/styles';
import {
  createDepartmentsList,
  updateDepartmentsList,
  deleteDepartmentsList,
} from "../store/departmentListSlice";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as Yup from 'yup';
import {
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from '../components/formsy/RHFTextField';
import RHFRadioGroup from "../components/formsy/RHFRadioGroup";
import FormProvider from '../components/formsy/FormProvider';
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
  { label: "Front Office Department", value: "Front Office Department" },
  { label: "Management Department", value: "Management Department" },
  { label: "HouseKeeping Department", value: "HouseKeeping Department" },
  { label: 'Maintenance Department', value: 'Maintenance Department' },
  { label: 'Security Department', value: 'Security Department' },
  { label: 'Human Resources Department', value: 'Human Resources Department' }
];

const Active = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' }
];

const DepartmentList = () => {
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(({ departments }) => departments.departmentslist);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const initialFields = {
    id: "",
    departmentname: "",
    is_active: "",

  };

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [removeData, setRemoveData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filteredDepartmentList, setFilteredDepartmentList] = useState(list);
  const [noDataAvailable, setNoDataAvailable] = useState(false);

  const [order, setOrder] = useState({
    direction: "desc",
    id: "createdAt",
  });

  const DepartmentSchema = Yup.object().shape({
    departmentname: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be atleast 3 characters')
      .max(50, 'Name Should not exceed 50'),

  });
  const methods = useForm({
    resolver: yupResolver(DepartmentSchema),
    initialFields
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const deleteFun = (data) => {
    setRemoveData(data.id);
    setOpen(true);
  };

  const deleteDialogClose = () => {
    setOpen(false);
  };
  const departmentdelete = () => {
    dispatch(deleteDepartmentsList(removeData)).then((res) => {
      if (res && res.payload) {
        setOpen(false);
      }
    });
  };

  const handleViewOpen = (data) => {
    navigate(`/departmentlist/${data.id}`, { state: { deptDetails: data } });
  };



  const rows = [
    {
      id: "id",
      align: "left",
      disablePadding: false,
      label: "DepartmentId",
      sort: true,
    },
    {
      id: "departmentname",
      align: "left",
      disablePadding: false,
      label: "Department Name",
      sort: true,
    },
    {
      id: "is_active",
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

    const filteredList = list.filter((department) => {
      if (selectedRole === "all") {
        return true;
      }
      return department.departmentname === selectedRole;
    });

    setFilteredDepartmentList(filteredList);
  };

  useEffect(() => {
    setFilteredDepartmentList(list);
  }, [list]);

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
    setValue('is_active', String(data.is_active));
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
    const sortedList = [...filteredDepartmentList].sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setFilteredDepartmentList(sortedList);
    setOrder({ id: property, direction: isAsc ? 'desc' : 'asc' });
  };

  const handleSearch = (data) => {
    setSearch(data);

    const filteredList = list.filter((department) =>
      department.departmentname.toLowerCase().includes(data.toLowerCase())
    );

    setFilteredDepartmentList(filteredList);
    setNoDataAvailable(filteredList.length === 0);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedDepartmentList = filteredDepartmentList.slice(startIndex, endIndex);

  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    if (createStatus) {
      delete data.id;
      dispatch(createDepartmentsList(data)).then((res) => {
        if (res && res.payload) {
          setOpenDialog(false);
          reset();
          setCreateStatus(false);
        }
      });
    } else {
      console.log(data);
      dispatch(updateDepartmentsList(data)).then((res) => {
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
            <ListIcon />
            <Typography variant="h6" component="h6" paddingLeft={1}>
              Department List
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
            label="Departments"
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
        <TableContainer
          sx={{ minWidth: 300, position: "relative", py: 2, px: 2 }}
        >
          {noDataAvailable ? (
            <Typography
              variant="subtitle1"
              sx={{ p: 2, textAlign: "center" }}
            >
              No Data Available
            </Typography>
          ) : (
            <Table size="small">
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
                {slicedDepartmentList.map((res, i) => (
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
                      <Typography variant="title">
                        {res.departmentname}
                      </Typography>
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
          count={filteredDepartmentList.length}
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
            {createStatus ? "Create" : "Update"} Department List
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
              id="departmentname"
              name="departmentname"
              type="text"
              label="Department Name"
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
                  // fullWidth
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
                onClick={departmentdelete}
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

export default DepartmentList;
