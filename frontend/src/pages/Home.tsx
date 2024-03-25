import BlogList from "@/components/Blog/BlogList";
import { Hero } from "@/components/hero";

export const Home = () => {
    return (
        <>
        <div style={{ display:'flex' ,alignItems: 'center' }}>
            <Hero/>
        </div>
        <div>
            <BlogList/>

        </div>
        </>
    );
};
