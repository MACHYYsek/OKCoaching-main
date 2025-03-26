import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface IncompleteSeriesModalProps {
  seriesNumber: number;
  onClose: () => void;
  onContinue: () => void;
  reason: string;
  setReason: (reason: string) => void;
}

export default function IncompleteSeriesModal({
  seriesNumber,
  onClose,
  onContinue,
  reason,
  setReason
}: IncompleteSeriesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#222223] rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Série <span className="text-[#00EDFF]">nebyla</span>
            </h2>
            <h2 className="text-2xl font-semibold">kompletně vyplněna.</h2>
          </div>
          <button onClick={onClose} className="p-2">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#BCBCBC] mb-6">
          Stále můžeš pokračovat, ale nebudeme 100% schopni sledovat tvůj progres.
        </p>

        <div className="mb-6">
          <label className="text-[#BCBCBC] text-sm mb-2 block">
            Proč si sérii nevyplnil?
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Bolelo mě rameno"
            className="w-full bg-[#191919] rounded-xl p-4"
          />
        </div>

        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-semibold bg-[#00EDFF] text-black"
        >
          Pokračovat
        </button>
      </div>
    </div>
  );
}