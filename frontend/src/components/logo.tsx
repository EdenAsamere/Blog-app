import Link from "next/link"

export const Logo = async () => {
    return (
        <div  className="flex items-center" >
            <Link href={`/`} className="text-3xl font-bold ">BLOG</Link>
        </div>
        
    )
}