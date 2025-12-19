import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard, LoadingSpinner } from '../components/UI';
import { useStudents, useMarks } from '../hooks';

const Dashboard = () => {
  const { students, fetchStudents, loading: studentsLoading } = useStudents();
  const { summary, fetchSummary, loading: marksLoading } = useMarks();
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchSummary();
  }, [fetchStudents, fetchSummary]);

  useEffect(() => {
    // Calculate top performers (mock data for now)
    if (students.length > 0) {
      const shuffled = [...students].sort(() => 0.5 - Math.random());
      setTopStudents(shuffled.slice(0, 5));
    }
  }, [students]);

  const loading = studentsLoading || marksLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Students',
      value: summary?.totalStudents || students.length || 0,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Active Records',
      value: summary?.totalMarksRecords || 0,
      icon: BookOpen,
      color: 'blue',
    },
    {
      title: 'Average Score',
      value: summary?.averageMark ? `${summary.averageMark}%` : '0%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Total Subjects',
      value: summary?.totalSubjectEntries || 0,
      icon: Award,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-dark-400 mt-1">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/students" className="btn-secondary text-sm">
            View Students
          </Link>
          <Link to="/marks" className="btn-primary text-sm">
            Manage Marks
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white">Recent Students</h2>
            <Link
              to="/students"
              className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {students.slice(0, 5).map((student, index) => (
              <motion.div
                key={student.studentId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-dark-100 font-medium truncate">{student.name}</p>
                  <p className="text-dark-400 text-sm">{student.studentId} • Grade {student.grade}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.isActive 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {student.isActive ? 'Active' : 'Inactive'}
                </span>
              </motion.div>
            ))}

            {students.length === 0 && (
              <p className="text-center text-dark-400 py-8">No students found</p>
            )}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-display font-semibold text-white mb-6">Academic Overview</h2>

          <div className="space-y-6">
            {/* Terms */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-400 text-sm">Available Terms</span>
                <span className="text-dark-200 font-medium">{summary?.availableTerms?.length || 0}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {summary?.availableTerms?.map((term) => (
                  <span key={term} className="px-3 py-1 rounded-full bg-dark-800 text-dark-300 text-sm">
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Years */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-400 text-sm">Academic Years</span>
                <span className="text-dark-200 font-medium">{summary?.availableYears?.length || 0}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {summary?.availableYears?.map((year) => (
                  <span key={year} className="px-3 py-1 rounded-full bg-dark-800 text-dark-300 text-sm">
                    {year}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="pt-6 border-t border-dark-700/50">
              <h3 className="text-dark-300 text-sm mb-4">Performance Distribution</h3>
              <div className="h-32 rounded-xl bg-dark-800/50 flex items-center justify-center border border-dark-700/50">
                <div className="flex items-end gap-2 h-24">
                  {[65, 80, 45, 90, 70, 55, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      className="w-6 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

