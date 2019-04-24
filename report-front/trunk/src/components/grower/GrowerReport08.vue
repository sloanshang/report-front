<template>
  <div class="content-wrapper" style="min-height: 700px;padding:50px 15px;">
    <Cmghre001 :orgCode="orgCode"  :farmOrg="farmOrg" v-on:getData="getData"></Cmghre001>
    <vue-loading v-if="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '200px', height: '200px' }"></vue-loading>
    <div  v-if="tableFlag">
      <div >
        <h1 style="font-size: 1.5em;text-align: center;" id="tabletitle">{{$t('message.titleGrowerReport08')}}</h1>
        <div style="float: right;">
          <select style="width:60px;height: 30px;">
            <option>excel</option>
            <option>pdf</option>
          </select>
          <a href="" id="dlink" @click="tableToExcel('tableContent')"><button class="btn btn-success" >{{$t('message.Export')}}</button></a>
        </div>
      </div>
      <div id="tableContent">
        <h2>{{$t('grower.InventorySummaryPigDays.InventorySummary')}}</h2>
        <table class="table table-hover table-striped" style="margin-bottom: 55px;">
          <thead>
          <tr v-show="device=='PC'">
            <th>{{$t('grower.InventorySummaryPigDays.SpaceDay')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.GroupDay')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.GroupWeek')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.Date')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.BeginInv')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.Placed')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.Purch')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.MovedIn')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.Deads')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.TransferOut')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.MovedOut')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.OtherSales')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.SubStdSales')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.GeneticSales')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.MarketSales')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.EndingInv')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.PigDays')}}</th>
            <th style="text-align: right">{{$t('grower.InventorySummaryPigDays.DeadPigDays')}}</th>
          </tr>
          </thead>
          <tbody v-if="device=='PC'">
          <tr v-for="(p1, index) in tableData01.datas">
            <td>{{p1.VAL01}}</td>
            <td style="text-align: right">{{p1.VAL02}}</td>
            <td style="text-align: right">{{p1.VAL03}}</td>
            <td style="text-align: right">{{p1.VAL04}}</td>
            <td style="text-align: right">{{p1.VAL05}}</td>
            <td style="text-align: right">{{p1.VAL06}}</td>
            <td style="text-align: right">{{p1.VAL07}}</td>
            <td style="text-align: right">{{p1.VAL08}}</td>
            <td style="text-align: right">{{p1.VAL09}}</td>
            <td style="text-align: right">{{p1.VAL10}}</td>
            <td style="text-align: right">{{p1.VAL11}}</td>
            <td style="text-align: right">{{p1.VAL12}}</td>
            <td style="text-align: right">{{p1.VAL13}}</td>
            <td style="text-align: right">{{p1.VAL14}}</td>
            <td style="text-align: right">{{p1.VAL15}}</td>
            <td style="text-align: right">{{p1.VAL16}}</td>
            <td style="text-align: right">{{p1.VAL17}}</td>
            <td style="text-align: right">{{p1.VAL18}}</td>
          </tr>
          <tr id="totalRow">
            <td>{{$t('grower.InventorySummaryPigDays.total')}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right">{{total.sumAmount06}}</td>
            <td style="text-align: right">{{total.sumAmount07}}</td>
            <td style="text-align: right">{{total.sumAmount08}}</td>
            <td style="text-align: right">{{total.sumAmount09}}</td>
            <td style="text-align: right">{{total.sumAmount10}}</td>
            <td style="text-align: right">{{total.sumAmount11}}</td>
            <td style="text-align: right">{{total.sumAmount12}}</td>
            <td style="text-align: right">{{total.sumAmount13}}</td>
            <td style="text-align: right">{{total.sumAmount14}}</td>
            <td style="text-align: right">{{total.sumAmount15}}</td>
            <td style="text-align: right">{{total.Amount16}}</td>
            <td style="text-align: right">{{total.Amount17}}</td>
            <td style="text-align: right">{{total.sumAmount18}}</td>
          </tr>
          </tbody>
          <tbody v-else="">
          <tr  v-for="(p1, index) in tableData01.datas">
            <td>
              <div class="card-views">
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.SpaceDay')}}</span>
                  <span class="value">{{p1.VAL01}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.GroupDay')}}</span>
                  <span class="value">{{p1.VAL02}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.GroupWeek')}}</span>
                  <span class="value">{{p1.VAL03}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.Date')}}</span>
                  <span class="value">{{p1.VAL04}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.BeginInv')}}</span>
                  <span class="value">{{p1.VAL05}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.Placed')}}</span>
                  <span class="value">{{p1.VAL06}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.Purch')}}</span>
                  <span class="value">{{p1.VAL07}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.MovedIn')}}</span>
                  <span class="value">{{p1.VAL08}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.Deads')}}</span>
                  <span class="value">{{p1.VAL09}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.TransferOut')}}</span>
                  <span class="value">{{p1.VAL10}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.MovedOut')}}</span>
                  <span class="value">{{p1.VAL11}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.OtherSales')}}</span>
                  <span class="value">{{p1.VAL12}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.SubStdSales')}}</span>
                  <span class="value">{{p1.VAL13}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.GeneticSales')}}</span>
                  <span class="value">{{p1.VAL14}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.MarketSales')}}</span>
                  <span class="value">{{p1.VAL15}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.EndingInv')}}</span>
                  <span class="value">{{p1.VAL16}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.PigDays')}}</span>
                  <span class="value">{{p1.VAL17}}</span>
                </div>
                <div class="card-view">
                  <span class="title" style="">{{$t('grower.InventorySummaryPigDays.DeadPigDays')}}</span>
                  <span class="value">{{p1.VAL18}}</span>
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
    name: 'growerReport08',
    components: {
      BootstrapTable,
      Cmghre001,
      vueLoading,
      dateIn: '',
      dateColse: ''
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
        total: {
        },
        filename: this.$t('message.titleGrowerReport08')
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
          url: '/grower/report/SWFN0108/query',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({'orgCode': _self.orgCode, 'farmOrg': _self.farmOrg, 'flock': _self.flock, 'dateIn': _self.dateIn, 'dateColse': _self.dateColse}),
          dataType: 'json',
          success: function (res) {
            _self.tableData01 = res.datas[1001]
            _self.total.sumAmount06 = _self.tableData01.datas.map(row => row.VAL06).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount07 = _self.tableData01.datas.map(row => row.VAL07).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount08 = _self.tableData01.datas.map(row => row.VAL08).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount09 = _self.tableData01.datas.map(row => row.VAL09).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount10 = _self.tableData01.datas.map(row => row.VAL10).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount11 = _self.tableData01.datas.map(row => row.VAL11).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount12 = _self.tableData01.datas.map(row => row.VAL12).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount13 = _self.tableData01.datas.map(row => row.VAL13).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount14 = _self.tableData01.datas.map(row => row.VAL14).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount15 = _self.tableData01.datas.map(row => row.VAL15).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.sumAmount18 = _self.tableData01.datas.map(row => row.VAL18).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
            _self.total.Amount16 = _self.tableData01.datas.map(row => row.VAL16)
            _self.total.Amount16 = _self.total.Amount16[_self.total.Amount16.length - 1]
            _self.total.Amount17 = _self.tableData01.datas.map(row => row.VAL17)
            _self.total.Amount17 = _self.total.Amount17[_self.total.Amount17.length - 1]
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
  .card-views .title{
    font-weight: 700;
    display: inline-block;
    min-width: 30%;
    text-align: left!important;
  }
  .table thead, .table tr {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(0, 189, 189);
  }

  /* Padding and font style */
  .table td, .table th {
    padding: 5px 10px;
    color: #333;
  }
  .table th{
    color:#3c8dbc;;
  }
  /* Alternating background colors */
  .table tr:nth-child(even) {
    background: #eee
  }
  .table tr:nth-child(odd) {
    background: #FFF
  }
</style>
