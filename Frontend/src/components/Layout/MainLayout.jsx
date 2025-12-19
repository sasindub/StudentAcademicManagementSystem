import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 bg-dots opacity-30 pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 relative min-h-screen overflow-x-hidden">
        <motion.div 
          className="p-4 lg:p-8 pt-16 lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;


