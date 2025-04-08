import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {
    const [ searchParams ] = useSearchParams();
    const firstName = searchParams.get("name");
    const [balance, setBalance] = useState(0);

    useEffect ( () => {
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                setBalance(res.data.balance);
            })
    }, [balance])

    return (
        <div>
            <Appbar name={firstName}/>
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}