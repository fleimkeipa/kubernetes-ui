import { createRouter, createWebHistory } from "vue-router";

import NamespaceView from "@/views/NamespaceView.vue"; // Namespace main view
import NamespaceDetail from "@/components/NamespaceDetail.vue"; // Namespace detail form
import NamespaceEdit from "@/components/NamespaceEdit.vue"; // Namespace edit form

import DeploymentView from "@/views/DeploymentView.vue"; // Deployment main view
import DeploymentDetail from "@/components/DeploymentDetail.vue"; // Deployment detail form

import PodList from "@/views/PodList.vue";
import PodView from "@/views/PodView.vue";
import PodUpdate from "@/views/PodUpdate.vue";
import PodCreate from "@/views/PodCreate.vue";

const routes = [
  {
    path: "/pods",
    name: "PodList",
    component: PodList,
  },
  {
    path: "/pods/create/new",
    name: "PodCreate",
    component: PodCreate,
  },
  {
    path: "/pods/:podName",
    name: "PodView",
    component: PodView,
    props: true,
  },
  {
    path: "/pods/:podName/update",
    name: "PodUpdate",
    component: PodUpdate,
    props: true,
  },
  {
    path: "/namespaces",
    name: "NamespaceList",
    component: NamespaceView,
  },
  {
    path: "/namespaces/:namespaceName",
    name: "NamespaceDetail",
    component: NamespaceDetail,
  },
  {
    path: "/namespaces/:namespaceName",
    name: "NamespaceEdit",
    component: NamespaceEdit,
  },

  {
    path: "/deployments",
    name: "DeploymentForm",
    component: DeploymentView,
  },
  {
    path: "/deployments/:deploymentName",
    name: "DeploymentDetail",
    component: DeploymentDetail,
  },
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL), // for web history
  routes,
});

export default router;
