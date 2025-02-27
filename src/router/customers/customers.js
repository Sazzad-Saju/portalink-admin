import auth from "@/middlewares/auth";
import admin from "@/middlewares/admin";

export const customers = [
    {
        path: '/create-customer',
        component: () => import(/* webpackChunkName: "customers" */ '../../views/customers/CustomerForm'),
        name: 'create-customer',
        meta: {
            middleware: [
                auth, admin
            ]
        }
    },
    {
        path: '/customers',
        component: () => import(/* webpackChunkName: "customers" */ '../../views/customers/Customer'),
        name: 'customers',
        meta: {
            middleware: [
                auth, admin
            ]
        }
    },
    {
        path: '/customer/:id',
        component: () => import(/* webpackChunkName: "customers" */ '../../views/customers/CustomerForm'),
        name: 'update-customer',
        meta: {
            middleware: [
                auth, admin
            ]
        }
    },
]