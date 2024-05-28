import { useState } from "react";

const ChildLogin = () => {
  const [loginChild, setLoginChild] = useState({
    email: "",
    password: "",
    role: "Parent"
  });
  const [error, setError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/child_signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginChild)
      });

      if (!response.ok) {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white p-8  w-full max-w-md">
        <form>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) => setLoginChild({...loginChild, email: e.target.value})}
          />
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) => setLoginChild({...loginChild, password: e.target.value})}
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 ml-24"
          >
            Login!
          </button>
        </form>
        {showErrorMessage && <div>{error}</div>}
      </div>
    </>
  );
};

export default ChildLogin;
