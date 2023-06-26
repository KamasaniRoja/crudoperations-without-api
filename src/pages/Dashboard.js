import * as React from 'react';
import { Grid, Typography, Box,Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import LineGraph from '../charts/lineGraph';
import CssBaseline from '@mui/material/CssBaseline';
import BarGraph from '../charts/barChart';
import PieChart from '../charts/pieChart';

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



export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();

    return (

        <div className={classes.root}>
            <CssBaseline />
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'space-start', color: theme.palette.primary.main }}>
                        {/* <ListIcon /> */}
                        <Typography variant="h6" component="h6" paddingLeft={1}>
                            Dashboard
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item xs={12}>

                    <LineGraph
                        title="Users"
                        color="primary.main"
                        chart={{
                            colors: [theme.palette.info.main, theme.palette.warning.main],
                            zoom: {
                                enabled: false,
                            },
                            toolbar: {
                                show: false,
                            },
                        }}
                    />

                </Grid>
                <Grid item xs={12}>

                    <BarGraph
                        title="Users"
                        color="primary.main"
                        chart={{
                            colors: [theme.palette.info.main, theme.palette.warning.main],
                            zoom: {
                                enabled: false,
                            },
                            toolbar: {
                                show: false,
                            },
                        }}
                    />

                </Grid>
            </Grid>
        </div>
    );
}
