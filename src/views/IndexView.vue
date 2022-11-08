<template>
<!--  这是pageone/two/three页面的公共部分-->
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:90vh">
        <!--      <el-menu>标签  添加router属性-->
        <!--        在页面忠添加<router-view>，动态渲染 你的router-->
        <!--      <el-menu-item>标签的index值就是要跳转的router  -->
        <el-menu router :default-openeds="['0','1']" >
<!--     $router.options.routes 遍历index.js里面的所有路由     -->
          <el-submenu :key="index" v-for="(item,index) in $router.options.routes" :index="index+''" >
            <template slot="title"><i class="el-icon-setting "></i>{{item.name}}</template>
            <!--     in item.children 遍历父路由里面的所有子路由     -->
            <!--            根据index的值来跳转-->
            <el-menu-item :key="index1" v-for="(item1,index1) in item.children" :index="item1.path" :class="$route.path==item1.path?'is-active':'' " >{{item1.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="height: 600px">
        <el-header style="text-align: right; font-size:15px">

          <el-button type="text" @click="dialogVisible = true">注销</el-button>
          <el-dialog
              :visible.sync="dialogVisible"
              width="25%"
              top="10vh"
              :before-close="handleClose"
              center="true"
          >
            <span style="font-size: 20px;margin-right: 5vw;">是否注销该管理员账号</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="logoff(),dialogVisible = false">确 定</el-button>
             </span>
          </el-dialog>
<!--          管理员栏-->
          <span>
            <i class="el-icon-user" style="font-size: 18px"></i>
            管理员：{{name}}
          </span>
        </el-header>

        <el-main style="height: 600px">
<!--          在这里显示子路由的组件-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>

</template>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

</style>
<script>
export default {
  name:'IndexView',
  props:["show"],
  data() {
    return {
      name:'',
      tableData: null,
      dialogVisible: false
    };
  },
  created() {
    this.name=JSON.parse(localStorage.getItem('permit')).name
  },
  methods: {
    logoff(){
      const _this=this;
      this.$http.delete("/manager/delete/"+JSON.parse(localStorage.getItem('permit')).id);
      _this.$router.push('/login');
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(() => {});
    }
  }
};
</script>

