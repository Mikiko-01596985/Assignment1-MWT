class Course {
  constructor(id, name, department, description) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.description = description;
  }
}

class CompletedCourse extends Course {
  constructor(id, name, department, description, grade) {
    super(id, name, department, description);
    this.grade = grade;
  }
}

class OngoingCourse extends Course {
  constructor(id, name, department, description, remainingSeats) {
    super(id, name, department, description);
    this.remainingSeats = remainingSeats;
  }
}

class Student {
  constructor(id, name, department, semester, coursesEnrolled, coursesCompleted) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.semester = semester;
    this.coursesEnrolled = coursesEnrolled;
    this.coursesCompleted = coursesCompleted;
  }
}

module.exports = { Course, CompletedCourse, OngoingCourse, Student };
