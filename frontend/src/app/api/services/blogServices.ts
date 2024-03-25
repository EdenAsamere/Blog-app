import axios from 'axios';
import { BlogPost } from '../types/Blog';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    const BaseURL = "http://localhost:4000/api/posts/"
    const response = await axios.get<BlogPost[]>(BaseURL);
    console.log(response.data)
    return response.data;
};
