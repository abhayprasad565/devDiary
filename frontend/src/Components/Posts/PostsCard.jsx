import React from 'react';
import { Link } from 'react-router-dom';

const PostsCard = ({ post }) => {
    console.log(post);
    let { createdAt = "", title = 0, description = "", images = [""], _id = 0, author = 0, genre = 0, subGenre = 0 } = post;
    return (
        <div className="box-border animate-fade-up animate-once  sm:w-[40%] w-full mx-3 my-3  overflow-hidden rounded-lg bg-white shadow">
            <img
                src={images[0].trim() || ""}
                className="aspect-video w-full object-cover "
                alt=""
            />
            <div className="p-4">
                <Link to={`/users/${author && author.username}`} className="hover:underline mb-1 text-sm text-primary-500">{author && author.firstName}  {author && author.lastName} • <time>{createdAt.substring(0, 10).split("-").reverse().join("-")}</time></Link>
                <Link to={`/posts/view/${_id}`}>
                    <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-gray-500">{description.substring(0, 200)}</p>
                    <div className="mt-4 flex gap-2">
                        <span
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                            {genre}
                        </span>
                        <span
                            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                        >
                            {subGenre}
                        </span>
                    </div></Link>
            </div>
        </div>
    );
}


export default PostsCard;
