export interface Phone {
    id: number;
    name: string;
    image: string;
    manufacturer: string; // Производитель
    year_of_issue: string; // Год релиза
    screen_diagonal: string; // Диагональ экрана (дюйм)
    country_of_manufacture: string; // Страна-производитель
    memory_capacity: string; // Объем памяти
    screen_refresh_rate: string; // Частота обновления экрана
    NFC: boolean; // NFC
    ESIM: boolean; // Поддержка eSIM
    wireless_charging: boolean; // Поддержка беспроводной зарядки
    price: string; // Стоимость
}