interface ProgressBarProps {
    progress: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-=[15px]  border border-black z-10">
        <div
          className="bg-progress-bar h-[15px] rounded-full flex items-center justify-center p-0.5 "
          style={{ width: `${Math.min(progress, 100)}%`}}

        >
          {/* <span className="text-white text-center text-xs">{`${Math.min(progress, 100)}%`}</span> */}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  