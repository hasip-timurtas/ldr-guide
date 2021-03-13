import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import nProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/HomeLayout"),
        children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/components/Pages/Home/Home")
            },
            {
                path: "the-story",
                name: "TheStory",
                component: () => import("@/components/Pages/Home/TheStory")
            },
            {
                path: "first-chapter",
                name: "FirstChapter",
                component: () => import("@/components/Pages/Home/FirstChapter")
            },
            {
                path: "full-book",
                name: "FullBook",
                component: () => import("@/components/Pages/Home/FullBook")
            },
            {
                path: "community",
                name: "Community",
                component: () => import("@/components/Pages/Home/Community")
            },
            {
                path: "contact",
                name: "Contact",
                component: () => import("@/components/Pages/Home/Contact")
            }
        ]
    },
    {
        path: "*",
        name: "NotFound",
        component: () => import("@/components/Pages/NotFound")
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters["auth/loggedIn"]) {
            nProgress.start();
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.afterEach(() => {
    nProgress.done();
});

export default router;
