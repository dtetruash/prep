import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/staff/NewEmployee'
import ViewStaff from '@/components/staff/ViewStaff'
import EditEmployee from '@/components/staff/EditEmployee'
import ViewAppointment from '@/components/appointment/ViewAppointment'
import ViewTests from '@/components/tests/ViewTests'
import ViewRecipes from '@/components/tests/ViewRecipes'
import ViewRecipeInfo from '@/components/tests/ViewRecipeInfo'
import NewRecipe from '@/components/tests/NewRecipe'
import EditRecipe from '@/components/tests/EditRecipe'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import firebase from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    { 
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-staff',
      name: 'view-staff',
      component: ViewStaff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-appointment',
      name: 'view-appointment',
      component: ViewAppointment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-tests',
      name: 'view-tests',
      component: ViewTests,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-recipes/:test_id',
      name: 'view-recipes',
      component: ViewRecipes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-recipe/:test_id',
      name: 'new-recipe',
      component: NewRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-recipe-info/:test_id/:recipe_id',
      name: 'view-recipe-info',
      component: ViewRecipeInfo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-recipe/:test_id/:recipe_id',
      name: 'edit-recipe',
      component: EditRecipe,
      meta: {
        requiresAuth: true
      }
    }

  ]
})

// Nav Guard

router.beforeEach((to, from, next) => {
  // Check for required auth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if(!firebase.auth().currentUser) {
      // Go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else {
      // Proceed to route
      next()
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if(firebase.auth().currentUser) {
      // Go to Dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }else {
      // Proceed to route
      next()
    }
  }else {
    // Proceed to route
    next()
  }
})

export default router