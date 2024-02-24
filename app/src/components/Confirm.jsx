import React from 'react'

const confirm = ({ onConfirm, onCancel }) => {


  return (
    <>
        <div className="modal-overlay">
            <div className="modal">
                <p>Do you want to commit these changes?</p>
                <div>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div> 
    </>
  )
}

export default confirm