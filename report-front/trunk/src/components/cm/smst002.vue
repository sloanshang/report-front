<template>
  <div class="content-wrapper" style="margin-left:0">
    <section class="content">
      <vue-loading v-show="loadFlag" type="spiningDubbles" color="#3c8dbc" :size="{ width: '100px', height: '100px' }"></vue-loading>
      <div class="row" v-show="!loadFlag">
        <!--给下面的div增加v-show="menu.isShow" 可以实现权限-->
        <div class="col-sm-12 col-md-12"  v-for="menu in menus" v-if="menu.isShow" >
          <div class="box box-info box-solid" style="margin-bottom: 70px">
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
                <li v-for="item in menu.links" key="index" @click="changeUrl(item)">
                  <!--给下面的div增加 v-show = "item.isAllow" 可以实现权限-->
                  <router-link :to="item.link"  style="text-align: left;" v-if = "item.isAllow">
                    <i class="fa fa-circle-o " :class="{'text-yellow': item.link != '#'}"></i>
                    {{item.title}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- /.box -->
        </div>
        <p v-show="noP" style="text-align: center;font-size: 24px;">暂无权限</p>
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
            group: this.$t('message.SwineReport'),
            isShow: false,
            links: [
              {
                title: '1.' + this.$t('message.titleSwineReport01'),
                link: '/swineReport01/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002001'
              },
              {
                title: '2.' + this.$t('message.titleSwineReport02'),
                link: '/swineReport02/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002002'
              },
              {
                title: '3.' + this.$t('message.titleSwineReport03'),
                link: '/swineReport03/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002003'
              },
              {
                title: '4.' + this.$t('message.titleSwineReport04'),
                link: '/swineReport04/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002004'
              },
              {
                title: '5.' + this.$t('message.titleSwineReport05'),
                link: '/swineReport05/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002005'
              },
              {
                title: '6.' + this.$t('message.titleSwineReport06'),
                link: '/swineReport06/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002006'
              },
              {
                title: '7.' + this.$t('message.titleSwineReport07'),
                link: '/swineReport07/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002007'
              },
              {
                title: '8.' + this.$t('message.titleSwineReport08'),
                link: '/swineReport08/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002008'
              },
              {
                title: '9.' + this.$t('message.titleSwineReport09'),
                link: '/swineReport09/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002009'
              },
              {
                title: '11.' + this.$t('message.titleSwineReport11'),
                link: '/swineReport11/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002011'
              },
              {
                title: '12.' + this.$t('message.titleSwineReport12'),
                link: '/swineReport12/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002012'
              },
              {
                title: '13.' + this.$t('message.titleSwineReport13'),
                link: '/swineReport13/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002013'
              },
              {
                title: '14.' + this.$t('message.titleSwineReport14'),
                link: '/swineReport14/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002014'
              },
              {
                title: '15.' + this.$t('message.titleSwineReport15'),
                link: '/swineReport15/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002015'
              },
              {
                title: '16.' + this.$t('message.titleSwineReport16'),
                link: '/swineReport16/' + this.orgCode + '/' + this.farmOrg,
                isAllow: false,
                id: '8002016'
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
          data: JSON.stringify({'menuId': item.id, 'menuTitle': item.title, 'programCode': '8002', 'orgCode': this.orgCode, 'farmOrg': this.farmOrg}),
          dataType: '',
          success (data) {
          }
        })
      }
    },
    mounted () {
      var _self = this
      jQuery.ajax({
        url: '/standard/' + _self.orgCode + '/' + _self.farmOrg + '/menu',
        type: 'GET',
        dataType: '',
        success (data) {
          _self.loadFlag = false
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

