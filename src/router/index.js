import { createRouter, createWebHistory } from 'vue-router';
import PodForm from '@/components/PodForm.vue'; // Pod main form
import PodDetail from '@/components/PodDetail.vue'; // Pod detail form
import NamespaceForm from '@/components/NamespaceForm.vue'; // Namespace main form
import NamespaceDetail from '@/components/NamespaceDetail.vue'; // Namespace main form
import DeploymentList from '@/components/DeploymentForm.vue'; // Deployment main form

const routes = [
    {
        path: '/pods',
        name: 'PodList',
        component: PodForm
    },
    {
        path: '/pods/:podName',
        name: 'PodDetail',
        component: PodDetail
    },
    {
        path: '/namespaces',
        name: 'NamespaceList',
        component: NamespaceForm
    },
    {
        path: '/namespaces/:namespaceName',
        name: 'NamespaceDetail',
        component: NamespaceDetail
    },
    {
        path: '/deployments',
        name: 'DeploymentList',
        component: DeploymentList
    }
];

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL), // for web history
    routes,
});

export default router