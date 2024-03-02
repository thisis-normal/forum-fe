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
        path: "/admin/login",
        component: () => import("../views/admin/login/index.vue"),

    }

];

export default login;
