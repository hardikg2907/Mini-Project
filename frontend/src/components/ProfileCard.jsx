import React from "react";
import {FaUserCircle} from 'react-icons/fa';
import {MdCall} from 'react-icons/md';
import {IoMdMail} from 'react-icons/io'
import {FaRegEdit} from 'react-icons/fa'
export const ProfileCard=()=>{
    return(
        <div className='profileCard'>
            <div className="profileHeader">
                <div className="coverPhoto"></div>
                <div className="profilePic">
                    <FaUserCircle size='7rem' className="profPhoto"/>
                    <div className="picFill"></div>
                </div>
                <div className="editProfileBtn"><div className="editBtn"><FaRegEdit size='1.1em'/><p> Edit Profile</p></div></div>
            </div>
            <div className="profileDetails">
                <div className="profileName">
                    <h1>CSI - Computer Society of India</h1>
                    <h4>Technical Committee</h4>
                </div>
                <div className="profileContacts">
                    <div className="commDetails">
                        <h3>Faculty Mentor</h3>
                        <p>Dr. Kailas Devadkar</p>
                        <p><MdCall size='1.3em'/> +91 9820403116</p>
                        <p><IoMdMail size='1.3em'/> kailas.devadkar@spit.ac.in</p>
                    </div>
                    <div className="commDetails">
                        <h3>Chairperson</h3>
                        <p>Aditya Kharote</p>
                        <p><MdCall size='1.3em'/> +91 9820403116</p>
                        <p><IoMdMail size='1.3em'/> aditya.kharote@spit.ac.in</p>
                    </div>
                    
                </div>
                <div className="profileContacts">
                    <div className="commDetails">
                        <h3>Vice Chairperson</h3>
                        <p>Siddhant Meshram</p>
                        <p><MdCall size='1.3em'/> +91 9820403116</p>
                        <p><IoMdMail size='1.3em'/> siddhant.meshram@spit.ac.in</p>
                    </div>
                    <div className="commDetails">
                        <h3>IIC Co-ordinator</h3>
                        <p>Keyur Pancholi</p>
                        <p><MdCall size='1.3em'/> +91 9820403116</p>
                        <p><IoMdMail size='1.3em'/> keyur.pancholi@spit.ac.in</p>
                    </div>
                </div>
                <div className="profileName">
                    <h3>Description</h3>
                    <p>Best Committee Ever</p>
                </div>
            </div>
        </div>
    );
}