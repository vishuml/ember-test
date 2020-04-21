import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ListComponent extends Component {
  @service staffData;

  frameworks = this.staffData.getFrameworkNames();

  @tracked filterRoles = [];
  @tracked filterFrameworks = [];
  @tracked staff = this.staffData.staff;

  @action
  fire(employee) {
    this.staffData.fireEmployee(employee);
    this.staff = this.staffData.staff
  }

  @action
  changeFilterRole(role) {
    this.filterRoles = role;
    this.getFilteredStaff();
  }

  @action
  changeFilterFrameworks(framework) {
    this.filterFrameworks = framework;
    this.getFilteredStaff();
  }

  getFilteredStaff() {
    this.staff = this.staffData.getFilteredStaff(this.filterRoles, this.filterFrameworks);
  }
}
