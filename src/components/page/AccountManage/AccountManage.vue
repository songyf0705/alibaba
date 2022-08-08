<!--
 * @Author: LaMando
 * @Date: 2020-2-19
 * @LastEditors: songyf
 * @Description: 账单管理-tab
 -->
<template>
  <div>
    <div class="pageMain">
      <div class="menuBox">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addAccountBtn()">添加用户</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="loginName"
            label="用户名">
          </el-table-column>

          <el-table-column
            prop="isSuper"
            label="是否管理员">
            <template slot-scope="scope">
              {{scope.row.isSuper === 1 ? '是' : '否'}}
            </template>
          </el-table-column>

          <el-table-column
            prop="userStatus"
            label="用户状态">
            <template slot-scope="scope">
              {{scope.row.userStatus === 1 ? '正常' : '删除'}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="160"
            label="操作">
            <template slot-scope="scope">
<!--              <el-button @click.stop="viewData(scope.row)" type="text" size="small">查看</el-button>-->
              <el-button @click.stop="editData(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click.stop="delData(scope.row)" type="text" size="small">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!--分页和数据记录-->
        <div class="table-foot">
          <div class="totalRecord-box">
            <span>共 {{totalRecord}} 条</span>
          </div>
          <el-pagination
            @current-change="handlePageChange"
            background
            layout="prev, pager, next"
            :page-count="totalPages"
            :current-page.sync="pageNo">
          </el-pagination>
          <div class="clear"></div>
        </div>

      </div>

    </div>
    <!--添加编辑用户-->
    <add-account v-if="addAccountFlag"
                 v-model="addAccountFlag"
                 :isEdit="isEdit"
                 :rowData="rowData"
                 @updateTableData="getTableData"
    ></add-account>
  </div>
</template>

<script>
  import {isEmpty, timestampToTime} from '@/util/tool'
  import AddAccount from './AddAccount'

  export default {
    components: {AddAccount},
    data() {
      return {
        tableData: [],
        addAreacodeDialogVisible: false,
        totalRecord: 0,
        pageNo: 1,
        page: 1,
        totalPages: 0,
        client: '', //父页面获取的id
        addAccountFlag: false,
        isEdit: false,
        rowData: null
      }
    },
    mounted() {
      this.getTableData(this.page)
    },
    methods: {
      addAccountBtn() { // 添加账号
        this.isEdit = false
        this.addAccountFlag = true;
      },
      handlePageChange(val) {
        this.page = val;
        this.getTableData(val);
      },

      /*数据列表*/
      getTableData: function (page) {
        var that = this;
        that.$get(`${global.server}/userInfo/getAll`)
          .then(({data}) => {
            this.tableData = data
            this.totalRecord = data.length
          })
      },
      viewData() {
      },
      editData(row) {
        this.rowData = row;
        this.isEdit = true;
        this.addAccountFlag = true;
      },
      delData(item) {
        let that = this;
        that.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$get(`${global.server}/userInfo/delete/${item.uuid}`)
            .then(({data}) => {
              if (data.state) {
                that.$message({showClose: true, type: 'success', message: data.errormsg});
                that.getTableData();
              } else {
                that.$message({showClose: true, type: 'success', message: data.errormsg});
              }
            })
        });
      },
    }

  }
</script>



