import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import config from "../config/config"

interface Chores {
  amount: number,
  child_id: number,
  child_img: string,
  child_role: string,
  child_username: string,
  due_date: string,
  frequency: string,
  id: number,
  is_completed: boolean,
  name: string,
  parent_id: number
}

const ParentAllChores = () => {

  const [allChores, setAllChores] = useState<Chores[]>([])
  console.log('allChores :>> ', allChores);
  console.log('Array.isArray(allChores) :>> ', Array.isArray(allChores));

  const url = config.backendURL
  const fetchAllChores = async () => {
    try {
      const response = await fetch(`${url}/all_chores/${sessionStorage.getItem("parentID")}`)
      const data = await response.json()
      console.log('data :>> ', data);
      if (response.ok) {
        setAllChores(data.all_chores)
      }
    } catch (error) {
        console.error(error);
        
    }
  }

  useEffect(() =>{
    fetchAllChores()
  }, [])

  return (
    <div className="flex gap-[80px]">
      <Sidebar />
      <div className="mt-12">
        <div className="flex gap-[80px]">
          <button className="text-dark-purple">All Chores</button>
          <button className="text-dark-purple">Chores to be paid</button>
        </div>
        <div className="mt-[95px] flex flex-col gap-5">
          {allChores && Array.isArray(allChores) ? allChores.map((chore, i) => (
            <div key={i} className="flex gap-9">
              <div className="w-[180px] ml-10">
                <p>{chore.name}</p>
                <p>${chore.amount}</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={`/${chore.child_img}`} alt="profile pic" width={"35px"}/>
                <p className="text-sm">{chore.child_username}</p>
              </div>
            </div>
          )) : <p>No chores found</p>}
        </div>
      </div>
    </div>
  )
}
export default ParentAllChores