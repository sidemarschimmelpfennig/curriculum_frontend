import DashBoardAdminView from "@/views/DashBoardAdmin/DashBoardAdminView.vue";
import HomePageAdmin from "@/views/DashBoardAdmin/pages/HomePageAdmin/HomePageAdmin.vue";
import HomeView from "@/views/HomeView.vue";
import JobListingView from "@/views/JobListingView/JobListingView.vue";
import CreateAccountView from "@/views/LoginView/CreateAccountView.vue";
import LoginView from "@/views/LoginView/LoginView.vue";
import authMiddleware from '../middleware/authMiddleware';
import store from '../store';
import { createRouter, createWebHistory } from "vue-router";
import DataRegisterPage from "@/views/DashBoardAdmin/pages/DataRegisterPage/DataRegisterPage.vue";
import JobListingPage from "@/views/DashBoardAdmin/pages/JobListingPage/JobListingPage.vue";
import UsersPage from "@/views/DashBoardAdmin/pages/UserPage/UsersPage.vue";
import CandidatesForJob from "@/views/DashBoardAdmin/pages/CandidatesForJob/CandidatesForJob.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/joblisting",
    name: "joblisting",
    component: JobListingView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresNavbar: false, requiresFooter: false  },
  },
  {

    path: "/createacccount",
    name: "createacccount",
    component: CreateAccountView,
  }, 
  {
    path: "/admin",
    name: "admin",
    component: DashBoardAdminView,
    meta: { 
      requiresNavbar: false,
      requiresFooter: false,
    //  requiresAuth: true
    },
    children:[
      {
        path:"",
        name:"default",
        component:HomePageAdmin,
      },
      {
        path:"joblistpage",
        name:'job-listpage',
        component:JobListingPage,
        meta:{authMiddleware: true},
      },{
        path:"userpage",
        name: "userpage",
        component: UsersPage,
      },
      {
        path:"register_data",
        name: "register_data",
        component: DataRegisterPage,
      },
      {
        path:"candidatestojob/:id",
        name: "candidatestojob",
        component: CandidatesForJob,
        props: true,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

authMiddleware({ store, router })

export default router;