import { useState } from 'react';

interface WeeklyCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const [startOfWeek, setStartOfWeek] = useState(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const generateCurrentWeek = (start:Date) => {
    const currentWeek = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() - start.getDay() + i);
      currentWeek.push(date);
    }
    return currentWeek;
  };

  const goToPreviousWeek = () => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(newStartOfWeek);
  };

  const goToNextWeek = () => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(newStartOfWeek);
  };

  const currentWeek = generateCurrentWeek(startOfWeek);

  const formatSelectedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const currentDate = new Date();
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return `Today, ${date.toLocaleDateString('en-US', options)}`;
    } else {
      return date ? date.toLocaleDateString('en-US', options) : '';
    }
  };

  return (
    <div className="w-full md:ml-0">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousWeek} className="text-lg font-bold">
          &lt;
        </button>
        <div className="text-center">
          <p className="text-xl font-bold">{formatSelectedDate(selectedDate)}</p>
        </div>
        <button onClick={goToNextWeek} className="text-lg font-bold">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['M', 'T', 'W', 'TH', 'F', 'SA', 'SU'].map((day, index) => (
          <div
            key={index}
            className={`text-center font-bold ${
              selectedDate?.toDateString() === currentWeek[index]?.toDateString()
                ? 'text-dark-purple'
                : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {currentWeek.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`p-2 rounded-lg ${
              selectedDate?.toDateString() === date.toDateString()
                ? 'text-dark-purple font-bold'
                : 'text-gray-700'
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
