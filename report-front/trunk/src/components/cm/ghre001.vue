<template>
    <div class="row clearfix">
      <div class="col-md-12 column"  style="margin: 10px">
        <div class="row clearfix">
          <div class="col-md-3 column">
            <div class="input-group" style="padding-bottom: 2px">
              <span class="input-group-addon">{{$t('message.Farm')}}：</span>
              <input  class="form-control" type="text" name="text" v-bind:value="orgCode + ' ' + farmOrg " readonly size="12" maxlength="50" laceholder="twitterhandle">
            </div>
          </div>

          <div class="col-md-2 column">
            <dtre001  style="float:left; padding-right:2px" v-on:changeDate="doChangeStart"/>
          </div>
          <div class="col-md-2 column">
            <dtre002  style="float:left; padding-right:2px" v-on:changeDate="doChangeEnd"/>
          </div>
          <div class="col-md-5 column">
            <div class="input-group" style="float:left;padding-right:2px" >
              <span class="input-group-addon">{{$t('message.GroupID')}}：</span>
              <!--<input  class="form-control" type="text" name="text" v-bind:value="batch"-->
                      <!--size="12" maxlength="50" laceholder="twitterhandle">-->
              <select class="form-control"  v-model="flo">
                <option value="">----{{$t('message.SelectFlock')}}----</option>
                <option  class="test" v-for="fl in flock"  v-bind:value="fl">{{fl.FARM_NAME}}&nbsp;&nbsp;{{fl.START_DATE | formatDate}}&nbsp;---&nbsp;{{fl.END_DATE | formatDate}}</option>
              </select>
              <span class="input-group-btn">
                    <button class="btn btn-primary" type="button"@click="doSearch" >{{$t('message.Query')}}</button>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import Dtre001 from '@/components/cm/dtre001'
  import Dtre002 from '@/components/cm/dtre002'
  import jQuery from 'jquery'
  import {formatDate} from '@/components/utils/date'

  export default {
    props: ['orgCode', 'farmOrg', 'begin', 'end', 'autoSearch'],
    components: {
      Dtre001,
      Dtre002
    },
    data () {
      return {
        'beginDate': this.update || new Date(new Date().setTime(new Date().getTime() - 365 * 100 * 3600 * 24 * 1000)),
        'endDate': this.end || new Date(new Date().setTime(new Date().getTime() + 365 * 100 * 3600 * 24 * 1000)),
        'flock': [],
        'batch': '',
        'flo': ''
      }
    },
    watch: {
      flo: function (val) {
        this.batch = val
        console.log(this.batch)
        this.doSearch()
      }
    },
    created () {
      console.log(this.orgCode + this.farmOrg)
    },
    mounted () {
      console.log('mounted')
      if (this.autoSearch === true) {
        this.doSearch()
      }
//      console.log(222222)
//      console.log(this.beginDate, this.endDate)
      this.beginDate = formatDate(this.beginDate, 'dd/MM/yyyy')
      this.endDate = formatDate(this.endDate, 'dd/MM/yyyy')
//      console.log('00000000000000000000000000000----------------')
//      console.log(this.beginDate)
//      console.log(this.endDate)
      this.doFlockSearch()
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      doChangeStart (d) {
//        console.log('changeStart to ' + d)
        this.beginDate = d
        this.beginDate = formatDate(this.beginDate, 'dd/MM/yyyy')
        this.$emit('update:begin', d)
        this.doFlockSearch()
      },
      doChangeEnd (d) {
//        console.log('changeEnd to ' + d)
        this.endDate = d
        this.endDate = formatDate(this.endDate, 'dd/MM/yyyy')
        this.$emit('update:end', d)
        this.doFlockSearch()
      },
      // 通过日期查询批次
      doFlockSearch () {
        var _self = this
        jQuery.ajax({
          url: 'grower/report/SWFN/query',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({'orgCode': _self.orgCode, 'farmOrg': _self.farmOrg, 'dateStart': _self.beginDate, 'dateEnd': _self.endDate}),
          dataType: 'json',
          success: function (res) {
            _self.flock = res.datas[9001.01].datas
          },
          fail: function (e) {
            console.log('查询失败')
          }
        })
      },
      /* 查询该页面表格信息 */
      doSearch () {
//        console.log('doBatchSearch' + this.batch)
        var _self = this
        console.log('---------------------查询批次的时间')
        console.log(_self.beginDate)
        console.log(_self.endDate)
        this.$emit('getData', _self.batch)
      }
    }
  }
</script>
