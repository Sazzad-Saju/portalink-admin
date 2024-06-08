import auth from "../../middlewares/auth";
export const settingRoute = [
    {
        path: '/banner/logos',
        component: () => import(/* webpackChunkName: "banners" */ '../../views/setting/Logos'),
        name: 'banner_logos',
        meta: {
            middleware: [
                auth
            ]
        }
    },
]