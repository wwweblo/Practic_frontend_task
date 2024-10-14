import React, { useState, useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { Phone } from '../model/phone';
import phonesData from '../../assets/phones.json';

interface ModalProps {
  selectPhone: (phone: Phone) => void;
  closeModal: () => void;
  position: { top: number; left: number };
}

const Modal: React.FC<ModalProps> = ({ selectPhone, closeModal, position }) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhones(phonesData);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.modal} style={{ top: position.top, left: position.left }} ref={modalRef}>
      <div className={styles.modalHeader}>
        {/*<button onClick={closeModal} className={styles.closeButton}>×</button>*/}
      </div>
      <div className={styles.modalContent}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className={styles.phoneList}>
          {filteredPhones.map((phone, index) => (
            <div key={index} className={styles.phoneItem}>
              <button className={styles.selectButton} onClick={() => selectPhone(phone)}>
                <img src="src/assets/ic_change.svg" alt="Выбрать" />
              </button>
              <img src={phone.image} alt={phone.name} className={styles.phoneImage} />
              <div className={styles.phoneName}>{phone.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;