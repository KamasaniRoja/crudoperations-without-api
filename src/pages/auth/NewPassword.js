import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    textField: {
        margin: theme.spacing(1),
        width: '300px',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const NewPassword = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                className={classes.textField}
                label="OTP"
                variant="outlined"
                type="text"

            />
            <TextField
                className={classes.textField}
                label="New Password"
                variant="outlined"
                type="password"

            />

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Save
            </Button>
        </div>
    );
};

export default NewPassword;
