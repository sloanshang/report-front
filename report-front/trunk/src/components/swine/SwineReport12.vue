<template>
  <div class="row" id="pdfDom" style="padding-top: 55px;background-color:#fff;">
    <form class="form" style="overflow: hidden">
      <div v-show="!up">
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.farm')}}: </div>
            <input class="form-control" readonly v-model="farmName" />
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6" v-show="device=='PC2'">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.queryDate')}}: </div>
            <div class="form-control" style="padding: 0; bottom: 0px;height: auto;">
              <el-date-picker style="width: 100%;" size="small" v-model="daterangeVal" type="daterange"
                              :range-separator="this.$t('swineReport.to')" :start-placeholder="startDate" :end-placeholder="endDate"
                              :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!--查询的日期范围-->
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.breedingDate')}}: </div>
            <div class="form-control" style="width: 45%;padding: 0px;border: none;">
              <dtre001 :date="startDate"  style="width: 100%;" size="small" v-on:changeDate="doChangeStart"/>
            </div>
            <span class="form-control" style="padding: 5px 0;width: 10%;text-align: center;border: none;">至</span>
            <div class="form-control" style="width: 45%;padding: 0; border: none;">
              <dtre002 :date="endDate"    style="width: 100%;" size="small" v-on:changeDate="doChangeEnd"/>
            </div>
          </div>
        </div>
        <!--淘汰类型-->
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.removalType')}}: </div>
            <select class="form-control" v-model="parRemovalType">
              <option  value="ALL" selected>ALL</option>
              <option  value="1">{{$t('swineReport.dead')}}</option>
              <option  value="2">{{$t('swineReport.culled')}}</option>
            </select>
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.location')}}: </div>
            <select class="form-control" v-model="parLocation">
              <option value="ALL">ALL</option>
              <option value="LOC6">LOC6</option>
              <option value="LOC1">LOC1</option>
            </select>
          </div>
        </div>

      </div>

      <div class="form-group col-xs-12 col-sm-12">
        <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;text-align: center">
          <button type="button" class="btn btn-primary" @click="doSearch">{{$t('swineReport.search')}}</button>&nbsp;
          <a href="#" id="dlink"><button type="button" class="btn btn-primary" @click="getExcelDowload">{{$t('swineReport.export')}} Excel</button></a>&nbsp;
          <button type="button" class="btn btn-primary" v-on:click="getPdf()">{{$t('swineReport.export')}} PDF</button>&nbsp;
          <span class="glyphicon glyphicon-chevron-up btn btn-default" v-show="!up" @click="down"></span>
          <span class="glyphicon glyphicon-chevron-down btn btn-default" v-show="up" @click="down"></span>
        </div>
      </div>
    </form>
    <vue-loading v-show="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '100px', height: '100px' }"></vue-loading>
    <div v-show="tableFlag && datas.length !== 0" style="padding: 0 25px;">
      <h4 style="text-align: center">{{$t('message.titleSwineReport12')}}</h4>
      <div style="padding-bottom: 4px"><el-tag size="small ">{{$t('swineReport.farm')}}:{{tableTh.farm_org}}&nbsp;{{tableTh.farm_org_name_loc}}</el-tag><el-tag size="small ">{{$t('swineReport.daterange')}}:{{daterangeVal[0] || startDate}}&nbsp;-&nbsp;{{daterangeVal[1] || endDate}}</el-tag><el-tag size="small ">{{$t('swineReport.printTime')}}:{{tableTh.printReportTime}}</el-tag></div>
      <table v-show="device=='PC'" id="tableContent" class="table table-bordered table-hover table-striped">
        <thead>
        <tr v-show="tableFlag">
          <th style="text-align: left">{{$t('swineReport.parity')}} </th>
          <th style="text-align: right">{{$t('swineReport.females')}} </th>
          <th style="text-align: right">{{$t('swineReport.rate')}} </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in datas">
          <td v-if="language === 'en'" style="text-align: left">{{data.parityEng}} </td>
          <td v-else='' style="text-align: left">{{data.parity}}</td>
          <td style="text-align: right">{{data.qty}}</td>
          <td style="text-align: right">{{data['percent_rate']}}%</td>
        </tr>
        </tbody>
      </table>
      <table v-show="device=='M'" class="table table-bordered table-hover table-striped">
        <tbody>
        <tr v-for="data in datas">
          <td>
            <div class="card-views">
              <div class="card-view">
                <span class="title"> {{$t('swineReport.parity')}} </span>
                <span class="value"> {{data.parity}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{$t('swineReport.females')}} </span>
                <span class="value"> {{data.qty}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{$t('swineReport.rate')}} </span>
                <span class="value"> {{data['percent_rate']}}% </span>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div  v-show="tableFlag && datas.length !== 0" id="container" style="margin: 20px auto 60px;"></div>
    <p v-show="tableFlag && datas.length == 0" style="text-align: center;">{{$t('swineReport.noData')}}</p>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import G2 from 'g2'
  import {formatDate} from '@/components/utils/date'
  import vueLoading from 'vue-loading-template'
  import Dtre001 from '@/components/cm/dtre001'
  import Dtre002 from '@/components/cm/dtre002'

  export default {
    props: ['orgCode', 'farmOrg', 'device', 'language'],
    name: 'swine-Report12---',
    components: {
      vueLoading,
      Dtre001,
      Dtre002
    },
    data () {
      return {
        up: false,
        datas: [],
        farmName: this.orgCode + '#' + this.farmOrg,
        loadFlag: false,
        tableFlag: false,
        startDate: new Date(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)),
        endDate: new Date(),
        parLocation: 'ALL',  // 舍
        parRemovalType: 'ALL',  // 类型
        chartDates: [],
        daterangeVal: [],
        pickerOptions2: {
          shortcuts: [{
            text: this.$t('swineReport.lastWeek'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: this.$t('swineReport.lastMonth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: this.$t('swineReport.threeMonth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        htmlTitle: this.$t('message.titleSwineReport12'),
        tableTh: '',
        exStDate: '',
        exEnDate: ''
      }
    },
    mounted () {
      this.startDate = formatDate(this.startDate, 'yyyy-MM-dd')
      this.exStDate = this.startDate
      this.endDate = formatDate(this.endDate, 'yyyy-MM-dd')
      this.exEnDate = this.endDate
    },
    methods: {
      getExcelDowload () {
        var _self = this
        var reportName = _self.$t('message.titleSwineReport12')
        var url = '/standard/' + _self.orgCode + '/' + _self.farmOrg + '/exportStandardPic'
        var reportDetail = []
        var columnName = []
        var title = (this.language === 'en') === true ? this.datas[0].org_name_eng : this.datas[0].org_name_loc
        var secondaryHeadlines = _self.$t('message.titleSwineReport12')
        columnName.push(_self.$t('swineReport.parity'))
        columnName.push(_self.$t('swineReport.females'))
        columnName.push(_self.$t('swineReport.rate'))
        reportDetail.push(_self.$t('swineReport.farm') + ':' + _self.tableTh.farm_org + _self.tableTh.farm_org_name_loc)
        reportDetail.push(_self.$t('swineReport.daterange') + ':' + (_self.daterangeVal[0] || _self.startDate) + '-' + (_self.daterangeVal[1] || _self.endDate))
        reportDetail.push(_self.$t('swineReport.printTime') + ':' + _self.tableTh.printReportTime)
        var params = {'reportName': reportName, 'title': title, secondaryHeadlines: secondaryHeadlines, reportType: 'repor12', 'picDateList': this.datas, 'imageBase64': this.chart.toImage(), 'columnName': columnName, reportDetail: reportDetail}
        console.log(JSON.stringify(params))
        jQuery.ajax({
          url: url,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(params),
          success: function (response, status, request) {
            if (response.status === 'success') {
              // var n = document.createElement('a')
              var n = document.getElementById('dlink')
              n.href = '/static/8002012/' + _self.language + '/tempExcel/swineStandard/' + response.name
              n.click()
            } else {
              alert('导出失败')
            }
          },
          fail: function (e) {
            alert('下载失败')
          }
        })
      },
      getExcel () {
        var excelTitle = '<h1 style="text-align: center">' + this.tableTh.org_name_loc + '</h1>'
        excelTitle += '<h2 style="text-align: center">' + this.htmlTitle + '</h2>'
        excelTitle += '<span>' + this.$t('swineReport.queryDate') + ':' + this.exStDate + this.$t('swineReport.to') + this.exEnDate + '</span>'
        this.tableToExcel2(excelTitle, 'tableContent')
      },
      down () {
        this.up = !this.up
      },
      doChangeStart (d) {
        var _self = this
        _self.startDate = d
        _self.startDate = formatDate(this.startDate, 'yyyy-MM-dd')
      },
      doChangeEnd (d) {
        var _self = this
        _self.endDate = d
        _self.endDate = formatDate(this.endDate, 'yyyy-MM-dd')
        console.log('ENDDATE : ' + _self.endDate)
      },
      drawChart: function (datas) {
        this.chart && this.chart.destroy()
        this.chart = new G2.Chart({
          id: 'container',
          forceFit: true, // 根据容器的宽度自适应
          height: 250
        })
        this.chart.source(datas, {
          parity: {
            alias: this.$t('swineReport.parity'),
            type: 'cat'
          },
          qty: {
            alias: this.$t('swineReport.females')
          }
        })
        this.chart.interval().position('parity*qty').color('#03b8ff')
          .shape('rect')
          .label('qty', {offset: 10, label: {fill: '#000'}})
        this.chart.animate(false)
        this.chart.render()
      },
      doSearch () {
        let _self = this
        _self.datas = ''
        _self.tableFlag = false
        _self.loadFlag = true
        jQuery.ajax({
          url: '/standard/' + _self.orgCode + '/' + _self.farmOrg + '/report12',
          type: 'POST',
          //  contentType: 'application/json',"
          data: {'startDate': _self.daterangeVal[0] || _self.startDate, 'endDate': _self.daterangeVal[1] || _self.endDate, 'parLocation': _self.parLocation, 'parRemovalType': _self.parRemovalType},
          dataType: 'json',
          success: function (res) {
            if (_self.daterangeVal[0] !== undefined) {
              _self.exStDate = _self.daterangeVal[0]
              _self.exEnDate = _self.daterangeVal[1]
            }
            _self.datas = res
            _self.tableTh = res[0]
            _self.chartDatas = res.slice(0, (res.length - 1))
            _self.$nextTick(function () {
              _self.drawChart(_self.chartDatas)
            })
            _self.loadFlag = false
            _self.tableFlag = true
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

<style scoped>
  .input-group-addon{
    background-color: #eff3ff;
  }
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
</style>
