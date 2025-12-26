import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { BookingState } from '../types';

interface BookingStatusProps {
  booking: BookingState;
  onFinish: () => void;
}

const BookingStatus: React.FC<BookingStatusProps> = ({ booking, onFinish }) => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500">
      {isProcessing ? (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-gray-50 flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-blue-600 animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking in progress...</h2>
            <p className="text-gray-500">We're securing your appointment with our best professional.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle2 size={64} />
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-gray-900">It's Official!</h2>
            <p className="text-gray-500 px-4">Your appointment has been confirmed. You will receive a confirmation DM shortly.</p>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm w-full max-w-[300px] text-left">
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Service</span>
              <p className="font-semibold text-gray-900">{booking.service?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</span>
                <p className="font-semibold text-gray-900">{booking.date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Time</span>
                <p className="font-semibold text-gray-900">{booking.time}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onFinish}
            className="w-full max-w-[200px] py-4 rounded-2xl bg-black text-white font-bold active:scale-[0.98] transition-all"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingStatus;