import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import config from "../config/config";

interface Notification {
  child_name: string;
  type: string;
  name: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const parentId = sessionStorage.getItem("parentID");
        if (!token || !parentId) {
          throw new Error("You must be logged in and have a parent ID to view notifications");
        }
        const response = await fetch(`${config.backendURL}/notifications/${parentId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex flex-col mx-auto">
        <h1 className="mt-10 font-bold text-2xl">Notifications</h1>
        <div className="flex flex-col mt-4">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              <p>{notification.child_name} completed {notification.type} {notification.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
