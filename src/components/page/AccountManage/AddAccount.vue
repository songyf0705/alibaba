<!--
 * @Author: LaMando
 * @Date: 2020-2-22
 * @LastEditors: LaMando
 * @Description: 账单管理-账号管理-添加用户
 -->
<template>
  <el-dialog
    v-model="dialogFlag" :title="isEdit ? '编辑账户' : '添加用户'"
    :visible.sync="dialogFlag"
    :close-on-click-modal=false
    :close-on-press-escape=false
    width="600px"
  >
    <el-form :model="form" ref="form" :rules="rules" class="addOrgan">
      <el-form-item label="用户名:" :label-width="formLabelWidth" prop="loginName">
        <el-input v-model="form.loginName" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否是管理员:" :label-width="formLabelWidth" prop="isSuper">
        <el-radio-group v-model="form.isSuper">
          <el-radio :label="1" :value="1">是</el-radio>
          <el-radio :label="0" :value="0">否</el-radio>
        </el-radio-group>
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
          loginName: '',
          password: '',
          isSuper: 1
        },
        axiosUrl: '/userInfo/save',
        rules: {
          loginName: [
            {required: true, message: "请输入内容", trigger: "blur"},
          ],
          password: [
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
            this.axiosUrl = '/userInfo/update'
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

