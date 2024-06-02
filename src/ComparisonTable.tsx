import React, { useState } from 'react';
import Modal from './Modal'; // Импорт компонента модального окна
import phonesData, { Phone } from './PhonesData'; // Импорт данных о телефонах
import './Styles/ComparisonTable.css'; // Импорт CSS файла

function ComparisonTable() {
  const [phones, setPhones] = useState<Phone[]>(phonesData.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);
  const [showDifferences, setShowDifferences] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);

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
    const newPhones = phonesData.filter(phone => !currentPhones.includes(phone)).slice(0, numColumns - currentPhones.length);
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

  function renderRow(label: string, key: keyof Phone, isBoolean?: boolean): JSX.Element | null {
    if (showDifferences && areValuesSame(key)) return null;
    return (
      <tr key={label}>
        <td>{label}</td>
        {phones.map((phone, index) => (
          <td key={index}>
            {isBoolean ? renderBooleanIcon(phone[key] as boolean) : <b>{phone[key]}</b>}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="title">Смартфоны</div>
        <div className="button-group">
          <span className="button-group-label">Отобразить товары:</span>
          {[2, 3, 4, 5, 6].map((num) => (
            <button key={num} onClick={() => changeColumns(num)}>{num}</button>
          ))}
        </div>
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
                className='checkBox'
              />
              <label className='checkBoxLabel' htmlFor="displayDifferences">Показать различия</label>
            </th>
            {phones.map((phone, index) => (
              <th key={index}>
                <div className="phone-column">
                  <div className="phone-image-wrapper">
                    <img src={phone.image} alt={phone.name} className="phone-image" />
                    {phones.length < 6 && (
                      <button onClick={(event) => openModal(index, event)} className="change-button">
                        <img src="src/assets/ic_menu.svg" alt="Изменить" className="change-icon" />
                      </button>
                    )}
                  </div>
                  <div className="phone-name">{phone.name}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRow('ПРОИЗВОДИТЕЛЬ', 'feature1')}
          {renderRow('ГОД РЕЛИЗА', 'feature2')}
          {renderRow('ДИАГОНАЛЬ ЭКРАНА (ДЮЙМ)', 'feature3')}
          {renderRow('СТРАНА-ПРОИЗВОДИТЕЛЬ', 'feature4')}
          {renderRow('ОБЪЕМ ПАМЯТИ', 'feature5')}
          {renderRow('ЧАСТОТА ОБНОВЛЕНИЯ ЭКРАНА', 'feature6')}
          {renderRow('NFC', 'feature7', true)}
          {renderRow('ПОДДЕРЖКА ESIM', 'feature8', true)}
          {renderRow('ПОДДЕРЖКА БЕСПРОВОДНОЙ ЗАРЯДКИ', 'feature9', true)}
          {renderRow('СТОИМОСТЬ', 'feature10')}
        </tbody>
      </table>
      {isModalOpen && modalPosition && (
        <Modal
          phones={phonesData.filter(phone => !phones.includes(phone))}
          selectPhone={selectPhone}
          closeModal={() => setIsModalOpen(false)}
          position={modalPosition}
        />
      )}

      <footer></footer>
    </div>
  );
}

export default ComparisonTable;
