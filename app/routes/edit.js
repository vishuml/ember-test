import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditRoute extends Route {
  @service staffData;

  model({ id }) {
    return this.staffData.getEmployeeById(+id);
  }
}
