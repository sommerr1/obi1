
import React, { useState } from 'react';
import { MOCK_TIME_SLOTS } from '../constants';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

interface DateTimeSelectionProps {
  onConfirm: (date: Date, time: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days for the date picker
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="p-4 bg-white flex-1">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Select Date & Time</h2>
          <p className="text-sm text-gray-500">Pick a slot that works best for you.</p>
        </div>

        {/* Horizontal Calendar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
            <CalendarIcon size={16} className="text-blue-500" />
            <span>October 2023</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {days.map((date, i) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center min-w-[60px] h-20 rounded-2xl border transition-all ${
                    isSelected 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white border-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-70">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold">
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
            <Clock size={16} className="text-blue-500" />
            <span>Available Time Slots</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
        <button
          disabled={!selectedTime}
          onClick={handleConfirm}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            selectedTime 
              ? 'bg-black active:scale-[0.98]' 
              : 'bg-gray-200 cursor-not-allowed'
          }`}
        >
          Confirm Booking
          {selectedTime && <Check size={20} />}
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelection;
