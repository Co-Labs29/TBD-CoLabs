interface ProgressBarProps {
    progress: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 ">
        <div
          className="bg-progress-bar h-4 rounded-full flex items-center justify-center"
          style={{ width: `${Math.min(progress, 100)}%` }}

        >
          <span className="text-white text-center text-xs">{`${Math.min(progress, 100)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  