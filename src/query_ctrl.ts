///<reference path="../node_modules/monaco-editor/monaco.d.ts" />

import _ from 'lodash';
import { QueryCtrl } from 'grafana/app/plugins/sdk';
import './css/query_editor.css';

export class ChangeMyNameQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  defaults = {

  };
  tagKye:string='';
  tagValue1:string='';
  tagValue2:string='';
  tagSelectValue:string='exact';
  addTagMode:boolean=false;
  tags=[];
  selectOption={'exact':'精确查询', 'prefix':'前缀匹配', 'regexp':'正则匹配'};
  monitorSelectBox = false; 
  monitorFilterData=[
    'cup.busy',
    'cup.user',
    'cup.free',
    'cup.used',
    'cup.util',
    'cup.errors',
    'cup.bytes',
    'men.busy',
    'men.user',
    'men.free',
    'men.used',
    'men.util',
    'men.errors',
    'men.bytes',
    'net.busy',
    'net.user',
    'net.free',
    'net.used',
    'net.util',
    'net.errors',
    'net.bytes'
  ];
  monitorSeachArr=[]; 
  color:string='';
  /** @ngInject **/
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);
    _.defaultsDeep(this.target, this.defaults);
    // console.log('target',this.target);
  }

  //添加
  addTag() {
    if(this.addTagMode){
      if(this.tagSelectValue === 'regexp'){
        this.tags.push({
          key:this.tagKye, 
          text:'前缀匹配('+this.tagValue1+')AND 正则匹配('+this.tagValue2 + ')', 
          type:this.tagSelectValue, 
          value1:this.tagValue1,
          value2:this.tagValue2,
          type2:this.selectOption[this.tagSelectValue]
        });
      }else{
        this.tags.push({
          key:this.tagKye, 
          text:this.selectOption[this.tagSelectValue]+'('+this.tagValue1+')', 
          type:this.tagSelectValue, 
          value1:this.tagValue1,
          value2:this.tagValue2,
          type2:this.selectOption[this.tagSelectValue]
        });
      }
      this.tagKye='';
      this.tagValue1='';
      this.tagValue2='';
      this.tagSelectValue='exact';
    }
    this.addTagMode= !this.addTagMode;
    this.target.tags = this.tags;
    // localStorage.setItem('tags',JSON.stringify(this.tags))
  }
  //删除
  removeTag(key){
    this.tags.splice(key,1);
    // console.log('tags',this.tags);
    this.target.tags = this.tags;
  }
  //编辑
  editTag(key, value){
    if(!this.addTagMode){
      this.tagKye=value.key;
      this.tagValue1=value.value1;
      this.tagValue2=value.value2;
      this.tagSelectValue=value.type;
      this.addTagMode= !this.addTagMode;
      this.tags.splice(key,1);
      this.target.tags = this.tags;
    }
  }
  //取消新增状态
  closeAddTagMode(){
    this.addTagMode= !this.addTagMode;
  }
  //监控项聚焦事件
  monitorFocus(){
    this.monitorSelectBox = true;
    this.monitorSeachArr = this.monitorFilterData;
  }
  //监控项失焦事件
  monitoBlur(){
    // this.monitorSelectBox = false;
  }
  //监控项input  change事件
  monitorChange(){
    console.log('我被改变了：',this.target.metric);
    this.monitorSeachArr = [];
    // this.monitorSelectBox = true;
    for(var i = 0; i < this.monitorFilterData.length;i++){
      if(this.monitorFilterData[i].indexOf(this.target.metric) > -1){
        this.monitorSeachArr.push(this.monitorFilterData[i])
      }
    }
  }
  monitorMouseover(){
    // this.color = 'blue';
  }
  monitorMouseleave(){
    // this.color = 'blue';
  }
  monitorItemClick(key, value){
    this.target.metric = value;
    this.monitorSelectBox = false;
    // console.log(key,value);
  }
  //关闭box
  closeMonitorBox(){
    console.log('关闭')
    this.monitorSelectBox = false;
  }
}
