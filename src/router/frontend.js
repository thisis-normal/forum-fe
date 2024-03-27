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
            }
        ]
    },

];

export default frontend;
