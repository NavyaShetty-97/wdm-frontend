
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import React from 'react'
import './Modal.scss'

function Modal(props) {
    const handelClose = () => {
        props.onClose()
    } 
    return (
        <div className="modal-parent">
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div className="model-header">
                        <span class="close" onClick={handelClose}>&times;</span>
                    </div>
                    <div className="model-body">
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
