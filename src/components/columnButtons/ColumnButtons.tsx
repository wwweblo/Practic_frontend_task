import React from 'react';

interface ColumnButtonsProps {
    changeColumns: (numColumns: number) => void;
}

const ColumnButtons: React.FC<ColumnButtonsProps> = ({ changeColumns }) => (

    <div className="button-group">
        <span className="button-group-label">Отобразить товары:</span>
        {[2, 3, 4, 5, 6].map((num) => (
            <button key={num} onClick={() => changeColumns(num)}>{num}</button>
        ))}
    </div>
    
);

export default ColumnButtons;
