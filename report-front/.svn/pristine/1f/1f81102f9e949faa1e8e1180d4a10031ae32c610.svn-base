<template>
  <div class="row" id="pdfDom" style="padding: 55px 16px;background-color:#fff;">
    <form class="form" style="overflow: hidden">
      <div v-show="!up">
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.farm')}}: </div>
            <input class="form-control" readonly v-model="farmName" />
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;">
            <div class="input-group-addon">{{$t('swineReport.variety')}}： </div>
            <div class="form-control" style="padding: 0;">
            <Variety001 style="width: 100%;" :orgCode="orgCode" :farmOrg="farmOrg" v-on:getVariety="getVariety" size="small"></Variety001>
            </div>
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;">
            <div class="input-group-addon">{{$t('swineReport.weekNo')}}： </div>
            <div class="form-control" style="padding: 0;">
            <weekse001 style="width: 100%;" size="small" :orgCode="orgCode" :farmOrg="farmOrg" v-on:getL="getGroup"></weekse001>
            </div>
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px">
            <div class="input-group-addon">{{$t('swineReport.backward')}}: </div>
            <div class="form-control" style="height: auto;">
              <div class="col-xs-6 col-sm-3 xs-pd" v-for="(item,index) in backs">
                <input  type="checkbox" style="padding: 15%;height: 18px;vertical-align: top" :value="item.id" v-model="checked" class="laber-info"><input type="number" min="0" class="laber-input" v-model="item.back" :disabled="!isInArray(checked,item.id)">
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;">
            <div class="input-group-addon" v-show="device=='PC'">{{$t('swineReport.startDate')}}： </div>
            <div class="form-control" style="padding: 0;">
              <el-date-picker style="width: 100%;" :disabled="true" v-model="startDate" type="date" :placeholder="$t('swineReport.selectWeekNo')" readonly default-value="" size="small" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
        <div class="form-group col-xs-12 col-sm-6">
          <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;">
            <div class="input-group-addon" v-show="device=='PC'">{{$t('swineReport.endDate')}}： </div>
            <div class="form-control" style="padding: 0;">
              <el-date-picker style="width: 100%;" :disabled="true" v-model="endDate" type="date" :placeholder="$t('swineReport.selectWeekNo')" readonly default-value="" size="small" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group col-xs-12 col-sm-12">
        <div class="input-group col-xs-12 col-sm-12" style="padding: 0 15px;text-align: center">
          <button type="button" class="btn btn-primary" @click="openWarning">{{$t('swineReport.search')}}</button>&nbsp;
          <a href="#" id="dlink"><button type="button" class="btn btn-primary" @click="getExcel">{{$t('swineReport.export')}} Excel</button>&nbsp;</a>
          <button type="button" class="btn btn-primary"v-on:click="getPdf()">{{$t('swineReport.export')}} PDF</button>
          <span class="glyphicon glyphicon-chevron-up btn btn-default" v-show="!up" @click="down"></span>
          <span class="glyphicon glyphicon-chevron-down btn btn-default" v-show="up" @click="down"></span>
        </div>
      </div>
    </form>
    <vue-loading v-show="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '100px', height: '100px' }"></vue-loading>
    <div style=""  v-show="tableFlag && datas.length !== 0" style="position: relative;left: 0;top: 0;">
      <div v-if="tableTh.length !== 0" style="padding: 5px">
        <h3 style="text-align: center">{{$t('message.titleSwineReport01')}}</h3>
        <el-tag size="small ">{{$t('swineReport.variety')}}:{{tableTh.breeder=='99'?'All':tableTh.breeder}}</el-tag>
        <el-tag size="small ">{{$t('swineReport.daterange')}}:{{tableTh.date_column_01_min_date}}-{{tableTh.date_column_01_max_date}}</el-tag>
        <el-tag size="small ">{{$t('swineReport.printTime')}}:{{tableTh.printReportTime}}</el-tag>
      </div>
      <table id="fHeader" class="table table-bordered table-hover table-striped">
        <thead v-show="device=='PC' && fixedHeader">
        <tr>
          <th>{{$t('swineReport.breakDown')}}</th>
          <th>{{$t('swineReport.target')}}</th>
          <th>{{headers.date_column_01_min_date}}<br>{{headers.date_column_01_max_date}}</th>
          <th>{{headers.date_column_acc_02_header}}</th>
          <th>{{headers.date_column_avg_02_header}}</th>
          <th>{{headers.date_column_acc_03_header}}</th>
          <th>{{headers.date_column_avg_03_header}}</th>
          <th>{{headers.date_column_acc_04_header}}</th>
          <th>{{headers.date_column_avg_04_header}}</th>
          <th>{{headers.date_column_acc_05_header}}</th>
          <th>{{headers.date_column_avg_05_header}}</th>
        </tr>
        </thead>
      </table>
      <table v-show="device=='PC'" id="sTable" class="table table-bordered table-hover table-striped">
        <thead>
        <tr>
          <th>{{$t('swineReport.breakDown')}}</th>
          <th>{{$t('swineReport.target')}}</th>
          <th>{{headers.date_column_01_min_date}}<br>{{headers.date_column_01_max_date}}</th>
          <th>{{headers.date_column_acc_02_header}}</th>
          <th>{{headers.date_column_avg_02_header}}</th>
          <th>{{headers.date_column_acc_03_header}}</th>
          <th>{{headers.date_column_avg_03_header}}</th>
          <th>{{headers.date_column_acc_04_header}}</th>
          <th>{{headers.date_column_avg_04_header}}</th>
          <th>{{headers.date_column_acc_05_header}}</th>
          <th>{{headers.date_column_avg_05_header}}</th>
        </tr>
        </thead>
        <tbody v-show="device=='PC'">
        <tr v-for="(data, index) in datas">
          <td>{{(language==='en')===true?data.sub_category_name_eng:data.sub_category_name_loc}}</td>
          <td >{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_traget_02}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_1}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_acm_02}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_avg_02}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_acm_03}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_avg_03}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_acm_04}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_avg_04}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_acm_05}}</td>
          <td>{{data.sub_category == '10.1000' || data.sub_category =='20.0000' || data.sub_category =='20.1000' || data.sub_category =='30.0000' || data.sub_category =='30.1000' || data.sub_category =='40.0000' || data.sub_category =='40.1000'?' ': data.column_avg_05}}</td>
        </tr>
        </tbody>
      </table>
      <table v-show="device=='M'" class="table table-bordered table-hover table-striped">
        <tbody>
          <tr v-for="data in datas">
          <td>
            <div class="card-views">
              <div class="card-view">
                <span class="title"> {{$t('swineReport.breakDown')}} </span>
                <span class="value"> {{(language==='en')===true?data['sub_category_name_eng']:data['sub_category_name_loc']}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{$t('swineReport.target')}} </span>
                <span class="value"> {{data.column_traget_02}} </span>
              </div><div class="card-view">
                <span class="title"> {{headers.date_column_01_min_date}}->{{headers.date_column_01_max_date}} </span>
                <span class="value"> {{data.column_1}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_acc_02_header}} </span>
                <span class="value"> {{data.column_acm_02}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_avg_02_header}} </span>
                <span class="value"> {{data.column_avg_02}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_acc_03_header}} </span>
                <span class="value"> {{data.column_acm_03}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_avg_03_header}} </span>
                <span class="value"> {{data.column_avg_03}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_acc_04_header}} </span>
                <span class="value"> {{data.column_acm_04}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_avg_04_header}} </span>
                <span class="value"> {{data.column_avg_04}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_acc_05_header}} </span>
                <span class="value"> {{data.column_acm_05}} </span>
              </div>
              <div class="card-view">
                <span class="title"> {{headers.date_column_avg_05_header}} </span>
                <span class="value"> {{data.column_avg_05}} </span>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-show="tableFlag && datas.length == 0" style="text-align: center;">{{$t('swineReport.noData')}}</p>
  </div>

</template>

<script>
  import jQuery from 'jquery'
  import Dtre001 from '@/components/cm/dtre001'
  import Dtre002 from '@/components/cm/dtre002'
  import Variety001 from '@/components/cm/variety001'
  import Weekse001 from '@/components/cm/weekse001'
  import vueLoading from 'vue-loading-template'

  export default {
    props: ['orgCode', 'farmOrg', 'device', 'language'],
    name: 'swineReport01',
    components: {
      Dtre001,
      Dtre002,
      Variety001,
      Weekse001,
      vueLoading
    },
    data () {
      return {
        fixedHeader: false,
        tag: {},
        up: false,
        tableTh: {},
        checked: [0, 1, 2, 3],
        backs: [
          {
            back: '4',
            id: 0
          },
          {
            back: '8',
            id: 1
          },
          {
            back: '16',
            id: 2
          },
          {
            back: '26',
            id: 3
          }
        ],
        back: [],
        selectDate: '',
        startDate: '',
        endDate: '',
        PAR_ALL_BREED: 'ALL',
        PAR_START_BREED: '00',
        PAR_END_BREED: '99',
        PAR_PERIOD_WEEKS: '',
        farmName: this.orgCode + '#' + this.farmOrg,
        datas: [],
        loadFlag: false,
        tableFlag: false,
        headers: [],
        htmlTitle: this.$t('message.titleSwineReport01')
      }
    },
    computed: {
      filtered () {
        return Object.keys(this.datas[0]).filter(function (x) {
          console.log(x)
          return x.endsWith('ID')
        })
      }
    },
    mounted () {
      this.headerMonitor()
    },
    methods: {
      getExcel () {
        var excelTitle = '<h1 style="text-align: center">' + '</h1>'
        excelTitle += '<h2 style="text-align: center">' + this.htmlTitle + '</h2>'
        excelTitle += '<div style="font-weight: bold"><span>' + this.$t('swineReport.variety') + ':' + this.tableTh.breeder + '</span></div>'
        this.tableToExcel2(excelTitle, 'sTable')
      },
      down () {
        this.up = !this.up
      },
      getGroup (d) {
        this.endDate = d.weekEndDate
        this.startDate = d.weekStartDate
      },
      getVariety (item) {
        var _self = this
        if (item === 'TOTAL') {
          _self.PAR_ALL_BREED = 'ALL'
          _self.PAR_END_BREED = 99
        } else {
          _self.PAR_ALL_BREED = 'NOT_ALL'
          _self.PAR_END_BREED = item
        }
      },
      openWarning () {
        if (this.endDate === '') {
          this.$notify.error({
            title: '警告',
            message: '必须选择周次！',
            type: 'warning',
            position: 'top-left'
          })
        } else {
          this.doSearch()
        }
      },
      isInArray (arr, value) {
        for (var i = 0; i < arr.length; i++) {
          if (value === arr[i]) {
            return true
          }
        }
        return false
      },
      doSearch () {
        var _self = this
        _self.loadFlag = true
        _self.tableFlag = false
        _self.tableTh.breeder = _self.PAR_END_BREED
        _self.back = _self.backs.map(function (item, i) {
          if (_self.isInArray(_self.checked, i)) {
            return parseInt(item.back)
          } else {
            return 0
          }
        })
        console.log(_self.back)
        jQuery.ajax({
          url: '/standard/' + _self.orgCode + '/' + _self.farmOrg + '/report1',
          type: 'POST',
          //  contentType: 'application/json',
//          data: {'PAR_DATE': _self.endDate, 'PAR_ALL_BREED': _self.PAR_ALL_BREED, 'PAR_START_BREED': _self.PAR_START_BREED, 'PAR_END_BREED': _self.PAR_END_BREED, 'PAR_PERIOD_WEEKS': '1#' + _self.back1 + '#' + _self.back2 + '#' + _self.back3 + '#' + _self.back4},
          data: {'PAR_DATE': _self.endDate, 'PAR_ALL_BREED': _self.PAR_ALL_BREED, 'PAR_START_BREED': _self.PAR_START_BREED, 'PAR_END_BREED': _self.PAR_END_BREED, 'PAR_PERIOD_WEEKS': '1#' + _self.back[0] + '#' + _self.back[1] + '#' + _self.back[2] + '#' + _self.back[3]},
          dataType: 'json',
          success: function (res) {
            _self.loadFlag = false
            _self.datas = res
            _self.headers.date_column_01_min_date = res[0].date_column_01_min_date
            _self.headers.date_column_01_max_date = res[0].date_column_01_max_date
            _self.headers.date_column_acc_02_header = res[0].date_column_acc_02_header
            _self.headers.date_column_avg_02_header = res[0].date_column_avg_02_header
            _self.headers.date_column_acc_03_header = res[0].date_column_acc_03_header
            _self.headers.date_column_avg_03_header = res[0].date_column_avg_03_header
            _self.headers.date_column_acc_04_header = res[0].date_column_acc_04_header
            _self.headers.date_column_avg_04_header = res[0].date_column_avg_04_header
            _self.headers.date_column_acc_05_header = res[0].date_column_acc_05_header
            _self.headers.date_column_avg_05_header = res[0].date_column_avg_05_header
            if (res.length > 0) {
              _self.tableTh = res[0]
            }
            _self.tableFlag = true
            _self.$nextTick(function () {
              _self.tag.hHeight = jQuery('#sTable').offset().top
            })
          },
          fail: function (e) {
//            this.tableFlag = false
            alert('请求失败')
            console.log('查询失败')
          }
        })
      },
      headerMonitor () {
        var self = this
//        var hHeight = jQuery('#sTable').offset().top
        jQuery(document).scroll(function () {
          // 当滚动条达到偏移值的时候，出现固定表头
          if (jQuery(this).scrollTop() >= self.tag.hHeight - 44) {
//            console.log('++++' + jQuery(this).scrollTop())
            console.log('----' + self.tag.hHeight)
            self.fixedHeader = true
          } else {
            self.fixedHeader = false
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
.laber-info{
  width: 30%;
  font-weight:700;
  text-align: center;
}
.laber-input{
  border: 1px solid #b5bbc8;
  width: 60%;
  margin-left: 10% ;
}
@media screen and (max-width: 768px){
  .xs-pd{
    padding: 3px;
  }
}
  #sTable{
    min-width: 900px;
  }
  #fHeader{
    min-width: 900px;
    position: fixed;
    border-top: none;
    top: 50px;
    left: 1px;
    z-index:11;
    background-color: #fff;
  }
  #fHeader tr:nth-child(1) th:nth-child(1),#sTable tr:nth-child(1) th:nth-child(1){
    width: 14%;
    min-width: 180px;
  }
  #fHeader tr:nth-child(1) th:not(:first-child),#sTable tr:nth-child(1) th:not(:first-child){
    width: 8.6%;
    min-width: 90px;
  }
  div.form-control {
    height:auto;
  }
</style>
