const express = require('express');
const app = express();
const port = 3000;

const { Student, CompletedCourse, OngoingCourse } = require('./classes');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

const students = [
  new Student(
    1,
    'John Doe',
    'Computer Science',
    3,
    ['Modern Web Technologies', 'System Design'],
    [
      new CompletedCourse('CSE101', 'Introduction to Computer Science', 'Computer Science', 'An introduction of computer science.', 90),
      new CompletedCourse('CSE205', 'Data Structures', 'Computer Science', 'Learn about data structures and algorithms.', 85)
    ]
  ),
  new Student(
    2,
    'Jane Smith',
    'Engineering',
    2,
    ['High-Level Programming Languages', 'Data Structures & Algorithms'],
    [
      new CompletedCourse('ENG101', 'Introduction to Engineering', 'Engineering', 'An introduction to engineering principles.', 81),
      new CompletedCourse('ENG202', 'Engineering Mathematics', 'Engineering', 'Mathematics for engineering students.', 92)
    ]
  ),
  new Student(
    3,
    'Alice Johnson',
    'Computer Science',
    4,
    ['Database Management Systems', 'Machine Learning'],
    [
      new CompletedCourse('CSE303', 'Database Systems', 'Computer Science', 'Introduction to database management systems.', 85),
      new CompletedCourse('CSE401', 'Machine Learning Fundamentals', 'Computer Science', 'Basic concepts of machine learning.', 87)
    ]
  ),
  new Student(
    4,
    'Bob Williams',
    'Electrical Engineering',
    3,
    ['Circuit Theory', 'Digital Signal Processing'],
    [
      new CompletedCourse('EE201', 'Circuit Analysis', 'Electrical Engineering', 'Study of electrical circuits.', 86),
      new CompletedCourse('EE304', 'Digital Signal Processing', 'Electrical Engineering', 'Analyze and manipulate digital signals.', 89)
    ]
  ),
];

const ongoingCourses = [
  new OngoingCourse(101, 'Web Development', 'Computer Science', 'Learn web development fundamentals', 5),
  new OngoingCourse(102, 'Data Structures', 'Computer engineering', 'Explore data structures and algorithms', 10),
  new OngoingCourse(103, 'System Design', 'Computer Science', 'Explore data structures and algorithms', 10),
];

app.get('/students', (req, res) => {
  res.render('students', { students });
});

app.get('/ongoing-courses', (req, res) => {
  res.render('ongoing-courses', { ongoingCourses });
});

app.get('/student/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(student => student.id === studentId);
  if (!student) {
    res.status(404).send('Student not found');
    return;
  }

  const averageGrade = calculateAverageGrade(student);
  res.render('student', { student, averageGrade });
});

app.get('/filter-courses', (req, res) => {
  res.render('filtered-courses', { ongoingCourses: ongoingCourses });
});

app.post('/filter-courses', (req, res) => {
  const { id, name, department, open } = req.body;

  const filteredCourses = ongoingCourses.filter(course => {
    return (!id || course.id === parseInt(id)) &&
           (!name || course.name.toLowerCase().includes(name.toLowerCase())) &&
           (!department || course.department.toLowerCase() === department.toLowerCase()) &&
           (open === undefined || open === 'on' ? course.remainingSeats > 0 : true);
  });
  res.render('filtered-courses', { ongoingCourses: filteredCourses });
});


app.get('/filter-students', (req, res) => {
  res.render('filtered-students', { students: students });
});

app.post('/filter-students', (req, res) => {
  const { id, name, department, enrolledCourse, completedCourses } = req.body;

  const filteredStudents = students.filter(student => {
    return (!id || student.id === parseInt(id)) &&
           (!name || student.name.toLowerCase().includes(name.toLowerCase())) &&
           (!department || student.department.toLowerCase() === department.toLowerCase()) &&
           (!enrolledCourse || student.coursesEnrolled.includes(enrolledCourse)) &&
           (!completedCourses || student.coursesCompleted.includes(completedCourses));
  });
  res.render('filtered-students', { students: filteredStudents }); 
});

function calculateAverageGrade(student) {
  if (student.coursesCompleted.length === 0) return 0;
  const totalGrade = student.coursesCompleted.reduce((sum, course) => sum + course.grade, 0);
  return totalGrade / student.coursesCompleted.length;
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
