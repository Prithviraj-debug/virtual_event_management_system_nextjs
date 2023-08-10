import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = async () => {
    const router = useRouter();

    try {
        const response = await axios.get("/app/api/users/logout");
        console.log("success", response.data);
        router.push("/login");
    } catch (error: any) {
        console.log(error.message);
    }
}

export default Logout;