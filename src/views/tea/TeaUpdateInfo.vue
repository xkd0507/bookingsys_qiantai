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
        <el-form-item label="姓名"  prop="teacherName">
          <el-input v-model="form.teacherName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="teacherPassword">
          <el-input v-model.number="form.teacherPassword"  placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"  prop="telephone">
          <el-input v-model.number="form.telephone" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="院系"  prop="departId">
          <el-input v-model.number="form.departId" autocomplete="off" placeholder="请输入院系"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="btn1" @click="cancleTeaForm">重 置</el-button>
          <el-button type="primary" @click="submitTeaForm('form')" class="btn1">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
    export default {
        name: "TeaUpdateInfo",
      data(){
        return {
          form: {
            teacherId:'',
            teacherName: '',
            teacherPassword: '',
            telephone: '',
            departId:'',
          },
          rules:{
            teacherName:[
              { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            teacherPassword:[
              { required: true, message: '请输入密码', trigger: 'blur' },

            ],
            telephone:[
              { required: true, message: '请输入联系方式', trigger: 'blur' },
              { type: 'number', message:'请输入数字'}

            ],
            departId:[
              { required: true, message: '请输入院系', trigger: 'blur' },
              { type: 'number', message:'请输入数字'}
            ]
          },
        };//end return
      },//end data()
      methods:{
        cancleTeaForm(){
          this.$refs.form.resetFields();
        },
        submitTeaForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var that = this;

              console.log(that.form.teacherId);
              console.log(that.form.teacherName);
              console.log(that.form.telephone);
              this.axios({
                method:'post',
                url:'http://localhost:8080/admin/tea/edit',
                data:{
                  teacherId:that.form.teacherId,
                  teacherName:that.form.teacherName,
                  teacherPassword:that.form.teacherPassword,
                  telephone: that.form.telephone,
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
        },//end submitTeaForm
      },//end methods
      created(){
        this.form.teacherName = sessionStorage.getItem("name");
        this.form.teacherId = sessionStorage.getItem("id");
        console.log(this.form.teacherId);
        var that = this;
        this.axios({
          method:'get',
          url:'http://localhost:8080/admin/tea/getOneTea/'+that.form.teacherId,
          /*data:{
            teacherId:that.form.teacherId,
          }*/
        }).then(function (res) {
          console.log(res.data);
          that.form.teacherName = res.data.teacherName;
          that.form.teacherPassword = res.data.teacherPassword;
          that.form.telephone = parseInt( res.data.telephone);
          console.log(typeof(that.form.telephone));
          console.log(typeof(res.data.telephone));
          that.form.departId = res.data.departId;
        })
      }
    }
</script>

<style scoped>

</style>
