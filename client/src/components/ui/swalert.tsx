import React from 'react';

type SwAlertProps = {
    message: string;
    type: 'success' | 'error';
    onClose?: () => void;
};

const colors = {
    success: {
        bg: '#d1fae5',
        border: '#10b981',
        text: '#065f46',
    },
    error: {
        bg: '#fee2e2',
        border: '#ef4444',
        text: '#991b1b',
    },
};

const SwAlert: React.FC<SwAlertProps> = ({ message, type, onClose }) => {
    React.useEffect(() => {
        if (onClose) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 24,
                left: 24,
                minWidth: 240,
                padding: '12px 20px',
                background: colors[type].bg,
                border: `1px solid ${colors[type].border}`,
                color: colors[type].text,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 16,
            }}
        >
            <span>
                {type === 'success' ? '✔️' : '❌'}
            </span>
            <span>{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        marginLeft: 'auto',
                        background: 'transparent',
                        border: 'none',
                        color: colors[type].text,
                        fontSize: 18,
                        cursor: 'pointer',
                    }}
                    aria-label="Close"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SwAlert;