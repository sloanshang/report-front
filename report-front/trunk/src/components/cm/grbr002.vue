<template>
  <el-select v-model="value6" placeholder="请选择" @change="getGroup">
    <el-option style="width: auto" :disabled="true" :value="null">
      <span style="float: left;font-weight: bold">周次&nbsp;&nbsp;</span>
      <span style="float: left; color: #8492a6; font-size: 13px; font-weight: bold"> &nbsp;开始日期&nbsp;&nbsp;</span>
      <span style="float: right; color: #8492a6; font-size: 13px; font-weight: bold"> 结束日期&nbsp;</span>
    </el-option>
    <el-option v-for="item in groupList" :key="item.mateGroup" :label="item.mateGroup" v-bind:value="item.weekEndDate">
      <span style="float: left">{{ item.mateGroup }}&nbsp;&nbsp;</span>
      <span style="float: left; color: #8492a6; font-size: 13px"> {{ item.weekStartDate }} &nbsp;&nbsp;</span>
      <span style="float: right; color: #8492a6; font-size: 13px"> {{ item.weekEndDate }} </span>
    </el-option>
  </el-select>
</template>

<script>
  import jQuery from 'jquery'
  export default {
    props: ['orgCode', 'farmOrg', 'device'],
    data () {
      return {
        groupList: [],
        value6: ''
      }
    },
    created: function () {
      var _self = this
      _self.getWeekYearly()
    },
    methods: {
      getWeekYearly () {
        var _self = this
        jQuery.ajax({
          url: '/standard/' + _self.orgCode + '/' + _self.farmOrg + '/getWeekYearly',
          type: 'GET',
          //  contentType: 'application/json',
          dataType: 'json',
          success: function (res) {
            console.log(res)
            _self.groupList = res
          },
          fail: function (e) {
//            this.tableFlag = false
            alert('请求失败')
            console.log('查询失败')
          }
        })
      },
      getGroup (item) {
        var _self = this
        _self.$emit('getEndGroup', item)
      }
    }
  }
</script>

<style>

</style>
