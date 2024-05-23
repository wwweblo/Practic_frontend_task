// ComparisonTable.tsx
import React, { useState } from 'react';
import Modal from './Modal'; // Импорт компонента модального окна
import phonesData, { Phone } from './PhonesData'; // Импорт данных о телефонах

function ComparisonTable() {
  // Состояния компонента: список телефонов, открыто ли модальное окно, индекс текущего столбца, состояние чекбокса, позиция модального окна
  const [phones, setPhones] = useState<Phone[]>(phonesData.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);
  const [showDifferences, setShowDifferences] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);

  // Функция для открытия модального окна и сохранения индекса текущего столбца
  const openModal = (index: number, event: React.MouseEvent): void => {
    setCurrentColumnIndex(index);
    setIsModalOpen(true);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
  };

  // Функция для выбора телефона в модальном окне и обновления списка телефонов
  const selectPhone = (phone: Phone): void => {
    if (currentColumnIndex !== null) {
      const updatedPhones = [...phones];
      updatedPhones[currentColumnIndex] = phone;
      setPhones(updatedPhones);
    }
    setIsModalOpen(false);
  };

  // Функция для изменения количества столбцов в таблице
  const changeColumns = (numColumns: number): void => {
    setPhones(phonesData.slice(0, numColumns));
  };

  // Функция для отображения иконок на основе булевых значений
  const renderBooleanIcon = (value: boolean): JSX.Element => {
    const iconSrc = value ? 'src/assets/ic_true.svg' : 'src/assets/ic_false.svg';
    return <img src={iconSrc} alt={value ? 'Да' : 'Нет'} style={{ height: '20px' }} />;
  };

  // Функция для проверки одинаковости значений
  const areValuesSame = (key: keyof Phone): boolean => {
    const firstValue = phones[0][key];
    return phones.every(phone => phone[key] === firstValue);
  };

  // Функция для отображения строки таблицы
  const renderRow = (label: string, key: keyof Phone, isBoolean?: boolean) => {
    if (showDifferences && areValuesSame(key)) return null;
    return (
      <tr>
        <td>{label}</td>
        {phones.map((phone, index) => (
          <td key={index}>
            {isBoolean ? renderBooleanIcon(phone[key] as boolean) : phone[key]}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div>
      {/* Группа кнопок для выбора количества столбцов в таблице */}
      <div className="button-group">
        {[2, 3, 4, 5, 6].map((num) => (
          <button key={num} onClick={() => changeColumns(num)}>
            {num}
          </button>
        ))}
      </div>
      {/* Таблица для сравнения характеристик телефонов */}
      <table>
        <thead>
          <tr>
            <th>
              {/* Чекбокс для отображения различий */}
              <input
                type="checkbox"
                name="display"
                checked={showDifferences}
                onChange={() => setShowDifferences(!showDifferences)}
              />
              <label>Показать различия</label>
            </th>
            {phones.map((phone, index) => (
              <th key={index}>
                {/* Кнопка для открытия модального окна с выбором телефона */}
                <button onClick={(event) => openModal(index, event)}>Изменить</button>
                {/* Изображение и название телефона */}
                <div>
                  <img src={phone.image} alt={phone.name} style={{ height: '120px' }} />
                </div>
                {phone.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Тело таблицы с характеристиками телефонов */}
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
      {/* Модальное окно для выбора телефона */}
      {isModalOpen && modalPosition && (
        <Modal
          phones={phonesData.filter(phone => !phones.includes(phone))}
          selectPhone={selectPhone}
          position={modalPosition}
        />
      )}
    </div>
  );
}

export default ComparisonTable;
