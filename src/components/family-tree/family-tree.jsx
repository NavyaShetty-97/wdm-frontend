
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { API_ENDPOINT } from '../../endpoints/api.dev';

function FamilyTree() {
    console.log(API_ENDPOINT + '/dashboard/familyTree.php');
    const sessionUser = {
        ID: JSON.parse( localStorage.getItem("sessionUser")),
    };
    const [family, setFamily] = useState({});
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        console.log('called');
        fetch(API_ENDPOINT + '/dashboard/familyTree.php', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ID: sessionUser.ID.user_id
            })
        })
            .then(data =>  data.json())
            .then(data => {
                setFamily(data);
            });
    }, []);

    return (
        <div>
            <Header />
            <div style={{width:'20% ', margin:'auto', padding:'10px', minHeight:'75vh'}}>
            {family?.ancestors && family.ancestors.map((val, key) => {
                return (
                    <ul>
                        <li>
                            <p style={{fontSize: '25px',width:'65%',margin:'auto', display:'flex', justifyContent:'center'}}>{val}</p>
                            <p style={{fontSize: '50px',width:'65%',margin:'auto', display:'flex', justifyContent:'center'}}>&#8595;</p>
                        </li>
                    </ul>
                )
            })}
            {family?.ancestors && family.children.map((val, key) => {
                return (
                    <ul>
                        <li>
                            <p style={{fontSize: '20px',width:'65%',margin:'auto', display:'flex', justifyContent:'center'}}>{val}</p>
                        </li>
                    </ul>
                )
            })}
            </div>
            <Footer />
        </div>
    )
}

export default FamilyTree;
