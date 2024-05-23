import { useState } from "react"

const ChildSignUp = () => {
  const [childUser, setChildUser] = useState({
      first_name: "",
      email: "",
      password: "",
      role: "Child"
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  console.log('childUser :>> ', childUser);
  console.log('confirmPassword :>> ', confirmPassword);


  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault()
      if (childUser.password === confirmPassword) {
        try {
          const response = await fetch("http://127.0.0.1:5000/child_signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(childUser)
          })
          // const data = await response.json()
          if (!response.ok) {
            const errorData = await response.json()
            setError(errorData.message)
            return;
          } else {
            setShowMessage(true)
          }
        } catch (error) {
          console.error(error)
          setError("Error signing up.. Please try again")
        }
      } else {
        setError("Passwords do not match!")
      }
      

  }

  return (
    <>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstname" placeholder="First Name" onChange={e => setChildUser({...childUser, first_name: e.target.value })}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" onChange={e => setChildUser({...childUser, password: e.target.value})}/>
        <label htmlFor="confirmPassword">Password</label>
        <input type="password" id="confirmPassword" placeholder="ConfirmPassword" onChange={e => setConfirmPassword(() => e.target.value)}/>
        <button type="submit" onClick={e => handleSignUp(e)}>Sign up!</button>
      </form>
      {showMessage && <div>{error}</div>}
    </>
  )
}
export default ChildSignUp