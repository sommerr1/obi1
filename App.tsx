import React, { useState } from 'react';
import Layout from './components/Layout';
import ServiceSelection from './components/ServiceSelection';
import DateTimeSelection from './components/DateTimeSelection';
import BookingStatus from './components/BookingStatus';
import { BookingStep, BookingState, Service } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.SERVICE_SELECTION);
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    date: null,
    time: null
  });

  const handleServiceSelect = (service: Service) => {
    setBooking(prev => ({ ...prev, service }));
    setStep(BookingStep.DATE_TIME_SELECTION);
  };

  const handleDateTimeConfirm = (date: Date, time: string) => {
    setBooking(prev => ({ ...prev, date, time }));
    setStep(BookingStep.PROCESSING);
  };

  const handleBack = () => {
    if (step === BookingStep.DATE_TIME_SELECTION) {
      setStep(BookingStep.SERVICE_SELECTION);
    }
  };

  const handleFinish = () => {
    setStep(BookingStep.SERVICE_SELECTION);
    setBooking({ service: null, date: null, time: null });
  };

  const renderContent = () => {
    switch (step) {
      case BookingStep.SERVICE_SELECTION:
        return <ServiceSelection onSelect={handleServiceSelect} />;
      case BookingStep.DATE_TIME_SELECTION:
        return <DateTimeSelection onConfirm={handleDateTimeConfirm} />;
      case BookingStep.PROCESSING:
        return <BookingStatus booking={booking} onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (step) {
      case BookingStep.SERVICE_SELECTION:
        return "New Appointment";
      case BookingStep.DATE_TIME_SELECTION:
        return booking.service?.name || "Choose Time";
      case BookingStep.PROCESSING:
        return "Booking Status";
      default:
        return "Booking";
    }
  };

  return (
    <Layout 
      title={getTitle()} 
      onBack={handleBack} 
      showBack={step === BookingStep.DATE_TIME_SELECTION}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;