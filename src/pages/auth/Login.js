import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH} from '../../routes/paths';
import { InputAdornment, IconButton } from '@mui/material';
import Iconify from '../../components/Iconify';
// import useAuth from '../../hooks/useAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { fetchLoginService } from '../../services/authService'


const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const { login } = useAuth();
  const clientId = "106381978093-gptl8utmu520kd6dqesdavq0vpb9s3mu.apps.googleusercontent.com";

  const onSuccess = async (response) => {
    try {
      const { accessToken, profileObj } = response;
      const apiResponse = await fetch('/auth/google', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, profileObj }),
      });

      if (apiResponse.ok) {
        console.log('API request successful!');

      } else {
        console.error('API request failed!');

      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  };

  const onFailure = (error) => {
    console.error('Login failed:', error);
  };
  // const handleSubmit = async (data) => {
  //   console.log(data);
  //   try {
  //     const response = await login(data.email, data.password).then(() => {
  //       console.log(response);
  //       // navigate(PATH_DASHBOARD.dashboard)
  //     });
  //   } catch (error) {
  //     console.log(error)
  //     return error
  //   }

  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = { email: data.get('email'), password: data.get('password') };
    console.log(user);
    const token = await fetchLoginService(user);
    console.log(token);
    localStorage.setItem(token, token);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify color="#1976d2" icon={'material-symbols:mail'} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify color="#1976d2" icon={'mdi:password'} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify color="#1976d2" icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText="Login with Google"

              />

            </GoogleOAuthProvider>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={() => navigate(PATH_AUTH.forgotpassword)}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2" onClick={() => navigate(PATH_AUTH.signup)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}