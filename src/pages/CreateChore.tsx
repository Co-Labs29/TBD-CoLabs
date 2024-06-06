import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

// Define the Child interface
interface Child {
  img: string;
  id: number;
  parent_id: number;
  role: string;
  username: string;
}

// Define the Chore interface
interface Chore {
  name: string;
  frequency: string;
  due_date: string;
  amount: number;
}

const CreateChore = () => {
  const [children, setChildren] = useState<Child[]>([]);
  // State to track the selected child's id
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  // Initialize chore state with default values
  const [chore, setChore] = useState<Chore>({
    name: '',
    frequency: 'one-off',
    due_date: '',
    amount: 0
  });

  const navigate = useNavigate()

  const url = config.backendURL;

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`${url}/my_children/1`);
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedChildId === null) {
      console.error("No child selected")
      return
    }

    if (!chore.name || !chore.frequency || !chore.due_date || chore.amount === undefined) {
      console.error("Missing required fields");
      return;
    }
    try {
      const response = await fetch(`${url}/add_chore/${selectedChildId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(chore)
      })
      console.log('response :>> ', await response.json());
    } catch (error) {
        console.error(error);
        
    }
  }

  // Function to handle child selection using id
  const handleChildSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChildId(Number(e.target.value));
  };

  // Function to handle dollar value input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regular expression to match valid dollar amounts
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      setChore({ ...chore, amount: Number(value) });
    }
  };

  return (
    <div className="flex gap-[221px]">
      <div className="w-[738px] flex justify-center mt-[80px] border">
        <form className="w-[456px] mt-[80px]" onSubmit={e => handleCreateChore(e)}>
          <label htmlFor="name" className="block mb-2">
            Chore name
          </label>
          <input
            type="text"
            id="name"
            value={chore.name}
            onChange={(e) => setChore({ ...chore, name: e.target.value })} // Update chore name
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
          />
          {/* <label htmlFor="frequency" className="block mb-2">
            Chore frequency
          </label>
          <input
            type="text"
            id="frequency"
            value={chore.frequency}
            onChange={(e) => setChore({ ...chore, frequency: e.target.value })} // Update chore frequency
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
          /> */}
          
          <label htmlFor="amount" className="block mb-2">
            Chore amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-black-800 ">$</span>
            <input
              type="text"
              id="amount"
              value={chore.amount.toString()}
              onChange={handleAmountChange} // Handle dollar amount input
              className="w-full pl-7 px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
              placeholder="0.00"
              pattern="^\d*\.?\d{0,2}$" // Enforce dollar value format
            />
          </div>
          <div className="my-8">
            <p>Assign child</p>
            <div className="flex gap-[48px] mt-2">
              {children.map((child, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="child"
                    value={child.id.toString()} // Updated value to string to match event type
                    className="hidden"
                    onChange={handleChildSelect} // Added onChange handler
                  />
                  <img
                    src={`/${child.img}`}
                    alt="profile pic"
                    className={`h-8 rounded-full mb-1 ${selectedChildId === child.id ? 'border-2 border-dark-purple' : ''}`} // Updated conditional class to use id
                  />
                  <span className="text-[12px]">{child.username}</span>
                </label>
              ))}
            </div>
          </div>
          <label htmlFor="due_date" className="block mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="due_date"
            value={chore.due_date}
            onChange={(e) => setChore({ ...chore, due_date: e.target.value })} // Update due date
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-800"
          />
          <div className="flex gap-8 justify-center mt-[80px]">
            <button className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative" onClick={() => navigate("/chores")}>Cancel</button>
            <button className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 font-semibold py-2 mt-4 relative" type="submit">Create Chore</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChore;
