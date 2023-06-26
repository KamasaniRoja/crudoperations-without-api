import * as React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import LineGraph from '../charts/lineGraph';
import CssBaseline from '@mui/material/CssBaseline';


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
    const [chartData, setChartData] = useState({
        options: {
            labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
        },
        series: [44, 55, 13, 43],
    });
    const [lineChartData, setLineChartData] = useState({
        options: {
            xaxis: {
                categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
            },
            chart: {
                zoom: {
                    enabled: false,
                },
            },
        },
        series: [
            {
                name: "Series 1",
                data: [30, 40, 35, 50],
            },
        ],
    });
    const [barChartData, setBarChartData] = useState({
        options: {
            xaxis: {
                categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
            },
        },
        series: [
            {
                name: "Series 1",
                data: [50, 35, 40, 30],
            },
        ],
    });
    useEffect(() => {
        setChartData({
            options: {
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
            },
            series: [44, 55, 13, 43],
        });

        setLineChartData({
            options: {
                xaxis: {
                    categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                },
                chart: {
                    zoom: {
                        enabled: false,
                    },
                },
            },
            series: [
                {
                    name: 'Series 1',
                    data: [30, 40, 35, 50],
                },
            ],
        });
        setBarChartData({
            options: {
                xaxis: {
                    categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
                },
            },
            series: [
                {
                    name: "Series 1",
                    data: [50, 35, 40, 30],
                },
            ],
        });
    }, []);
    return (
        <Container sx={{ paddingBottom: '1.25rem' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'space-start' }}>
                        <DashboardIcon />
                        <Typography variant="h6" component="h6" paddingLeft={1}>
                            Dashboard
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h6" component="h6" gutterBottom>
                        Departments
                    </Typography>
                    <Chart
                        options={{
                            ...chartData.options,
                            labels: ["Department 1", "Department 2", "Department 3", "Department 4"],
                            toolbar: {
                                show: false,
                            },
                        }}
                        series={chartData.series}
                        type="pie"
                        width="100%"
                    />
                </Grid>
                <Grid item xs={4}>

                    <Chart
                        options={{
                            ...lineChartData.options,
                            chart: {
                                ...lineChartData.options.chart,
                                zoom: {
                                    enabled: false,
                                },
                                toolbar: {
                                    show: false,
                                },
                            },
                        }}
                        series={lineChartData.series}
                        type="line"
                        width="100%"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Chart
                        options={{
                            ...barChartData.options,
                            chart: {
                                ...barChartData.options.chart,
                                toolbar: {
                                    show: false,
                                },
                            },
                        }}
                        series={barChartData.series}
                        type="bar"
                        width="100%"
                    />
                </Grid>
            </Grid>
        </Container>
        // <div className={classes.root}>
        //     <CssBaseline />
        //     <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        //         <Grid item>
        //             <Box sx={{ display: 'flex', justifyContent: 'space-start', color: theme.palette.primary.main }}>
        //                 {/* <ListIcon /> */}
        //                 <Typography variant="h6" component="h6" paddingLeft={1}>
        //                     Dashboard
        //                 </Typography>
        //             </Box>
        //         </Grid>
        //     </Grid>
        //     <Grid container justifyContent="center" spacing={2}>
        //         <Grid item xs={12}>

        //             <LineGraph
        //                 title="NOTIFICATIONS"
        //                 color="primary.main"
        //                 chart={{
        //                     colors: [theme.palette.info.main, theme.palette.warning.main],
        
        //                 }}
        //             />

        //         </Grid>
        //     </Grid>
        // </div>
    );
}
