import React from 'react'

export const Modal = ({ isOpen, onClose, content, position }) => {
   return (
      isOpen ? (<div className="fixed" style={{
         top: position.top,
         left: position.left,
         transform: 'translateY(-100%)', // Position above the cell
      }}>
         < div className="bg-white p-4 rounded shadow-lg" >
            <button onClick={onClose} className="float-right text-red-500">Close</button>
            <div>{content}</div>
         </div >
      </div >) : null
   );
}
