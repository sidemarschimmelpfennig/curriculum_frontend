export default function authMiddleware({ store, router }) {
    router.beforeEach((to, from, next) => {
      const isAuthenticated = store.getters['auth/isAuthenticated'];
  
      if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
      } else {
        next(); 
      }
    });
  }
  