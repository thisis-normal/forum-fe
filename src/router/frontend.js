const frontend = [
    {
        path: "/",
        component: () => import("../layout/frontend.vue"),
        children: [
            {
                path: ":id",
                name: "content",
                component: () => import("../views/frontend/content/index.vue")
            },
            {
                path: "",
                name: "home",
                component: () => import("../views/frontend/content/home.vue")
            },
            {
                path: "thread/:slug",
                name: "thread",
                component: () => import("../views/frontend/thread/index.vue")

            },
            {
                path: "forum/:slug",
                name: "forum",
                component: () => import("../views/frontend/forum/index.vue")

            }

        ]
    },

];

export default frontend;
