import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import EmployeeModel from '../models/employee';

export default class FormComponent extends Component {
  @service staffData;
  @service router;

  editEmployee = this.args.editEmployee;

  @tracked firstName = this.editEmployee ? this.editEmployee.firstName : "";
  @tracked lastName = this.editEmployee ? this.editEmployee.lastName : "";
  @tracked role = this.editEmployee ? this.editEmployee.role : "";
  @tracked frameworks = this.editEmployee ? this.editEmployee.frameworks || [] : [];

  @tracked frameworkNames = this.staffData.getFrameworkNames();
  @tracked errorMessage = '';

  buttonText = this.editEmployee ? 'Save' : 'Hire';

  @action
  changeRole(role) {
    this.role = role;
    this.frameworkNames = this.staffData.getFrameworkNames(role);
    this.frameworks = this.frameworks.filter((item) => this.frameworkNames.includes(item));
  }

  @action
  save(e) {
    e.preventDefault();
    if (!this.validateForm()) return false;

    const employee = {
      id: this.editEmployee ? this.editEmployee.id : this.staffData.generateNewID(),
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      frameworks: this.frameworks,
      image: this.editEmployee ? this.editEmployee.image : this.getRandomImage()
    };
    this.staffData.saveEmployee(new EmployeeModel(employee));
    this.router.transitionTo('home');
  }

  @action
  fire() {
    this.staffData.fireEmployee(this.editEmployee);
    this.router.transitionTo('home');
  }

  validateForm() {
    if (!this.firstName.trim().length || !this.lastName.trim().length) {
      this.errorMessage = 'Please fill your full name. Spaces only are not allowed';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  getRandomImage() {
    return `/assets/images/img${ Math.floor(Math.random() * 4 + 1) }.jpg`
  }
}
