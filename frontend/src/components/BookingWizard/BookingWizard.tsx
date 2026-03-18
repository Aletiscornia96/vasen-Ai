'use client';

import { useState } from 'react';
import axios from 'axios';
import API_URL from '@/lib/api-url';
import './BookingWizard.css';

// Steps
import Step1Specialty from './Step1Specialty';
import Step2Doctor from './Step2Doctor';
import Step3DateTime from './Step3DateTime';
import Step4Patient from './Step4Patient';
import Step5Success from './Step5Success';

export type BookingData = {
  specialtyId: string | null;
  specialtyName: string | null;
  doctorId: string | null;
  doctorName: string | null;
  date: string | null;
  timeStart: string | null;
  timeEnd: string | null;
  patient: {
    fullName: string;
    email: string;
    phone: string;
  };
};

const initialData: BookingData = {
  specialtyId: null,
  specialtyName: null,
  doctorId: null,
  doctorName: null,
  date: null,
  timeStart: null,
  timeEnd: null,
  patient: {
    fullName: '',
    email: '',
    phone: '',
  },
};

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateData = (newData: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const resetFlow = () => {
    setStep(1);
    setData(initialData);
    setError(null);
    setBookingId(null);
  };

  const submitBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const appointmentData = {
        specialtyId: data.specialtyId,
        doctorId: data.doctorId,
        date: data.date,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        patient: data.patient,
      };
      const res = await axios.post(`${API_URL}/appointments`, appointmentData);
      setBookingId(res.data._id);
      nextStep(); // Go to success step
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Ocurrió un error al procesar tu reserva. Intentá nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Specialty data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <Step2Doctor data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Step3DateTime data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <Step4Patient data={data} updateData={updateData} onSubmit={submitBooking} onBack={prevStep} loading={loading} />;
      case 5:
        return <Step5Success onReset={resetFlow} />;
      default:
        return null;
    }
  };

  return (
    <div className="bw-wizardWrapper">
      <div className="bw-container">
        {/* Header / Stepper Progress */}
        {step < 5 && (
          <div className="bw-header">
            <div className="bw-progressText">
              Paso {step} de 4
            </div>
            <div className="bw-progressBar">
              <div 
                className="bw-progressFill" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error message generic */}
        {error && (
          <div className="bw-errorAlert">
            {error}
          </div>
        )}

        {/* Dynamic Content */}
        <div className="bw-stepContent">
          {step === 1 && (
            <Step1Specialty 
              data={data} 
              updateData={updateData} 
              onNext={nextStep} 
            />
          )}
          {step === 2 && (
            <Step2Doctor 
              data={data} 
              updateData={updateData} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 3 && (
            <Step3DateTime 
              data={data} 
              updateData={updateData} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 4 && (
            <Step4Patient 
              data={data} 
              updateData={updateData} 
              onSubmit={submitBooking} 
              onBack={prevStep}
              loading={loading}
            />
          )}
          {step === 5 && (
            <Step5Success onReset={resetFlow} />
          )}
        </div>
      </div>
    </div>
  )