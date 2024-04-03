import React from "react";
import Chart from "react-apexcharts";
import { Grid, Typography, Card } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const chartHeight = "200px";
const chartWidth = "100%";

const Dashboard = () => {
  const navigate = useNavigate();
  const userList = useSelector(({ users }) => users.userslist);
  const activeUsers = userList && userList.filter(obj => obj.is_active === 'true');
  const rolesList = useSelector(({ roles }) => roles.roleslist);
  const roleData = rolesList.map((item) => ({ label: item.rolename, value: item.rolename }));
  const managerCount = roleData.filter(item => item.value === "Manager").length;
  const staffCount = roleData.filter(item => item.value === "Staff").length;
  const departList = useSelector(({ departments }) => departments.departmentslist);
  console.log(departList);
  const depart = departList.map((item) => ({ label: item.departmentname, value: item.departmentname }));
  const frontOfficeDepaCount = depart.filter(item => item.value === "Front Office Department").length;
  const houseDepaCount = depart.filter(item => item.value === "HouseKeeping Department").length;
  const managementDepaCount = depart.filter(item => item.value === "Management Department").length;
  const maintenanceDepaCount = depart.filter(item => item.value === "Maintenance Department").length;
  const securityDepaCount = depart.filter(item => item.value === "Security Department").length;
  const humanResouDepaCount = depart.filter(item => item.value === "Human Resource Department").length;

  const shortcuts = {
    "Front Office Department": "FOD",
    "HouseKeeping Department": "HouD",
    "Management Department": "ManaD",
    "Maintenance Department": "MainD",
    "Security Department": "SD",
    "Human Resource Department": "HRD",
  };

  const dataLine = {
    series: [
      {
        name: "active users",
        data: [0, activeUsers.length, 0],
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["June", "July", "August"],
      },
    },
  };

  const dataBar = {
    series: [
      {
        data: [managerCount, staffCount],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Manager", "Staff"],
      },
    },
  };

  const seriesData = [
    frontOfficeDepaCount,
    houseDepaCount,
    managementDepaCount,
    maintenanceDepaCount,
    securityDepaCount,
    humanResouDepaCount
  ];

  const dataPie = {
    series: seriesData,
    options: {
      chart: {
        type: "pie",
        height: "100%",
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: Object.keys(shortcuts).map((key, index) => `${shortcuts[key]} (${seriesData[index]})`),
      tooltip: {
        y: {
          formatter: function (value) {
            return value;
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        align="left"
        gutterBottom
        style={{ marginTop: "20px", marginLeft: "20px" }}
      >
        Dashboard
      </Typography>

      <div style={{ margin: "0 20px" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Active Users
              </Typography>

              <div style={{ height: chartHeight, width: chartWidth }}>
                <Chart
                  options={dataLine.options}
                  series={dataLine.series}
                  type="line"
                  height={chartHeight}
                  width={chartWidth}
                  onClick={() => navigate("/usermanagement")}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Manager & Staff
              </Typography>
              <div style={{ height: chartHeight, width: chartWidth }}>
                <Chart
                  options={dataBar.options}
                  series={dataBar.series}
                  type="bar"
                  height={chartHeight}
                  width={chartWidth}
                  onClick={() => navigate("/roleslist")}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Typography variant="h6" align="center" gutterBottom>
                Departments
              </Typography>
              <div style={{ height: chartHeight, width: chartWidth }}>
                <Chart
                  options={dataPie.options}
                  series={dataPie.series}
                  type="pie"
                  height={chartHeight}
                  width={chartWidth}
                  onClick={() => navigate("/departmentlist")}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
