import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
    type?: 'one' | 'second' | 'thir';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type, className }) => {
    return (
        <button
            type="button"
            className={`btn mx-1 btn-${type || 'one'} ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
export default Button;
