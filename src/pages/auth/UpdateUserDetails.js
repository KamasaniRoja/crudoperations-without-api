import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Iconify from "../../components/Iconify";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneInput from "react-phone-input-2";
import { InputAdornment, Grid, } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchUserService } from "../../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

const steps = ["User Details", "Security Questions"];

const defaultTheme = createTheme();
export default function UserDetails() {
  const navigate = useNavigate();
  const id = useParams();
  console.log(id);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  // console.log(setCompleted);


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      hotel_name: data.get("hotel_name"), userName: data.get("userName"),
      email: data.get("email"), phoneNo: data.get("phoneNo"), favourite_pet: data.get("favourite_pet"),
      favourite_book: data.get("favourite_book")
    };
    console.log(user);
    const token = await fetchUserService(user.id);
    console.log(token);
    localStorage.setItem(token, token);
    if (token?.data?.access_token) {
      console.log(token?.data?.data?.access_token)
      navigate(PATH_DASHBOARD.dashboard)
    }
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
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ width: "85%", my: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {steps[activeStep]}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {activeStep === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="hotel_name"
                      label="Hotel Name"
                      type="text"
                      id="hotel_name"
                      autoComplete="hotel_name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon sx={{ color: "#1976d2" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
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
                      name="userName" // Corrected name attribute
                      label="User Name"
                      type="text"
                      id="userName"
                      autoComplete="userName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#1976d2" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PhoneInput
                      country={"gb"}
                      specialLabel={"Phone Number"}
                      // value={form.phone_number}
                      // onChange={(phone) =>
                      //   setForm({ ...form, phone_number: phone ? "+" + phone : "" })
                      // }
                      // // onChange={(value, data) => console.log(value.slice(data.dialCode.length))}
                      // containerClass={classes.borderClass}
                      containerStyle={{
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: "8x",
                        fontFamily: 'Roboto","Helvetica","Arial",sans-serif',
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                      // inputClass={classes.container}
                      inputStyle={{
                        width: "100%",
                      }}
                      inputProps={{
                        name: "phoneNo", // Corrected name attribute
                      }}
                    />
                  </Grid>
                </Grid>)}

              {activeStep === 1 && (<Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="favourite_pet"
                    label="Favourite Pet"
                    type="text"
                    id="favourite_pet"
                    autoComplete="favourite_pet"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PetsIcon sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="favourite_book"
                    label="Favourite Book"
                    type="text"
                    id="favourite_book"
                    autoComplete="favourite_book"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MenuBookIcon sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

              </Grid>)}
              <Grid container>
                <Grid item xs sx={{ my: 2 }}>
                  {activeStep === 1 && (<Button
                    color="inherit"
                    onClick={handleBack}
                  >
                    Back
                  </Button>)}
                </Grid>
                <Grid item sx={{ my: 2 }}>
                  {isLastStep() ? (
                    <Button type="submit" variant="contained">
                      Finish
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained">
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
