<template>

  <div style="background-image: url('../img/home.jpg')">
    <el-container style="height: 100%; border: 0px solid #eee">
      <div style="height: 100%">
        <el-aside width="280px" style="background-color: #B3C0D1;height: 100%">
          <div style="height: 60px">
            <img src="../img/logo.png" height="100%" />
          </div>
          <el-menu :default-openeds="[]" :router="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>个人信息</template>
              <el-menu-item-group>
                <el-menu-item index="/stuhome/stuupdateinfo">修改个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>实验室预约</template>
              <el-menu-item-group>
                <el-menu-item index="/stuhome/stuappoint">预约</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>课表</template>
              <el-menu-item-group>
                <el-menu-item index="/stuhome/stutimetable">每周课表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span id="currentWeek2">第 {{weekEst2}} / {{termWeeks2}} 周</span>
          &nbsp;
          <span>周{{week2}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span id="currentTime2"></span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-dropdown>
            <i class="el-icon-user-solid" style="margin-right: 15px"></i>
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
    name: "StuHome",
    data(){
      return{
        weekEst2: 0,
        week2:'',
        termWeeks2: 0,
      };
    },
    methods:{
      data(){
        return {
          username:"default",
        }
      },
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
          that.termWeeks2 = res.data.data.termWeek;

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
          that.weekEst2 = Math.ceil((timeDif - weekLeave) / 7) + 1;
          console.log(that.weekEst2);
          sessionStorage.setItem("week", that.weekEst2);
        })
      },
    },//end methods
    created(){
      this.username = sessionStorage.getItem("name");
      console.log(this.username);
      setInterval("document.getElementById('currentTime2').innerText = new Date().toLocaleString()",1000)
      this.getTermWeek();
      var week3 = new Date().getDay();//获取当前日期是周几
      week3 = week3 === 0 ? 7 : week3;
      switch (week3){
        case 1:
          this.week2 = '一';
          break;
        case 2:
          this.week2 = '二';
          break;
        case 3:
          this.week2 = '三';
          break;
        case 4:
          this.week2 = '四';
          break;
        case 5:
          this.week2 = '五';
          break;
        case 6:
          this.week2 = '六';
          break;
        case 7:
          this.week2 = '日';
          break;
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
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
