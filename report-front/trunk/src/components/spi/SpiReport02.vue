<template>
  <div class="row" id="pdfDom" style="padding: 50px 16px;background-color:#fff;">
    <el-button @click="doSearch">doSearch</el-button>
    <el-table v-loading="loadFlag"  stripe border fit :data="datas.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="BREEDER_NAME" label="品系" > </el-table-column>
      <el-table-column prop="SWINE_TRACK" label="母猪id" > </el-table-column>
      <el-table-column prop="CURRENT_PARITY" label="当前胎次" > </el-table-column>
      <el-table-column prop="FARROW_DATE" label="上次分娩时间" > </el-table-column>
      <el-table-column prop="BVSP" label="BVSP" > </el-table-column>
      <el-table-column prop="RANK" label="排名" > </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="20" :pager-count="11" :total="total"  @current-change="current_change"  style="width: 100%;text-align: right">
    </el-pagination>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import Dtre003 from '@/components/cm/dtre003'
  import Variety002 from '@/components/cm/variety002'
  import Weekse001 from '@/components/cm/weekse001'
  import vueLoading from 'vue-loading-template'
  import df from 'dateformat'

  export default {
    props: ['orgCode', 'farmOrg', 'device', 'language'],
    name: 'swineReport01',
    components: {
      Dtre003,
      Variety002,
      Weekse001,
      vueLoading
    },
    data () {
      return {
        farmName: this.farmOrg,
        loadFlag: false,
        breed: '02',
        datas: [],
        total: 0,
        pagesize: 5,
        currentPage: 1
      }
    },
    mounted () {
      this.doSearch()
    },
    methods: {
      current_change (currentPage) {
        this.currentPage = currentPage
      },
      doSearch () {
        var _self = this
        _self.loadFlag = true
        jQuery.ajax({
          url: '/report/' + _self.orgCode + '/' + _self.farmOrg + '/get_report',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({'startDate': df(new Date(), 'yyyy-mm-dd'), 'endDate': df(new Date(), 'yyyy-mm-dd'), 'gdType': ['SWBD0101'], 'gdCode': ['1001'], 'breeder': _self.breed, 'datasFlag': '1'}),
          dataType: 'json',
          success: function (res) {
            _self.loadFlag = false
            _self.datas = res
            _self.total = res.length
          },
          complete: function (res) {
            _self.loadFlag = false
            if (res.status !== 200) {
//              alert(res.status)
            }
          }
        })
      },
      getExcel () {},
      getPdf () {}
    }
  }
</script>

<style>

</style>
