'use client';

import { useState } from 'react';
import { 
  FaCreditCard, 
  FaApple, 
  FaGoogle, 
  FaArrowLeft, 
  FaCheck,
  FaDumbbell 
} from 'react-icons/fa';

interface StepThreeProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepThree({ formData, setFormData, onNext, onBack }: StepThreeProps) {
  const [promoCode, setPromoCode] = useState('freemonth1');

  const basePrice = 5990.00;
  const discount = 599.00;
  const totalPrice = basePrice - discount;

  const handlePaymentSelect = (method: 'card' | 'apple' | 'google') => {
    setFormData({
      ...formData,
      payment: {
        method,
        promoCode,
        amount: totalPrice
      }
    });
    onNext();
  };

  return (
    <>
      <button 
        onClick={onBack}
        className="mb-8"
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <FaDumbbell className="w-8 h-8 text-[#00EDFF]" />
          <h1 className="text-3xl font-semibold">
            <span className="text-[#00EDFF]">OK</span>Coaching
          </h1>
        </div>
        <p className="text-[#BCBCBC]">
          Lets <span className="text-[#00EDFF]">grow</span> together.
        </p>
      </div>

      <div className="bg-[#222223] rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Advanced<span className="text-[#00EDFF]">/</span>Intermediate
        </h2>
        
        <p className="text-[#BCBCBC] text-center mb-8">
          Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit. 
          Etiam maurismetus Ut tempus purus at lorem. Etiam 
          egestas wisi erat. Pellentesque habitant morbitristique 
          senectus et netus et malesuada fames ac.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span>GROUP - 1 YEAR ENTRY</span>
            <span>{basePrice.toFixed(2)} CZK</span>
          </div>
          <div className="flex justify-between items-center text-[#00EDFF]">
            <span>1 MONTH FREE</span>
            <span>-{discount.toFixed(2)} CZK</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-[#333]">
            <span className="font-semibold">TOTAL COST</span>
            <span className="font-semibold">{totalPrice.toFixed(2)} CZK</span>
          </div>
        </div>

        <div className="space-y-2">
          <p>Do you have a promo code?</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-[#333] text-white"
              placeholder="Enter promo code"
            />
            <button className="text-[#00EDFF]">
              <FaCheck className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handlePaymentSelect('card')}
          className="bg-[#222223] text-white flex items-center justify-center p-4 rounded-xl transition-colors hover:bg-[#00EDFF] hover:text-black"
        >
          <FaCreditCard className="w-6 h-6" />
          <span className="ml-2">CARD</span>
        </button>

        <button
          onClick={() => handlePaymentSelect('apple')}
          className="bg-[#222223] text-white flex items-center justify-center p-4 rounded-xl transition-colors hover:bg-[#00EDFF] hover:text-black"
        >
          <FaApple className="w-6 h-6" />
          <span className="ml-2">APPLE PAY</span>
        </button>

        <button
          onClick={() => handlePaymentSelect('google')}
          className="bg-[#222223] text-white flex items-center justify-center p-4 rounded-xl transition-colors hover:bg-[#00EDFF] hover:text-black"
        >
          <FaGoogle className="w-6 h-6" />
          <span className="ml-2">GOOGLE PAY</span>
        </button>
      </div>
    </>
  );
}