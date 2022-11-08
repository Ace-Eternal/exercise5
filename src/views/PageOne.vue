<template>
<div>
  <!--          搜索框-->
  <div style="margin-bottom: 15px">
    <el-input placeholder="请输入内容" v-model="searchForm.input" class="input-with-select" style="width:auto">
      <el-select v-model="searchForm.select" slot="prepend" placeholder="请选择" style="width: 90px">
        <el-option label="ID" value="1"></el-option>
        <el-option label="姓名" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
  </div>

  <el-table
      :data="tableData"
      border
      style="width: 100%">
<!--    width设置为auto自动填满表格-->
    <el-table-column
        fixed
        prop="id"
        label="ID"
        width="auto">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="auto">
    </el-table-column>
    <el-table-column
        prop="password"
        label="密码"
        width="auto">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="auto">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
      page-size="8"
      :total="total"
      @current-change="page"
      v-if="display"
  >
  </el-pagination >
</div>
</template>

<script>
export default {
  name: "PageOne",
  methods: {
    //弹窗进不来，原因：delete是关键字，换名字
    deleteStudent(row){
      const _this=this;
      //跳转页面携带参数用row--query--id
      //row就是对象了，直接row.id就行
      //delete/  注意这个/没有的话就成了student/delete1(1是id)
      this.$http.delete( 'student/delete/'+row.id).then(function (resp) {
            if(resp.data=='success'){
              //弹窗
              _this.$alert(row.name+' 删除成功', '确认', {
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
              _this.$message.error('错了哦，删除失败');
            }
    })
    },
    edit(row){
      //打印得知 row就是这行的对象
      // console.log(row);
      //先跳转到页面然后像这上面一样动态加载数据
      //这里不用const _this=this，之前的是在回调，this指别的不指vue，得用
      //跳转的同时传参
      this.$router.push({
        path:'/update',
        query:{
           id:row.id
        }
      })
    },
    page(currentpage){
      //currentrpage是文档里面提到的属性
      const _this=this
      this.$http.get("/student/getAll/"+currentpage+"/6").then(function (resp) {
        _this.tableData=resp.data.content
        _this.total=resp.data.totalElements
      })
    },
    search(){
      const _this=this;
      console.log(this.searchForm.select)
      if(this.searchForm.select=='1'){
        this.$http.get("/student/get/"+this.searchForm.input).then(function (resp) {
          _this.display=false;
          var data2 = [];            // 某种意义上来说，数组也是object
          //json对象转成数组就可以放到tableData里面去了哈哈哈哈哈哈哈哈哈哈哈哈哈
          data2[0]=resp.data;
          _this.tableData=data2
        })
      }
      if(this.searchForm.select=='2'){
        this.$http.get("/student/getByName/"+this.searchForm.input).then(function (resp) {
          _this.display=false;
          var data2 = [];
          data2[0]=resp.data;
          _this.tableData=data2
        })

      }
    }
  },
  created() {
    const _this=this
    this.$http.get("/student/getAll/1/6").then(function (resp) {
      _this.tableData=resp.data.content
      _this.total=resp.data.totalElements
    })
  },
  data() {
    return {
      display:true,
      total:null,
      tableData: null,
      searchForm:{
        input:'',
        select:''
      },

    }
  }
}
</script>

<style scoped>
/*搜索框*/

.input-with-select {
  background-color: white;
}
</style>
