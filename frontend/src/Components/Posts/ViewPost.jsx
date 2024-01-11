import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, } from 'react-router-dom'
import useError from '../../Hooks/ErrorMessages';

const ViewPost = () => {
    const { id } = useParams();
    // navigate hook
    const navigate = useNavigate();
    // error popup 
    const [errorPopup, setError] = useError();
    // data
    const [postdata, setPostData] = useState();
    const [postDes, setPostDes] = useState();

    useEffect(() => {
        let querykey = "";
        const params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        }
        let url = `http://localhost:8080/posts/${id}`;
        fetch(url, params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw data;
                }
                setPostData(data.post);
                setPostDes(data.post.description.match(/.{1,500}/g));

            })
            .catch(error => {
                console.log(error);
                setError(true, error.message);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 2000);
            });
    }, []);
    return (
        <>

            <div className="max-w-screen-lg mx-auto">
                <main className="mt-10">

                    <div className="mb-4 md:mb-0 w-full mx-auto relative">
                        <div className="px-4 lg:px-0">
                            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                                {postdata && postdata.title}
                            </h2>
                            <Link
                                to={`/posts?category=${postdata && postdata.genre}`}
                                className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                            >
                                {postdata && postdata.genre}
                            </Link>
                        </div>

                        <img src={postdata && postdata.images[0]} className="w-full object-cover lg:rounded h-[28em]" />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:space-x-12">

                        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                            {postDes && postDes.map((obj, index) => {
                                return <p className="pb-6 px-0" key={index} >{obj} </p>
                            }
                            )}

                        </div>

                        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                            <div className="p-4 border-t border-b md:border md:rounded">
                                <div className="flex py-2">
                                    <img src="https://media.istockphoto.com/id/955036826/photo/3d-rendering-cool-emoji-with-sunglass-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=-_51nYYDQbq67nUwcsz6sz9NgcPtqGCCfQMCshb3dS8="
                                        className="h-10 w-10 rounded-full mr-2 object-cover" />
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm"> {postdata && postdata.author && postdata.author.firstName + " " + postdata.author.lastName} </p>
                                        <p className="font-semibold text-gray-600 text-xs">{postdata && postdata.createdAt.substring(0, 10)}  </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 py-3">
                                    {postdata && postdata.author && postdata.author.about}
                                </p>
                                <Link to={`/users/${postdata && postdata.author.username}`} className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                                    Visit Profile
                                    <i className='bx bx-user-plus ml-2' ></i>
                                </Link>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>

    );
}

export default ViewPost;
