import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useNavigate } from 'react-router-dom';
import config from 'config/config';

function Goals() {
  const [goal, setGoal] = useState({
    name: '',
    amount: '',
    img: '',
    link: '',
    description: ''
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = config.backendURL
    const id = sessionStorage.getItem('selectedChildId');

    try {
      const response = await fetch(`${url}/create_goal/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(goal)
      });

      if (!response.ok) {
        throw new Error('Failed to create goal');
      }

      navigate('/childProfile');
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleEmojiSelect = (emojiData: any, event: any) => {
    setGoal((prevGoal) => ({ ...prevGoal, img: emojiData.emoji }));
    console.log(event)
  };
  

  const handleCancel = () => {
    setGoal({
      name: '',
      amount: '',
      img: '',
      link: '',
      description: ''
    });
    navigate('/childProfile');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-400 w-full max-w-lg">
          <h1 className="text-center font-bold text-xl mb-7">New Goal</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Goal Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Goal Name"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              value={goal.name}
              onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            />
            <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
              Goal Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Goal Amount"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              value={goal.amount}
              onChange={(e) => setGoal({ ...goal, amount: e.target.value })}
            />
            <label className="block text-gray-700 font-bold mb-2">
              Choose Emoji
            </label>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
            {goal.img && (
              <div className="flex justify-center mt-4">
                <span className="text-4xl">{goal.img}</span>
              </div>
            )}
            <label htmlFor="itemLink" className="block text-gray-700 font-bold mb-2">
              Item Link
            </label>
            <input
              type="text"
              id="itemLink"
              placeholder="Item Link"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              value={goal.link}
              onChange={(e) => setGoal({ ...goal, link: e.target.value })}
            />
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              value={goal.description}
              onChange={(e) => setGoal({ ...goal, description: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-6 py-2 mt-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-purple-800 border-2 border-purple-700 rounded-xl px-10 py-2 mt-4"
              >
                Set Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Goals;


