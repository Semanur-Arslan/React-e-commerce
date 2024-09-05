import React, { useEffect, useState } from "react";

function Toast({ type, message, duration = 3000, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!visible || !message) return null;

    const toastStyles = {
        base: 'toast toast-top top-2 toast-center z-10 absolute p-4 rounded-lg shadow-lg text-white',
        error: 'bg-error',
        success: 'bg-success',
    };

    return (
        <div className={`${toastStyles.base} ${toastStyles[type]}`}>
            <div className="flex ">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    {type === 'error' ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    )}
                </svg>
                <span className="ms-2">{message}</span>
            </div>
        </div>
    );
}

export default Toast;
