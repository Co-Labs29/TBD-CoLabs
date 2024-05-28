import { useState } from "react";

const ParentLogin = () => {
  const [loginParent, setLoginParent] = useState({
    email: "",
    password: "",
    role: "Parent"
  });
  const [error, setError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/parent_signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginParent)
      });

      if (!response.ok) {
        setError("Invalid username or password");
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
      setError("Error signing in. Please try again.");
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="bg-white p-8 max-w-md">
      <form>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
          onChange={(e) => setLoginParent({ ...loginParent, email: e.target.value })}
        />
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
          onChange={(e) => setLoginParent({ ...loginParent, password: e.target.value })}
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="text-indigo-800 border-2 border-purple-800 rounded-xl px-10 py-2 ml-24"
        >
          Login
        </button>
      </form>
      {showErrorMessage && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default ParentLogin;
