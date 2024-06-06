import auth from "@/middlewares/auth";
import guest from "@/middlewares/guest";

let routes = [
    {
        path: '/login', 
        component: () => import('../views/auth/LogIn'),
        name: 'login',
        meta: {
            middleware: [
                guest
            ]
        }
    },
    {
        path: '/',
        component: () => import('../views/DashBoard'),
        name: 'dashboard',
        meta: {
            middleware: [
                auth
            ]
        }
    },
]

export default routes;