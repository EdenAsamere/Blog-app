'use client';
import { useQuery } from 'react-query';
import { fetchBlogPosts } from '../../app/api/services/blogServices';
import { BlogPost } from '../../app/api/types/Blog';
import Link from 'next/link';
import Loading from './loading';

const BlogList = () => {
    const { data: blogPosts, isLoading, isError } = useQuery<BlogPost[], Error>('blogPosts', fetchBlogPosts);
    if (isLoading) return <Loading />;
    if (isError) return <p>Error: Unable to fetch data</p>;

    return (
        <div className="blog-list">
            <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts?.map(blogPost => (
                    <li key={blogPost._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <Link href={`/blog/${blogPost._id}`} 
                            className="block">
                                <img src={blogPost.post_picture} alt={blogPost.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{blogPost.title}</h3>
                                    <p className="text-gray-600">{blogPost.min_to_read.toString()} min read</p>
                                </div>
                
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
