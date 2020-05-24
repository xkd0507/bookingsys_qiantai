<template>
  <div>

    <h3>添加实验室</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div>
      <p>
        <!--:on-change="handleChange"
        :file-list="fileList"-->
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

    <el-dialog title="实验室信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" >
        <!--去掉el-form-item的这个属性:label-width="formLabelWidth"
            不然转换页面会报错：Error in beforeDestroy hook: "Error: [ElementForm]unpected width "-->
        <el-form-item label="实验室名称"  prop="labName">
          <el-input v-model="form.labName"  maxlength="50" placeholder="请输入实验室名称"></el-input>
        </el-form-item>
        <el-form-item label="实验室容量"  prop="labCap">
          <el-input v-model.number="form.labCap"  maxlength="3" placeholder="请输入实验室容量"></el-input>
        </el-form-item>
        <el-form-item label="实验室设备"  prop="labAddition">
          <el-input v-model="form.labAddition" maxlength="100" autocomplete="off" placeholder="请输入实验室设备"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button  class="btn1" @click="cancleLabForm">取 消</el-button>
            <el-button type="primary" @click="submitLabForm('form')" class="btn1">添 加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

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
        name: "AddLib",
      data(){
          return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
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
                { type: 'number', message:'请输入数字'},
                //{maxLength: 3, message:'长度小于3'}

              ],
              labAddition:[
                { required: true, message: '请输入实验室设备', trigger: 'blur' },
              ]
            },
            formLabelWidth: '120px'
          };

      },
      methods:{
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
                url:'http://localhost:8080/admin/lab/addlab',
                data:{
                  labName:that.form.labName,
                  labCap:that.form.labCap,
                  labAddition: that.form.labAddition,
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
        },
        uploadUrl: function() {
          return (
            "http://localhost:8080/" +
            "admin/lab/addLabByFile"
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
      }
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
