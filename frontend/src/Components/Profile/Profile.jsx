import React, { useEffect, useState } from 'react';
import getUserInfo from '../../Contexts/UserInfo';
import { useParams } from 'react-router-dom';
import useError from '../../Hooks/ErrorMessages';
import { Link } from 'react-router-dom'
import { STATIC } from '../../Hooks/Config'

const Profile = () => {
    // pre required hooks and values
    const { username } = useParams();
    const { userInfo, setUser } = getUserInfo();
    const [isProfileOwner, setIsProfileOwner] = useState(false);
    const [profileDetails, setProfileDetails] = useState();
    // error popup 
    const [errorPopup, setError] = useError();

    useEffect(() => {
        // if owners profile set owner true
        if (userInfo.isLoggedIn && username == userInfo.info.username) {
            setIsProfileOwner(true);
        }
        // fetch profile data otherwise 
        const params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        }
        fetch(STATIC + `/users/${username}`, params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw data;
                }
                setProfileDetails(data.user);
                //  console.log(profileDetails)
            })
            .catch(error => {
                //console.log(error);
                setError(true, error.message);
            });

    }, [userInfo, username]);

    return (
        <div className='h-fit md:h-[80vh] box-border p-2 flex flex-col md:flex-row items-start  w-screen bg-custom-background text-custom-textColor'>
            <div className="relative sm:w-1/3 sm:min-h-[80vh] mt-16 min-w-0 break-words  mb-6 shadow-lg rounded-xl">
                {isProfileOwner &&
                    <span class="inline-flex w-fit ms-[80%] justify-end items-end -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                        <Link to="/users/edit"
                            class="inline-block border px-4 py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                        >
                            Edit
                        </Link>
                    </span>}
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full flex justify-center">
                            <div className="relative">
                                <img src="https://media.istockphoto.com/id/955036826/photo/3d-rendering-cool-emoji-with-sunglass-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=-_51nYYDQbq67nUwcsz6sz9NgcPtqGCCfQMCshb3dS8=" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                            </div>
                        </div>
                        <div className="w-full text-center mt-20">
                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                <div className="p-3 text-center">
                                    <span className="text-md font-bold block uppercase tracking-wide text-custom-linkActive">{profileDetails && profileDetails.posts.length}</span>
                                    <span className="text-sm text-custom-textColor">Posts</span>
                                </div>
                                <div className="p-3 text-center">
                                    <span className="text-md font-bold block uppercase tracking-wide text-custom-linkActive">{profileDetails && profileDetails.createdAt.substring(0, 10).split("-").reverse().join("-")}</span>
                                    <span className="text-sm text-custom-textColor">Active Since</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-2xl text-custom-linkActive font-bold leading-normal mb-1">{profileDetails && profileDetails.firstName + " " + profileDetails.lastName}</h3>
                        <div className="text-xs mt-0 mb-2 text-custom-textColor font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-custom-textColor opacity-75"></i>@{profileDetails && profileDetails.username}
                        </div>
                    </div>
                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light text-left leading-relaxed text-custom-textColor mb-4">{profileDetails && profileDetails.about}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorPopup}
            <div className='w-full md:w-2/3 p-4 flex flex-col max-h-[90vh] items-start justify-start'>
                <div className='mb-6 text-custom-linkActive text-3xl underline underline-offset-4 font-bold'>{isProfileOwner ? "Your Posts" : "Latest Posts"}</div>
                <div className='w-full h-fit sm:h-full sm:overflow-y-auto custom-scrollbar'>
                    {profileDetails && profileDetails.posts.map((obj, index) => {
                        // console.log(obj);
                        // console.log(profileDetails);
                        return <PostsCard post={obj} owner={isProfileOwner} key={index} />
                    }
                    )}
                </div>
            </div>
        </div>
    );
}
function PostsCard({ post, owner }) {
    //console.log(post)
    let { createdAt, title, description, images, _id } = post;

    const date = new Date(createdAt);
    const { userInfo, setUser } = getUserInfo();
    // error popup 
    const [errorPopup, setError] = useError();
    const handleDelete = () => {
        // fetch params 
        const params = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: userInfo.info._id,
            })
        }
        // send data
        fetch(`http://localhost:8080/posts/${_id}`, params)
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
    return (
        <article className="flex bg-custom-background border transition hover:shadow-xl my-3 m-2">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                    datetime={createdAt}
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span>{date.getFullYear()}</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>{date.getMonth() + "-" + date.getDay()}</span>
                </time>
            </div>

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt="Guitar"
                    src={images[0].trim() || "https://images.unsplash.com/photo-1614899099690-3bd319d25f99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col items-end justify-between text-xs sm:text-md">
                {owner &&
                    <span className="z-10 sm:mb-[-30px] h-[30px] md:h-fit w-fit items-end overflow-hidden rounded-md border bg-custom-background shadow-sm">
                        <button
                            className="inline-block border px-4 py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                        >
                            Edit
                        </button>
                        <button onClick={handleDelete}
                            className="inline-block px-4 border py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                        >
                            Delete
                        </button>
                    </span>}
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <Link to={`/posts/view/${_id}`} >
                        <h3 className="font-bold uppercase text-gray-900">
                            {title}
                        </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-custom-textColor">
                        {description.substring(50)}
                    </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                        to={`/posts/view/${_id}`}
                        className="block bg-custom-btnBg px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                    >
                        Read Blog
                    </Link>
                </div>
            </div>
            {errorPopup}
        </article>
    )
}
export default Profile;
