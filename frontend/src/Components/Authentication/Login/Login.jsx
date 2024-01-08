import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUserInfo from '../../../Contexts/UserInfo';
import useError from '../../../Hooks/ErrorMessages';

const Signup = () => {
    // set password vissible 
    const [passVissible, setPassVissible] = useState(false);
    const handlePasswordVissibility = () => {
        setPassVissible(prev => !prev);
    }

    // pre required hooks 
    const navigate = useNavigate();
    const { userInfo, setUser } = getUserInfo();
    const [errorPopup, setError] = useError();

    // handle login api call
    const submitFormData = async (e) => {
        e.preventDefault();
        const formData = {};
        for (let ele of e.target.elements) {
            if (ele.name.trim())
                formData[ele.name] = ele.value;
        }
        loginUser(formData);
    };
    const loginUser = async (formData) => {
        console.log(formData);
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        fetch('http://localhost:8080/login', params)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(true, data.message);
                }
                else {
                    setUser(true, data.user);
                    localStorage.setItem('authToken', data.token);
                    setError(false, "Login Sucessfull")
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 2000);
                }
                console.log(data);
            })
            .catch(error => {
                let msg = error.message;
                setError(true, msg);
                console.log(msg);
            });
    }

    const devDiaryAbout = `devDiary Community is a community of  amazing developers
    Your Go-To Hub for Code, Connection, and Career Advancement`
    return (
        <>
            <div className="mx-auto w-screen px-4 py-16 sm:px-6 lg:px-8 text-custom-textColor bg-custom-background">

                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold  sm:text-3xl">Welcome Back</h1>
                    <p className=" mt-4 max-w-full text-center ">
                        {devDiaryAbout}
                    </p>

                    <form action="" onSubmit={submitFormData} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="test"
                                    name='username'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type={passVissible ? "password" : "text"}
                                    name='password'
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                />

                                <span onClick={handlePasswordVissibility} className="cursor-pointer absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg  px-5 text-custom-background hover:text-custom-textColor border bg-custom-btnBg hover:bg-custom-background hover:border-custom-textColor border-custom-background py-3 text-sm font-medium  transition hover focus:outline-none focus:ring"
                        >
                            Log in
                        </button>

                        <p className="text-center text-sm ">
                            No account?
                            <Link className="underline" to="/signup"> Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
            {errorPopup}
        </>
    );
}


export default Signup;
