import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = 'No data found', 
  message = 'There is nothing to display here yet.',
  action = null 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-full bg-dark-800/50 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-dark-500" />
      </div>
      <h3 className="text-xl font-display font-semibold text-dark-200 mb-2">{title}</h3>
      <p className="text-dark-400 text-center max-w-md mb-6">{message}</p>
      {action && action}
    </motion.div>
  );
};

export default EmptyState;


