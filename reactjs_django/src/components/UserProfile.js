// importing components, axios, and hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation } from './Navigation';
import Login from './Login';
import { Alert } from 'reactstrap';

const UserProfilePage = ({}) => {
    const [userProfile, setUserProfile] = useState({});
    const [name, setName] = useState('');
    const [pAddress, setPAddress] = useState('');
    const [cAddress, setCAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('');
    const isAuthenticated = !!localStorage.getItem('token');

    // Fetching the username
    const username = localStorage.getItem('user');

    // Defining API URL
    let api = 'http://127.0.0.1:8000/'

    // Using useEffect to fetch profile data after rendering
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Fetching existing user data
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(api + `profile/${username}/`);
            const profile = response.data;
            setUserProfile(profile);
            setName(profile.user_name);
            setPAddress(profile.p_address);
            setCAddress(profile.c_address);
            setPhoneNumber(profile.phone_number);
        } catch (error) {
            setStatus("No Profile Data, Please update it.")
        }
    };


    // Onclick save function to update record
    const saveProfile = async () => {
        const profileData = {
            user_name: username,
            p_address: pAddress,
            c_address: cAddress,
            phone_number: phoneNumber
        };

        try {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            };

            if (userProfile.id) {
                // Update existing profile
                console.log(profileData)
                await axios.put(api + `profile/${username}/`, profileData, config);
                window.location.reload();
            } else {
                // Create new profile
                console.log(profileData)
                await axios.post(api + `api/profile/`, profileData, config);
                window.location.reload();
            }
            setStatus('Profile saved successfully!');
        } catch (error) {
            setStatus("Please fill the fields properly")
            console.log(error)
        }
    };

    return (
        <div className="container-fluid p-0">
            {isAuthenticated ? (
                <div>
                    <Navigation />
                    <h2 className="text-center alert alert-success mt-0">User Profile Page</h2>
                    <div className="row-12">
                        <div className="col-4 mx-auto">
                            <form action='/'>
                                <div className="form-group">
                                    <label htmlFor="password" className="float-left">
                                        Enter Your Permanent Address
                                    </label>
                                    <input
                                        type="text"
                                        id="p_address"
                                        className="form-control"
                                        value={pAddress} onChange={(e) => setPAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="float-left">
                                        Enter Your Current Address
                                    </label>
                                    <input
                                        type="text"
                                        id="c_address"
                                        className="form-control"
                                        value={cAddress} onChange={(e) => setCAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="float-left">
                                        Enter Your Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="c_address"
                                        className="form-control"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={saveProfile}
                                    className="btn btn-primary float-left mt-2"
                                >
                                    Save
                                </button>
                                <br />
                                <br />
                                {status ? <Alert color="primary">{status}</Alert> : null}
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container-fluid'>
                    <h2 className="text-center alert alert-danger mt-2">User not authenticated, Please Login First</h2>
                    <Login />
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;
