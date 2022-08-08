// 面包屑修改
<template>
  <div>
    <div class="pageTitleBox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">

            <el-breadcrumb-item>
              <router-link :to="{path:address}">
                {{menutitle}}
              </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item  v-for="(item,i) in breadList" :key="i" class="breadcrumb-list">
              <span @click="breadCrumbLink(item)">{{item.query.name}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {isEmpty} from "../../../util/tool";

  export default {
    data() {
      return {
        address:'',
        menutitle:'',
        breadList:[],
      };
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.menutitle = this.$route.meta.title;
        this.address = this.$route.meta.address;
        if(this.$route.query.type!='client'){
          this.breadcrumbMenu();
        }
      }
    },
    created() {
      this.address = this.$route.meta.address;
      this.menutitle = this.$route.meta.title;
      this.breadList = JSON.parse(sessionStorage.getItem("breadcrumb"));
      if(this.$route.query.type!='client'){
        this.breadcrumbMenu();
      }

    },
    methods: {
      breadcrumbMenu(){
        var that = this;
        if(isEmpty(that.breadList) == false){
          for(var i=0; i<that.breadList.length; i++){
            if(that.breadList[i].query.id == that.$route.query.id){
              that.breadList.splice(i+1,1);
              return;
            }
          }
        }
        if(isEmpty(that.$route.query.id) == false){
          that.breadList.push({
            path: that.$route.path,
            query: {
              id: that.$route.query.id,
              name: that.$route.query.name,
              depth: that.$route.query.depth,
            }
          })
        }else{
          that.breadList = []
        }
        sessionStorage.setItem("breadcrumb", JSON.stringify(that.breadList));
      },
      breadCrumbLink(item){//点击面包屑的事件
        var that = this;
        //debugger
        that.breadList.forEach(function (v,i) {
          if(v.query.id == item.query.id && i!= that.breadList.length-1){
            that.breadList.splice(i,that.breadList.length-i);
            that.$router.push({path: item.path,
              query: {
                id:item.query.id,
                name:item.query.name,
                depth:item.query.depth
              }
            });
          }
        });
      },
      goBack(){
        //this.$router.replace({path: '/classify'});
      }

    },
    computed:{

    },
  }
</script>

<style scope>

</style>
