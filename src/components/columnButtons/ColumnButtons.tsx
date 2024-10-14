import React, { useState } from 'react';

interface ColumnButtonsProps {
    changeColumns: (numColumns: number) => void;
}

const ColumnButtons: React.FC<ColumnButtonsProps> = ({ changeColumns }) => {
    const [lastClicked, setLastClicked] = useState<number | null>(null);

    function handleButtonClick(num: number): void {
        setLastClicked(num);
        changeColumns(num);
    }

    return (
        <div className="button-group">
            <span className="button-group-label">Отобразить товары:</span>
            {[2, 3, 4, 5, 6].map((num) => (
                <button
                    key={num}
                    onClick={() => handleButtonClick(num)}
                    className={lastClicked === num ? 'last-clicked' : ''}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};

export default ColumnButtons;
