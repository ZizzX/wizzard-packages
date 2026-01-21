import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/comprehensive',
    name: 'Comprehensive',
    component: () => import('./pages/Comprehensive.vue'),
  },
  {
    path: '/test/basic-navigation',
    name: 'BasicNavigation',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/validation-demo',
    name: 'Validation',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/array-data-demo',
    name: 'ArrayData',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/conditional-demo',
    name: 'Conditional',
    component: () => import('./pages/TestConditional.vue'),
  },
  {
    path: '/test/dependency-demo',
    name: 'Dependency',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/error-demo',
    name: 'Error',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/middleware-demo',
    name: 'Middleware',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/navigation-control',
    name: 'NavigationControl',
    component: () => import('./pages/Placeholder.vue'),
  },
  {
    path: '/test/persistence-demo',
    name: 'Persistence',
    component: () => import('./pages/TestPersistence.vue'),
  },
  {
    path: '/test/guards-demo',
    name: 'Guards',
    component: () => import('./pages/TestStepGuards.vue'),
  },
  {
    path: '/test/advanced-validation-demo',
    name: 'AdvancedValidation',
    component: () => import('./pages/Placeholder.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
