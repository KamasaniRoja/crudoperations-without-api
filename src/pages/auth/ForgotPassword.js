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
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import Iconify from "../../components/Iconify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ForgotPassword
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newpassword"
                  label="New Password"
                  type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password' type
                  id="newpassword"
                  autoComplete="newpassword"
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => navigate(PATH_AUTH.login)}
                >
                  Return to Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
