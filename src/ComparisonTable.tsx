import React, { useState } from 'react';
import Modal from './Modal'; // Импорт компонента модального окна
import phonesData, { Phone } from './PhonesData'; // Импорт данных о телефонах

const ComparisonTable: React.FC = () => {
  // Состояния компонента: список телефонов, открыто ли модальное окно, индекс текущего столбца
  const [phones, setPhones] = useState<Phone[]>(phonesData.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number | null>(null);

  // Функция для открытия модального окна и сохранения индекса текущего столбца
  const openModal = (index: number): void => {
    setCurrentColumnIndex(index);
    setIsModalOpen(true);
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
              <input type="checkbox" name="display"/>
              <label>Показать различия</label>
            </th>
            {phones.map((phone, index) => (
              <th key={index}>
                {/* Кнопка для открытия модального окна с выбором телефона */}
                <button onClick={() => openModal(index)}>Изменить</button>
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
          <tr>
            <td>ПРОИЗВОДИТЕЛЬ</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature1}</td>
            ))}
          </tr>
          <tr>
            <td>ГОД РЕЛИЗА</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature2}</td>
            ))}
          </tr>
          <tr>
            <td>ДИАГОНАЛЬ ЭКРАНА (ДЮЙМ)</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature3}</td>
            ))}
          </tr>
          <tr>
            <td>СТРАНА-ПРОИЗВОДИТЕЛЬ</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature4}</td>
            ))}
          </tr>
          <tr>
            <td>ОБЪЕМ ПАМЯТИ</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature5}</td>
            ))}
          </tr>
          <tr>
            <td>ЧАСТОТА ОБНОВЛЕНИЯ ЭКРАНА</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature6}</td>
            ))}
          </tr>
          <tr>
            <td>NFC</td>
            {phones.map((phone, index) => (
              <td key={index}>{renderBooleanIcon(phone.feature7)}</td>
            ))}
          </tr>
          <tr>
            <td>ПОДДЕРЖКА ESIM</td>
            {phones.map((phone, index) => (
              <td key={index}>{renderBooleanIcon(phone.feature8)}</td>
            ))}
          </tr>
          <tr>
            <td>ПОДДЕРЖКА БЕСПРОВОДНОЙ ЗАРЯДКИ</td>
            {phones.map((phone, index) => (
              <td key={index}>{renderBooleanIcon(phone.feature9)}</td>
            ))}
          </tr>
          <tr>
            <td>СТОИМОСТЬ</td>
            {phones.map((phone, index) => (
              <td key={index}>{phone.feature10}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* Модальное окно для выбора телефона */}
      {isModalOpen && <Modal phones={phonesData} selectPhone={selectPhone} />}
    </div>
  );
};

export default ComparisonTable;
