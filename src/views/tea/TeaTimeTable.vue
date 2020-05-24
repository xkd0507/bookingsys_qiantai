<template>
  <div align="center">
    <h3>每周课表</h3>
    <p></p>
    <span>第</span>
    <select id="weekSelect" v-model="weekNum" placeholder="请选择" @change="weekNumChange">
      <option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </option>
    </select>
    <span>周</span>
    <!--<button @click="getW()">huoqu</button>-->
    <el-divider></el-divider>
    <p></p>
    <table id="courseTable" >
      <!--<caption>课程表</caption>-->
      <tr>
        <td colspan="2"></td>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
        <th>星期四</th>
        <th>星期五</th>
        <th>星期六</th>
        <th>星期日</th>
      </tr>
      <tr>
        <td rowspan="2">上午</td>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="2">下午</td>
        <td> 3 </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td> 4 </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>晚上</td>
        <td> 5 </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <!--<el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        property="Sunday"
        label="周日"
        width="120">
      </el-table-column>
      <el-table-column
        property="Monday"
        label="周一"
        width="120">
      </el-table-column>
      <el-table-column
        property="Tuesday"
        label="周二"
        width="120">
      </el-table-column>
      <el-table-column
        property="Wednesday"
        label="周三"
        width="120">
      </el-table-column>
      <el-table-column
        property="Thursday"
        label="周四"
        width="120">
      </el-table-column>
      <el-table-column
        property="Friday"
        label="周五"
        width="120">
      </el-table-column>
      <el-table-column
        property="Saturday"
        label="周六"
        width="120">
      </el-table-column>
    </el-table>-->
  </div>
</template>

<script>
    export default {
        name: "TeaTimeTable",
      data() {
        return {
          weekNum:'',
          options:[
          ],
          /*tableData: [{
            Sunday: '',
            Monday: 'C',
            Tuesday:'C++',
            Wednesday:'',
            Thursday:'JAVA',
            Friday:'',
            Saturday:'计网',
          }, {
            Sunday: '',
            Monday: 'JAVA',
            Tuesday:'',
            Wednesday:'计网',
            Thursday:'',
            Friday:'数据结构',
            Saturday:'',
          }, {
            Sunday: '',
            Monday: '',
            Tuesday:'C',
            Wednesday:'C++',
            Thursday:'',
            Friday:'计网',
            Saturday:'',
          }, {
            Sunday: '',
            Monday: '计组',
            Tuesday:'',
            Wednesday:'计组',
            Thursday:'',
            Friday:'计网',
            Saturday:'',
          },{
            Sunday: '',
            Monday: 'JAVA',
            Tuesday:'',
            Wednesday:'',
            Thursday:'数据结构',
            Friday:'',
            Saturday:'',
          }],*/
        }
      },
      mounted(){
        this.getW();
        this.getDefaultWeekCourseTable();
      },
      created(){

      },
      methods: {
          //动态获取数据库中的学期的周数，并添加到下拉列表中
        getW(){
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080/admin/term/getTerm',
          }).then(function (res) {
            //console.log(res.data.data);
            console.log("共"+res.data.data.termWeek+"周");//获取周数
            //设置options
            for(var i=0; i<res.data.data.termWeek; i++){
               document.getElementById("weekSelect").appendChild(new Option(i+1,i+1));
            }
            var length =document.getElementById("weekSelect").options.length;
            console.log("下拉列表长度："+length);
            var items = document.getElementById("weekSelect").options;
            //console.log(parseInt(items[1].value));
            for(var i=0; i<length; i++){
              if(parseInt(items[i].value) == sessionStorage.getItem("week")){
                items[i].selected = true;
              }
            }
          });

        },
        //周数改变时调用的函数，重新获取课表信息
        weekNumChange(){
          console.log(document.getElementById("weekSelect").value);//下拉列表选中的值
          var weekEst = parseInt(document.getElementById("weekSelect").value);
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080/coursetable/'+weekEst,
          }).then(function (res) {
            console.log(res.data);
            //设置课表单元格为空
            for(var i=1; i<=5; i++){
              if(i%2 == 0){//8个单元格
                for(var j=1; j<8; j++){
                  document.getElementById("courseTable").rows[i].cells[j].innerHTML = "";
                }
              }else{//9个单元格
                for(var j=2; j<9; j++){
                  document.getElementById("courseTable").rows[i].cells[j].innerHTML = "";
                }
              }

            }
            for(var i=0; i<res.data.length; i++){
              var dayEst = res.data[i].dayEst;
              var section = res.data[i].section;
              if(section % 2 == 0){
                document.getElementById("courseTable").rows[section].cells[dayEst].innerHTML =
                  res.data[i].courseName + " / "+res.data[i].teacherName + " / " + res.data[i].labName;
              }else{
                document.getElementById("courseTable").rows[section].cells[dayEst+1].innerHTML =
                  res.data[i].courseName + " / "+res.data[i].teacherName + " / " + res.data[i].labName;
              }
            }
          })
        },
        //获取当前周的课表信息
        getDefaultWeekCourseTable(){
          var that = this;
          this.axios({
            method:'get',
            url:'http://localhost:8080/coursetable/'+sessionStorage.getItem("week"),
          }).then(function (res) {
            console.log(res.data);
            console.log("共"+res.data.length+"条数据");
            console.log(res.data[0].dayEst);
            console.log(document.getElementById("courseTable").rows[0].cells[2].innerText)
            for(var i=0; i<res.data.length; i++){
              var dayEst = res.data[i].dayEst;
              var section = res.data[i].section;
               if(section % 2 == 0){
                document.getElementById("courseTable").rows[section].cells[dayEst].innerHTML =
                  res.data[i].courseName + " / "+res.data[i].teacherName + " / " + res.data[i].labName;
              }else{
                document.getElementById("courseTable").rows[section].cells[dayEst+1].innerHTML =
                  res.data[i].courseName + " / "+res.data[i].teacherName + " / " + res.data[i].labName;
              }
            }
          })
        },

      },
    }
</script>

<style scoped>
  table{
    width: 900px;
    height: 500px;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid green;
    table-layout:auto;
    empty-cells: hide;
    table-layout: fixed;
  }
  table tr th,
  table tr td{
    border: 1px solid green;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
