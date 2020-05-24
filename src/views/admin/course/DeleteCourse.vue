<template>
  <div>

    <h3>课程信息列表</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div class="tablecol1">
      <el-table
        :data="tableData.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="课程名"
          prop="courseName">
        </el-table-column>
        <el-table-column
          label="课程号"
          prop="courseNumber">
        </el-table-column>
        <el-table-column
          label="课序号"
          prop="courseOrder">
        </el-table-column>
        <el-table-column
          label="课时数"
          prop="courseHours">
        </el-table-column>
        <el-table-column
          label="学生人数"
          prop="courseStuNum">
        </el-table-column>
        <el-table-column
          label="上课地点"
          prop="courseLab">
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
      <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules" >
          <!--去掉el-form-item的这个属性:label-width="formLabelWidth"
              不然转换页面会报错：Error in beforeDestroy hook: "Error: [ElementForm]unpected width "-->
          <el-form-item label="课程名称"  prop="courseName">
            <el-input v-model="form.courseName"  maxlength="50" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课程号"  prop="courseNumber">
            <el-input v-model.number="form.courseNumber"  maxlength="10" placeholder="请输入课程号"></el-input>
          </el-form-item>
          <el-form-item label="课序号"  prop="courseOrder">
            <el-input v-model.number="form.courseOrder" maxlength="3" autocomplete="off" placeholder="请输入课序号"></el-input>
          </el-form-item>
          <el-form-item label="课时数"  prop="courseHours">
            <el-input v-model.number="form.courseHours" maxlength="3" autocomplete="off" placeholder="请输入课时数"></el-input>
          </el-form-item>
          <el-form-item label="学生人数"  prop="courseStuNum">
            <el-input v-model.number="form.courseStuNum" maxlength="3" autocomplete="off" placeholder="请输入学生人数"></el-input>
          </el-form-item>
          <el-form-item label="上课地点"  prop="courseLab">
            <!--<el-select class="role-select" v-model="form.courseLab" placeholder="请选择" @change="courseLabChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <el-input v-model.number="form.courseLab" maxlength="2" autocomplete="off" placeholder="请输入上课地点"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button  @click="cancleCourseForm">取 消</el-button>
            <el-button type="primary" @click="submitCourseForm('form')">修 改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DeleteCourse",
    data() {
      return {
        tableData: [{
          courseId:'',
          courseName:'',
          courseNumber: '',
          courseOrder: '',
          courseHours: '',
          courseStuNum:'',
          courseLab:'',
        },
        ],
        search: '',
        dialogFormVisible: false,
        //formLabelWidth: 'auto',
        form: {
          courseName:'',
          courseNumber: '',
          courseOrder: '',
          courseHours: '',
          courseStuNum:'',
          courseLab:'',
        },
        rules:{
          courseName:[
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          courseNumber:[
            { required: true, message: '请输入课程号', trigger: 'blur' },

          ],
          courseOrder:[
            { required: true, message: '请输入课序号', trigger: 'blur' },
            { type: 'number', message:'请输入数字'},
          ],
          courseHours:[
            {required: true, message: '请输入课时数', trigger: 'blur' },
            { type: 'number', message:'请输入数字'},
          ],
          courseStuNum:[
            { required: true, message: '请输入学生人数', trigger: 'blur' },
            { type: 'number', message:'请输入数字'},
          ],
          courseLab:[
            { required: true, message: '请输入上课地点', trigger: 'blur' },
            { type: 'number', message:'请输入数字'},
          ],
        },

      }
    },
    methods: {
      cancleCourseForm(){
        this.$refs.form.resetFields();
        this.dialogFormVisible = false;
      },
      //提交编辑信息
      submitCourseForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;

            console.log(that.form.courseId);
            console.log(that.form.courseName);
            console.log(that.form.courseNumber);
            console.log(that.form.courseOrder);
            console.log(that.form.courseHours);
            console.log(that.form.courseStuNum);
            console.log(that.form.courseLab);
            this.axios({
              method:'post',
              url:'http://localhost:8080/admin/course/edit',
              data:{
                courseId:that.form.courseId,
                courseName:that.form.courseName,
                courseNumber:that.form.courseNumber,
                courseOrder: that.form.courseOrder,
                courseHours: that.form.courseHours,
                courseStuNum: that.form.courseStuNum,
                courseLab: that.form.courseLab,
              }
            }).then(function (res) {
              console.log(res.data);
              //code
              if(res.data.code == "1"){
                that.dialogFormVisible = false;
                that.$message.success("修改成功");
                that.getCourseList();
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

      //编辑按钮响应函数
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true;
        this.form.courseId = row.courseId;
        this.form.courseName = row.courseName;
        this.form.courseNumber = row.courseNumber;
        this.form.courseOrder = row.courseOrder;
        this.form.courseHours = row.courseHours;
        this.form.courseStuNum = row.courseStuNum;
        this.form.courseLab = row.courseLab;
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
            url:'http://localhost:8080/admin/course/delete/'+row.courseId
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
              that.getCourseList();
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

      //获取信息列表
      getCourseList(){
        var that = this;
        this.axios({
          method:'get',
          url:'http://localhost:8080/admin/course/list',
        }).then(function (res) {
          console.log(res.data);
          that.tableData = res.data;
        })
      }
    },
    created(){
      this.getCourseList();
    }

  }
</script>

<style scoped>
  .inline-block{
    display: inline-block;
  }
  .tablecol1{
    margin-left: 50px;
    margin-right: 50px;
  }
</style>
