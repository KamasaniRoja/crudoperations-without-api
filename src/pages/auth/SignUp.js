import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import Iconify from "../../components/Iconify";
import { fetchSignupService } from "../../services/authService";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const clientId =
    "106381978093-gptl8utmu520kd6dqesdavq0vpb9s3mu.apps.googleusercontent.com";

  const onSuccess = async (response) => {
    try {
      const { accessToken, profileObj } = response;
      const apiResponse = await fetch("/auth/google", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, profileObj }),
      });

      if (apiResponse.ok) {
        console.log("API request successful!");
      } else {
        console.error("API request failed!");
      }
    } catch (error) {
      console.error("Error occurred during API request:", error);
    }
  };

  const onFailure = (error) => {
    console.error("Login failed:", error);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),

    };
    if (!user.email) {
      setEmailError(true);
      setInvalidEmail(false);
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setEmailError(false);
      setInvalidEmail(true);
    } else {
      setEmailError(false);
      setInvalidEmail(false);
    }

    if (!user.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    console.log(user);
    const token = await fetchSignupService(user);
    console.log(token);
    localStorage.setItem(token, token);
    if (token?.data?.access_token) {
      navigate(PATH_AUTH.userdetails)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                          <Iconify
                            color="#1976d2"
                            icon={"material-symbols:mail"}
                          />
                        </InputAdornment>
                      ),
                    }}
                    error={submitted && (emailError || invalidEmail)}
                    helperText={
                      submitted && emailError
                        ? "Email is required"
                        : submitted && invalidEmail
                          ? "Invalid email address"
                          : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password' type
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify color="#1976d2" icon={"mdi:password"} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              color="#1976d2"
                              icon={
                                showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={submitted && passwordError}
                    helperText={submitted && passwordError ? "Password is required" : ""}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Sign Up with Google"
                />
              </GoogleOAuthProvider>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ my: 2 }}>
                  <Link
                    href=""
                    variant="body2"
                    onClick={() => navigate(PATH_AUTH.login)}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}
