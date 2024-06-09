import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import config from "../config/config";
import { formatDate } from "../helpers/helpers";

interface Chores {
  amount: number;
  child_id: number;
  child_img: string;
  child_role: string;
  child_username: string;
  due_date: string;
  frequency: string;
  id: number;
  is_completed: boolean;
  name: string;
  parent_id: number;
}

const ParentAllChores = () => {
  const [allChores, setAllChores] = useState<Chores[]>([]);
  console.log("allChores :>> ", allChores);
  console.log("Array.isArray(allChores) :>> ", Array.isArray(allChores));

  const url = config.backendURL;
  const fetchAllChores = async () => {
    try {
      const response = await fetch(
        `${url}/all_chores/${sessionStorage.getItem("parentID")}`
      );
      const data = await response.json();
      console.log("data :>> ", data);
      if (response.ok) {
        setAllChores(data.all_chores);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllChores();
  }, []);

  return (
    <div className="h-screen flex md:flex-row">
  <Sidebar />
  <div className="flex flex-col flex-grow relative mt-[90px] md:mt-[48px] items-center">
    <div className="w-full flex justify-center md:justify-start mx-4">
      <div className="flex flex-col items-center w-full md:w-auto">
        <div className="flex gap-[80px] justify-center md:justify-start">
          <button className="text-dark-purple">All Chores</button>
          <button className="text-dark-purple">Chores to be paid</button>
        </div>
        <div className="md:w-[362px] w-full flex flex-col gap-5 py-4 mt-6 ">
          {allChores && Array.isArray(allChores) ? (
            allChores.map((chore, i) => (
              <div key={i} className="flex gap-9 justify-center bg-lightish-purple mx-4 py-4 rounded-lg">
                <div className="w-[180px]">
                  <p className="mb-4">{chore.name}</p>
                  <div className="flex gap-4">
                    <p>${chore.amount}</p>
                    <p>{formatDate(chore.due_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-col">
                  <img
                    src={`/${chore.child_img}`}
                    alt="profile pic"
                    width={"30px"}
                  />
                  <p className="text-sm">{chore.child_username}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No chores found</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default ParentAllChores;
