<template>
  <div>
    <h3>学期设置</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>

    <div  style="margin-left: 400px">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item >
          <p style="color: cornflowerblue;font-size: 20px">请选择本学期第一周周一的日期</p>
        </el-form-item>
        <el-form-item prop="termStartDate">
          <div class="dateblock" id="dateblock" style="margin-left: 40px">
            <el-date-picker
              v-model="form.termStartDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              @change="handleChangeStartDate">
            </el-date-picker>
          </div>

          <p id="datep" style="color: red; font-size: 10px; " >请选择开始日期..</p>
        </el-form-item>
        <el-form-item>
          <p style="color: cornflowerblue;font-size: 20px;margin-left: 30px">请输入本学期周数(1-50)</p>
        </el-form-item>
        <el-form-item prop="termWeek">
          <el-input-number style="margin-left: 50px" v-model="form.termWeek" @change="handleChangeWeek" :min="1" :max="50" label="周数"></el-input-number>
          <p id="daten" style="color: red; font-size: 10px; display: none" >请选择学期周数</p>
        </el-form-item>
        <el-form-item>
          <p style="color: tomato; margin-left: 70px">非学期初请勿设置！</p>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" id="subbtn" style="margin-left: 180px" @click="submitTermForm('form')">提 交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TermSet",
      data() {
        return {
          form:{
            termStartDate:'',
            termWeek:'',
            termStatus:''
          },
          rules:{
            termStartDate:[
              { required: true, message: '请选择学期开始日期', trigger: 'blur' },
            ],
            termWeek:[
              { required: true, message: '请输入本学期周数', trigger: 'blur' },
              { type: 'number', message:'请输入数字'},
            ],
          },
          pickerOptions: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
        };//end return
      },//end data()
      methods: {
        handleChangeStartDate(dateValue){
          if(dateValue == "" || dateValue == null){
            document.getElementById("datep").style.display = "";
          }else{
            document.getElementById("datep").style.display = "none";
          }
          this.form.termStartDate = dateValue;
          console.log(dateValue);
        },
        handleChangeWeek(weekValue) {
          if(typeof(weekValue) =='undefined' ){
            document.getElementById("daten").style.display = "";
          }else{
            document.getElementById("daten").style.display = "none";
          }
          this.form.termWeek = weekValue;
          console.log(weekValue);
        },//end handleChange
        submitTermForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {

              var that = this;
              console.log(valid);
              console.log(that.form.termStartDate);
              console.log(that.form.termWeek);
              this.axios({
                method:'post',
                url:'http://localhost:8080/admin/term/setTerm',
                data:{
                  termStartDate:that.form.termStartDate,
                  termWeek:that.form.termWeek,
                }
              }).then(function (res) {
                //CODE
                console.log(res.data);
                if(res.data.code == "1"){
                  //无需重置
                  //that.$refs.form.resetFields();
                  that.$message.success("学期设置成功");
                }else{
                  //that.$refs.form.resetFields();
                  that.$message.error("学期设置成功，请重新设置");
                }
              })
            }
            else{
              this.$message.error('输入格式不正确！');
              return false;
            }
          });
        },//end submitTermForm()
      }
    }
</script>

<style scoped>

</style>
