import React, { useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles, useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Iconify from '../components/Iconify';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import useForm from '../hooks/useForm';
import Formsy from 'formsy-react';
import { TextFieldFormsy, RadioGroupFormsy } from '../components/formsy';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewArrayIcon from '@mui/icons-material/ViewArray';
import {
    getRolesList,
    createRolesList,
    updateRolesList,
    deleteRolesList
} from '../store/roleSlice';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Stack, TextField, MenuItem, InputAdornment, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        minHeight: '80vh'

    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(0)
    }
}));

const status = [
    { label: 'All', value: 'all' },
    { label: 'Role 1', value: 'role1' },
    { label: 'Role 2', value: 'role2' },
    { label: 'Role 3', value: 'role3' }];

const RolesList = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const rolesList = useSelector(({ roles }) => roles.rolesList);
    const rolesCount = useSelector(({ roles }) => roles.rolesCount);
    const loading1 = useSelector(({ loading }) => loading.loading1);
    const initialFields = {
        role_id: '',
        role_name: '',
        role_isactive: '',
    };
    const { form, handleChange, setForm, resetForm } = useForm(initialFields);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [createStatus, setCreateStatus] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const [removeData, setRemoveData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [order, setOrder] = useState({
        direction: 'desc',
        id: 'createdAt'
    });

    const deleteFun = (data) => {
        setRemoveData(data);
        setOpen(true);
    };

    const deleteDialogClose = () => {
        setOpen(false);
    };
    const userdelete = () => {
        dispatch(deleteRolesList(removeData)).then((res) => {
            if (res && res.payload) {
                setOpen(false);
            }
        });
    };

    const rows = [
        {
            id: 'uuid',
            align: 'left',
            disablePadding: false,
            label: 'ID',
            sort: true
        },
        {
            id: 'rolename',
            align: 'left',
            disablePadding: false,
            label: 'Role Name',
            sort: true
        },
        {
            id: 'role_isactive',
            align: 'left',
            disablePadding: false,
            label: 'Email',
            sort: true
        },

    ];

    const handleFilterRole = (event) => {
        setFilterRole(event.target.value);
        // dispatch(
        //     getRolesList({
        //         search,
        //         page: page + 1,
        //         limit: rowsPerPage,
        //         sortBy: order.id,
        //         sortDirection: order.direction,
        //         status: event.target.value,
        //     })
        // );
    };
    useEffect(() => {
        dispatch(
            getRolesList({
                // search,
                // page: page + 1,
                // limit: rowsPerPage,
                // sortBy: order.id,
                // sortDirection: order.direction,
                // status: filterRole,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const createFun = () => {
        resetForm();
        setCreateStatus(true);
        setOpenDialog(true);
    };

    const closeFun = () => {
        setCreateStatus(false);
        setOpenDialog(false);
    };

    const updateFun = (data) => {
        setForm({
            ...initialFields,
            is_active: String(data.is_active)
        });
        setOpenDialog(true);
    };

    const disableButton = () => {
        setIsFormValid(false);
    };

    const enableButton = () => {
        setIsFormValid(true);
    };

    const handleSubmit = (data) => {
        console.log(data)
        if (createStatus) {
            let data = { ...form };
            delete data.role_id;

            // console.log(data);
            dispatch(createRolesList(data)).then((res) => {
                if (res && res.payload) {
                    setCreateStatus(false);
                    setOpenDialog(false);
                }
            });
        } else {
            let data = { ...form };

            // console.log(data);
            dispatch(updateRolesList(data)).then((res) => {
                if (res && res.payload) {
                    setCreateStatus(false);
                    setOpenDialog(false);
                }
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(
            getRolesList({
                // search,
                // page: newPage + 1,
                // limit: rowsPerPage,
                // sortBy: order.id,
                // sortDirection: order.direction,
                // status: filterRole,
            })
        );
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        dispatch(
            getRolesList({
                // search,
                // page: 0 + 1,
                // limit: parseInt(event.target.value, 10),
                // sortBy: order.id,
                // sortDirection: order.direction,
                // status: filterRole,
            })
        );
    };

    const handleRequestSort = (property) => () => {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }
        setOrder({ direction, id });
        dispatch(
            getRolesList({
                // search,
                // page: page + 1,
                // limit: rowsPerPage,
                // sortBy: id,
                // sortDirection: direction,
                // status: filterRole,
            })
        );
    };

    const handleSearch = (data) => {
        setSearch(data);
        if (data === '' || data.length > 1) {
            dispatch(
                getRolesList({
                    //   search: data,
                    //   page: page + 1,
                    //   limit: rowsPerPage,
                    //   sortBy: order.id,
                    //   sortDirection: order.direction,
                    // status: filterRole,
                })
            );
        }
    };


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'space-start', color: theme.palette.primary.main }}>
                        <FormatListNumberedIcon />
                        <Typography variant="h6" component="h6" paddingLeft={1}>
                            Roles List
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Tooltip title="Add" arrow>
                        <IconButton
                            onClick={() => createFun()}
                            disableRipple
                            sx={{ bgcolor: theme.palette.primary.main, color: '#fff' }}>
                            <AddSharpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <br />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 1.5, px: 2 }}>
                    <TextField
                        fullWidth
                        select
                        label="Roles"
                        value={filterRole}
                        onChange={handleFilterRole}
                        SelectProps={{
                            MenuProps: {
                                sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                            },
                        }}
                        sx={{
                            maxWidth: { sm: 240 },
                            textTransform: 'capitalize',
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
                                    typography: 'body2',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
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
                                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                {rows.map((row) => (
                                    <TableCell
                                        key={row.id}
                                        align={row.align}
                                        padding={row.disablePadding ? 'none' : 'normal'}
                                        sortDirection={order.id === row.id ? order.direction : false}>
                                        {row.sort ? (
                                            <Tooltip
                                                title="Sort"
                                                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                                enterDelay={300}>
                                                <TableSortLabel
                                                    active={order.id === row.id}
                                                    direction={order.direction}
                                                    onClick={handleRequestSort(row.id)}>
                                                    {row.label}
                                                    {order.id === row.id ? (
                                                        <Box component="span" sx={visuallyHidden}>
                                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
                            {rolesList.map((res, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: theme.palette.action.hover
                                        }
                                    }}>
                                    <TableCell>
                                        <Tooltip title={res.uuid} placement="top" arrow>
                                            <ViewArrayIcon />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="title">{res.rolename}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={res.is_active ? 'Active' : 'Inactive'}
                                            size="small"
                                            color={res.is_active ? 'primary' : 'error'}
                                        />
                                    </TableCell>
                                    <TableCell align="inherit">
                                        <Stack direction="row" spacing={2}>
                                            <Tooltip title="Edit" arrow>
                                                <IconButton
                                                    onClick={() => updateFun(res)}
                                                    size="small"
                                                    disableRipple
                                                    sx={{ bgcolor: theme.palette.info.main, color: '#fff' }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <IconButton
                                                    onClick={() => deleteFun(res)}
                                                    size="small"
                                                    disableRipple
                                                    sx={{ bgcolor: theme.palette.error.main, color: '#fff' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rolesCount}
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
                    paper: 'rounded-8'
                }}>
                <Toolbar>
                    <Typography variant="h5" color="primary">
                        {createStatus ? 'Create' : 'Update'} Role
                    </Typography>
                </Toolbar>
                <Formsy
                    onValidSubmit={handleSubmit}
                    onValid={enableButton}
                    onInvalid={disableButton}
                    ref={formRef}
                    name="registerForm"
                    className={classes.form}>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mb: 1, mt: 1 },
                            '& .react-tel-input.focused': { borderColor: theme.palette.primary.main },
                            m: 2
                        }}>
                        <TextFieldFormsy
                            label="Name"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            // focused
                            InputLabelProps={{
                                shrink: true
                            }}
                        // size="small"
                        />

                        <TextFieldFormsy
                            label="RoleID"
                            id="roleid"
                            name="roleid"
                            value={form.roleid}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            // focused
                            InputLabelProps={{
                                shrink: true
                            }}
                        // size="small"
                        />
                        <Box sx={{ width: '100%', mt: 1.5 }}>
                            <RadioGroupFormsy
                                row
                                sx={{ mt: 2 }}
                                className={classes.margin}
                                margin="normal"
                                label="Status"
                                type="radio"
                                id="is_active"
                                name="is_active"
                                value={form.is_active}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}>
                                <FormControlLabel value={true} control={<Radio />} label="Active" />
                                <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                            </RadioGroupFormsy>
                        </Box>
                        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                            <Grid item>
                                <Button
                                    sx={{ mt: 2, mb: 1, px: 6 }}
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={!isFormValid || loading1}
                                    aria-label="Register"
                                    style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                                    {loading1 ? <CircularProgress size={24} olor="inherit" /> : 'Save'}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{ mt: 1, mb: 1, px: 6 }}
                                    // fullWidth
                                    variant="contained"
                                    onClick={() => closeFun()}
                                    color="warning"
                                    style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                                    Close
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Formsy>
            </Dialog>
            <Dialog
                open={open}
                fullWidth
                maxWidth="xs"
                disableEscapeKeyDown={true}
                aria-labelledby="form-dialog-title"
                classes={{
                    paper: 'rounded-8'
                }}>
                <Toolbar>
                    <Typography variant="h5" color="error">
                        Alert
                    </Typography>
                </Toolbar>
                <Typography margin="0px 15px 15px 21px">Are you sure want to delete?</Typography>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mb: 1, mt: 1 },
                        '& .react-tel-input.focused': { borderColor: theme.palette.primary.main },
                        m: 2
                    }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                        <Grid item>
                            <Button
                                sx={{ mt: 1, mb: 1, px: 4 }}
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={userdelete}
                                aria-label="button"
                                style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                                {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Yes'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{ mt: 1, mb: 1, px: 4 }}
                                variant="contained"
                                onClick={deleteDialogClose}
                                color="warning"
                                style={{ textTransform: 'capitalize', fontSize: '16px' }}>
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
