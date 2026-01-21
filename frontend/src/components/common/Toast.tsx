import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, onClose, duration = 2800 }: ToastProps) => {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  return <div className="toast">{message}</div>;
};

export default Toast;
