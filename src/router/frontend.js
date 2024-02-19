const frontend = [{
    path: "/",
    // component: () => import("../layout/admin.vue"),

    component: () => import("../layout/frontend.vue"),
    children: [{
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../views/admin/dashboard/index.vue"),

    }
    ],
}];

export default frontend;