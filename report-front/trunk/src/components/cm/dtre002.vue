<template>
  <!-- 日期框 -->
  <div class="input-group" style="padding-bottom: 2px">
    <div class="input-group-addon">
      <i class="fa fa-calendar"></i>
    </div>
    <input type="text"  v-model="displayDate"  :id="localId"  class="form-control pull-left dateSelect" style="width:100%" readonly="readonly" placeholder="选择日期">
    <div class="input-group-addon"  style="cursor: pointer"  @click="deleteTime">
      <i class="fa fa-remove"></i>
    </div>
  </div>
</template>
<script>
  import jQuery from 'jquery'
  import df from 'dateformat'

  export default {
    // 如果readOnly传入true，那么日期框将不可编辑；默认为false
    // 如果useToday传入true，那么在未设置初始值的情况下，将自动设为今天，否则为空；默认为true
    props: ['date', 'readOnly', 'useToday', 'id'],
    data () {
      // 为当前的日期组件生成一个随机的id，避免页面内出现多个日期组件时出现id冲突的情形
      var localId = this.id
      if (!localId) {
        localId = 'DATE' + Math.random().toString(36).substring(2)
      }
      return {
        innerDate: this.date,
        format: 'yyyy-mm-dd',
        localId: localId
      }
    },
    computed: {
      defaultValue () {
        return ''
      },
      displayDate () {
        var d = this.innerDate || this.defaultValue
        console.log('displayDate = ' + d)
        if (d === '') {
          return this.$t('message.SelectEndDate')
        }
        return df(d, this.format)
      }
    },
    mounted () {
      var _self = this
      console.log('this.readOnly = ' + this.readOnly)
      if (!this.readOnly) {
        console.log('localId = ' + this.localId)
        jQuery('#' + this.localId).datepicker({
          autoclose: true,
          format: this.format
        }).on('changeDate', function (e) {
          var d = e.date
          _self.innerDate = d
          _self.$emit('changeDate', d)
        })
      }
    },
    methods: {
      deleteTime () {
        var _self = this
        _self.innerDate = ''
        var d = new Date(new Date().setTime(new Date().getTime() + 365 * 100 * 3600 * 24 * 1000))
        _self.$emit('changeDate', d)
      }
    }
  }
</script>

