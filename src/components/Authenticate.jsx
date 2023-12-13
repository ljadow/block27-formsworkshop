import { useState } from "react";
import './formstyle.css'

export default function Authenticate({ token, setToken }) {
    const [error, setError] = useState(null)
    const [successMessage, setsuccessMessage] = useState(null)
    const [userData, setUserData] = useState(null)

    async function handleClick(e) {
        e.preventDefault();

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const result = await response.json();
            setsuccessMessage(result.message)
            setUserData(result.data.iat)
            console.log(result.data)
            console.log(result)
        }
        catch {
            setError(error.message)
        }

    }

    return (
        <div className="authenticate">
            <h2>Authenticate</h2>
            {successMessage ? <p>{successMessage}</p> : ""}
            {userData ? <p>User IAT: {userData}</p> : ""}
            {error ? <p>{error}</p> : ""}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    )
}