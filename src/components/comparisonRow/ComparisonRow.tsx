import React from 'react';
import { Phone } from '../model/phone';

interface ComparisonRowProps {

    label: string;
    phones: Phone[];
    keyName: keyof Phone;
    isBoolean?: boolean;
    showDifferences: boolean;
    renderBooleanIcon: (value: boolean) => JSX.Element;
    areValuesSame: (key: keyof Phone) => boolean;
    
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ label, phones, keyName, isBoolean, showDifferences, renderBooleanIcon, areValuesSame }) => {

    if (showDifferences && areValuesSame(keyName)) return null;

    return (
        <tr key={label}>
            <td>{label}</td>
            {phones.map((phone, index) => (
            <td key={index}>
                {isBoolean ? renderBooleanIcon(phone[keyName] as boolean) : <b>{phone[keyName]}</b>}
            </td>
            ))}
        </tr>
    );
};

export default ComparisonRow;
