// Your code goes here
const students = JSON.parse(localStorage.getItem('listOfStudents'));
const homework = JSON.parse(localStorage.getItem('homeworkResults'));

class Student {
  constructor(name, email) {
    let _name = name;
    let _email = email;
    this.getName = function () {
      return _name;
    };
    this.getEmail = function () {
      return _email;
    };
    this.homeworkResults = [];
  }

  addHomeworkResults(topic, success) {
    const homework = {
      topic,
      success
    };
    this.homeworkResults.unshift(homework);
    return homework;
  }

  getHomeworkResults() {
    return this.homeworkResults;
  }
}

const studentOne = new Student('Kolya', 'email');
const studentTwo = new Student('Sasha', 'notemail');

class FrontendLab {
  constructor(studentsList, failedLimit) {
    this.studentsList = studentsList;
    this.failedLimit = failedLimit;

    this.studentsList.forEach((student) => {
      student.homeworkResults = [];
      return student;
    });
  }

  printStudentsList() {
    // for (let i = 0; i < this.studentsList.length; i++) {
    //   for (let [key, value] of Object.entries(this.studentsList[i])) {
    //     console.log(key, value);
    //   }
    // }
    this.studentsList.map((student) => {
      console.log(`Name: ${student.name}, Email: ${student.email}`);
      console.log(student.homeworkResults);
      return null;
    });
    // return this.studentsList;
  }

  addHomeworkResults(homeworkResult) {
    this.studentsList.forEach((student, i) => {
      const homework = {
        topic: homeworkResult.topic,
        success: homeworkResult.results[i].success
      };
      student.homeworkResults.unshift(homework);
    });

    return this.studentsList;
  }

  printStudentsEligibleForTest() {
    this.studentsList.map((student) => {
      const studentCount = {
        accept: 0,
        reject: 0
      };

      student.homeworkResults.forEach(({success}) => {
        if (success) {
          studentCount.accept += 1;
        } else {
          studentCount.reject += 1;
        }
      });

      if (studentCount.accept <= this.failedLimit) {
        console.log(`Name: ${student.name}, Email: ${student.email}`);
      }

      return null;
    });
  }
}

const lab = new FrontendLab(students, 2);
lab.addHomeworkResults(homework[0]);
lab.addHomeworkResults(homework[1]);

console.log(lab.printStudentsList());
