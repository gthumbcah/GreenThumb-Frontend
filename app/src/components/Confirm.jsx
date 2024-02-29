import React, { useState } from 'react';

const Confirm = ({ onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Do you want to commit these changes?</p>
        <div>
          <button 
            className={`button is-success ${loading ? 'is-loading' : ''}`} 
            onClick={handleConfirm} 
            disabled={loading}
          >
            Yes
          </button>
          <button className="button" onClick={onCancel} disabled={loading}>No</button>
        </div>
      </div>
    </div> 
  );
};

export default Confirm;