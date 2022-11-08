<template>
<div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="ID"  >
      <el-input placeholder="请在”查询学生”“中点击”修改“按钮" v-model="ruleForm.id" style="width: 40%" readonly></el-input>
    </el-form-item>
    <el-form-item label="学生姓名" prop="name">
      <el-input v-model="ruleForm.name" style="width: 40%"></el-input>
    </el-form-item>
    <el-form-item label="学生密码" prop="password">
      <el-input v-model="ruleForm.password" style="width: 40%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  inject: ['reload'],
  name: "PageThree",
  data() {
    return {
      ruleForm: {
        id:'',
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
          //一直跨域失败/net::ERR_FAILED原因：没改成put ，cao，正确的：this.$http.put
          this.$http.put('student/update/',_this.ruleForm).then(function (resp) {
            if(resp.data=='success'){
              //弹窗
              _this.$alert(_this.ruleForm.name+' 修改成功', '确认', {
                confirmButtonText: '确定',
                callback: action => {
                  //为什么点了确定以后不刷新 原因 ：本来就是这个页面，相当于没跳转
                  // _this.$router.push('/pageone');
                  //动态刷新语法
                  // window.location.reload() js原生
                  // this.$router.go(0) vue    缺点：整个页面重新刷新
                  this.$router.go(0)
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
  },
//created(){}写在methods外面的
  created(){
    const _this=this
    this.$http.get('/student/get/'+this.$route.query.id).then(function (resp) {
      _this.ruleForm=resp.data
    })
  }

}
</script>

<style scoped>

</style>
