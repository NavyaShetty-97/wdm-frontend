
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState, useEffect } from 'react';
import pic from '../../assets/images/add_pp.png'
import './dashboard.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
// import { Chart } from "react-google-charts";
import { NavLink } from 'react-router-dom';
import { API_ENDPOINT } from '../../endpoints/api.dev';

// const c_data = [
//     ["Task", "Hours per Day"],
//     ["Land used ", 20],
//     ["Otherwise", 80],
// ];

// const options = {
//     title: "PROJECT-LAND UTILIZATION",
//     backgroundColor: 'transparent',
//     is3D: true,
//     legend: { 'position': 'none' },
//     chartArea: { 'top': 80, 'left': 20 },
//     fontSize: 13
// };

function Dashboard(props) {
    const [name, setName] = useState('');
    const [ancestor, setAncestor] = useState('');
    const [relation, setRelation] = useState('');
    const [landOwned, setLandOwned] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [checkedBoxes, setCheckBox] = useState(new Array(data.length).fill(false));
    const [type, setType] = useState('Project');
    const [inheritance, setInheritance] = useState(0);
    const sessionUser = {
        ID: JSON.parse(localStorage.getItem("sessionUser")),
    };

    useEffect(() => {
        // const userDetails = API_ENDPOINT + "dashboard/userDetails.php";
        userDetails();
        calculateInheritance();
        const projects = API_ENDPOINT + "dashboard/listProjects.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(projects, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setData(data);
                setCheckBox(new Array(data.length).fill(false));
            });
    }, []);

    const calculateInheritance = () => {
        const projects = API_ENDPOINT + "dashboard/inheritance.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(projects, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setInheritance(data);
            });
    };

    const userDetails = () => {
        const userDetails = API_ENDPOINT + "dashboard/userDetails.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(userDetails, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setName(data.Name);
                setAncestor(data.Ancestor);
                setRelation(data.Relation);
                setLandOwned(data.LandOwned);
                setExpenses(data.Expenses < 0 ? '- USD ' + (data.Expenses * -1).toString() : 'USD ' + (data.Expenses).toString());
            });
    };

    const onTrialClick = event => {
        const trials = API_ENDPOINT + "dashboard/listTrials.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(trials, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                event.preventDefault();
                setType('Trial');
                setData(data);
                setCheckBox(new Array(data.length).fill(false));
            });
    };

    const onProjectClick = event => {
        const projects = API_ENDPOINT + "dashboard/listProjects.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(projects, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                event.preventDefault();
                setType('Project');
                setData(data);
                setCheckBox(new Array(data.length).fill(false));
            });
    };

    const onExpensesClick = event => {
        const expenses = API_ENDPOINT + "dashboard/listExpenses.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(expenses, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                event.preventDefault();
                setType('Expense');
                setData(data);
                setCheckBox(new Array(data.length).fill(false));
            });
    };

    const onLandClick = event => {
        const expenses = API_ENDPOINT + "lands/listLands.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(expenses, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                event.preventDefault();
                setType('Land');
                setData(data);
                setCheckBox(new Array(data.length).fill(false));
            });
    };

    const changeHandler = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    };

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const toggleCheckBox = (e, key) => {
        const updatedCheckedState = checkedBoxes.map((item, index) => {
            return index === key ? !item : item
        }
        );

        setCheckBox(updatedCheckedState);
    };

    const deleteItem = () => {
        let tmpData = [];
        let deleteRecords = [];

        data.map((val, index) => {
            if (checkedBoxes[index] == false) {
                tmpData.push(val);
            }
            else {
                deleteRecords.push(val.ID);
            }
        })

        const deleteItems = API_ENDPOINT + "projects/delete_project.php";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const Data = {
            IDs: deleteRecords,
            itemType: type
        };

        fetch(deleteItems, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res);
            });

        setData(tmpData);
        setCheckBox(new Array(data.length).fill(false));
        userDetails();
    };

    const setItemID = (e) => {
        localStorage.setItem('property_id', JSON.stringify({
            ID: e.target.value,
            type: type
        }));
        props.history.push('/editProperty');
    };

    const redirectToLand = (e) => {
        localStorage.setItem('land_id', JSON.stringify({
            ID: e.target.value
        }));
        props.history.push('/landDetails');
    };

    return (
        <div className='parentDashboard'>
            <Header />
            <div id='dashboard'>
                <div className='profile'>
                    <div>
                        <input type="file" accept='image/*' onChange={changeHandler} ref={imageUploader} style={{ display: "none" }} />
                        <div onClick={() => imageUploader.current.click()} style={{ height: "200px", width: "200px", border: "1px dashed black" }}>
                            <img
                                // ref={uploadedImage}
                                src={pic}
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    position: "absolute"
                                }}
                            />
                        </div>
                        <br />
                        <br />

                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Name: </label>{name}</div>
                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Ancestor: </label>{ancestor}</div>
                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Relation: </label>{relation}</div>
                        <br />
                        <br />

                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Land Owned: </label>{landOwned} sq. m</div>
                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Land Inheritance: </label>{inheritance} sq. m</div>
                        <div><label style={{ color: '#57468a', fontSize: '17.5px' }}>Net Expenses: </label>{expenses}</div>
                        <br />
                        <br />

                        <div style={{ paddingBottom: '20px' }}><NavLink style={{
                            fontFamily: 'montserrat, sans-serif',
                            fontSize: '1em',
                            backgroundColor: '#000000',
                            // marginRight: '1px',
                            color: '#faf7f7',
                            padding: '1em 1em',
                            justifyContent: 'center',
                            display: 'flex',
                            width: '200px'
                        }} activeClassName="active" to="/sellLand">Sell or Bequest Land</NavLink></div>
                        {/* <div>
                            <Chart
                                chartType="PieChart"
                                data={c_data}
                                options={options}
                            />
                        </div> */}
                    </div>

                    <div className='ml-20'>
                        <div className='dashboard_table_tabs'>
                            <div onClick={onProjectClick}>
                                <button className='dashboard_table_buttons' type="submit"><p>Projects</p></button>
                            </div>
                            <div onClick={onTrialClick}>
                                <button className='dashboard_table_buttons' type="submit"><p>Trials</p></button>
                            </div>
                            <div onClick={onExpensesClick}>
                                <button className='dashboard_table_buttons' type="submit"><p>Expenses</p></button>
                            </div>
                            <div onClick={onLandClick}>
                                <button className='dashboard_table_buttons' type="submit"><p>Lands</p></button>
                            </div>
                        </div>

                        <div className='trial_contents'>
                            {type != 'Land' &&
                                <table>
                                    {/* <thead style={{position: 'fixed'}}> */}
                                    <tr style={{ backgroundColor: '#675896', color: 'white' }}>
                                        <td>Check</td>
                                        <td>Name</td>
                                        <td>Cost</td>
                                        <td>Land</td>
                                    </tr>
                                    {/* </thead> */}

                                    {/* <tbody> */}
                                    {data.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td><input type="checkbox" checked={checkedBoxes[key]} value={val.ID} onChange={(e) => toggleCheckBox(e, key)} /></td>
                                                {/* <td onClick={setItemID()}><button>{val.title}</button></td> */}
                                                <td><button style={{ backgroundColor: 'transparent', fontSize: '16px' }} onClick={(e) => setItemID(e)} value={val.ID}>{val.title}</button></td>
                                                <td>{val.cost}</td>
                                                <td>{val.land}</td>
                                            </tr>
                                        )
                                    })}
                                    {/* </tbody> */}
                                </table>
                            }
                            {type == 'Land' &&
                                <table>
                                    {/* <thead style={{position: 'fixed'}}> */}
                                    <tr style={{ backgroundColor: '#675896', color: 'white' }}>
                                        <td>Site</td>
                                        <td>Land</td>
                                        <td>Size</td>
                                    </tr>
                                    {/* </thead> */}

                                    {/* <tbody> */}
                                    {data.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                {/* <td onClick={setItemID()}><button>{val.title}</button></td> */}
                                                <td>{val.ID}</td>
                                                <td><button style={{ backgroundColor: 'transparent', fontSize: '16px' }} onClick={(e) => redirectToLand(e)} value={val.ID}>{val.ID} - {val.LandDesc}</button></td>
                                                <td>{val.Size}</td>
                                            </tr>
                                        )
                                    })}
                                    {/* </tbody> */}
                                </table>
                            }
                        </div>

                        {type != 'Land' &&
                            <div className='to_add'>
                                <NavLink activeClassName="active" to="/addProperty">Add</NavLink>
                                <button style={{ backgroundColor: 'white', fontSize: '16px' }} onClick={deleteItem}>Delete</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;