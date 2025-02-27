import auth from "@/middlewares/auth";
import guest from "@/middlewares/guest";
import { settingRoute } from "@/router/setting/settingRoute";
import { customers } from "@/router/customers/customers";
import { user } from "@/router/user/user";

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

routes.push(...settingRoute);
routes.push(...customers);
routes.push(...user);

export default routes;