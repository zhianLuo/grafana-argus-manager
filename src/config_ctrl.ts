///<reference path="../node_modules/monaco-editor/monaco.d.ts" />

export class ChangeMyNameConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  constructor($scope) {
    $scope.typeList = [
      {id:'1',name:'1'},
      {id:'2',name:'2'}, 
      {id:'3',name:'3'},
    ]
    $scope.select = {};
    $scope.select.type = '2'
  }
}
