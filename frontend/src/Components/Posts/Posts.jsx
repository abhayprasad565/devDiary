import React, { useEffect, useState, memo } from 'react';
import PostsCard from './PostsCard';
import { useNavigate, useSearchParams } from 'react-router-dom'
import useError from '../../Hooks/ErrorMessages'
import { STATIC } from '../../Hooks/Config';

const Posts = ({ query }) => {
    // navigate hook
    const navigate = useNavigate();
    // error popup 
    const [errorPopup, setError] = useError();
    // data
    const [postdata, setPostData] = useState();
    const [trendingData, setTrendingData] = useState();
    // search posts
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.size)
    useEffect(() => {
        let querykey = "";
        const queryParams = searchParams.get(querykey = 'category') || searchParams.get(querykey = 'search');
        console.log(queryParams, querykey);
        const params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        }
        let url = STATIC + `/posts/${queryParams ? `search?${querykey}=${queryParams}` : ""}`;
        fetch(url, params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw data;
                }
                setPostData(data.posts);
                setTrendingData(data.genres);

            })
            .catch(error => {
                console.log(error);
                setError(true, error.message);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 2000);
            });
    }, [searchParams]);

    return (
        <>
            <div className='w-screen box-border my-3 flex  items-center flex-col sm:flex-row sm:justify-start justify-center'>
                <div className='sm:border-r-4 overflow-x-auto custom-scrollbar w-full flex-row sm:flex-col flex sticky sm:w-[17%] sm:h-[90vh] box-border m-2'>
                    <div className='sm:w-full  text-sm sm:text-2xl font-bold text-custom-linkActive my-3'>Trending Topics</div>
                    {trendingData && trendingData.map((genre, index) => <TrendingCard genre={genre} key={index} />)}
                </div>
                <div className='h-[90vh] box-border w-full sm:w-[66%] custom-scrollbar max-h-[90vh] overflow-y-auto flex flex-row flex-wrap  gap-1 justify-center'>
                    <div className='w-full sm:text-4xl px-10 sm:px-20 text-left font-bold text-custom-linkActive underline underline-offset-8'>
                        {searchParams.size > 0 ? "Results for " + (searchParams.get('category') || searchParams.get("search")) : "For You"}
                    </div>
                    {postdata && postdata.map((post) => {
                        return <PostsCard post={post} key={post._id} />
                    })}
                </div>
                <div className='sm:border-r-4  sticky w-[17%] h-[90vh]  box-border m-2'>

                </div>
            </div>
        </>
    );
}
const TrendingCard = memo(({ genre }) => {
    // navigate hook
    const navigate = useNavigate();
    // rerender page to search categories
    const handleClick = () => {
        navigate(`/posts?category=${genre._id}`, { replace: true });
    }
    return (
        <>
            <div className='sm:w-full cursor-pointer p-2 text-left  underline sm:underline-none underline-offset-8  text-sm mx-1 sm:text-xl text-bold flex flex-row justify-between' onClick={handleClick}>
                {genre._id}
                <div> 📈</div>
            </div>

        </>
    )
})


export default Posts;
