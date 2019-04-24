<template>
  <el-select v-model="value6" placeholder="TOTAL" @change="getVariety">
    <el-option :disabled="true" :value="null">
      <span style="float: left;font-weight: bold">{{$t('swineReport.breedCo')}}&nbsp;&nbsp;</span>
      <span style="float: right; color: #8492a6; font-size: 13px; font-weight: bold">{{$t('swineReport.breedName')}}&nbsp;</span>
    </el-option>
    <el-option v-for="item in res" :key="item.PRODUCTID" :label="item.PRODUCTNAME" v-bind:value="item.PRODUCTID">
      <span style="float: left; color: #8492a6; font-size: 13px">{{ item.PRODUCTID }}</span>
      <span style="float: right">{{ item.PRODUCTNAME }}</span>
    </el-option>
  </el-select>

</template>

<script>
  import jQuery from 'jquery'
  export default {
    props: ['orgCode', 'farmOrg'],
    data () {
      return {
        res: [],
        value6: ''
      }
    },
    mounted () {
      var _self = this
      console.log(this.orgCode)
      jQuery.ajax({
        url: '/standard/' + _self.orgCode + '/breedTypeByOrg',
        type: 'GET',
        contentType: 'application/json',
        // dataType: 'json',
        success: function (res) {
          _self.res = res
          _self.res.splice(0, 1)
        }
      })
    },
    methods: {
      getVariety (item) {
        var _self = this
        _self.$emit('getVariety', item)
      }
    }
  }
</script>

<style>

</style>
