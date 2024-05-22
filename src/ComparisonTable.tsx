import React, { useState } from 'react';
import Modal from './Modal';
import phonesData, { Phone } from './PhonesData';

const ComparisonTable: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>(phonesData.slice(0, 2));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);

  const openModal = (index: number): void => {
    setCurrentColumnIndex(index);
    setIsModalOpen(true);
  };

  const selectPhone = (phone: Phone): void => {
    if (currentColumnIndex !== null) {
      const updatedPhones = [...phones];
      updatedPhones[currentColumnIndex] = phone;
      setPhones(updatedPhones);
    }
    setIsModalOpen(false);
  };

  const changeColumns = (numColumns: number): void => {
    setPhones(phonesData.slice(0, numColumns));
  };

  return (
    <div>
      <div className="button-group">
        {[2, 3, 4, 5, 6].map((num) => (
          <button key={num} onClick={() => changeColumns(num)}>
            {num} Columns
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {phones.map((phone, index) => (
              <th key={index}>
                <button onClick={() => openModal(index)}>Change</button>
                {phone.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature1}</td>
            ))}
          </tr>
          <tr>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature2}</td>
            ))}
          </tr>
          <tr>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature3}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {isModalOpen && <Modal phones={phonesData} selectPhone={selectPhone} />}
    </div>
  );
};

export default ComparisonTable;