import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo.png"

const Signup = () => {
    function InputComponent({ type, name, placeholder }) {
        return (<div className="col-span-6 sm:col-span-3">
            <label
                htmlFor={name}
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
                <span
                    className="absolute start-3 top-3 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                >
                    {placeholder}
                </span>
            </label>
        </div>)
    }
    const [formData, setFormData] = useState({
        firstName: "null",
        lastName: "null",
        dateOfBirth: "null",
        email: "null",
        username: "null",
        password: "null",
    });

    const submitFormData = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        for (let ele of e.target.elements) {
            if (ele.name.trim())
                formData.append(ele.name, ele.value);
        }
        console.log(formData);
        setFormData(formData);
        registerUser(formData);
    };
    const registerUser = async (formData) => {
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        }

        fetch('http://localhost:8080/register', params)
            .then(response => {
                if (!response.ok) {
                    response.json().then(res => {
                        throw new Error(`${res.error}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const devDiaryAbout = `devDiary Community is a community of  amazing developers
    Your Go-To Hub for Code, Connection, and Career Advancement`

    return (
        <>
            <section className='bg-custom-background text-custom-textColor'>
                <div className="lg:grid lg:min-h-[90vh] lg:grid-cols-12">
                    <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt="Night"
                            src="https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <Link className="block  flex items-center justify-center" to="/">
                                <img src={logo} alt="logo" className='rounded-lg justify-center  md:h-[3rem]' />
                            </Link>
                            <h2 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl">
                                Welcome to devDiary
                            </h2>
                            <p className="mt-4 leading-relaxed">
                                {devDiaryAbout}
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <Link
                                    className="inline-flex h-16 w-16 items-center justify-center rounded-full  sm:h-20 sm:w-20"
                                    to="/"
                                >
                                    <img src={logo} alt="logo" className='md:justify-start h-[3rem] md:h-[5rem]' />

                                </Link>

                                <h1 className="mt-2 text-2xl font-bold  sm:text-3xl md:text-4xl">
                                    Welcome to devDiary
                                </h1>

                                <p className="mt-4 leading-relaxed">
                                    {devDiaryAbout}
                                </p>
                            </div>

                            <form action="/" onSubmit={submitFormData} className="mt-8 grid grid-cols-6 gap-6">
                                <InputComponent type='text' name='firstName' placeholder='First Name'></InputComponent>
                                <InputComponent type='text' name='lastName' placeholder='Last Name'></InputComponent>
                                <InputComponent type='date' name='dateOfBirth' placeholder='Date Of Birth'></InputComponent>
                                <InputComponent type='email' name='email' placeholder='Email'></InputComponent>
                                <InputComponent type='text' name='username' placeholder='Username'></InputComponent>
                                <InputComponent type='password' name='password' placeholder='Password'></InputComponent>
                                <div className="col-span-6">
                                    <label htmlFor="MarketingAccept" className="flex gap-4">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name=""
                                            className="h-5 w-5 rounded-md border-gray-200  shadow-sm"
                                        />

                                        <span className="text-sm ">
                                            I agree to the Terms and Conditions.
                                        </span>
                                    </label>
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button type='submit'
                                        className="inline-block shrink-0 rounded-md border bg-custom-btnBg border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium  transition hover:bg-transparent hover focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>
                                    <p className="mt-4 text-sm  sm:mt-0">
                                        Already have an account?
                                        <Link to="/login" className="">Log in</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}


export default Signup;
