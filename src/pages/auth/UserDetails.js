import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const steps = ['User Details', 'Security Questions'];

export default function UserDetails() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    console.log(setCompleted);
    const [hotelName, setHotelName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [favoritePet, setFavoritePet] = React.useState('');
    const [favoriteBook, setFavoriteBook] = React.useState('');

    const handleHotelNameChange = (event) => {
        setHotelName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFavoritePetChange = (event) => {
        setFavoritePet(event.target.value);
    };

    const handleFavoriteBookChange = (event) => {
        setFavoriteBook(event.target.value);
    };

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

    // const handleComplete = () => {
    //     const newCompleted = completed;
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    //     handleNext();
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    const handleSubmit = () => {
        console.log('Submitted Data:');
        console.log('Username:', username);
        console.log('Phone Number:', phoneNumber);
        console.log('Hotel Name:', hotelName);
        console.log('Email:', email);
        console.log('Favorite Pet:', favoritePet);
        console.log('Favorite Book:', favoriteBook);
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
            <Box sx={{ width: '60%', my: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {steps[activeStep]}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {activeStep === 0 && (
                        <>
                            <TextField
                                type="text"
                                label="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                sx={{ width: '70%' }}
                            />
                            <TextField
                                type="number"
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                sx={{ width: '70%' }}
                            />
                            <TextField
                                label="Hotel Name"
                                value={hotelName}
                                onChange={handleHotelNameChange}
                                sx={{ width: '70%' }}
                                type="text"
                            />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                                sx={{ width: '70%' }}
                                type="email"
                            />
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <TextField
                                type="text"
                                label="Favorite Pet"
                                value={favoritePet}
                                onChange={handleFavoritePetChange}
                                sx={{ width: '70%' }}
                            />
                            <TextField
                                type="text"
                                label="Favorite Book"
                                value={favoriteBook}
                                onChange={handleFavoriteBookChange}
                                sx={{ width: '70%' }}
                            />
                        </>
                    )}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                {isLastStep() ? (
                    <Button onClick={handleSubmit} variant="contained">
                        Finish
                    </Button>
                ) : (
                    <Button onClick={handleNext} variant="contained">
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    );
}
