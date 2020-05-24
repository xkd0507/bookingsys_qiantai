<template>
  <div>

    <h3>实验室信息列表</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div class="tablecol1">
      <el-table
        :data="tableData.filter(data => !search || data.labName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="名称"
          prop="labName">
        </el-table-column>
        <el-table-column
          label="容量(人)"
          prop="labCap">
        </el-table-column>
        <el-table-column
          label="设备"
          prop="labAddition">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary" plain
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit<i class="el-icon-edit"></i></el-button>
            <el-button
              class="btn1"
              size="mini"
              type="danger" plain
              @click="handleDelete(scope.$index, scope.row)">Delete<i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
    <el-dialog title="实验室信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" >
        <!--去掉el-form-item的这个属性:label-width="formLabelWidth"
            不然转换页面会报错：Error in beforeDestroy hook: "Error: [ElementForm]unpected width "-->
          <el-form-item label="实验室名称"  prop="labName">
          <el-input v-model="form.labName" maxlength="50" placeholder="请输入实验室名称"></el-input>
        </el-form-item>
        <el-form-item label="实验室容量"  prop="labCap">
          <el-input v-model="form.labCap" maxlength="3" placeholder="请输入实验室容量"></el-input>
        </el-form-item>
        <el-form-item label="实验室设备"  prop="labAddition">
          <el-input v-model="form.labAddition" maxlength="100" autocomplete="off" placeholder="请输入实验室设备"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="btn1" @click="cancleLabForm">取 消</el-button>
          <el-button type="primary" @click="submitLabForm('form')" class="btn1">修 改</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>

  </div>
</template>

<script>
    export default {
        name: "DeleteLib",
      data() {
        return {
          tableData: [{
            labId:'',
            labName: '',
            labCap: '',
            labAddition: ''
          },
          ],
          search: '',
          dialogFormVisible: false,
          //formLabelWidth: 'auto',
          form: {
            labId:'',
            labName: '',
            labCap: '',
            labAddition: '',

          },
          rules:{
            labName:[
              { required: true, message: '请输入实验室名称', trigger: 'blur' },
            ],
            labCap:[
              { required: true, message: '请输入实验室容量', trigger: 'blur' },
            ],
            labAddition:[
              { required: true, message: '请输入实验室设备', trigger: 'blur' },
            ]
          },

        }
      },
      methods: {
        cancleLabForm(){
          this.$refs.form.resetFields();
          this.dialogFormVisible = false;
        },
        submitLabForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var that = this;

              console.log(that.form.labName);
              console.log(that.form.labCap);
              console.log(that.form.labAddition);
              this.axios({
                method:'post',
                url:'http://localhost:8080/admin/lab/edit',
                data:{
                  labId:that.form.labId,
                  labName:that.form.labName,
                  labCap:that.form.labCap,
                  labAddition: that.form.labAddition,
                }
              }).then(function (res) {
                console.log(res.data);
                //code
                if(res.data.code == "1"){
                  that.dialogFormVisible = false;
                  that.$message.success("修改成功");
                  that.getLabList();
                }else{
                  that.dialogFormVisible = false;
                  that.$message.error('修改失败');
                }
              })
            }
            else{
              this.$message.error('输入格式不正确！');
              return false;
            }
          });
        },

        //编辑信息
        handleEdit(index, row) {
          console.log(index, row);
          this.dialogFormVisible = true;
          this.form.labId = row.labId;
          this.form.labName = row.labName;
          this.form.labCap = row.labCap;
          this.form.labAddition = row.labAddition;
        },

        //删除操作
        handleDelete(index, row) {
          console.log(index, row);
          var that = this;
          this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method:'delete',
              url:'http://localhost:8080//admin/lab/delete/'+row.labId
              /*data:{
                labId:row.labId,
              }*/
            }).then(function (res) {
              console.log(res.data);
              if(res.data.code == "1"){
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                that.getLabList();
                console.log("created");
              }else{
                that.$message({
                  type: 'fail',
                  message: '删除失败！'
                });
              }
            });

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        //获取单个信息
        /*getLabByLabId(){
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080//admin/lab/getlabbyid',
            data:{
              labId:that.tableData.labId,
            }
          }).then(function (res) {
            console.log(res.data);
            //code

          })
        },*/
        //获取信息列表
        getLabList(){
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080//admin/lab/list',
          }).then(function (res) {
            console.log(res.data);
            that.tableData = res.data;
          })
        }
      },
      created(){
         this.getLabList();
      }

    }
</script>

<style scoped>
    .inline-block{
      display: inline-block;
    }
  .btn1{
    margin-right: 80px;
  }
  .tablecol1{
    margin-left: 50px;
    margin-right: 50px;
  }
</style>
