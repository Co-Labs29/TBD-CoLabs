import { useState } from 'react';
import { format, startOfWeek, addDays, isToday } from 'date-fns';

const Calendar_ChildProfile = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  console.log(setCurrentWeek)

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const startOfCurrentWeek = startOfWeek(currentWeek);


  const currentDate = new Date();

  return (
    <div className="flex flex-col items-center">
     
      <div className="text-xl font-bold mb-5">
        Today {format(currentDate, 'MMMM')} {format(currentDate, 'd')}
      </div>

    
      <div className="flex justify-between w-[80%]">
        {daysOfWeek.map((day, index) => {
          const date = addDays(startOfCurrentWeek, index);
          const formattedDate = format(date, 'd');
          const isTodayDate = isToday(date);
          return (
            <div key={index} className="flex flex-col items-center">
              
              <span className="text-xl font-bold">{day}</span>

             
              {isTodayDate ? (
                <span className="text-xl font-bold">
                  {formattedDate}
                </span>
              ) : (
                <span className="text-lg">{formattedDate}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar_ChildProfile;

