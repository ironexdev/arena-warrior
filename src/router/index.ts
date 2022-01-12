import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import Home from "../views/Home.vue"
import NotFound from "../views/NotFound.vue";
import {userModule} from "@/store/UserModule";
import translatedRoutes from "@/../translations/routes.json"

let routes: Array<RouteRecordRaw> = [
    {
        path: translatedRoutes.home,
        name: "home",
        component: Home
    },
    {
        path: translatedRoutes.login,
        name: "login",
        beforeEnter: (to, from, next) => {
            if (userModule.authenticated) {
                next({name: "profile"})
            } else {
                next()
            }
        },
        component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
    },
    {
        path: translatedRoutes.loginWithoutPassword,
        name: "loginWithoutPassword",
        beforeEnter: (to, from, next) => {
            if (userModule.authenticated) {
                next({name: "profile"})
            } else {
                next()
            }
        },
        component: () => import(/* webpackChunkName: "loginWithoutPassword" */ "../views/LoginWithoutPassword.vue")
    },
    {
        path: translatedRoutes.registration,
        name: "registration",
        beforeEnter: (to, from, next) => {
            if (userModule.authenticated) {
                next({name: "profile"})
            } else {
                next()
            }
        },
        component: () => import(/* webpackChunkName: "registration" */ "../views/Registration.vue")
    },
    {
        path: translatedRoutes.profile,
        name: "profile",
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (!userModule.authenticated) {
                next({name: "login"})
            } else {
                next()
            }
        },
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
    },
    {
        path: translatedRoutes.authorization,
        name: "authorization",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "authorization" */ "../views/Authorization.vue")
    },
    {
        path: "/:catchAll(.*)",
        name: "pageNotFound",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
