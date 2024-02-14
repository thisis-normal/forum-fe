const admin = [{
    path: "/admin",
    // component: () => import("../layout/admin.vue"),

    component: () => import("../layout/admin.vue"),
    children: [{
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../views/admin/dashboard/index.vue"),

    },
    {
        path: "users",
        name: "admin-users",
        component: () => import("../views/admin/users/index.vue"),
    },
    {
        path: "userEdit",
        name: "admin-users-edit",
        component: () => import("../views/admin/users/edit.vue"),
    }
        ,
    {
        path: "categorys",
        name: "admin-categorys",
        component: () => import("../views/admin/category/index.vue"),

    },
    {
        path: "pinnedPost",
        name: "admin-pinnedPost",
        component: () => import("../views/admin/pinnedPost/index.vue"),

    }
    ]
}];
export default admin;