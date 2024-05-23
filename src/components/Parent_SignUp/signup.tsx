import { useState } from "react"

const ParentSignup = () => {
  const [parentUser, setParentUser] = useState({
      first_name: "",
      email: "",
      password: "",
      role: "Parent"
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  console.log('parentUser :>> ', parentUser);
  console.log('confirmPassword :>> ', confirmPassword);


  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault()
      if (parentUser.password === confirmPassword) {
        try {
          const response = await fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parentUser)
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
        <input type="text" id="firstname" placeholder="First Name" onChange={e => setParentUser({...parentUser, first_name: e.target.value })}/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Email" onChange={e => setParentUser({...parentUser, email: e.target.value})}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" onChange={e => setParentUser({...parentUser, password: e.target.value})}/>
        <label htmlFor="confirmPassword">Password</label>
        <input type="password" id="confirmPassword" placeholder="ConfirmPassword" onChange={e => setConfirmPassword(() => e.target.value)}/>
        <button type="submit" onClick={e => handleSignUp(e)}>Sign up!</button>
      </form>
      {showMessage && <div>{error}</div>}
    </>
  )
}
export default ParentSignup