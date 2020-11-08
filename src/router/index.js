import Vue from "vue";
import VueRouter from "vue-router";
import Footer from "@/components/Layout/Footer.vue";
import HeaderAndMenu from "@/components/Layout/HeaderAndMenu.vue";
import store from "@/store";
import nProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("@/components/Pages/Transactions/PendingTransactions"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transactions-list",
    name: "Transactions",
    components: {
      default: () => import("@/components/Pages/Transactions/Transactions"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      // test için
      next();
    }
  },
  {
    path: "/pending-transactions-list",
    name: "PendingTransactions",
    components: {
      default: () => import("@/components/Pages/Transactions/PendingTransactions"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/company-transactions-list",
    name: "CompanyTransactions",
    components: {
      default: () => import("@/components/Pages/Transactions/CompanyTransactions"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view-transaction/:id/:type",
    name: "ViewTransaction",
    components: {
      default: () => import("@/components/Pages/Transactions/ViewTransaction"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/slots-list",
    name: "Slots",
    components: {
      default: () => import("@/components/Pages/Slots/Slots"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view-slot/:id",
    name: "ViewSlot",
    components: {
      default: () => import("@/components/Pages/Slots/ViewSlot"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/companies-list",
    name: "Companies",
    components: {
      default: () => import("@/components/Pages/Companies/Companies"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view-company/:id",
    name: "ViewCompany",
    components: {
      default: () => import("@/components/Pages/Companies/ViewCompany"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    components: {
      default: () => import("@/components/Pages/Settings/Settings"),
      headerAndMenu: HeaderAndMenu,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Pages/Login")
  },
  {
    path: "/deposit-page/:id?",
    name: "DepositPage",
    component: () => import("@/components/Pages/Deposit/Deposit")
  },
  {
    path: "/aninda-havale/:id?",
    name: "AnindaHavale",
    component: () => import("@/components/Pages/AnindaHavale/AnindaHavale")
  },
  {
    path: "/aninda-havale-papara/:id?",
    name: "AnindaHavalePapara",
    component: () => import("@/components/Pages/AnindaHavale/AnindaHavalePapara")
  },
  {
    path: "/api-explorer",
    name: "ApiExplorer",
    component: () => import("@/components/Pages/ApiExplorer/ApiExplorer")
  },

  {
    path: "*",
    name: "NotFound",
    component: () => import("@/components/Pages/NotFound")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/Pages/Test")
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
