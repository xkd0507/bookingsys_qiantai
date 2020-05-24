<template>
  <div>
    <h3>修改个人信息</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div align="center" style="width: 500px; border: 1px solid #B3C0D1;">
      <el-form ref="form" :model="form" :rules="rules" style="margin-left: 50px;margin-right: 50px">
        <!--去掉el-form-item的这个属性:label-width="formLabelWidth"
            不然转换页面会报错：Error in beforeDestroy hook: "Error: [ElementForm]unpected width "-->
        <el-form-item label="姓名"  prop="stuName">
          <el-input v-model="form.stuName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="stuPassword">
          <el-input v-model.number="form.stuPassword"  placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="院系"  prop="departId">
          <el-input v-model.number="form.departId" autocomplete="off" placeholder="请输入院系"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="btn1" @click="cancleStuForm">重 置</el-button>
          <el-button type="primary" @click="submitStuForm('form')" class="btn1">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StuUpdateInfo",
    data(){
      return {
        form: {
          studentId:'',
          stuName: '',
          stuPassword: '',
          departId:'',
        },
        rules:{
          stuName:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          stuPassword:[
            { required: true, message: '请输入密码', trigger: 'blur' },

          ],
          departId:[
            { required: true, message: '请输入院系', trigger: 'blur' },
            { type: 'number', message:'请输入数字'}
          ]
        },
      };//end return
    },//end data()
    methods:{
      cancleStuForm(){
        this.$refs.form.resetFields();
      },
      submitStuForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;

            console.log(that.form.studentId);
            console.log(that.form.stuName);
            console.log(that.form.stuPassword);
            this.axios({
              method:'post',
              url:'http://localhost:8080/admin/stu/edit',
              data:{
                studentId:that.form.studentId,
                stuName:that.form.stuName,
                stuPassword:that.form.stuPassword,
                departId: that.form.departId,
              }
            }).then(function (res) {
              console.log(res.data);
              //code
              if(res.data.code == "1"){
                that.$message.success("修改成功");
                //添加代码
              }else{
                that.$message.error('修改失败');
              }
            })
          }
          else{
            this.$message.error('输入格式不正确！');
            return false;
          }
        });
      },//end submitStuForm
    },//end methods
    created(){
      this.form.stuName = sessionStorage.getItem("name");
      this.form.studentId = sessionStorage.getItem("id");
      console.log(this.form.studentId);
      var that = this;
      this.axios({
        method:'get',
        url:'http://localhost:8080/admin/stu/getOneStu/'+that.form.studentId,
        /*data:{
          teacherId:that.form.teacherId,
        }*/
      }).then(function (res) {
        console.log(res.data);
        that.form.stuName = res.data.stuName;
        that.form.stuPassword = res.data.stuPassword;
        that.form.departId = res.data.departId;
      })
    }
  }
</script>

<style scoped>

</style>
