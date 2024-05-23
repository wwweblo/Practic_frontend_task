export interface Phone {
  name: string;
  image: string;
  feature1: string; // Производитель
  feature2: string; // Год релиза
  feature3: string; // Диагональ экрана (дюйм)
  feature4: string; // Страна-производитель
  feature5: string; // Объем памяти
  feature6: string; // Частота обновления экрана
  feature7: boolean; // NFC
  feature8: boolean; // Поддержка eSIM
  feature9: boolean; // Поддержка беспроводной зарядки
  feature10: string; // Стоимость
}

// Обновленные данные телефонов
const PhonesData: Phone[] = [
  {
    name: 'Apple Iphone 12',
    image: 'src/assets/Apple_iphone_12.png',
    feature1: 'Apple', 
    feature2: '2020', 
    feature3: '6.1', 
    feature4: 'Китай', 
    feature5: '64 ГБ / 128 ГБ / 256 ГБ', 
    feature6: '60 Гц', 
    feature7: true,
    feature8: false,
    feature9: false,
    feature10: '$799' 
  },
  {
    name: 'Xiaomi Mi 11 Lite',
    image: 'src/assets/Xiaomi_Mi_11_Lite.png',
    feature1: 'Xiaomi',
    feature2: '2021',
    feature3: '6.55',
    feature4: 'Китай',
    feature5: '64 ГБ / 128 ГБ',
    feature6: '90 Гц',
    feature7: true,
    feature8: false,
    feature9: false,
    feature10: '$299'
  },
  {
    name: 'Samsung Galaxy A72',
    image: 'src/assets/samsing_a72.png',
    feature1: 'Samsung',
    feature2: '2021',
    feature3: '6.7',
    feature4: 'Вьетнам',
    feature5: '128 ГБ / 256 ГБ',
    feature6: '90 Гц',
    feature7: true,
    feature8: false,
    feature9: false,
    feature10: '$449'
  },
  {
    name: 'Samsung Galaxy S21',
    image: 'src/assets/samsung_gelaxy_s_21.png',
    feature1: 'Samsung', 
    feature2: '2021', 
    feature3: '6.2',
    feature4: 'Южная Корея',
    feature5: '128 ГБ / 256 ГБ',
    feature6: '120 Гц',
    feature7: true,
    feature8: true,
    feature9: true,
    feature10: '$799'
  },
  {
    name: 'Apple iPhone Xr',
    image: 'src/assets/apple_iphone_xr.png',
    feature1: 'Apple',
    feature2: '2018',
    feature3: '6.1',
    feature4: 'Китай',
    feature5: '64 ГБ / 128 ГБ / 256 ГБ',
    feature6: '60 Гц',
    feature7: true,
    feature8: false,
    feature9: false,
    feature10: '$499'
  },
  {
    name: 'Realme 8 Pro',
    image: 'src/assets/realme_8_pro.png',
    feature1: 'Realme',
    feature2: '2024',
    feature3: '6.4',
    feature4: 'Китай',
    feature5: '128 ГБ',
    feature6: '60 Гц', 
    feature7: true,
    feature8: false,
    feature9: true,
    feature10: '$329'
  }
];

export default PhonesData;