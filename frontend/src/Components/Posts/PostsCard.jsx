import React from 'react';
import { Link } from 'react-router-dom';

const PostsCard = ({ post }) => {
    let { createdAt, title, description, images, _id, author, genre, subGenre } = post;
    return (
        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            <img
                src={images[0].trim() || "https://images.unsplash.com/photo-1704381375059-b6861e025dd8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                className="aspect-video w-full object-cover"
                alt=""
            />
            <div className="p-4">
                <Link to={`/users/${author.username}`} className="hover:underline mb-1 text-sm text-primary-500">{author.firstName}  {author.lastName} • <time>{createdAt.substring(0, 10).split("-").reverse().join("-")}</time></Link>
                <Link to={`/posts/${_id}`}>
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
