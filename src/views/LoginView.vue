<template>
  <div>

<!--ruleForm是表单的所有属性-->
<!--    rules是控制校验规则的-->


        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20vh;margin-left: 60vh">


          <i class="el-icon-user" style=" font-size:150px;margin-left: 20vh;"></i>
          <el-form-item label="ID" prop="id">
            <!--        绑定ruleForm对象的属性-->
            <el-input v-model="ruleForm.id" style="width: 30%"></el-input>
          </el-form-item>
          <!--      prop="password"是rules里面的属性-->
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 6vh">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="register()">注册</el-button>
          </el-form-item>
        </el-form>

<!--    弹窗-->
    <el-dialog :visible.sync="getmessage">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10vw" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <!--        绑定ruleForm对象的属性-->
          <el-input v-model="ruleForm.name" style="width: 40%"></el-input>
        </el-form-item>
        <!--      prop="password"是rules里面的属性-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 1vh">
          <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>





  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      //弹窗
      getmessage:false,

      ruleForm: {
        id: '',
        password:'',
        name:''
      },
      rules: {
        id: [
          { required: true, message: '请输入管理员id', trigger: 'blur' },
        ],
        password:[
          {required:true,message:'请输入密码',trigger: 'blur'},
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
        ],
        name:[
          {required:true,message:'请输入用户名',trigger: 'blur'},
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    loginsuccess() {
      this.$message({
        showClose: true,
        message: '恭喜你，登录成功',
        type: 'success'
      });
    },
    loginfail() {
      this.$message({
        showClose: true,
        message: '错了哦，登录失败',
        type: 'error'
      });
    },
    //ref="ruleForm" 这是formName，在click事件中使用
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/manager/login",_this.ruleForm).then(function (resp) {
            //后端查询不到则resp.data为""
            if(resp.data!=""){
              //把json转换成字符串存到localstorage里面
              //键值对
              localStorage.setItem('permit',JSON.stringify(resp.data));
              _this.loginsuccess();
              _this.$router.push('/search');
            }else{
              _this.loginfail();
            }
          })
        } else {
          return false;
        }
      });
    },
    register() {
      this.getmessage = true
    },
    registerForm(formName){
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/manager/register",_this.ruleForm).then(function (resp) {
            if(resp.data.id!=undefined){
              //注册成功
              //把json转换成字符串存到localstorage里面
              //键值对
              console.log(resp.data)
              _this.ruleForm.id=resp.data.id
              _this.$alert('管理员： '+_this.ruleForm.name+'  添加成功'+' 您的ID是： '+resp.data.id, '确认', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/login');
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }else{
              _this.$alert('该用户名已被占用', '确认', {
                confirmButtonText: '重新输入',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }
          })
        } else {
          return false;
        }
      });
    }
    //以下代码无用处可删
    //created(){}是这个view一被加载就执行的
    // created(){
    //   //这里的this指的是Window不是vue，所以要在外层指定一下_this是vue对象
    //   const _this=this
    //   this.$http.get('/student/get/'+this.$route.query.id).then(function (resp) {
    //     _this.ruleForm=resp.data
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
