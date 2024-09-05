import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ type: '', message: '' });

    const showToast = useCallback((type, message) => {
        setToast({ type, message });
    }, []);

    const hideToast = useCallback(() => {
        setToast({ type: '', message: '' });
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                type={toast.type}
                message={toast.message}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
