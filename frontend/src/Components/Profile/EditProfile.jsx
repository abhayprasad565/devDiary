import React from 'react';
import { useState, useEffect } from 'react'
import getUserInfo from '../../Contexts/UserInfo';
import useError from '../../Hooks/ErrorMessages'
import { useNavigate, useParams } from 'react-router-dom';
import { STATIC } from '../../Hooks/Config';

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo, setUser } = getUserInfo();
    // userdetails hook
    const [firstName, setFirstName] = useState(userInfo.info.firstName);
    const [lastName, setLastName] = useState(userInfo.info.lastName);
    const [dateOfBirth, setDateOfBirth] = useState(userInfo.info.dateOfBirth);
    const [email, setEmail] = useState(userInfo.info.email);
    const [about, setAbout] = useState(userInfo.info.about);
    // error popup 
    const [errorPopup, setError] = useError();
    // check user already loggedin
    useEffect(() => {
        const params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        }
        fetch(STATIC + '/check_login', params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw data;
                }
                setUser(data.sucess, data.user);
            })
            .catch(error => {
                console.log(error);
                setError(true, error.message);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 2000);
            });
    }, [])
    const submitFormData = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        console.log(e.target);
        for (let ele of e.target.elements) {
            if (ele.name.trim())
                formData.append(ele.name, ele.value);
        }
        // console.log(userInfo)
        formData.append('_id', userInfo.info._id);
        console.log(formData);
        updateUser(formData);
    };
    const updateUser = async (formData) => {
        let params = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: formData
        }
        fetch(`http://localhost:8080/users/${id}`, params)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data;
                }
                else {
                    setError(false, data.message)
                    console.log(userInfo.username);
                    setTimeout(() => {
                        navigate(`/users/${userInfo.info.username}`, { replace: true });
                    }, 2000);
                }
            })
            .catch(error => {
                let msg = error.message;
                setError(true, msg);
                console.log(msg);
            });
    }

    return (
        <section className="bg-custom-background min-h-[80vh] w-screen flex items-center justify-center">

            <div className="rounded-lg h-[80vh] w-1/2  p-8 shadow-lg lg:col-span-3 lg:p-12">
                <div className='w-full p-2 m-2 text-xl font-bold text-custom-linkActive '>Update Your Details</div>
                <form action="" onSubmit={submitFormData} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="sr-only" htmlFor="firstName">FirstName</label>
                            <input onChange={(e) => setFirstName(e.target.value)}
                                className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                name='firstName'
                                placeholder="FirstName"
                                type="text"
                                defaultValue={userInfo.isLoggedIn ? userInfo.info.firstName : "firstName"}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="lastName">LastName</label>
                            <input onChange={(e) => setLastName(e.target.value)}
                                className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                name='lastName'
                                placeholder="LastName"
                                type="text"
                                defaultValue={userInfo.isLoggedIn ? userInfo.info.lastName : "lastName"}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="sr-only" htmlFor="dateOfBirth">Date of Birth</label>
                            <input onChange={(e) => setDateOfBirth(e.target.value)}
                                className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                placeholder="Date Of Birth"
                                type="date"
                                defaultValue={userInfo.isLoggedIn ? userInfo.info.dateOfBirth : "email"}

                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                placeholder="Email address"
                                type="email"
                                name='email'
                                defaultValue={userInfo.isLoggedIn ? userInfo.info.email : "email"}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="sr-only" htmlFor="about">About</label>

                        <textarea
                            className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="About"
                            rows="8"
                            name="about"
                            onChange={(e) => setAbout(e.target.value)}
                            defaultValue={userInfo.isLoggedIn ? userInfo.info.about : "About"}

                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-custom-btnBg px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            {errorPopup}
        </section>
    );
}

export default EditProfile;
