import React from 'react';
import { MOCK_SERVICES } from '../constants';
import { Service } from '../types';
import { ChevronRight, Clock } from 'lucide-react';

interface ServiceSelectionProps {
  onSelect: (service: Service) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  return (
    <div className="p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-900">Choose a Service</h2>
        <p className="text-sm text-gray-500">Select the treatment you'd like to book today.</p>
      </div>

      {MOCK_SERVICES.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-400 active:scale-[0.98] transition-all text-left group"
        >
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-0.5">{service.name}</h3>
            <p className="text-xs text-gray-400 line-clamp-1 mb-2">{service.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-900">${service.price}</span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                <Clock size={10} />
                {service.duration}
              </div>
            </div>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={20} />
        </button>
      ))}

      <div className="mt-8 text-center px-4">
        <p className="text-xs text-gray-400">All services include a complimentary consultation and premium products.</p>
      </div>
    </div>
  );
};

export default ServiceSelection;