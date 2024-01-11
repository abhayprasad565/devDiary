import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getUserInfo from '../../Contexts/UserInfo';
import useError from '../../Hooks/ErrorMessages';
import { useNavigate } from "react-router-dom";
const NewPost = () => {
    const navigate = useNavigate();
    // get user data from context 
    const { userInfo, setUser } = getUserInfo();
    console.log(userInfo);
    // error popup 
    const [errorPopup, setError] = useError();
    // post data states
    const [genre, setGenre] = useState(null);
    const [subGenre, setSubGenre] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [images, setImages] = useState([null, null]);

    const submitFormData = () => {
        // check if user already loggedin
        if (!userInfo.isLoggedIn) {
            console.log(userInfo)
            setError(true, "User not Logged in");
            setTimeout(() => {
                navigate(`/login`, { replace: true });
            }, 1500)
        }
        // fetch params 
        const params = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    genre: genre,
                    subGenre: subGenre,
                    description: description,
                    images: images,
                    author: userInfo.info._id
                },
                _id: userInfo.info._id,
            })
        }
        // send data
        fetch(`http://localhost:8080/posts`, params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw data;
                }
                setError(false, data.message);
                setTimeout(() => {
                    navigate(`/users/${userInfo.info.username}`, { replace: true });
                }, 1500)
            })
            .catch(error => {
                //console.log(error);
                setError(true, error.message);
            });
    }


    const postdata = null;
    return (
        <>
            <section className="bg-custom-background min-h-[80vh] w-screen flex items-center justify-center">

                <div className="rounded-lg h-[80vh] w-1/2  p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <div className='w-full p-2 m-2 text-xl font-bold text-custom-linkActive '>Add new Post</div>
                    <form action="" onSubmit={submitFormData} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="firstName">Title</label>
                                <input onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                    name='firstName'
                                    placeholder="Title"
                                    type="text"

                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="lastName">Genre</label>
                                <input onChange={(e) => setGenre(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                    name='lastName'
                                    placeholder="Genre"
                                    type="text"

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="firstName">Sub genre</label>
                                <input onChange={(e) => setSubGenre(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                    name='firstName'
                                    placeholder="Sub Genres"
                                    type="text"

                                />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="lastName">Add Image Url</label>
                                <input onChange={(e) => setImages([e.target.value])}
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                                    name='lastName'
                                    placeholder="Add image url from unsplash etc"
                                    type="text"

                                />
                            </div>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="about">Description</label>

                            <textarea
                                className="w-full border-2 rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Add Post Content"
                                rows="8"
                                name="about"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-custom-btnBg px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Add Post
                            </button>
                        </div>
                    </form>
                </div>
                {errorPopup}
            </section>
        </>
    );
}

export default NewPost;
