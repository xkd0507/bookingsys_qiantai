<template>
<div id="app" class="login-box" >
  <el-form ref="form"  :model="form" :rules="rules" label-width="80px">
    <h2 class="login-title">欢迎登陆</h2>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item label="角色" prop="role">
      <el-select class="role-select" v-model="form.role" placeholder="请选择" @change="roleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('form')" class="btn1">登 录</el-button>
      <el-button  class="btn1" @click="reset">重置</el-button>
    </el-form-item>

  </el-form>
</div>

</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          form: {
            name: '',
            password: '',
            role:''
          },
          rules:{
            name:[
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password:[
              { required: true, message: '请输入密码', trigger: 'blur' },

            ],
            role:[
              { required: true, message: '请选择角色', trigger: 'blur' },
            ]

          },
          options:[
            {
              value: '0',
              label: '管理员'
            },
            {
              value: '1',
              label: '教师'
            },
            {
              value: '2',
              label: '学生代表'
            }
          ],
        }
      },
      methods: {
        submitForm(formName){
          //console.log(this.form.name);
          //console.log(password);
          //console.log(this.form.role);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var that = this;

              this.axios({
                method:'post',
                url:'http://localhost:8080/login',
                data:{
                  name:that.form.name,
                  password:that.form.password,
                  role: that.form.role,
                }
              }).then(function (res) {
                //
                console.log(res.data.data);
                if(res.data.data == null){ //未获取到用户信息
                  that.$message.error('用户名或密码错误');
                }else{
                  sessionStorage.setItem("id",res.data.data.id);
                  sessionStorage.setItem("role", res.data.data.role);
                  //console.log(sessionStorage.getItem("role")+"hahhah")
                  sessionStorage.setItem("name", res.data.data.name);
                  if(res.data.data.role == "0"){ //管理员
                    console.log("chenggong !")
                    that.$router.replace("/home")
                    //console.log("123456789 !")
                  }else if(res.data.data.role == "1"){ //教师
                    console.log("chenggong !")
                    that.$router.replace("/teahome")
                    //console.log("123456789 !")
                  }else if(res.data.data.role == "2"){ //学生代表
                    console.log("chenggong !")
                    that.$router.replace("/stuhome")
                    //console.log("123456789 !")
                  }

                }
              })
            }
            else{
              this.$message.error('用户名或密码格式不正确/角色未选择');
              return false;
            }
          });
        },
        reset(){
          this.$refs.form.resetFields();
        },
        roleChange(val){
          var obj = {}
          var that = this
          obj = this.options.find(function(item){
            return item.value === val
          })
          //obj 就是被选中的那个对象，也就能拿到label值了。
          //console.log(obj.fruitName)//label值
          console.log(val)//value值
          that.value = val;
        }

      }
    }
</script>

<style scoped>
  .login-box{
    width: 500px;
    height: 400px;
    border: 1px solid #DCDFE6 ;

    margin: 150px auto;
    padding: 20px 50px 0px 30px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px #DCDFE6;
  }
  .login-title{
    text-align: center;
    margin-bottom: 40px;
  }
  .btn1{
    margin-bottom: 20px;
  }
  .role-select{
    margin-left: 0px;
    margin-bottom: 20px;
  }
</style>
