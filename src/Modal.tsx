import React, { useState } from 'react';
import { Phone } from './PhonesData';
import styles from './Styles/Modal.module.css';
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
    <div className={styles.modal} style={{ top: position.top, left: position.left }}>
      <div className={styles.modalContent}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {filteredPhones.map((phone, index) => (
          <div key={index} className={styles.phoneItem}>
            <button className={styles.selectButton} onClick={() => selectPhone(phone)}>
              <img src="src/assets/ic_change.svg" alt="Выбрать" />
            </button>
            <img src={phone.image} alt={phone.name} className={styles.phoneImage} />
            <div>{phone.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;
