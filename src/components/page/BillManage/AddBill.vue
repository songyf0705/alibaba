<!--
 * @Author: LaMando
 * @Date: 2020-2-22
 * @LastEditors: LaMando
 * @Description: 账单管理-账号管理-添加用户
 -->
<template>
  <el-dialog
    v-model="dialogFlag" :title="isEdit ? '编辑账单' : '添加账单'"
    :visible.sync="dialogFlag"
    :close-on-click-modal=false
    :close-on-press-escape=false
    width="600px"
  >
    <el-form :model="form" ref="form" :rules="rules" class="addOrgan">
      <el-form-item label="账单编号:" :label-width="formLabelWidth" prop="serial">
        <el-input v-model="form.serial" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="账单名称:" :label-width="formLabelWidth" prop="billName">
        <el-input v-model="form.billName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="转账来源:" :label-width="formLabelWidth" prop="billIn">
        <el-input v-model="form.billIn" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="转账去向:" :label-width="formLabelWidth" prop="billOut">
        <el-input v-model="form.billOut" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="转账今额:" :label-width="formLabelWidth" prop="billMoney">
        <el-input v-model="form.billMoney" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth" prop="loginName">
        <el-input v-model="form.remark" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin: 0">
      <el-button @click="dialogFlag = false">取 消</el-button>
      <el-button type="primary" @click="saveData()">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {intersectObj} from '@/util/tool'

  export default {
    components: {},
    data() {
      return {
        dialogFlag: false,
        formLabelWidth: '120px',
        form: {
          serial: '',
          billName: '',
          billIn: '',
          billOut: '',
          billMoney: '',
          remark: '',
        },
        axiosUrl: '/transferAccount/save',
        rules: {
          serial: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          billName: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          billIn: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          billOut: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          billMoney: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          remark: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],

        },
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      rowData: {
        type: Object,
        default: null
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.dialogFlag = val;
        }
      },
      dialogFlag(val) {
        this.$emit('input', val);
      }
    },
    created() {
      if (this.isEdit) { // 编辑
        this.form = intersectObj(this.form, this.rowData)
      }
    },
    mounted() {
    },
    methods: {
      saveData() {
        this.$refs.form.validate(valid => {
          if (!valid) {
            return
          }
          if (this.isEdit) {
            this.axiosUrl = '/transferAccount/update'
            this.form.uuid = this.rowData.uuid
          }
          this.$post(`${global.server}${this.axiosUrl}`, this.form).then(({data}) => {
            if (data.state) {
              this.$message({showClose: true, type: 'success', message: data.errormsg});
              this.dialogFlag = false
              this.$emit('updateTableData')
            } else {
              this.$message({showClose: true, type: 'error', message: data.errormsg});
            }
          })
        })
      }
    }
  }
</script>
<style>

</style>

