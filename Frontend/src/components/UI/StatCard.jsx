import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary', delay = 0 }) => {
  const colorClasses = {
    primary: 'from-primary-500/20 to-primary-600/10 border-primary-500/30',
    secondary: 'from-secondary-500/20 to-secondary-600/10 border-secondary-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  };

  const iconColorClasses = {
    primary: 'text-primary-400',
    secondary: 'text-secondary-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`stat-card bg-gradient-to-br ${colorClasses[color]} border`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium mb-1">{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-display font-bold text-white"
          >
            {value}
          </motion.p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-dark-800/50 ${iconColorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;


