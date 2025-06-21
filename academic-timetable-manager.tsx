import React, { useState, useEffect } from 'react';

const TimeTableManager = () => {
  // State for data management
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newTeacher, setNewTeacher] = useState({ name: '', subjects: [] });
  const [newSchedule, setNewSchedule] = useState({
    day: 'Monday',
    startTime: '08:00',
    endTime: '09:00',
    subject: '',
    teacher: '',
    room: '',
    isLab: false,
    class: ''
  });
  const [filter, setFilter] = useState({ type: 'all', value: '' });
  const [activeTab, setActiveTab] = useState('subjects');

  // Days and time options
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Add a new subject
  const handleAddSubject = () => {
    if (newSubject.trim() !== '' && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  // Add a new teacher
  const handleAddTeacher = () => {
    if (newTeacher.name.trim() !== '' && !teachers.some(t => t.name === newTeacher.name)) {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher({ name: '', subjects: [] });
    }
  };

  // Add a new schedule entry
  const handleAddSchedule = () => {
    if (newSchedule.subject && newSchedule.teacher && newSchedule.class) {
      // Check for conflicts
      const conflict = schedules.some(s => 
        s.day === newSchedule.day && 
        ((s.startTime <= newSchedule.startTime && s.endTime > newSchedule.startTime) ||
         (s.startTime < newSchedule.endTime && s.endTime >= newSchedule.endTime) ||
         (s.startTime >= newSchedule.startTime && s.endTime <= newSchedule.endTime)) &&
        (s.teacher === newSchedule.teacher || s.class === newSchedule.class || s.room === newSchedule.room)
      );

      if (conflict) {
        alert('There is a scheduling conflict! Please check teacher, class, or room availability.');
      } else {
        setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
        setNewSchedule({
          day: 'Monday',
          startTime: '08:00',
          endTime: '09:00',
          subject: '',
          teacher: '',
          room: '',
          isLab: false,
          class: ''
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Delete a schedule entry
  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  // Toggle teacher subject selection
  const handleToggleSubject = (subject) => {
    const subjects = newTeacher.subjects.includes(subject)
      ? newTeacher.subjects.filter(s => s !== subject)
      : [...newTeacher.subjects, subject];
    setNewTeacher({ ...newTeacher, subjects });
  };

  // Get filtered schedules based on current filter
  const getFilteredSchedules = () => {
    if (filter.type === 'all') return schedules;
    return schedules.filter(s => s[filter.type] === filter.value);
  };

  // Get time periods for the timetable
  const getTimePeriods = () => {
    return timeSlots.filter((_, index) => index < timeSlots.length - 1).map((start, index) => ({
      start,
      end: timeSlots[index + 1]
    }));
  };

  // Generate the timetable grid cells
  const generateTimetable = () => {
    const periods = getTimePeriods();
    const filteredSchedules = getFilteredSchedules();
    
    return days.map(day => (
      <tr key={day}>
        <td className="font-medium border-2 border-gray-300 p-2 bg-gray-100">{day}</td>
        {periods.map(period => {
          const classes = filteredSchedules.filter(s => 
            s.day === day && 
            s.startTime === period.start && 
            s.endTime === period.end
          );
          
          return (
            <td key={`${day}-${period.start}`} className="border border-gray-300 p-1 align-top">
              {classes.map(cls => (
                <div 
                  key={cls.id} 
                  className={`rounded p-1 mb-1 text-sm ${cls.isLab ? 'bg-purple-200' : 'bg-blue-200'}`}
                >
                  <div className="font-bold">{cls.subject}</div>
                  <div>Teacher: {cls.teacher}</div>
                  <div>Class: {cls.class}</div>
                  <div>Room: {cls.room}</div>
                  <button 
                    className="text-xs text-red-600 hover:text-red-800 mt-1"
                    onClick={() => handleDeleteSchedule(cls.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </td>
          );
        })}
      </tr>
    ));
  };

  // Sample data for demonstration
  useEffect(() => {
    setSubjects(['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']);
    setTeachers([
      { name: 'Dr. Smith', subjects: ['Mathematics', 'Physics'] },
      { name: 'Prof. Johnson', subjects: ['Chemistry', 'Biology'] },
      { name: 'Ms. Williams', subjects: ['Computer Science'] }
    ]);
    setSchedules([
      { id: 1, day: 'Monday', startTime: '08:00', endTime: '09:00', subject: 'Mathematics', teacher: 'Dr. Smith', room: '101', isLab: false, class: '10A' },
      { id: 2, day: 'Monday', startTime: '09:00', endTime: '10:00', subject: 'Physics', teacher: 'Dr. Smith', room: '102', isLab: false, class: '11B' },
      { id: 3, day: 'Tuesday', startTime: '10:00', endTime: '11:00', subject: 'Chemistry', teacher: 'Prof. Johnson', room: '103', isLab: true, class: '12C' },
    ]);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Academic Timetable Manager</h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button 
            className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'subjects' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
          <button 
            className={`px-4 py-2 font-medium rounded-t-lg ml-2 ${activeTab === 'teachers' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('teachers')}
          >
            Teachers
          </button>
          <button 
            className={`px-4 py-2 font-medium rounded-t-lg ml-2 ${activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </button>
          <button 
            className={`px-4 py-2 font-medium rounded-t-lg ml-2 ${activeTab === 'timetable' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('timetable')}
          >
            Timetable View
          </button>
        </div>
        
        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Manage Subjects</h2>
            <div className="flex mb-4">
              <input 
                type="text" 
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject name" 
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <button 
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
                onClick={handleAddSubject}
              >
                Add Subject
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {subjects.map((subject, index) => (
                <div key={index} className="bg-blue-100 rounded-lg p-3 flex justify-between items-center">
                  <span>{subject}</span>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setSubjects(subjects.filter(s => s !== subject))}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Manage Teachers</h2>
            <div className="mb-4">
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter teacher name" 
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              />
              <h3 className="font-medium mb-2">Select subjects the teacher can teach:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {subjects.map((subject, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg cursor-pointer ${newTeacher.subjects.includes(subject) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => handleToggleSubject(subject)}
                  >
                    {subject}
                  </div>
                ))}
              </div>
              <button 
                className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                onClick={handleAddTeacher}
              >
                Add Teacher
              </button>
            </div>
            <div className="space-y-4 mt-6">
              {teachers.map((teacher, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-blue-800">{teacher.name}</h3>
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setTeachers(teachers.filter(t => t.name !== teacher.name))}
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Teaches:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {teacher.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Add Schedule Entry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Day:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newSchedule.subject}
                  onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Teacher:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newSchedule.teacher}
                  onChange={(e) => setNewSchedule({ ...newSchedule, teacher: e.target.value })}
                >
                  <option value="">Select Teacher</option>
                  {teachers
                    .filter(teacher => !newSchedule.subject || teacher.subjects.includes(newSchedule.subject))
                    .map(teacher => (
                      <option key={teacher.name} value={teacher.name}>{teacher.name}</option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Class:</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. 10A, 11B" 
                  value={newSchedule.class}
                  onChange={(e) => setNewSchedule({ ...newSchedule, class: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Room:</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. 101, Lab2" 
                  value={newSchedule.room}
                  onChange={(e) => setNewSchedule({ ...newSchedule, room: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Time:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newSchedule.startTime}
                  onChange={(e) => {
                    const startTime = e.target.value;
                    const startIndex = timeSlots.indexOf(startTime);
                    const endTime = startIndex < timeSlots.length - 1 ? timeSlots[startIndex + 1] : timeSlots[startIndex];
                    setNewSchedule({ ...newSchedule, startTime, endTime });
                  }}
                >
                  {timeSlots.slice(0, -1).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">End Time:</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newSchedule.endTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                  disabled
                >
                  {timeSlots.slice(1).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isLab"
                  className="mr-2 h-4 w-4"
                  checked={newSchedule.isLab}
                  onChange={(e) => setNewSchedule({ ...newSchedule, isLab: e.target.checked })}
                />
                <label htmlFor="isLab" className="text-sm font-medium">This is a lab session</label>
              </div>
            </div>
            
            <button 
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-medium"
              onClick={handleAddSchedule}
            >
              Add to Schedule
            </button>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Current Schedule Entries</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-2 border text-left">Day</th>
                      <th className="p-2 border text-left">Time</th>
                      <th className="p-2 border text-left">Subject</th>
                      <th className="p-2 border text-left">Teacher</th>
                      <th className="p-2 border text-left">Class</th>
                      <th className="p-2 border text-left">Room</th>
                      <th className="p-2 border text-left">Type</th>
                      <th className="p-2 border text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map(schedule => (
                      <tr key={schedule.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{schedule.day}</td>
                        <td className="p-2 border">{schedule.startTime}-{schedule.endTime}</td>
                        <td className="p-2 border">{schedule.subject}</td>
                        <td className="p-2 border">{schedule.teacher}</td>
                        <td className="p-2 border">{schedule.class}</td>
                        <td className="p-2 border">{schedule.room}</td>
                        <td className="p-2 border">{schedule.isLab ? 'Lab' : 'Lecture'}</td>
                        <td className="p-2 border">
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Timetable View Tab */}
        {activeTab === 'timetable' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Timetable View</h2>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Filter By:</label>
                <select 
                  className="p-2 border border-gray-300 rounded-lg"
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                >
                  <option value="all">Show All</option>
                  <option value="teacher">Teacher</option>
                  <option value="class">Class</option>
                  <option value="room">Room</option>
                </select>
              </div>
              
              {filter.type !== 'all' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Select {filter.type}:</label>
                  <select 
                    className="p-2 border border-gray-300 rounded-lg"
                    value={filter.value}
                    onChange={(e) => setFilter({ ...filter, value: e.target.value })}
                  >
                    <option value="">Select {filter.type}</option>
                    {[...new Set(schedules.map(s => s[filter.type]))].map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-gray-300 p-2 bg-blue-200">Time / Day</th>
                    {getTimePeriods().map(period => (
                      <th key={period.start} className="border-2 border-gray-300 p-2 bg-blue-200">
                        {period.start} - {period.end}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generateTimetable()}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-200 rounded-sm mr-2"></div>
                <span className="text-sm">Lecture</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-200 rounded-sm mr-2"></div>
                <span className="text-sm">Lab</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTableManager;
