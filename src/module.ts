// import { DataSourcePlugin } from '@grafana/data';
import ChangeMyNameDatasource from './datasource';
import { ChangeMyNameConfigCtrl } from './config_ctrl';
// import { AzureMonitorAnnotationsQueryCtrl } from './annotations_query_ctrl';
import { ChangeMyNameQueryCtrl } from './query_ctrl';

// export const plugin = new DataSourcePlugin<DataSource, MyQuery, MyDataSourceOptions>(DataSource)
//   .setConfigEditor(ConfigEditor)
//   .setQueryEditor(QueryEditor);
class ChangeMyNameAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}
 
export {
  ChangeMyNameDatasource as Datasource,
  ChangeMyNameConfigCtrl as ConfigCtrl,
  ChangeMyNameQueryCtrl as QueryCtrl,
  ChangeMyNameAnnotationsQueryCtrl as AnnotationsQueryCtrl,
}
