import { useState } from "react"

const ParentLogin = () => {

const [loginParent, setLoginParent] = useState({email: "", password: "", role: "Parent"})
const [error, setError] = useState("")
const [message, setMessage] = useState("")
const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://127.0.0.1:5000/parent_signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginParent)
      })

      if (!response.ok) {
        setError("Invalid username or password")
      } else {
        setMessage("Login successful")
      }
    } catch (error) {
      console.error(error);
      
    }

  }

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Email" onChange={e => setLoginParent(prev => ({...prev, email: e.target.value}))}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" onChange={e => setLoginParent(prev => ({...prev, password: e.target.value}))}/>
        <button type="submit" onClick={e => handleLogin(e)}>Login!</button>
      </form>
      {showErrorMessage && <div>{error}</div>}
      {message && <div>{message}</div>}
    </>
  )
}
export default ParentLogin