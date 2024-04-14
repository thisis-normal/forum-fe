const login = [
    {
        path: "/login",
        component: () => import("../views/frontend/login/index.vue"),

    },
    {
        path: "/login/ulsa",
        component: () => import("../views/frontend/login/ulsa.vue"),

    }
    ,
    {
        path: "/register",
        component: () => import("../views/frontend/register/index.vue"),

    }
    ,
    {
        path: "/forgotpassword",
        component: () => import("../views/frontend/forgot/index.vue"),

    },
    {
        path: "/reset-password",
        component: () => import("../views/frontend/reset/index.vue"),

    },
    {
        path: "/admin/login",
        component: () => import("../views/admin/login/index.vue"),

    }

];

export default login;
