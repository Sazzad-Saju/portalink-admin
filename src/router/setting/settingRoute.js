import auth from "../../middlewares/auth";
import admin from "@/middlewares/admin";
export const settingRoute = [
    {
        path: '/banner/logos',
        component: () => import(/* webpackChunkName: "banners" */ '../../views/setting/Logos'),
        name: 'banner_logos',
        meta: {
            middleware: [
                auth, admin
            ]
        }
    },
]