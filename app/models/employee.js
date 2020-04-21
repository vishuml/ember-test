import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class EmployeeModel {
  @tracked firstName;
  @tracked lastName;
  @tracked role;
  @tracked frameworks;
  image;
  id;

  constructor(object) {
    this.id = object.id;
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.role = object.role;
    this.frameworks = object.frameworks || [];
    this.image = object.image;
  }

  updateWith(object) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.role = object.role;
    this.frameworks = object.frameworks;
  }

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
