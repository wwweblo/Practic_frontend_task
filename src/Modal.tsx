// Modal.tsx
import React, { useState } from 'react';
import { Phone } from './PhonesData';

interface ModalProps {
  phones: Phone[];
  selectPhone: (phone: Phone) => void;
  position: { top: number; left: number };
}

function Modal({ phones, selectPhone, position }: ModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal" style={{ top: position.top, left: position.left }}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {filteredPhones.map((phone, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <button onClick={() => selectPhone(phone)} style={{ marginRight: '10px' }}>Выбрать</button>
            <img src={phone.image} alt={phone.name} style={{ height: '50px', marginRight: '10px' }} />
            <div>{phone.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;