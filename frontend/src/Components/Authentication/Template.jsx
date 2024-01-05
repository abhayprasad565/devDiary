import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';

const Template = ({ Ele }) => {
    return (
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
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
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
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>
                        </div>
                        <Ele />
                    </div>
                </main>
            </div>
        </section>
    );
}

export default Template;
