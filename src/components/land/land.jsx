
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968029
*/

import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Chart } from "react-google-charts";
import "./land.css";
import { API_ENDPOINT } from '../../endpoints/api.dev';

function LandDetails() {
    const sessionUser = {
        ID: JSON.parse(localStorage.getItem("sessionUser")),
    };
    const land = {
        ID: JSON.parse(localStorage.getItem("land_id")),
    };
    const [c1_data, setData1] = useState([
        ["Costs", "Values"]
    ]);
    const [c2_data, setData2] = useState([
        ["Entities", "Values"]
    ]);
    const [c3_data, setData3] = useState([
        ["People", "Values"]
    ]);
    const [usersShare, setShare] = useState(0);
    const options = {
        backgroundColor: 'transparent',
        is3D: false,
        legend: { 'position': 'none' },
        chartArea: { 'top': 80, 'left': 20 },
        fontSize: 13
    };
    const [costs, setCosts] = useState([0, 0, 0]);
    const [entities, setEntities] = useState([0, 0, 0]);

    useEffect(() => {
        const url = API_ENDPOINT + "lands/charts.php";
        let payload = {
            user: sessionUser.ID.user_id,
            land: land.ID.ID
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                let arr = [];
                let arr2 = [["Costs", "Values"]];
                Object.keys(data.chart1).forEach(function (key, index) {
                    arr2.push([key.replace("_cost", ""), data.chart1[key]]);
                    arr.push(data.chart1[key]);
                });
                setCosts(arr);
                setData1(arr2);

                arr = [];
                arr2 = [["Entities", "Values"]];
                Object.keys(data.chart2).forEach(function (key, index) {
                    arr.push(data.chart2[key]);
                    arr2.push([key, data.chart2[key]]);
                });
                setEntities(arr);
                setData2(arr2);

                arr2 = [["People", "Values"]];
                data.chart3.forEach((element) => {
                    if (element['ID'] == sessionUser.ID.user_id) setShare(parseInt(element['Size']));
                    arr2.push([element['FirstName'] + ' ' + element['LastName'], parseInt(element['Size'])]);
                });
                setData3(arr2);
            })
            .catch(err => {
                alert("Message not sent");
            }
            );
    }, [])

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', color: '#57468a' }}>
                <h1>Land Details</h1>
            </div>
            <br />
            <br />

            <div className='display_div'>
                <div className='chart_boards'>
                    <br />
                    <h2>Distribution by Cost</h2>
                    <div style={{ paddingLeft: '70px' }}>
                        <Chart
                            chartType="PieChart"
                            data={c1_data}
                            options={options}
                        />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <h3>Projects Cost: USD {costs[0]}</h3>
                    <h3>Trials Cost: USD {costs[1]}</h3>
                    <h3>Expenses Cost: USD {costs[2]}</h3>
                </div>

                <div className='chart_boards'>
                    <br />
                    <h2>Distribution by Entities</h2>
                    <div style={{ paddingLeft: '70px' }}>
                        <Chart
                            chartType="PieChart"
                            data={c2_data}
                            options={options}
                        />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <h3>Number of Projects: {entities[0]}</h3>
                    <h3>Number of Trials: {entities[1]}</h3>
                    <h3>Number of Expenses: {entities[2]}</h3>
                </div>

                <div className='chart_boards2'>
                    <br />
                    <h2>Distribution of Town</h2>
                    <div style={{ paddingLeft: '130px' }}>
                        <Chart
                            chartType="PieChart"
                            data={c3_data}
                            options={{
                                backgroundColor: 'transparent',
                                is3D: false,
                                legend: { 'position': 'none' },
                                chartArea: { 'top': 80, 'left': 20 },
                                fontSize: 13,
                                width: 400,
                                height: 400
                            }}
                        />
                    </div>
                    <br />

                    <h3>User's share: {usersShare} sq. m</h3>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandDetails;