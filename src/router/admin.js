const admin = [{
    path: "/admin",
    // component: () => import("../layout/admin.vue"),

    component: () => import("../layout/admin.vue"),
    children: [{
        path: "",
        name: "admin-dashboard",
        component: () => import("../views/admin/dashboard/index.vue"),

    },
    {
        path: "users",
        name: "admin-users",
        component: () => import("../views/admin/users/index.vue"),
    }

        ,
    {
        path: "users/:id/edit",
        name: "admin-users-edit",
        component: () => import("../views/admin/users/edit.vue"),
    },
    {
        path: "userAdd",
        name: "admin-users-add",
        component: () => import("../views/admin/users/add.vue"),
    }
        ,
    {
        path: "categorys",
        name: "admin-categorys",
        component: () => import("../views/admin/category/index.vue"),

    },
    {
        path: "categoryAdd",
        name: "admin-category-add",
        component: () => import("../views/admin/category/add.vue"),
    },
    {
        path: "categorys/:id",
        name: "admin-category-edit",
        component: () => import("../views/admin/category/edit.vue"),
    },
    {
        path: "forumAdd",
        name: "admin-forum-add",
        component: () => import("../views/admin/forums/add.vue"),
    },
    {
        path: "forums/:id",
        name: "admin-forum-edit",
        component: () => import("../views/admin/forums/edit.vue"),
    },
    {
        path: "categorys/:id/forum",
        name: "admin-category-forum",
        component: () => import("../views/admin/forums/index.vue"),
    },
    {
        path: "pinnedPost",
        name: "admin-pinnedPost",
        component: () => import("../views/admin/pinnedPost/index.vue"),

    }
    ],
}];

export default admin;