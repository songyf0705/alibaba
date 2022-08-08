<!--
 * @Author: LaMando
 * @Date: 2020-2-19
 * @LastEditors: songyf
 * @Description: 账单管理-tab
 -->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="accountManage">
      <account-manage  v-if="activeName === 'accountManage'"
      ></account-manage>
    </el-tab-pane>
    <el-tab-pane label="账号管理" name="billManage">
      <bill-manage  v-if="activeName === 'billManage'"></bill-manage>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import AccountManage from "@/components/page/AccountManage/AccountManage";
  import BillManage from "@/components/page/billManage/BillManage";
  export default {
    components: {AccountManage, BillManage},
    data() {
      return {
        activeName: 'accountManage'
      };
    },
    methods: {
    }
  };
</script>
