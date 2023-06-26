import React, { useState } from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
    const [options] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    });

    const [series] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]);

    return (
        <div className="PieGraph">
            <div className="row">
                <div className="chart">
                    <Chart options={options} series={series} type="line" width="300" />
                </div>
            </div>
        </div>
    );
};

export default PieChart;
