import { Link } from "react-router-dom";
import ProgressBar from "../pages/progressBar";
import { Goal } from "types/types";
import { ChildInfo, ChoresArray } from "types/types";

interface SingleChildDashboardProps {
  child: ChildInfo;
}

const SingleChildDashboard: React.FC<SingleChildDashboardProps> = ({
  child,
}) => {

  const choresFinished = (chores:ChoresArray): number => {
      let sum:number = 0;
      for (const chore of chores) {
        if (chore.status === "completed") {
            sum ++
        }
      }
      return sum
  }
  

  const sumGoalTotalAmount = (goals: Goal[]) => {
    let sum = 0;
    for (const goal of goals) {
      sum += goal.amount;
    }
    return sum;
  };

  const sumGoalTotalPaid = (goals: Goal[]) => {
    let sum = 0;
    for (const goal of goals) {
      sum += goal.paid;
    }
    return sum;
  };

  const calculatePercentDone = (amount: number, target: number) => {
    if (amount === 0) return 0;

    return Math.floor((target / amount) * 100);
  };
  return (
    <div
      key={child.child_id}
      className="flex flex-col xl:items-start gap-4 mt-6 border border-border-gray px-8 py-6 rounded-2xl"
    >
      <div className="flex items-center w-full xl:w-auto gap-2">
        <img src={`/${child.img}`} alt="avatar" className="w-10 h-10" />
        <p className="text-lg xl:ml-2">{child.username}</p>
        <Link to="/childProfile" className="ml-4 underline">
          View Profile
        </Link>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-start gap-4 xl:pl-8">
        <div className="xl:w-60 mt-4 xl:mt-0 flex flex-col items-start bg-lightest-green pb-[70px] pt-8 px-8">
          <div className="flex gap-2">
            <img src="/Wallet.svg" alt="Wallet" />
            <p className="font-bold text-lg">Wallet</p>
          </div>
          <p className="text-neutral-black-ish font-bold text-4xl pt-3">
            ${child.wallet.amount}
          </p>
        </div>

        <div className=" xl:w-60 md:mt-0 flex flex-col items-start bg-lightest-green pb-[29px] pt-8 px-8">
          <div>
            <div className="flex items-center gap-2">
              <img src="/Piggy.svg" alt="Piggy Bank" />
              <p className="font-bold text-lg">Goals</p>
            </div>
            <p className="text-neutral-black-ish font-bold text-4xl pt-3">
              ${sumGoalTotalAmount(child.goals)}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-black-ish">
              {child.goals.length} goals
            </p>
          </div>
          <div className="mt-2 w-full">
            <ProgressBar
              progress={calculatePercentDone(
                sumGoalTotalAmount(child.goals),
                child.wallet.amount + sumGoalTotalPaid(child.goals)
              )}
            />
          </div>
        </div>

        <div className="xl:w-60 mt-4 xl:mt-0 flex flex-col items-start bg-lightest-green pb-[29px] pt-8 px-8">
          <div className="flex items-center gap-2">
            <img src="/CircleCheck.svg" alt="Chores" />
            <p className="font-bold text-lg">Chores</p>
          </div>
          <p className="text-neutral-black-ish font-bold text-4xl pt-3">{choresFinished(child.chores)}/{child.chores.length}</p>
          <div className="mt-7 w-full">
            <ProgressBar progress={(choresFinished(child.chores) / child.chores.length) * 100} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleChildDashboard;
