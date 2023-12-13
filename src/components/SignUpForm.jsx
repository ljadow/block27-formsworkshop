import { useState } from "react"
import './formstyle.css'

export default function SignUpForm({token,setToken}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    username: { username },
                    password: { password },
                })
            })
            const APIpost = await response.json();
            setToken(APIpost.token)
            console.log("API Post: ", APIpost)
            console.log("Token: ", token)
        }
        catch {
            setError(error.message)
            console.error(error)
        }
    }



    return (
        <div className="formContainer">
            <h2>Sign Up</h2>
            {error ? <p>{error}</p> : ""}
            <form onSubmit={handleSubmit}>
                <label> Username:
                    <input
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                </label><br/>
                <label>Password:
                    <input
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </label><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}