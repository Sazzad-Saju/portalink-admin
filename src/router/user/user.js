import auth from "../../middlewares/auth.js";

export const user = [
    {
        path: '/user-profile',
        component: () => import('../../views/user/Profile'),
        name: 'profile',
        meta: {
            middleware: [
                auth
            ]
        }
    },
]