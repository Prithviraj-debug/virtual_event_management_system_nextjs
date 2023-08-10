import { useGlobalContext } from "@/app/context/user.context";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { userId } = useGlobalContext();
    console.log(userId)

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="navbar bg-white flex justify-between px-10">
            <div className="">
                <a className="normal-case text-xl cursor-pointer">VEM</a>
            </div>
                {
                    !userId ? (
                        <div className="flex justify-between gap-6">
                            <Link href='/login' className="cursor-pointer">Sign in</Link>
                            <Link href='/signup' className="btn btn-outline">Sign up</Link>
                        </div>
                    ): (
                        <div>
                        <Link href='/postevent' className="cursor-pointer btn btn-ghost mr-3">Post Event</Link>
                        <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src="/avatar.png" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                    <li>
                    <Link href='/profile' className="justify-between">
                        Profile
                    </Link>
                    </li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
                </div>
                        </div>
                    )
                }
                
                {/*  */}
        </div>
    )
}