import React from 'react';
import { Phone } from './PhonesData';

interface ModalProps {
  phones: Phone[];
  selectPhone: (phone: Phone) => void;
}

const Modal: React.FC<ModalProps> = ({ phones, selectPhone }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {phones.map((phone, index) => (
          <div key={index} onClick={() => selectPhone(phone)} style={{ color: 'black' }}>
            {phone.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
