import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EmployeeModel from '../models/employee';

export default class StaffDataService extends Service {
  roleNames = ['Front-end', 'Back-end', 'Full-stack'];
  roles = {
    'Front-end': [
      'Angular',
      'React',
      'Vue',
      'Ember'
    ],
    'Back-end': [
      'Phoenix',
      'Laravel',
      'Django',
      'Spring'
    ]
  };

  @tracked staff = [
    new EmployeeModel({
      id: 1,
      firstName: 'Elon',
      lastName: 'Musk',
      role: 'Full-stack',
      frameworks: ['React', 'Laravel'],
      image: '/assets/images/img2.jpg'
    }),
    new EmployeeModel({
      id: 2,
      firstName: 'Jon',
      lastName: 'Snow',
      role: 'Front-end',
      frameworks: ['Angular'],
      image: '/assets/images/img1.jpg'
    })
  ];

  getFrameworkNames(roleName) {
    switch (roleName) {
      case 'Front-end':
      case 'Back-end':
        return this.roles[roleName];
      default:
        return this.roles['Front-end'].concat(this.roles['Back-end']);
    }
  }

  generateNewID() {
    let id = -1;
    this.staff.forEach((item) => {
      if (item.id > id) {
        id = item.id;
      }
    });
    return ++id;
  }

  getEmployeeById(id) {
    return this.staff.find(item => item.id === id);
  }

  fireEmployee(employee) {
    this.staff = this.staff.filter(item => item.id !== employee.id);
  }

  saveEmployee(employee) {
    const existingEmployee = this.getEmployeeById(employee.id);
    if (existingEmployee) {
      existingEmployee.updateWith(employee);
    } else {
      this.staff.push(employee);
    }
  }

  getFilteredStaff(roles, frameworks) {
    return this.staff.filter((item) => {
      if (roles.length && frameworks.length) {
        return roles.includes(item.role) && item.frameworks.some(fr => frameworks.includes(fr));
      } else if (roles.length) {
        return roles.includes(item.role);
      } else if (frameworks.length) {
        return item.frameworks.some(fr => frameworks.includes(fr));
      }
      return true;
    });
  }
}
