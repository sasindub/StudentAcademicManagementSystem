import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Phone, 
  User,
  GraduationCap,
  Eye,
  X
} from 'lucide-react';
import { 
  Modal, 
  ConfirmDialog, 
  LoadingSpinner, 
  EmptyState, 
  SearchInput 
} from '../components/UI';
import { useStudents } from '../hooks';

const Students = () => {
  const { 
    students, 
    loading, 
    fetchStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent,
    getStudentProfile
  } = useStudents();

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    mobileNumbers: ['']
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchStudents({ search, grade: gradeFilter || undefined });
  }, [fetchStudents, search, gradeFilter]);

  const grades = ['8', '9', '10', '11', '12'];

  const handleOpenCreate = () => {
    setSelectedStudent(null);
    setFormData({ name: '', grade: '', mobileNumbers: [''] });
    setShowModal(true);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      grade: student.grade,
      mobileNumbers: student.mobileNumbers.length > 0 ? student.mobileNumbers : ['']
    });
    setShowModal(true);
  };

  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteDialog(true);
  };

  const handleOpenProfile = async (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
    try {
      const profile = await getStudentProfile(student.studentId);
      setStudentProfile(profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleAddPhone = () => {
    setFormData(prev => ({
      ...prev,
      mobileNumbers: [...prev.mobileNumbers, '']
    }));
  };

  const handleRemovePhone = (index) => {
    setFormData(prev => ({
      ...prev,
      mobileNumbers: prev.mobileNumbers.filter((_, i) => i !== index)
    }));
  };

  const handlePhoneChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      mobileNumbers: prev.mobileNumbers.map((phone, i) => i === index ? value : phone)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const data = {
      ...formData,
      mobileNumbers: formData.mobileNumbers.filter(p => p.trim())
    };

    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.studentId, data);
      } else {
        await createStudent(data);
      }
      setShowModal(false);
      fetchStudents({ search, grade: gradeFilter || undefined });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      await deleteStudent(selectedStudent.studentId);
      fetchStudents({ search, grade: gradeFilter || undefined });
    }
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
          <h1 className="text-3xl font-display font-bold text-white">Students</h1>
          <p className="text-dark-400 mt-1">Manage student records and information</p>
        </div>
        <motion.button
          onClick={handleOpenCreate}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Student
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or ID..."
          className="flex-1"
        />
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="">All Grades</option>
          {grades.map(grade => (
            <option key={grade} value={grade}>Grade {grade}</option>
          ))}
        </select>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="table-container"
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" text="Loading students..." />
          </div>
        ) : students.length === 0 ? (
          <EmptyState
            icon={User}
            title="No students found"
            message={search || gradeFilter ? "Try adjusting your search or filters" : "Add your first student to get started"}
            action={
              <button onClick={handleOpenCreate} className="btn-primary">
                <Plus className="w-5 h-5 mr-2" />
                Add Student
              </button>
            }
          />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="table-cell text-left">Student</th>
                <th className="table-cell text-left">ID</th>
                <th className="table-cell text-left">Grade</th>
                <th className="table-cell text-left">Contact</th>
                <th className="table-cell text-left">Status</th>
                <th className="table-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.studentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="table-row"
                  >
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium text-dark-100">{student.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="font-mono text-primary-400">{student.studentId}</span>
                    </td>
                    <td className="table-cell">
                      <span className="px-3 py-1 rounded-full bg-dark-800 text-dark-200 text-sm">
                        Grade {student.grade}
                      </span>
                    </td>
                    <td className="table-cell">
                      {student.mobileNumbers.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {student.mobileNumbers.slice(0, 2).map((phone, i) => (
                            <span key={i} className="text-dark-300 text-sm flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {phone}
                            </span>
                          ))}
                          {student.mobileNumbers.length > 2 && (
                            <span className="text-dark-500 text-xs">+{student.mobileNumbers.length - 2} more</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-dark-500 text-sm">No contact</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.isActive 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenProfile(student)}
                          className="p-2 rounded-lg text-dark-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(student)}
                          className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter student name"
                className="input-field pl-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Grade
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <select
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className="input-field pl-12"
                required
              >
                <option value="">Select grade</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Mobile Numbers
            </label>
            <div className="space-y-3">
              {formData.mobileNumbers.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      placeholder="Enter mobile number"
                      className="input-field pl-12"
                    />
                  </div>
                  {formData.mobileNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(index)}
                      className="p-3 rounded-xl text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPhone}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                + Add another number
              </button>
            </div>
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
              {formLoading ? 'Saving...' : (selectedStudent ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${selectedStudent?.name}? This action will deactivate the student record.`}
        confirmText="Delete"
        variant="danger"
      />

      {/* Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setStudentProfile(null);
        }}
        title="Student Profile"
        size="lg"
      >
        {studentProfile ? (
          <div className="space-y-6">
            {/* Student Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                {studentProfile.student.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{studentProfile.student.name}</h3>
                <p className="text-dark-400">
                  {studentProfile.student.studentId} • Grade {studentProfile.student.grade}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <p className="text-2xl font-bold text-primary-400">{studentProfile.statistics.totalSubjects}</p>
                <p className="text-sm text-dark-400">Subjects</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <p className="text-2xl font-bold text-green-400">{studentProfile.statistics.averageMark}%</p>
                <p className="text-sm text-dark-400">Average</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                <p className="text-2xl font-bold text-blue-400">{studentProfile.statistics.totalTerms}</p>
                <p className="text-sm text-dark-400">Terms</p>
              </div>
            </div>

            {/* Marks */}
            {studentProfile.marks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Academic Records</h4>
                <div className="space-y-4">
                  {studentProfile.marks.map((mark, index) => (
                    <div key={index} className="p-4 rounded-xl bg-dark-800/30 border border-dark-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-dark-200">{mark.term} - {mark.year}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {mark.subjects.filter(s => s.isActive).map((subject, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-dark-900/50">
                            <span className="text-sm text-dark-300">{subject.subjectName}</span>
                            <span className={`font-semibold ${
                              subject.mark >= 75 ? 'text-green-400' :
                              subject.mark >= 50 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {subject.mark}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner text="Loading profile..." />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Students;


