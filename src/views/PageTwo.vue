<template>
<div>
<!--  <template>-->
<!--    <el-button :plain="true" @click="success">成功</el-button>-->
<!--    <el-button :plain="true" @click="fail">失败</el-button>-->
<!--  </template>-->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="学生姓名" prop="name">
      <el-input v-model="ruleForm.name" style="width: 40%"></el-input>
    </el-form-item>
    <el-form-item label="学生密码" prop="password">
      <el-input v-model="ruleForm.password" style="width: 40%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "PageTwo",
  data() {
    return {
       ruleForm: {
        name: '',
        password:''
      },
      rules: {
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          {required:true,message:'请输入密码',trigger: 'blur'},
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    //ref="ruleForm" 这是formName，在click事件中使用
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/student/register",_this.ruleForm).then(function (resp) {
            if(resp.data=='success'){
              //弹窗
              _this.$alert(_this.ruleForm.name+' 添加成功', '确认', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/search');
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });

              //设置路由跳转 _this.$router这是当前的路由
            }else{
              _this.$message.error('错了哦，用户已存在');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>

</style>
