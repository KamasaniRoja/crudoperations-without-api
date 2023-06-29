import React from 'react';
import Chart from 'react-apexcharts';
import { Grid, Typography, Card } from '@material-ui/core';

const chartHeight = 200;
const chartWidth = '100%';

const dataLine = {
  series: [
    {
      name: 'Line Graph',
      data: [12, 19, 3, 5, 2, 3],
    },
  ],
  options: {
    chart: {
      type: 'line',
      height: chartHeight,
      width: chartWidth,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  },
};

const dataBar = {
  series: [
    {
      name: 'Bar Chart',
      data: [12, 19, 3, 5, 2, 3],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: chartHeight,
      width: chartWidth,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    },
  },
};

const dataPie = {
  series: [12, 19, 3, 5, 2, 3],
  options: {
    chart: {
      type: 'pie',
      height: chartHeight,
      width: chartWidth,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  },
};

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h6" component="h6" align="left" gutterBottom style={{ marginTop: '20px', marginLeft: '20px' }}>
        Dashboard
      </Typography>
      <div style={{ margin: '0 20px' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Line Graph
              </Typography>
              <Chart options={dataLine.options} series={dataLine.series} type="line" height={chartHeight} width={chartWidth} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Bar Chart
              </Typography>
              <Chart options={dataBar.options} series={dataBar.series} type="bar" height={chartHeight} width={chartWidth} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Pie Chart
              </Typography>
              <Chart options={dataPie.options} series={dataPie.series} type="pie" height={chartHeight} width={chartWidth} />
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
