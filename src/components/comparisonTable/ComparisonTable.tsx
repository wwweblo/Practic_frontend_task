import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import PhoneColumn from '../phoneColumn/PhoneColumn';
import ComparisonRow from '../comparisonRow/ComparisonRow';
import ColumnButtons from '../columnButtons/ColumnButtons';
import './ComparisonTable.css';
import { Phone } from '../model/phone';
import phonesData from '../../assets/phones.json';

function ComparisonTable() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);
  const [showDifferences, setShowDifferences] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);

  useEffect(() => {
    setPhones(phonesData.slice(0, 3));
  }, []);

  function openModal(index: number, event: React.MouseEvent): void {
    setCurrentColumnIndex(index);
    setIsModalOpen(true);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY;
    let left = rect.left + window.scrollX;

    const modalWidth = 300;
    if (left + modalWidth > window.innerWidth) {
      left = window.innerWidth - modalWidth - 10;
    }

    setModalPosition({ top, left });
  }

  function selectPhone(phone: Phone): void {
    if (currentColumnIndex !== null) {
      const updatedPhones = [...phones];
      updatedPhones[currentColumnIndex] = phone;
      setPhones(updatedPhones);
    }
    setIsModalOpen(false);
  }

  function changeColumns(numColumns: number): void {
    const currentPhones = [...phones];
    const newPhones = phonesData.filter((phone: Phone) => !currentPhones.some((p: Phone) => p.id === phone.id)).slice(0, numColumns - currentPhones.length);
    setPhones([...currentPhones, ...newPhones].slice(0, numColumns));
  }

  function renderBooleanIcon(value: boolean): JSX.Element {
    const iconSrc = value ? 'src/assets/ic_true.svg' : 'src/assets/ic_false.svg';
    return <img src={iconSrc} alt={value ? 'Да' : 'Нет'} className="boolean-icon" />;
  }

  function areValuesSame(key: keyof Phone): boolean {
    const firstValue = phones[0][key];
    return phones.every(phone => phone[key] === firstValue);
  }

  return (
    <div>
      <div className="header">
        <div className="title">Смартфоны</div>
        <ColumnButtons changeColumns={changeColumns} />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="displayDifferences"
                name="display"
                checked={showDifferences}
                onChange={() => setShowDifferences(!showDifferences)}
                className="checkBox"
              />
              <label className='checkBoxLabel' htmlFor="displayDifferences">Показать различия</label>
            </th>
            {phones.map((phone, index) => (
              <th key={index}>
                <PhoneColumn
                  phone={phone}
                  index={index}
                  openModal={openModal}
                  showButton={phones.length < 6}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'ПРОИЗВОДИТЕЛЬ', key: 'manufacturer' },
            { label: 'ГОД РЕЛИЗА', key: 'year_of_issue' },
            { label: 'ДИАГОНАЛЬ ЭКРАНА (ДЮЙМ)', key: 'screen_diagonal' },
            { label: 'СТРАНА-ПРОИЗВОДИТЕЛЬ', key: 'country_of_manufacture' },
            { label: 'ОБЪЕМ ПАМЯТИ', key: 'memory_capacity' },
            { label: 'ЧАСТОТА ОБНОВЛЕНИЯ ЭКРАНА', key: 'screen_refresh_rate' },
            { label: 'NFC', key: 'NFC' },
            { label: 'ПОДДЕРЖКА ESIM', key: 'ESIM' },
            { label: 'ПОДДЕРЖКА БЕСПРОВОДНОЙ ЗАРЯДКИ', key: 'wireless_charging' },
            { label: 'СТОИМОСТЬ', key: 'price' }
          ].map(({ label, key }, index) => (
            <ComparisonRow
              key={index}
              label={label}
              phones={phones}
              keyName={key as keyof Phone}
              isBoolean={index >= 6}  // С 6-го индекса начинается булевы значения
              showDifferences={showDifferences}
              renderBooleanIcon={renderBooleanIcon}
              areValuesSame={areValuesSame}
            />
          ))}
        </tbody>
      </table>
      {isModalOpen && modalPosition && (
        <Modal
          selectPhone={selectPhone}
          closeModal={() => setIsModalOpen(false)}
          position={modalPosition}
        />
      )}
    </div>
  );
}

export default ComparisonTable;