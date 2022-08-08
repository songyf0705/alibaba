<template>
  <div class="header">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-demo"
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="logo fl">
        <img src="/static/images/logo.png" alt="">
        <span>账单管理系统</span>
      </div>
      <!--导航菜单-->
      <div v-for="(item,ii) in items" :key="ii" class="navItem">
        <el-menu-item :title="item.title" :key="ii" :index="item.index" @click="menutitle">{{item.title}}</el-menu-item>
      </div>
      <!--用户-->
      <div class="fr user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="va" src="/static/images/logo.png" alt="">
            {{username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="btn-box" @click="logout">
                <span>退出登录 </span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </el-menu>

  </div>
</template>
<style>

</style>
<script>
  export default {
    data() {
      return {
        username: sessionStorage.username,
        items: [
          {
            index: "/BillManageTab",
            title: "账单管理",
            role: ["SUPER_ADMIN"]
          }

        ]
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path;
      }
    },
    methods: {
      logout(){
        sessionStorage.clear();
        this.$post(`${global.server}/userLogin/logout`).then(({data}) => {
          if (data.state) {
            this.$router.push('/login');
            this.$message({showClose: true, type: 'success', message: data.errormsg});
          } else {
            this.$message({showClose: true, type: 'error', message: data.errormsg});
          }
        })
      },
      menutitle(e) {

      },
    },

  };
</script>
