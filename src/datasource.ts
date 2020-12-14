///<reference path="../node_modules/monaco-editor/monaco.d.ts" />

import _ from 'lodash';

import { getBackendSrv } from '@grafana/runtime';

export default class ChangeMyNameDatasource {
  id: number;
  name: string;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
  }

  query(options) {
    // console.log("&&&&&&", options)
    const newoptions = options
    // if(options.targets[0].endpoint_condition === '精确查询'){
    //   options.targets[0].endpoint_condition = 'exact'
    // }
    // if(options.targets[0].endpoint_condition === '前缀匹配'){
    //   options.targets[0].endpoint_condition = 'prefix'
    // }
    // if(options.targets[0].endpoint_condition === '正则匹配'){
    //   options.targets[0].endpoint_condition = 'regexp'
    // }
    if(options.targets[0].step === '1分钟'){
      options.targets[0].step = 60
    }
    if(options.targets[0].step === '3分钟'){
      options.targets[0].step = 180
    }
    if(options.targets[0].step === '5分钟'){
      options.targets[0].step = 300
    }
    if(options.targets[0].step === '10分钟'){
      options.targets[0].step = 600
    }
    if(options.targets[0].step === '20分钟'){
      options.targets[0].step = 1200
    }
    if(options.targets[0].func === '最大值'){
      options.targets[0].func = 'max'
    }
    if(options.targets[0].func === '最小值'){
      options.targets[0].func = 'min'
    }
    if(options.targets[0].func === '平均值'){
      options.targets[0].func = 'mean'
    }
    console.log('newoptions',newoptions)
    // throw new Error("Query Support not implemented yet.");
    const { range } = options;
    const from = Math.round(range!.from.valueOf()/1000);
    const to = Math.round(range!.to.valueOf()/1000);

    // const res = [];
    // const resList = [];

    const promises = options.targets.map(async target => {
      const query = defaults(target, defaultQuery);
      const response = await this.argusQueryData(from, to);


      console.log(1111)
      console.log(response)
      if (response.status === 200) {
        if (!response.data) {
          // status = 'error';
          // message = defaultErrorMessage;
        } else if (response.data.retcode === 0) {


          const tmpDatas = response.data.data;
          if( tmpDatas ) {
            console.log(2222)
            console.log(tmpDatas)

            for (let i = 0; i < tmpDatas.length; i++) {
              const tmpData = tmpDatas[i]
              const tmpPoints = tmpData.values;
              const alias = tmpData.counter + '.' + tmpData.endpoint;

              console.log(3333)
              console.log(tmpPoints)
              const resPoints = [];
              const timestamps: number[] = [];
              const values: number[] = [];
              if( tmpPoints ) {
                for (let i = 0; i < tmpPoints.length; i++) {
                  resPoints[i] = [tmpPoints[i].value, tmpPoints[i].timestamp * 1000];
                  timestamps.push(tmpPoints[i].timestamp*1000);
                  values.push(tmpPoints[i].value);
                }

                const dataFrame = new MutableDataFrame({
                  refId: query.refId,
                  name: alias,
                  fields: [
                    { name: 'Time', type: FieldType.time, values: timestamps },
                    { name: 'Value', type: FieldType.number, values: values },
                  ],
                })
                // resList.push(dataFrame);
                return dataFrame;

                // resList.push({
                //   refId: query.refId,
                //   target: alias,
                //   datapoints: resPoints
                // });
              }
            }
          }
        } else {
          // status = 'error';
          // message = response.data.retmsg ? response.data.retmsg : defaultErrorMessage;
        }
      } else {
        // status = 'error';
        // message = response.statusText ? response.statusText : defaultErrorMessage;
      }

      // console.log(5555)
      // console.log(resList)
      // return resList;
      return {}
    });

    console.log('gggggggggg')
    // console.log(res)
    // return Promise.all(promises).then(data => ({
    //   data
    // }));
    return Promise.all(promises).then((data:any) => {
        console.log('data',data)
        data
      });
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  metricFindQuery(query: string) {
    throw new Error("Template Variable Support not implemented yet.");
  }

  // testDatasource() {
  //   return this.$q.when({
  //     status: 'error',
  //     message: 'Data Source is just a template and has not been implemented yet.',
  //     title: 'Error'
  //   });
  // }


  async testDatasource() {
    const defaultErrorMessage = 'Cannot connect to API';

    let status = 'success';
    let message = 'Success';

    try {
      const response = await this.argusCheckToken();

      console.info(response);

      if (response.status === 200) {
        if (!response.data) {
          status = 'error';
          message = defaultErrorMessage;
        } else if (response.data.retcode === 0) {

        } else {
          status = 'error';
          message = response.data.retmsg ? response.data.retmsg : defaultErrorMessage;
        }
      } else {
          status = 'error';
          message = response.statusText ? response.statusText : defaultErrorMessage;
      }
    } catch (err) {
      if (_.isString(err)) {
        status = 'error';
        message = err;
      } else {
        status = 'error';
        message = '';
        message += err.statusText ? err.statusText : defaultErrorMessage;
        if (err.data && err.data.error && err.data.error.code) {
          message += ': ' + err.data.error.code + '. ' + err.data.error.message;
        }
      }
    }

    return {
      status: status,
      message: message,
    };
  }

  async argusCheckToken() {
    const req: any = {
      method: 'GET',
      // url: `${this.baseUrl}/api/check_token`,
      headers: {}
    }

    req.headers['source'] = "grafana"
    req.headers['X-Auth-Token'] = "CC212###23e0502f4f388ceb2a74d1270206c0be3f4cc641"

    console.info(req)

    // return getBackendSrv().datasourceRequest(req);
    console.log('getBackendSrv()', this.backendSrv.datasourceRequest());
    return this.backendSrv.datasourceRequest()
  }


}
