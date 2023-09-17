'use client'
import { storeTokenInLocalStorage } from "../../../global/apis";
import { useRouter } from 'next/navigation';

const Dashboard = () => {

    const router = useRouter()
    const logout = async () => {
        storeTokenInLocalStorage('null');
        router.replace('/');
    }

    return (
        <button onClick={logout}>
            <p className="text-l font-bold float-left px-3 py-3">Logout</p>
        </button>
    )
}

export default Dashboard;