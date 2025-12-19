import React, { useState, useMemo } from 'react';
import { MOCK_TIME_SLOTS } from '../constants';
import { Calendar as CalendarIcon, Clock, Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateTimeSelectionProps {
  onConfirm: (date: Date, time: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMonth, setViewMonth] = useState(new Date());

  const quickDays = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  }), []);

  const calendarGrid = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [viewMonth]);

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + offset, 1);
    setViewMonth(newMonth);
  };

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();
  const isSelected = (date: Date) => date.toDateString() === selectedDate.toDateString();
  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4">
      <div className="p-4 bg-white flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Select Date & Time</h2>
          <p className="text-sm text-gray-500">Pick a slot that works best for you.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <CalendarIcon size={16} className="text-blue-500" />
              <span className="capitalize">
                {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              {isExpanded ? 'Show Quick' : 'View Month'}
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {!isExpanded ? (
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 animate-in fade-in duration-300">
              {quickDays.map((date, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(date);
                    setViewMonth(new Date(date.getFullYear(), date.getMonth(), 1));
                  }}
                  className={`flex flex-col items-center justify-center min-w-[64px] h-20 rounded-2xl border transition-all duration-200 ${
                    isSelected(date) 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-50' 
                      : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold tracking-tight mb-1 ${isSelected(date) ? 'opacity-90' : 'opacity-60'}`}>
                    {isToday(date) ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {date.getDate()}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50/50 rounded-3xl p-4 border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-4 px-2">
                <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-white rounded-full shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {viewMonth.toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-1 hover:bg-white rounded-full shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {weekDays.map(day => (
                  <span key={day} className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarGrid.map((date, i) => {
                  if (!date) return <div key={`empty-${i}`} className="h-10" />;
                  const disabled = isPast(date);
                  const selected = isSelected(date);
                  
                  return (
                    <button
                      key={i}
                      disabled={disabled}
                      onClick={() => setSelectedDate(date)}
                      className={`h-10 w-full rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                        selected 
                          ? 'bg-blue-600 text-white shadow-md scale-110 z-10' 
                          : disabled 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800">
            <Clock size={16} className="text-blue-500" />
            <span>Available Time Slots</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_TIME_SLOTS.map((time) => {
              const isTimeSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    isTimeSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                      : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 active:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 absolute bottom-0 left-0 right-0 z-10">
        <button
          disabled={!selectedTime}
          onClick={handleConfirm}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform flex items-center justify-center gap-2 ${
            selectedTime 
              ? 'bg-black active:scale-[0.97]' 
              : 'bg-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          Confirm Booking
          {selectedTime && <Check size={18} />}
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelection;