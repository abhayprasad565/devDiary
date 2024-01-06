import React from 'react';
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import getUserInfo from '../../Contexts/UserInfo';

const Navbar = () => {
    const { userInfo } = getUserInfo();
    return (

        <>
            <header className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link className="block text-teal-600 h-full" to="/">
                                <img src={logo} alt="logo" className='md:justify-start h-[3rem] md:h-[5rem]' />
                            </Link>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <NavItem about="Categories" link="/"></NavItem>
                                    <NavItem about="Trending" link="/"></NavItem>
                                    <NavItem about="Home" link="/"></NavItem>
                                </ul>
                            </nav>
                            {!userInfo.isLoggedIn &&
                                <div className="flex items-center gap-4">
                                    <div className="sm:flex sm:gap-4">
                                        <NavLink
                                            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>

                                        <div className="hidden sm:flex">
                                            <NavLink
                                                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
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

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;

function NavItem(props) {
    return (
        <NavLink className="text-gray-500 transition hover:text-gray-500/75" to={props.link}> {props.about} </NavLink>
    )
}
