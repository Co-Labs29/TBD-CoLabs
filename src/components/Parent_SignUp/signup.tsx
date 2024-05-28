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
          const response = await fetch("http://127.0.0.1:5000/parent_signup", {
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
    <div className="flex items-center justify-center min-h-screen" id="signup">
      <form className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-400 w-full max-w-lg">
        <h1 className="text-center font-bold text-xl mb-7">Sign up</h1>
        <label htmlFor="firstName"className="block text-gray-700 font-bold mb-2" >First Name</label>
        <input
          type="text"
          id="firstname" 
          placeholder="First Name"
          className="w-full px-3 py-2 mb-4 border rounded-lg"  
          onChange={e => setParentUser({...parentUser, first_name: e.target.value })}
        />
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input 
          type="text" 
          id="email" 
          placeholder="Email" 
          className="w-full px-3 py-2 mb-4 border rounded-lg" 
          onChange={(e) => setParentUser({ ...parentUser, email: e.target.value })}
        />

        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Password" 
          className="w-full px-3 py-2 mb-4 border rounded-lg" 
          onChange={(e) => setParentUser({ ...parentUser, password: e.target.value })}
        />

        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          placeholder="Confirm Password" 
          className="w-full px-3 py-2 mb-4 border rounded-lg" 
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button 
          type="submit" 
          onClick={handleSignUp} 
          className="text-indigo-700 border-2 border-indigo-700 rounded-xl px-10 py-2 mx-20 ml-36"
        >
          Sign up
        </button>
      </form>

      {showMessage && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default ParentSignup