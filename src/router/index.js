import { createRouter, createWebHistory } from 'vue-router';
import PodView from '@/views/PodView.vue'; // Pod main view
import PodDetail from '@/components/PodDetail.vue'; // Pod detail form
import PodEdit from '@/components/PodEdit.vue'; // Pod edit form

import NamespaceView from '@/views/NamespaceView.vue'; // Namespace main view
import NamespaceDetail from '@/components/NamespaceDetail.vue'; // Namespace detail form

import DeploymentView from '@/views/DeploymentView.vue'; // Deployment main view
import DeploymentDetail from '@/components/DeploymentDetail.vue'; // Deployment detail form

const routes = [
    {
        path: '/pods',
        name: 'PodList',
        component: PodView
    },
    {
        path: '/pods/:podName',
        name: 'PodDetail',
        component: PodDetail
    },
    {
        path: '/pods/:podName',
        name: 'PodEdit',
        component: PodEdit,
        props: true
    },

    {
        path: '/namespaces',
        name: 'NamespaceList',
        component: NamespaceView
    },
    {
        path: '/namespaces/:namespaceName',
        name: 'NamespaceDetail',
        component: NamespaceDetail
    },

    {
        path: '/deployments',
        name: 'DeploymentForm',
        component: DeploymentView
    },
    {
        path: '/deployments/:deploymentName',
        name: 'DeploymentDetail',
        component: DeploymentDetail
    }
];

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL), // for web history
    routes,
});

export default router