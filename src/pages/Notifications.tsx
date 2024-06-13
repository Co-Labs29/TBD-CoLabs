import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import config from "../config/config";

interface Notification {
  child_name: string;
  type: string;
  name: string;
  child_img: string;
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
          throw new Error(
            "You must be logged in and have a parent ID to view notifications"
          );
        }
        const response = await fetch(
          `${config.backendURL}/notifications/${parentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    <div className="flex h-screen">
      <Sidebar />
      <div className=" h-[500px] rounded-[8px] border border-lightgrey overflow-y-auto scrollbar-thin mx-auto my-auto ">
        <h3 className="flex items-center justify-center">
          <span className="font-bold text-lg">Notifications</span>
        </h3>

        <div className="mt-4" style={{ maxHeight: "300px" }}>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex justify-center text-center"
              style={{
                backgroundColor: "#ECFAEB",
                padding: "10px",
                borderRadius: "8px",
                height: "100px",
                marginBottom: "20px",
              }}
            >
                <div className="flex">
                    <img
                     src={notification.child_img}
                     alt="avatar" 
                     className="w-10 h-20"
                     />
                    
              <p className="text-lg font-semibold mt-5">
                {notification.child_name} completed {notification.type}{" "}
                {notification.name}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
