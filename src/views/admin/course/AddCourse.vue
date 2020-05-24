<template>
  <div>
    <h3>添加课程</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div>
      <p>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadUrl()"
          name="excelFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="uploadFalse"
          :on-success="uploadSuccess"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
        <el-button type="primary" @click="dialogFormVisible = true">手动添加<i class="el-icon-edit el-icon--right"></i></el-button>
      </p>
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
            <el-button  class="btn1" @click="cancleCourseForm">取 消</el-button>
            <el-button type="primary" @click="submitCourseForm('form')" class="btn1">添 加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div class="block">
      <el-timeline >
        <el-timeline-item timestamp="2020/04/17" placement="top">
          <el-card>
            <h4>通过手动添加</h4>
            <p>admin2 提交于 2020/04/17 17:45</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/04/16" placement="top">
          <el-card>
            <h4>通过文件上传</h4>
            <p>admin1 提交于 2020/04/16 20:30</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/04/15" placement="top">
          <el-card>
            <h4>通过文件上传</h4>
            <p>admin1 提交于 2020/04/15 08:00</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>
      </div>
  </div>
</template>
<script>
  export default {
    name: "AddCourse",
    data(){
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        options:[
          {
            value:'',
            label:''
          }
        ],
        form: {
          courseName: '',
          courseNumber: '',
          courseOrder: '',
          courseHours: '',
          courseStuNum: '',
          courseLab: '',
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
        formLabelWidth: '120px'
      };

    },//end data
    methods:{
      cancleCourseForm(){
        this.$refs.form.resetFields();
        this.dialogFormVisible = false;
      },
      submitCourseForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;

            console.log(that.form.courseName);
            console.log(that.form.courseNumber);
            console.log(that.form.courseOrder);
            console.log(that.form.courseHours);
            console.log(that.form.courseStuNum);
            console.log(that.form.courseLab);
            this.axios({
              method:'post',
              url:'http://localhost:8080/admin/course/addcourse',
              data:{
                courseName:that.form.courseName,
                courseNumber:that.form.courseNumber,
                courseOrder: that.form.courseOrder,
                courseHours: that.form.courseHours,
                courseStuNum: that.form.courseStuNum,
                courseLab: that.form.courseLab,
              }
            }).then(function (res) {
              //CODE
              console.log(res.data);
              if(res.data.code == "1"){
                that.$refs.form.resetFields();
                that.dialogFormVisible = false;
                that.$message.success("添加成功");
              }else{
                //that.$refs.form.resetFields();
                that.dialogFormVisible = false;
                that.$message.error("添加失败，请检查数据");
              }

            })
          }
          else{
            this.$message.error('输入格式不正确！');
            return false;
          }
        });
      },//end submitLabForm
      uploadUrl: function() {
        return (
          "http://localhost:8080/" +
          "admin/course/addCourseByFile"
        );
      },
      uploadSuccess(response, file, fileList) {
        console.log(response);
        if (response.code == 1) {
          if(response.data == ""){
            alert("文件导入成功");
          }else{
            alert(response.data);
          }
        } else {
          alert("文件导入失败");
        }
      },
      uploadFalse(response, file, fileList) {
        alert("文件上传失败！");
      },
      // 上传前对文件的大小的判断
      beforeAvatarUpload(file) {
        const extension = file.name.split(".")[1] === "xls";
        const extension2 = file.name.split(".")[1] === "xlsx";
        // const extension3 = file.name.split(".")[1] === "doc";
        // const extension4 = file.name.split(".")[1] === "docx";
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!extension && !extension2 ) {
          alert("上传文件只能是 xls、xlsx格式!");
        }
        if (!isLt2M) {
          console.log("上传模板大小不能超过 10MB!");
        }
        return extension || (extension2 && isLt2M);
      },
      submitUpload() {
        if (this.businessType != null) {
          //触发组件的action
          this.$refs.upload.submit();
        }
        if (this.businessType == null) {
          this.businessType = "businessType不能为空";
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        if (file.response.status) {
          alert("此文件导入成功");
        } else {
          alert("此文件导入失败");
        }
      },

    }//end methods

  }
</script>

<style scoped>
  .inline-block{
    display: inline-block;
  }
  .btn1{
    margin-left: 150px;
    margin-right: 30px;
  }
</style>
