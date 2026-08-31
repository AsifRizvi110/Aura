import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration?: number;
  meta?: {
    product?: string;
    quantity?: string;
    email?: string;
    timestamp?: string;
  };
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  showQuoteSuccessToast: (details?: { name?: string; product?: string; quantity?: string; email?: string }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const showQuoteSuccessToast = useCallback((details?: { name?: string; product?: string; quantity?: string; email?: string }) => {
    const title = details?.product 
      ? `Quote Submitted: ${details.product}`
      : 'Quote Request Successfully Dispatched';
      
    const message = details?.name
      ? `Thank you ${details.name}! Our manufacturing team in Nazimabad, Karachi has received your inquiry.`
      : 'Thank you! Our factory export management team has received your quote request and will reply shortly.';

    showToast({
      title,
      message,
      type: 'success',
      duration: 6000,
      meta: {
        product: details?.product,
        quantity: details?.quantity,
        email: details?.email || 'auraglobalindustries@gmail.com',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, showQuoteSuccessToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
