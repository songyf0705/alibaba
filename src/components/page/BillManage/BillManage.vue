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
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addAccountBtn()">添加账单</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="serial"
            label="账单编号">
          </el-table-column>

          <el-table-column
            prop="billName"
            label="账单名称">
          </el-table-column>

          <el-table-column
            prop="billIn"
            label="转账来源">
          </el-table-column>
          <el-table-column
            prop="billOut"
            label="转账去向">
          </el-table-column>
          <el-table-column
            prop="billMoney"
            label="转账金额">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
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
    <!--添加用户-->
    <add-bill v-if="addFlag"
                 v-model="addBillFlag"
                 :isEdit="isEdit"
                 :rowData="rowData"
                 @updateTableData="getTableData"
    ></add-bill>
  </div>
</template>

<script>
  import {isEmpty, timestampToTime} from '@/util/tool'
  import AddBill from './AddBill'

  export default {
    components: {AddBill},
    data() {
      return {
        tableData: [],
        totalRecord: 0,
        pageNo: 1,
        page: 1,
        totalPages: 0,
        client: '', //父页面获取的id
        addBillFlag: false,
        isEdit: false,
        rowData: null
      }
    },
    mounted() {
      this.client = this.$route.query.id;
      this.getTableData(this.page)
    },
    methods: {
      addAccountBtn() { // 添加
        this.addBillFlag = true;
      },
      handlePageChange(val) {
        this.page = val;
        this.getTableData(val);
      },

      /*数据列表*/
      getTableData: function (page) {
        var that = this;
        that.$get(`${global.server}/transferAccount/getAll`)
          .then(({data}) => {
            this.tableData = data
            this.totalRecord = data.length
          })
      },
      editData(row) {
        this.rowData = row;
        this.isEdit = true;
        this.addBillFlag = true;
      },
      delData(item) {
        let that = this;
        that.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$get(`${global.server}/transferAccount/delete/${item.uuid}`)
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



