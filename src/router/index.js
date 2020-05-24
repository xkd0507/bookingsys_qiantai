import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/views/Home'
//admin
import AddLib from '@/views/admin/lib/AddLib'
import DeleteLib from '@/views/admin/lib/DeleteLib'
import UpdateLib from '@/views/admin/lib/UpdateLib'
import AddCourse from '@/views/admin/course/AddCourse'
import DeleteCourse from '@/views/admin/course/DeleteCourse'
import UpdateCourse from '@/views/admin/course/UpdateCourse'
import AdjustCourse from '@/views/admin/course/AdjustCourse'
import BakeDb from '@/views/admin/db/BakeDb'
import DeleteDb from '@/views/admin/db/DeleteDb'
import RecoverDb from '@/views/admin/db/RecoverDb'
import AddStu from '@/views/admin/stu/AddStu'
import DeleteStu from '@/views/admin/stu/DeleteStu'
import UpdateStu from '@/views/admin/stu/UpdateStu'
import AddTea from '@/views/admin/tea/AddTea'
import DeleteTea from '@/views/admin/tea/DeleteTea'
import UpdateTea from '@/views/admin/tea/UpdateTea'
import AppointDeal from '@/views/admin/AppointDeal'
import InfoStatistics from '@/views/admin/InfoStatistics'
import TermSet from '@/views/admin/TermSet'
//tea
import TeaHome from '@/views/TeaHome'
import TeaAppoint from '@/views/tea/TeaAppoint'
import TeaChangeCourse from '@/views/tea/TeaChangeCourse'
import TeaTimeTable from '@/views/tea/TeaTimeTable'
import TeaUpdateCourse from '@/views/tea/TeaUpdateCourse'
import TeaUpdateInfo from '@/views/tea/TeaUpdateInfo'
//stu
import StuHome from '@/views/StuHome'
import StuAppoint from '@/views/stu/StuAppoint'
import StuTimeTable from '@/views/stu/StuTimeTable'
import StuUpdateInfo from '@/views/stu/StuUpdateInfo'
import StuWelcome from '@/views/stu/StuWelcome'

import Welcome from '@/views/stu/StuWelcome'

Vue.use(Router)

export default new Router({
  routes: [
    // login
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //admin router
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/home/welcomeadmin', //重定向到欢迎界面
      children:[
        {
          path: '/home/welcomeadmin',
          name: 'welcomeadmin',
          component: Welcome
        },
        {
          path: '/home/lib/addlab',
          name: 'addlab',
          component: AddLib
        },

        {
          path: '/home/lib/editlab',
          name: 'editlab',
          component: DeleteLib
        },
        {
          path: '/home/lib/updatelib',
          name: 'updatelib',
          component: UpdateLib
        },
        {
          path: '/home/course/addcourse',
          name: 'addcourse',
          component: AddCourse
        },

        {
          path: '/home/course/editcourse',
          name: 'editcourse',
          component: DeleteCourse
        },
        {
          path: '/home/course/updatecourse',
          name: 'updatecourse',
          component: UpdateCourse
        },
        {
          path: '/home/course/adjustcourse',
          name: 'adjustcourse',
          component: AdjustCourse
        },
        {
          path: '/home/db/bakedb',
          name: 'bakedb',
          component: BakeDb
        },

        {
          path: '/home/db/deletedb',
          name: 'deletedb',
          component: DeleteDb
        },
        {
          path: '/home/db/recoverdb',
          name: 'recoverdb',
          component: RecoverDb
        },
        {
          path: '/home/stu/addstu',
          name: 'addstu',
          component: AddStu
        },

        {
          path: '/home/stu/editstu',
          name: 'editstu',
          component: DeleteStu
        },
        {
          path: '/home/stu/updatestu',
          name: 'updatestu',
          component: UpdateStu
        },
        {
          path: '/home/tea/addtea',
          name: 'addtea',
          component: AddTea
        },

        {
          path: '/home/tea/edittea',
          name: 'edittea',
          component: DeleteTea
        },
        {
          path: '/home/tea/updateTea',
          name: 'updateTea',
          component: UpdateTea
        },
        {
          path: '/home/appointdeal',
          name: 'appointdeal',
          component: AppointDeal
        },

        {
          path: '/home/infostatistics',
          name: 'infostatistics',
          component: InfoStatistics
        },
        {
          path: '/home/termset',
          name: 'termset',
          component: TermSet
        },

      ],
    },
    {
      path: '/teahome',
      name: 'teahome',
      component: TeaHome,
      redirect: '/teahome/welcometea', //重定向到欢迎界面
      children:[
        {
          path: '/teahome/welcometea',
          name: 'welcometea',
          component: Welcome
        },
        {
          path: '/teahome/teaappoint',
          name: 'teaappoint',
          component: TeaAppoint
        },
        {
          path: '/teahome/teachangecourse',
          name: 'teachangecourse',
          component: TeaChangeCourse
        },
        {
          path: '/teahome/teatimetable',
          name: 'teatimetable',
          component: TeaTimeTable
        },
        {
          path: '/teahome/teaupdatecourse',
          name: 'teaupdatecourse',
          component: TeaUpdateCourse
        },
        {
          path: '/teahome/teaupdateInfo',
          name: 'teaupdateInfo',
          component: TeaUpdateInfo
        },
      ],
    },
    {
      path: '/stuhome',
      name: 'stuhome',
      component: StuHome,
      redirect: '/stuhome/welcomestu', //重定向到欢迎界面
      children:[
        {
          path: '/stuhome/welcomestu',
          name: 'welcomestu',
          component: StuWelcome
        },
        {
          path: '/stuhome/stuappoint',
          name: 'stuappoint',
          component: StuAppoint
        },
        {
          path: '/stuhome/stutimetable',
          name: 'stutimetable',
          component: StuTimeTable
        },
        {
          path: '/stuhome/stuupdateinfo',
          name: 'stuupdateinfo',
          component: StuUpdateInfo
        },
      ],
    },

]
})
