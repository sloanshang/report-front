<template>
  <div class="content-wrapper" style="min-height: 700px;padding:50px 15px;">
    <Cmghre001 :orgCode="orgCode"  :farmOrg="farmOrg" v-on:getData="getData"></Cmghre001>
    <vue-loading v-if="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '200px', height: '200px' }"></vue-loading>
    <div  v-if="tableFlag">
      <!--标题-->
      <div>
        <h1 style="font-size: 1.5em;text-align: center;" id="tabletitle">{{$t('message.titleGrowerReport02')}}</h1>
        <div style="float: right;">
          <select style="width:60px;height: 30px;">
            <option>excel</option>
            <option>pdf</option>
          </select>
          <a href="" id="dlink" @click="tableToExcel('tableContent')"><button class="btn btn-success" >{{$t('message.Export')}}</button></a>
        </div>
      </div>
      <div  id="tableContent">
        <!--批次概述表格-->
        <h2>{{$t('grower.Expenses.FeedExpenses')}}</h2>
        <table class="table table-hover table-striped" style="margin-bottom: 10px;">
        <thead>
          <tr v-show="device=='PC'">
            <th>{{$t('grower.Expenses.FeedCode')}}</th>
            <th>{{$t('grower.Expenses.FeedName')}}</th>
            <th>{{$t('grower.Expenses.Vendor')}}</th>
            <th style="text-align: right">{{$t('grower.Expenses.InvoiceDate')}}</th>
            <th style="text-align: right">{{$t('grower.Expenses.AppliedDate')}}</th>
            <th style="text-align: right">{{$t('grower.Expenses.Order')}}</th>
            <th style="text-align: right">{{$t('grower.Expenses.Invoice')}}</th>
            <th style="text-align: right">{{$t('grower.Expenses.Amount')}}</th>
          </tr>
          </thead>
          <tbody v-if="device=='PC'">
            <tr v-for="(p1, index) in tableData01.datas">
              <td>{{p1.VAL01}}</td>
              <td>{{p1.VAL02}}</td>
              <td>{{p1.VAL03}}</td>
              <td  style="text-align: right">{{p1.VAL04}}</td>
              <td  style="text-align: right">{{p1.VAL05}}</td>
              <td  style="text-align: right">{{p1.VAL06}}</td>
              <td  style="text-align: right">{{p1.VAL07}}</td>
              <td  style="text-align: right">{{p1.VAL08}}</td>
           </tr>
          </tbody>
          <tbody v-else="">
            <tr v-for="(p1, index) in tableData01.datas">
              <td>
                <div class="card-views">
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.FeedCode')}}</span>
                    <span class="value">{{p1.VAL01}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.FeedName')}}</span>
                    <span class="value">{{p1.VAL02}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.Vendor')}}</span>
                    <span class="value">{{p1.VAL03}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.InvoiceDate')}}</span>
                    <span class="value">{{p1.VAL04}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.AppliedDate')}}</span>
                    <span class="value">{{p1.VAL05}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.Order')}}</span>
                    <span class="value">{{p1.VAL06}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.Invoice')}}</span>
                    <span class="value">{{p1.VAL07}}</span>
                  </div>
                  <div class="card-view">
                    <span class="title" style="">{{$t('grower.Expenses.Amount')}}</span>
                    <span class="value">{{p1.VAL08}}</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import BootstrapTable from 'bootstrap-table'
  import Cmghre001 from '@/components/cm/ghre001'
  import jQuery from 'jquery'
  import {formatDate} from '@/components/utils/date'
  import vueLoading from 'vue-loading-template'

  export default {
    name: 'growerReport02',
    components: {
      BootstrapTable,
      Cmghre001,
      vueLoading
    },
    props: ['orgCode', 'farmOrg', 'device'],
    data () {
      return {
        tableData01: [],
        batch: '',
        startDate: '',
        endDate: '',
        loadFlag: false,
        tableFlag: false,
        flock: '',
        dateIn: '',
        dateColse: '',
        filename: this.$t('message.titleGrowerReport02')
      }
    },
    methods: {
      loading: function (a) {
        if (a === false) {
          this.tableFlag = true
        } else {
          this.tableFlag = false
        }
        this.loadFlag = a
      },
//    获取表格数据
      getData (batch) {
        var _self = this
        _self.startDate = formatDate(new Date(batch.START_DATE), 'yyyy-MM-dd')
        _self.endDate = formatDate(new Date(batch.END_DATE), 'yyyy-MM-dd')
        _self.batch = batch.FARM_NAME
        _self.flock = batch.FARM_ORG
        _self.loading(true)
        _self.tableData01 = ''
        _self.dateIn = formatDate(new Date(batch.START_DATE), 'dd/MM/yyyy')
        _self.dateColse = formatDate(new Date(batch.END_DATE), 'dd/MM/yyyy')
        jQuery.ajax({
          url: '/grower/report/SWFN0102/query',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({'orgCode': _self.orgCode, 'farmOrg': _self.farmOrg, 'flock': _self.flock, 'dateIn': _self.dateIn, 'dateColse': _self.dateColse}),
          dataType: 'json',
          success: function (res) {
            _self.tableData01 = res.datas[1001]
            _self.loading(false)
          },
          fail: function (e) {
            this.tableFlag = false
            alert('请求失败')
            console.log('查询失败')
          }
        })
      }
    }
  }
</script>
<style>
  .card-views .title, .card-views .value{
    font-weight: 700;
    display: inline-block;
    min-width: 30%;
    text-align: left;
    padding: 3px 0;
  }
  .card-views .value{
    font-weight:400;
  }
  .table thead, .table tr {
    border-top:1px solid rgb(0, 189, 189)
  }

  /* Padding and font style */
  .table td, .table th {
    padding: 5px 10px;
    color: #333;
  }
  .table th{
    color:#3c8dbc;
  }
  /* Alternating background colors */
  .table tr:nth-child(even) {
    background: #eee
  }
  .table tr:nth-child(odd) {
    background: #FFF
  }
  .table tbody:nth-child(2){
    /*border-top:2px solid #3c8dbc;*/
  }
  h2{
    font-size: 1.2em;
    margin: 5px;
    color: #3c8dbc;
    font-weight:700;
  }
  .boxTable{
    margin-bottom: 15px;
  }
</style>
