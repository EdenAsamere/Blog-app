import Link from "next/link";
import { Logo } from "./logo";
import { FiMenu } from "react-icons/fi";

export const NavBar = () => {
    const isAuthenticated = true; // Replace this with your authentication logic
    const navigation = isAuthenticated
        ? [
              { title: "Write", href: "/write" },
              { title: "Logout", href: "/logout" }
          ]
        : [{ title: "Login", href: "/login" }];

    return (
        <nav className="flex items-center justify-between fixed top-0 left-0 right-0 bg-white w-full px-4 py-2 shadow-md z-10">
            <Logo />
            <div className="flex items-center gap-7 text-gray-900 hover:text-black duration-200">
                {navigation.map((item) => (
                    <Link
                        key={item?.title}
                        href={item?.href}
                        className="text-sm uppercase font-semibold relative group overflow-hidden"
                    >
                        {item?.title}
                        <span className="w-full h-[1px] bg-blue-700 absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
                    </Link>
                ))}
            </div>
            <div className="md:hidden">
                <FiMenu className="text-2xl" />
            </div>
        </nav>
    );
};
