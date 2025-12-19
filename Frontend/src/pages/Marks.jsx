import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  BookOpen,
  Calendar,
  User,
  Award
} from 'lucide-react';
import { 
  Modal, 
  ConfirmDialog, 
  LoadingSpinner, 
  EmptyState, 
  SearchInput 
} from '../components/UI';
import { useMarks, useStudents } from '../hooks';

const Marks = () => {
  const { marks, loading, fetchMarks, createMarks, updateMarks, deleteMarks, summary, fetchSummary } = useMarks();
  const { students, fetchStudents } = useStudents();

  const [termFilter, setTermFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: '',
    term: '',
    year: new Date().getFullYear(),
    subjects: [{ subjectName: '', mark: '', isActive: true }]
  });

  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'Sinhala', 
    'History', 'Geography', 'ICT', 'Art', 'Tamil', 'Commerce'
  ];

  const termOptions = ['Term 1', 'Term 2', 'Term 3'];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const loadData = useCallback(async () => {
    await Promise.all([
      fetchMarks({ term: termFilter || undefined, year: yearFilter || undefined }),
      fetchStudents(),
      fetchSummary()
    ]);
  }, [fetchMarks, fetchStudents, fetchSummary, termFilter, yearFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCreate = () => {
    setSelectedMarks(null);
    setFormData({
      studentId: '',
      term: '',
      year: currentYear,
      subjects: [{ subjectName: '', mark: '', isActive: true }]
    });
    setShowModal(true);
  };

  const handleOpenEdit = (marksRecord) => {
    setSelectedMarks(marksRecord);
    setFormData({
      studentId: marksRecord.studentId,
      term: marksRecord.term,
      year: marksRecord.year,
      subjects: marksRecord.subjects.map(s => ({
        subjectName: s.subjectName,
        mark: s.mark.toString(),
        isActive: s.isActive
      }))
    });
    setShowModal(true);
  };

  const handleOpenDelete = (marksRecord) => {
    setSelectedMarks(marksRecord);
    setShowDeleteDialog(true);
  };

  const handleAddSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { subjectName: '', mark: '', isActive: true }]
    }));
  };

  const handleRemoveSubject = (index) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) => 
        i === index ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const data = {
      ...formData,
      year: parseInt(formData.year),
      subjects: formData.subjects
        .filter(s => s.subjectName && s.mark)
        .map(s => ({
          subjectName: s.subjectName,
          mark: parseFloat(s.mark),
          isActive: s.isActive
        }))
    };

    try {
      if (selectedMarks) {
        await updateMarks(selectedMarks.id, data);
      } else {
        await createMarks(data);
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedMarks) {
      await deleteMarks(selectedMarks.id);
      loadData();
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.studentId === studentId);
    return student?.name || studentId;
  };

  const calculateAverage = (subjects) => {
    const activeSubjects = subjects.filter(s => s.isActive);
    if (activeSubjects.length === 0) return 0;
    const total = activeSubjects.reduce((sum, s) => sum + s.mark, 0);
    return (total / activeSubjects.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Marks</h1>
          <p className="text-dark-400 mt-1">Manage student academic marks and grades</p>
        </div>
        <motion.button
          onClick={handleOpenCreate}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Marks
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="glass-card p-4">
          <p className="text-dark-400 text-sm">Total Records</p>
          <p className="text-2xl font-bold text-white">{summary?.totalMarksRecords || 0}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-dark-400 text-sm">Average Score</p>
          <p className="text-2xl font-bold text-green-400">{summary?.averageMark || 0}%</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-dark-400 text-sm">Subject Entries</p>
          <p className="text-2xl font-bold text-blue-400">{summary?.totalSubjectEntries || 0}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-dark-400 text-sm">Students</p>
          <p className="text-2xl font-bold text-primary-400">{summary?.totalStudents || 0}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <select
          value={termFilter}
          onChange={(e) => setTermFilter(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="">All Terms</option>
          {summary?.availableTerms?.map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="">All Years</option>
          {summary?.availableYears?.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </motion.div>

      {/* Marks List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" text="Loading marks..." />
          </div>
        ) : marks.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No marks found"
            message="Start by adding marks for students"
            action={
              <button onClick={handleOpenCreate} className="btn-primary">
                <Plus className="w-5 h-5 mr-2" />
                Add Marks
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {marks.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card-hover p-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                        {getStudentName(record.studentId).charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{getStudentName(record.studentId)}</h3>
                        <p className="text-sm text-dark-400">{record.studentId}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenEdit(record)}
                        className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(record)}
                        className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Term & Year */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1 text-dark-300">
                      <Calendar className="w-4 h-4" />
                      {record.term}
                    </span>
                    <span className="text-dark-400">{record.year}</span>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                      parseFloat(calculateAverage(record.subjects)) >= 75 
                        ? 'bg-green-500/20 text-green-400' 
                        : parseFloat(calculateAverage(record.subjects)) >= 50 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-red-500/20 text-red-400'
                    }`}>
                      Avg: {calculateAverage(record.subjects)}%
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    {record.subjects.filter(s => s.isActive).slice(0, 4).map((subject, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-dark-800/50">
                        <span className="text-sm text-dark-300">{subject.subjectName}</span>
                        <span className={`font-semibold text-sm ${
                          subject.mark >= 75 ? 'text-green-400' :
                          subject.mark >= 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {subject.mark}
                        </span>
                      </div>
                    ))}
                    {record.subjects.filter(s => s.isActive).length > 4 && (
                      <p className="text-xs text-dark-500 text-center py-1">
                        +{record.subjects.filter(s => s.isActive).length - 4} more subjects
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedMarks ? 'Edit Marks' : 'Add New Marks'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Student
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                  className="input-field pl-12"
                  required
                  disabled={!!selectedMarks}
                >
                  <option value="">Select student</option>
                  {students.map(student => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.name} ({student.studentId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Term */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Term
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <select
                  value={formData.term}
                  onChange={(e) => setFormData(prev => ({ ...prev, term: e.target.value }))}
                  className="input-field pl-12"
                  required
                >
                  <option value="">Select term</option>
                  {termOptions.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="input-field"
                required
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-3">
              Subjects & Marks
            </label>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {formData.subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <div className="relative flex-1">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                    <select
                      value={subject.subjectName}
                      onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)}
                      className="input-field pl-12 text-sm"
                      required
                    >
                      <option value="">Select subject</option>
                      {subjectOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-28">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input
                      type="number"
                      value={subject.mark}
                      onChange={(e) => handleSubjectChange(index, 'mark', e.target.value)}
                      placeholder="Mark"
                      min="0"
                      max="100"
                      className="input-field pl-10 text-sm"
                      required
                    />
                  </div>
                  {formData.subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="p-3 rounded-xl text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddSubject}
              className="mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              + Add another subject
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="btn-primary flex-1"
            >
              {formLoading ? 'Saving...' : (selectedMarks ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Marks"
        message={`Are you sure you want to delete marks for ${selectedMarks ? getStudentName(selectedMarks.studentId) : ''} (${selectedMarks?.term} ${selectedMarks?.year})?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Marks;

