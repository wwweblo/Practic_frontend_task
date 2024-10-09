import React from 'react';
import { Phone } from '../model/phone';

interface PhoneColumnProps {

    phone: Phone;
    index: number;
    openModal: (index: number, event: React.MouseEvent) => void;
    showButton: boolean;
    
}

const PhoneColumn: React.FC<PhoneColumnProps> = ({ phone, index, openModal, showButton }) => (

    <div className="phone-column">
        <div className="phone-image-wrapper">
            <img src={phone.image} alt={phone.name} className="phone-image" />
            {showButton && (
                <button onClick={(event) => openModal(index, event)} className="change-button">
                    <img src="src/assets/ic_menu.svg" alt="Изменить" className="change-icon" />
                </button>
            )}
        </div>
        <div className="phone-name">{phone.name}</div>
    </div>

);

export default PhoneColumn;
