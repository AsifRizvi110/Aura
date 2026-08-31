import React from 'react';
import { useToast, ToastItem } from '../context/ToastContext';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  X,
  Mail,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';

interface ToastCardProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onClose }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#F27D26]" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[#F27D26]/50 bg-[#0E0E0E] shadow-[0_10px_30px_rgba(242,125,38,0.15)]';
      case 'error':
        return 'border-red-500/40 bg-[#120808] shadow-[0_10px_30px_rgba(239,68,68,0.15)]';
      case 'warning':
        return 'border-amber-500/40 bg-[#120F08] shadow-[0_10px_30px_rgba(245,158,11,0.15)]';
      case 'info':
      default:
        return 'border-sky-500/40 bg-[#080D12] shadow-[0_10px_30px_rgba(56,189,248,0.15)]';
    }
  };

  return (
    <div
      id={`toast-item-${toast.id}`}
      role="status"
      aria-live="polite"
      className={`relative w-full max-w-sm sm:max-w-md p-4 rounded-sm border ${getBorderColor()} text-zinc-200 transition-all duration-300 animate-in slide-in-from-top-4 sm:slide-in-from-bottom-4 fade-in overflow-hidden`}
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F27D26] to-transparent opacity-80" />

      <div className="flex items-start gap-3">
        <div className="shrink-0 p-1.5 rounded-sm bg-[#181818] border border-white/10 mt-0.5">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">
              {toast.title}
            </h4>
            {toast.meta?.timestamp && (
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {toast.meta.timestamp}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            {toast.message}
          </p>

          {/* Metadata chips */}
          {toast.meta && (toast.meta.product || toast.meta.quantity || toast.meta.email) && (
            <div className="pt-1.5 flex flex-wrap gap-1.5">
              {toast.meta.product && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#161616] border border-white/10 text-[#F27D26]">
                  <Sparkles className="w-3 h-3" />
                  {toast.meta.product}
                </span>
              )}
              {toast.meta.quantity && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#161616] border border-white/10 text-zinc-300">
                  <Layers className="w-3 h-3 text-zinc-500" />
                  {toast.meta.quantity}
                </span>
              )}
              {toast.meta.email && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#161616] border border-white/10 text-zinc-400">
                  <Mail className="w-3 h-3 text-[#F27D26]" />
                  {toast.meta.email}
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onClose(toast.id)}
          className="shrink-0 p-1 rounded-sm text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-[#F27D26] animate-[toast-progress_5s_linear_forwards]"
          style={{
            animationDuration: `${toast.duration ?? 5000}ms`
          }}
        />
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-notifications-container"
      className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-[100] flex flex-col gap-2.5 max-w-[calc(100vw-2rem)] pointer-events-auto"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
