import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';

const defaultTheme = createTheme();
const ForgotPasswordForm = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(`Forgot password form submitted with email: ${email}`);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={() => navigate(PATH_AUTH.newpassword)}
                    >
                        Send Request
                    </Button>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default ForgotPasswordForm;
