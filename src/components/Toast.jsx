import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useCanteen();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = Info;
        let className = 'toast-royal';

        if (toast.type === 'coral') {
          Icon = AlertCircle;
          className = 'toast-coral';
        } else if (toast.type === 'success') {
          Icon = CheckCircle2;
          className = 'toast-success';
        }

        return (
          <div key={toast.id} className={`toast ${className}`}>
            <Icon size={18} />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
