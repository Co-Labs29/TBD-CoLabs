interface ProgressBarProps {
    progress: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-=[15px]  border border-black z-10">
        <div
          className="bg-progress-bar h-[15px] rounded-full flex items-center justify-center p-0.5 "
          style={!progress ? {width: 0} : { width: `${Math.min(progress, 100)}%`}}

        >
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  