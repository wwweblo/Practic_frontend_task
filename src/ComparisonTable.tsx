// ComparisonTable.tsx
import React, { useState } from 'react';
import Modal from './Modal'; // Импорт компонента модального окна
import phonesData, { Phone } from './PhonesData'; // Импорт данных о телефонах

function ComparisonTable() {
  // Состояния компонента: список телефонов, открыто ли модальное окно, индекс текущего столбца, состояние чекбокса, позиция модального окна
  //В квадратных скобках 1 значение - переменная, 2 - функция для изменения переменной
  const [phones, setPhones] = useState<Phone[]>(phonesData.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);
  const [showDifferences, setShowDifferences] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);

// Функция для открытия модального окна выбора телефона.
// Устанавливает индекс текущего столбца, открывает модальное окно и устанавливает его позицию.
// Принимает индекс столбца и объект события React.MouseEvent.
// Не возвращает значения.
function openModal(index: number, event: React.MouseEvent): void {
  setCurrentColumnIndex(index);
  setIsModalOpen(true);
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
}

// Функция для выбора телефона в модальном окне и обновления списка телефонов.
// Если текущий столбец не равен null, обновляет выбранный телефон в списке телефонов.
// Закрывает модальное окно.
// Принимает объект телефона, который был выбран в модальном окне.
// Не возвращает значения.
function selectPhone(phone: Phone): void {
  if (currentColumnIndex !== null) {
    const updatedPhones = [...phones];
    updatedPhones[currentColumnIndex] = phone;
    setPhones(updatedPhones);
  }
  setIsModalOpen(false);
}

// Функция для изменения количества столбцов в таблице сравнения телефонов.
// Добавляет или удаляет столбцы, чтобы количество столбцов соответствовало указанному числу.
// Принимает новое количество столбцов.
// Не возвращает значения.
function changeColumns(numColumns: number): void {
  const currentPhones = [...phones];
  const newPhones = phonesData.filter(phone => !currentPhones.includes(phone)).slice(0, numColumns - currentPhones.length);
  setPhones([...currentPhones, ...newPhones].slice(0, numColumns));
}

// Функция для отображения иконок на основе булевых значений.
// Возвращает элемент JSX - изображение с иконкой "Да" или "Нет".
// Принимает булевое значение.
function renderBooleanIcon(value: boolean): JSX.Element {
  const iconSrc = value ? 'src/assets/ic_true.svg' : 'src/assets/ic_false.svg';
  return <img src={iconSrc} alt={value ? 'Да' : 'Нет'} style={{ height: '20px' }} />;
}

// Функция для проверки одинаковости значений характеристик у всех выбранных телефонов.
// Возвращает true, если все значения характеристики одинаковы у всех телефонов, иначе false.
// Принимает ключ характеристики.
function areValuesSame(key: keyof Phone): boolean {
  const firstValue = phones[0][key];
  return phones.every(phone => phone[key] === firstValue);
}

// Функция для отображения строки в таблице сравнения телефонов.
// Возвращает элемент JSX - строку таблицы с характеристиками телефонов.
// Принимает метку, ключ характеристики и флаг, указывающий, является ли характеристика булевой.
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginRight: '50px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#828286', marginLeft: '50px' }}>Смартфоны</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#0D5ADC', marginRight: '10px' }}>Отобразить товары:</span>
          <div className="button-group">
            {[2, 3, 4, 5, 6].map((num) => (
              <button key={num} onClick={() => changeColumns(num)} style={{ background: 'none', border: 'none', color: '#0D5ADC', cursor: 'pointer' }}>
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Таблица для сравнения характеристик телефонов */}
      <table>
        <thead>
          <tr>
            <th style={{ paddingRight: '50px' }}>
              {/* Чекбокс для отображения различий */}
              <input
                type="checkbox"
                name="display"
                checked={showDifferences}
                onChange={() => setShowDifferences(!showDifferences)}
              />
              <label style={{ color: '#0D5ADC' }}>Показать различия</label>
            </th>
            {phones.map((phone, index) => (
              <th key={index}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={phone.image} alt={phone.name} style={{ height: '120px' }} />
                    {/* Кнопка для открытия модального окна с выбором телефона */}
                    <button 
                      onClick={(event) => openModal(index, event)} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        position: 'absolute', 
                        top: '50%', 
                        right: '-20px', 
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <img src="src/assets/ic_menu.svg" alt="Изменить" style={{ height: '20px' }} />
                    </button>
                  </div>
                  {phone.name}
                </div>
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
