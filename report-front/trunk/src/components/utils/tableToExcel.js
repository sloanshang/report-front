//  导出表格数据
export default{
  install (Vue, options) {
    Vue.prototype.tableToExcel = function (table) {
      var orgInf = '<div><span>' + this.$t('message.Farm') + ':' + this.orgCode + '#' + this.farmOrg + '</span>'
      orgInf += '<span>&nbsp;&nbsp;' + this.$t('message.Date') + ':' + this.startDate + '</span>'
      orgInf += '<span>&nbsp;&nbsp;' + this.endDate + '</span>'
      orgInf += '<span>&nbsp;&nbsp;' + this.$t('message.GroupID') + ':' + this.batch + '&nbsp;' + this.flock + '</span>'
      orgInf += '</div>'
      orgInf += '<h1 style="font-size: 1.5em;">&nbsp;' + document.getElementById('tabletitle').innerHTML + '</h1>'
      var uri = 'data:application/vnd.ms-excel;base64,'
      var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      if (!table.nodeType) {
        table = document.getElementById('tableContent')
      }
      var ctx = {worksheet: name || 'Worksheet', table: orgInf + table.innerHTML}
      var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      }
      var format = function (s, c) {
        return s.replace(/{(\w+)}/g,
          function (m, p) {
            return c[p]
          })
      }
      document.getElementById('dlink').href = uri + base64(format(template, ctx))
      document.getElementById('dlink').download = this.filename
/*      window.location.href = uri + base64(format(template, ctx)) */
    }
  }
}
