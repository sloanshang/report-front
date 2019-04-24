<template>
  <dtre002 :readOnly="readOnly" :useToday="useToday" :date="inputDate"  v-on:changeDate="changeDate" class="col-xs-12 col-sm-6 col-md-4"/>
</template>
<script>
import Dtre002 from '@/components/cm/dtre002'
import {setCookie} from '@/components/utils/cookie'

export default {
  name: 'VInputDate',
  components: {
    Dtre002
  },
  props: ['readOnly', 'useToday', 'inputDate'],
  data () {
    return {}
  },
  created () {
    var date = this.inputDate || new Date()
    setCookie('currentDate', Date.parse(date))
    this.$emit('update:inputDate', date)
  },
  methods: {
    changeDate (val) {
      console.log('----------> ' + Date.parse(val))
      setCookie('currentDate', Date.parse(val))
      this.$emit('update:inputDate', val)
    }
  }
}
</script>