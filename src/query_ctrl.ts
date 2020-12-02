///<reference path="../node_modules/monaco-editor/monaco.d.ts" />

import _ from 'lodash';
import { QueryCtrl } from 'grafana/app/plugins/sdk';
import './css/query_editor.css';

export class ChangeMyNameQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);

    _.defaultsDeep(this.target, this.defaults);
  }
}
