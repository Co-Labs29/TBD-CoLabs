import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName !== null) {
      setFirstName(storedFirstName); 
    }
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-80 mt-5 p-4 font-bold text-2xl">
        <h1>Hello, {firstName}</h1>
      </div>
    </div>
  );
}
export default Dashboard;





