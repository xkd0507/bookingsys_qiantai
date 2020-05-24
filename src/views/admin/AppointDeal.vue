<template>
  <div>

    <h3>预约处理</h3>
    <p></p>
    <el-divider></el-divider>
    <p></p>
    <div class="tablecol1">
      <el-table
        :data="tableData.filter(data => !search || data.appointTeacherId.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="教师"
          prop="appointTeacherId">
        </el-table-column>
        <el-table-column
          label="课程"
          prop="appointCourseId">
        </el-table-column>
        <el-table-column
          label="实验室"
          prop="appointLabId">
        </el-table-column>
        <el-table-column
          label="日期"
          prop="appointDate">
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
              @click="handleEdit(scope.$index, scope.row)">同 意<i class="el-icon-edit"></i></el-button>
            <el-button
              class="btn1"
              size="mini"
              type="primary" plain
              @click="handleDelete(scope.$index, scope.row)">拒 绝<i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
    <p></p>
    <el-divider></el-divider>
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
      <p></p>
      <p></p>
    <!--<button @click="getW()">huoqu</button>-->
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppointDeal",
      data() {
          return {
            tableData:[{
              appointTeacherId: 'tea1',
              appointCourseId: '数据结构',
              appointLabId: '508',
              appointDate: '2020-05-26',
              },
              {
                appointTeacherId: 'tea2',
                appointCourseId: '计网',
                appointLabId: '518',
                appointDate: '2020-04-20',
              },
            ],
            weekNum:'',
            options:[
            ],
          }//end return
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
