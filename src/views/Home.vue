<template>

  <div style="background-image: url('../img/home.jpg')">
    <el-container style="height: 100%; border: 0px solid #B3C0D1">
      <div style="height: 100%">
      <el-aside width="280px" style="background-color: #B3C0D1;height: 100%">
        <div style="height: 60px">
          <img src="../img/logo.png" height="100%" />
        </div>
        <el-menu :default-openeds="[]" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>实验室信息维护</template>
            <el-menu-item-group>
              <el-menu-item index="/home/lib/addlab" >添加实验室信息</el-menu-item>
              <el-menu-item index="/home/lib/editlab">编辑实验室信息</el-menu-item>
              <!--<el-menu-item index="/home/lib/updatelib">修改实验室信息</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>课程信息维护</template>
            <el-menu-item-group>
              <el-menu-item index="/home/course/addcourse">添加课程信息</el-menu-item>
              <el-menu-item index="/home/course/editcourse">编辑课程信息</el-menu-item>
              <!--<el-menu-item index="/home/course/updatecourse">修改课程信息</el-menu-item>-->
              <el-menu-item index="/home/course/adjustcourse">调课</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>教师信息维护</template>
            <el-menu-item-group>
              <el-menu-item index="/home/tea/addtea">添加教师信息</el-menu-item>
              <el-menu-item index="/home/tea/edittea">编辑教师信息</el-menu-item>
              <!--<el-menu-item index="/home/tea/updateTea">修改教师信息</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>学生信息维护</template>
            <el-menu-item-group>
              <!--<el-menu-item index="/home/stu/addstu">添加学生信息</el-menu-item>-->
              <el-menu-item index="/home/stu/editstu">学生信息处理</el-menu-item>
              <!--<el-menu-item index="/home/stu/updatestu">修改学生信息</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>数据库维护</template>
            <el-menu-item-group>
              <el-menu-item index="/home/db/bakedb">备份</el-menu-item>
              <el-menu-item index="/home/db/recoverdb">恢复</el-menu-item>
              <el-menu-item index="/home/db/deletedb">删除</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>预约处理</template>
            <el-menu-item-group>
              <el-menu-item index="/home/appointdeal">预约处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-menu"></i>信息统计</template>
            <el-menu-item-group>
              <el-menu-item index="/home/infostatistics">信息统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-menu"></i>学期设置</template>
            <el-menu-item-group>
              <el-menu-item index="/home/termset">学期设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      </div>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; background-color: #accdf5">
          <span id="currentWeek">第 {{weekEst}} / {{termWeeks}} 周</span>
          &nbsp;
          <span>周{{week1}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span id="currentTime"></span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-dropdown>
            <i class="el-icon-user-solid" style="margin-right: 15px; color: #00F;"></i>
            <el-dropdown-menu slot="dropdown">
              <p v-on:click="logout">
                <el-dropdown-item>退出</el-dropdown-item>
              </p>

            </el-dropdown-menu>
          </el-dropdown>
          <span style="font-size: 14px" >{{username}}</span>
        </el-header>
        <el-main>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return{
            weekEst: 0,
            week1:'',
            termWeeks: 0,
          };
      },
      methods:{
        // data(){
        //   return {
        //     username: "default",
        //     weetEst: 0,
        //     termWeeks: 0,
        //   };
        // },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          console.log("logout");
          window.sessionStorage.clear();
          this.$router.replace("/login")
        },

        getTermWeek(){
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080/admin/term/getTerm'
          }).then(function (res) {
            console.log(res.data.data);
            that.termWeeks = res.data.data.termWeek;

            //计算第几周
            //console.log(typeof(res.data.data.termStartDate));//string
            var timeStart = new Date(res.data.data.termStartDate.substring(0,10));
            console.log(timeStart.toLocaleDateString());

            var weekStart = timeStart.getDay();//获取开学日期是周几
            weekStart = weekStart === 0 ? 7 : weekStart; //JS中周日的索引为0，这里转换为7，方便计算
            var weekLeave = 7 - weekStart; //计算开学日期那周剩余的天数
            //console.log(weekStart);
            var oneDay = 24 * 60 *60 *1000;//一天的秒数
            var timeDif = new Date() -timeStart;//得到的是秒数
            timeDif = parseInt(timeDif / oneDay);//得到相隔的天数
            console.log(timeDif);
            that.weekEst = Math.ceil((timeDif - weekLeave) / 7) + 1;
            console.log(that.weekEst);
            sessionStorage.setItem("week", that.weekEst);
          })
        },

      },//end methods
      created(){
        this.username = sessionStorage.getItem("name");
        console.log(this.username);
        setInterval("document.getElementById('currentTime').innerText = new Date().toLocaleString()",1000)
        this.getTermWeek();
        var week2 = new Date().getDay();//获取当前日期是周几
        week2 = week2 === 0 ? 7 : week2;
        switch (week2){
          case 1:
            this.week1 = '一';
            break;
          case 2:
            this.week1 = '二';
            break;
          case 3:
            this.week1 = '三';
            break;
          case 4:
            this.week1 = '四';
            break;
          case 5:
            this.week1 = '五';
            break;
          case 6:
            this.week1 = '六';
            break;
          case 7:
            this.week1 = '日';
            break;
        }
      },

    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    /*margin-left: 50px;*/
    padding-right: 60px;
  }


  html,body{
    height: 100%;
    background-image: url("../img/home.jpg");
  }
  .el-aside {
    color: #333;
    background-color: #555555;
    display: block;
    bottom: 0;

  }
  .el-container{
    height: 100%;
  }
</style>
