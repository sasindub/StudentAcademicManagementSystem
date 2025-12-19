import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  const variantStyles = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-500 hover:bg-red-600 text-white',
    },
    warning: {
      icon: 'text-yellow-500',
      button: 'bg-yellow-500 hover:bg-yellow-600 text-dark-900',
    },
    info: {
      icon: 'text-primary-500',
      button: 'btn-primary',
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md glass-card p-6 text-center"
          >
            {/* Icon */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-dark-800 flex items-center justify-center ${styles.icon}`}>
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-display font-semibold text-white mb-2">{title}</h3>
            <p className="text-dark-300 mb-6">{message}</p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${styles.button}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;


