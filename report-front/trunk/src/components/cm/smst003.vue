<template>
  <div class="content-wrapper" style="margin-left:0">
    <section class="content">
      <vue-loading v-show="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '100px', height: '100px' }"></vue-loading>
      <div class="row" v-show="!loadFlag">
        <!--给下面的div增加v-show="menu.isShow" 可以实现权限-->
        <div class="col-sm-12 col-md-12"  v-for="menu in menus" v-show="menu.isShow">
          <div class="box box-info box-solid" style="margin-bottom: 70px;">
            <div class="box-header with-border">
              <h3 class="box-title">{{menu.group}}</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-footer no-padding">
              <ul class="nav nav-pills nav-stacked">
                <li v-for="(item,index) in menu.links" key="index" @click="changeUrl(item)">
                  <!--给下面的div增加 v-show = "item.isAllow" 可以实现权限-->
                  <router-link :to="item.link"  style="text-align: left;" v-show = "item.isAllow">
                    <i class="fa fa-circle-o " :class="{'text-yellow': item.link != '#'}"></i>
                    {{item.title}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- /.box -->
        </div>
        <p v-show="noP" style="text-align: center;font-size: 24px">暂无权限</p>
      </div>
    </section>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import vueLoading from 'vue-loading-template'
  export default {
    props: ['orgCode', 'farmOrg'],
    components: {
      vueLoading
    },
    data () {
      return {
        loadFlag: true,
        noP: true,
        menus: [
          {
            group: this.$t('message.SpiReport'),
            isShow: false,
            links: [
              {
                title: this.$t('message.titleSpiReport01'),
                link: '/spiReport01/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8004001'
              },
              {
                title: this.$t('message.titleSpiReport02'),
                link: '/spiReport02/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8004002'
              }
            ]
          }
        ]
      }
    },
    methods: {
      changeUrl (item) {
        jQuery.ajax({
          url: '/grower/saveLog',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({'menuId': item.id, 'menuTitle': item.title, 'programCode': '8004', 'orgCode': this.orgCode, 'farmOrg': this.farmOrg}),
          dataType: '',
          success (data) {
          }
        })
      }
    },
    mounted () {
      var _self = this
      jQuery.ajax({
        url: '/breeder/' + _self.orgCode + '/' + _self.farmOrg + '/menu',
        type: 'GET',
        dataType: '',
        success (data) {
          _self.loadFlag = false
          console.log(data)
          let arr = []
          for (var i = 0; i < data.length; i++) {
            var obj = data[i]
            arr.push(obj.id)
          }
          for (var p = 0; p < _self.menus[0].links.length; p++) {
            var links = _self.menus[0].links[p]
            if (arr.indexOf(links.id) >= 0) {
              links.isAllow = true
              _self.menus[0].isShow = true
              _self.noP = false
            }
          }
        }
      })
    }
  }
</script>

