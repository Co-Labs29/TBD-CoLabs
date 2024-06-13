import { Chores as ChoresInterface } from "types/types";

interface ChoreItemProps {
  chore: ChoresInterface;
  updateChoreStatus: (choreId: number, status: string, childId: number) => void;
  handleUpdatingWalletOnApproval: (childId: number, choreId: number) => void;
}

const ChoreItem: React.FC<ChoreItemProps> = ({ chore, updateChoreStatus, handleUpdatingWalletOnApproval }) => {
  const isParent = sessionStorage.getItem("role") === "parent";
  const isChild = sessionStorage.getItem("role") === "child";

  const approveChore = () => {
    updateChoreStatus(chore.id, "completed", chore.child_id);
    handleUpdatingWalletOnApproval(chore.child_id, chore.id);
  };

  const toggleChoreStatus = () => {
    updateChoreStatus(chore.id, "pending", 0);
  };

  const renderActions = () => {
    if (isParent && chore.status === "pending") {
      return (
        <button
          onClick={approveChore}
          className="text-purple-800 border-2 border-purple-700 rounded-xl px-4 md:px-4 font-semibold py-2 mt-4 flex items-center justify-center"
        >
          Approve
        </button>
      );
    } else if (isChild && (chore.status === "not_completed" )) {
      return (
        <input
          type="checkbox"
          onChange={toggleChoreStatus}
          className="custom-checkbox"
        />
      );
    } else if (chore.status === "pending") {
      return <p>Pending...</p>;
    } else if (chore.status === "completed") {
      return <p>Completed</p>
    }
    return null;
  };

  return (
    <div
      key={chore.id}
      className="flex justify-between bg-lightish-purple md:w-[362px] px-10 py-4 rounded-[8px]"
    >
      <div className="flex flex-col gap-4 text-start">
        <p className="text-[18px]">{chore.name}</p>
        <p className="text-start text-[18px]">${chore.amount}</p>
      </div>
      <div className="flex items-center">{renderActions()}</div>
    </div>
  );
};

export default ChoreItem;
