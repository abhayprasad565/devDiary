import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import getUserInfo from '../../Contexts/UserInfo';
import useError from '../../Hooks/ErrorMessages';

const Navbar = () => {
    // toggle menu vissibility
    // set password vissible 
    const [menuVissible, setMenuVissible] = useState(false);
    const handleMenuVissibility = () => {
        setMenuVissible(prev => !prev);
    }
    // prerequired hooks 
    const { userInfo, setUser } = getUserInfo();
    const navigate = useNavigate();
    const [errorPopup, setError] = useError();
    // handle logout api call
    const handleLogout = () => {
        let params = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        }
        fetch('http://localhost:8080/logout', params)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data;
                }
                else {
                    setError(false, "Logout Sucess");
                    localStorage.setItem('authToken', "");
                    setUser();
                    setTimeout(() => {
                        navigate('/login', { replace: true });
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

        <>
            <header className="bg-white w-screen z-20">
                <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link className="block h-full" to="/">
                                <img src={logo} alt="logo" className='md:justify-start h-[3rem] md:h-[5rem]' />
                            </Link>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <NavLink to="/categories" className={({ isActive }) => `${isActive ? "text-custom-linkActive decoration-custom-linkActive" : "text-custom-textColor decoration-transparent"} transition-colors ease-linear decoration-solid underline underline-offset-8 decoration-2 `}>
                                        Categories
                                    </NavLink>
                                    <NavLink to="/trending" className={({ isActive }) => `${isActive ? "text-custom-linkActive decoration-custom-linkActive" : "text-custom-textColor decoration-transparent"} transition-colors ease-linear decoration-solid underline underline-offset-8 decoration-2 `}>
                                        Trending
                                    </NavLink>
                                    <NavLink to="/posts/new" className={({ isActive }) => `${isActive ? "text-custom-linkActive decoration-custom-linkActive" : "text-custom-textColor decoration-transparent"} flex flex-row gap-2  transition-colors ease-linear decoration-solid underline underline-offset-8 decoration-2 `}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
                                        Write
                                    </NavLink>

                                </ul>
                            </nav>
                            {!userInfo.isLoggedIn &&
                                <div className="flex items-center gap-4">
                                    <div className="sm:flex sm:gap-4">
                                        <NavLink
                                            className={({ isActive }) => `rounded-md ${isActive ? "bg-custom-btnBg" : "bg-gray-100"} px-5 py-2.5 text-sm font-medium text-custom-textColor shadow`}
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>

                                        <div className="hidden sm:flex">
                                            <NavLink
                                                className={({ isActive }) => `rounded-md ${isActive ? "bg-custom-btnBg" : "bg-gray-100"} px-5 py-2.5 text-sm font-medium text-custom-textColor`}
                                                to="/signup"
                                            >
                                                Register
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="block md:hidden">
                                        <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            }
                            {userInfo.isLoggedIn &&
                                <div>
                                    <div onClick={handleMenuVissibility} className="h-10 w-10 ring-4 user cursor-pointer relative top-2 ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://as2.ftcdn.net/v2/jpg/03/04/99/89/1000_F_304998952_u4RbglQksZHYE6vVexLhovTwC1NLFyt0.jpg')]">

                                        <div className={`${menuVissible ? "block" : "hidden"} z-20 drop-down  w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3`}>
                                            <ul>
                                                <Link to={`/users/${userInfo.info.username}`} className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </span>
                                                    <span> My Profile </span>
                                                </Link>
                                                <Link to="/" className="px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </span>
                                                    <span> Saved Posts </span>
                                                </Link>
                                                <li onClick={handleLogout} className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                    </span>
                                                    <span> Logout </span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sm:hidden cursor-pointer" id="mobile-toggle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path className="dark:stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </header >
            {errorPopup}
        </>
    );
}

export default Navbar;

function NavItem(props) {
    return (
        <NavLink className="text-gray-500 transition hover:text-gray-500/75" to={props.link}> {props.about} </NavLink>
    )
}
