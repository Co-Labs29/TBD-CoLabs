import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';


const ChildProfile = () => {
  const navigate = useNavigate();
  console.log(navigate)
  const [childInfo, setChildInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError(new Error('You must be logged in to view this page'));
      setLoading(false);
      return;
    }

    const fetchChildInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch child information');
        }
        const data = await response.json();
        setChildInfo(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col justify-center align-top ml-32 mt-10 font-bold'>
          <h1>Child Profile</h1>
          {childInfo && (
            <>
              <div>
                {childInfo.map((child: any, index: number) => (
                  <div key={index}>
                    <img src={child.img} alt='Child' />
                    <p>Username: {child.username}</p>
                    <p>Role: {child.role}</p>
                    <p>Chores: {child.chores.join(', ')}</p>
                    <p>Wallet Amount: {child.wallet.amount}</p>
                    <p>Goals:</p>
                    <ul>
                      {child.goals.map((goal: any, goalIndex: number) => (
                        <li key={goalIndex}>
                          {goal.name}: {goal.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChildProfile;





