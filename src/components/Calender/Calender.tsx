import { useState } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const startOfCurrentWeek = startOfWeek(currentWeek);

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <button onClick={handlePrevWeek} className="mr-4 p-2 bg-gray-200 rounded">Previous</button>
        <button onClick={handleNextWeek} className="p-2 bg-gray-200 rounded">Next</button>
      </div>
      <div className="flex justify-between w-full">
        {daysOfWeek.map((day, index) => {
          const date = addDays(startOfCurrentWeek, index);
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xl font-bold">{day}</span>
              <span className="text-lg">{format(date, 'd')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;