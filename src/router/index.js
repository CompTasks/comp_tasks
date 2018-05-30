import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Register from "@/components/Register";

import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {  
  // Check for requiresAuth guard #1
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //console.log("#1")
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      //console.log("#1.1")
      // Go to login
      next({
        path: "/login",
        // query: {
        //   redirect: to.fullPath
        // }
      });
    } else {
      // Proceed to route
      //console.log("#1.2")
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //console.log("#2")
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      //console.log("#2.1")
      // Go to login      
      if (to.name=="login"){
        //console.log("#2.1.1")
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      }else{
        //console.log("#2.1.2")
        next({path:'/'});
      }
      
    } else {
      // Proceed to route
      //console.log("#2.2")
      next();
    }
  } else {
    //console.log("#3")
    // Proceed to route
    next();
  }
});

export default router;
