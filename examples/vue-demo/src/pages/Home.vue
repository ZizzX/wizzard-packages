<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const examples = [
  {
    title: 'Basic Navigation',
    description: 'Core navigation functionality: next/prev, breadcrumbs, progress tracking',
    path: '/test/basic-navigation',
    testId: 'nav-basic',
  },
  {
    title: 'Validation',
    description: 'Field validation, error handling, and validation adapters',
    path: '/test/validation-demo',
    testId: 'nav-validation',
  },
  {
    title: 'Array Data',
    description: 'Working with arrays: add, remove, update items with validation',
    path: '/test/array-data-demo',
    testId: 'nav-array',
  },
  {
    title: 'Conditional Steps',
    description: 'Dynamic steps visibility based on conditions',
    path: '/test/conditional-demo',
    testId: 'nav-conditional',
  },
  {
    title: 'Dependency Tracking',
    description: 'Step dependencies, data clearing, and cascading invalidations',
    path: '/test/dependency-demo',
    testId: 'nav-dependency',
  },
  {
    title: 'Error Handling',
    description: 'Inline errors, error summary, and recovery flows',
    path: '/test/error-demo',
    testId: 'nav-error',
  },
  {
    title: 'Middleware',
    description: 'Logger, DevTools, and custom middleware integration',
    path: '/test/middleware-demo',
    testId: 'nav-middleware',
  },
  {
    title: 'Navigation Control',
    description: 'Navigation modes: visited, sequential, free, role-based access',
    path: '/test/navigation-control',
    testId: 'nav-control',
  },
  {
    title: 'Persistence',
    description: 'LocalStorage sync, state restoration, and storage isolation',
    path: '/test/persistence-demo',
    testId: 'nav-persistence',
  },
  {
    title: 'Step Guards',
    description: 'beforeLeave guards, async validation, navigation blocking',
    path: '/test/guards-demo',
    testId: 'nav-guards',
  },
  {
    title: 'Advanced Validation',
    description: 'Auto-fill, error modals, async validation, field highlighting',
    path: '/test/advanced-validation-demo',
    testId: 'nav-advanced',
  },
];

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="home-container">
    <header class="header">
      <h1>@wizzard-packages/vue</h1>
      <p class="subtitle">Comprehensive E2E Test Suite & Examples</p>
    </header>

    <main class="main-content">
      <section class="intro">
        <p>
          A flexible, headless, and strictly typed multi-step wizard for Vue 3.
          Explore interactive examples demonstrating all features.
        </p>
      </section>

      <section class="examples-grid">
        <div
          v-for="example in examples"
          :key="example.path"
          class="example-card"
          :data-testid="example.testId"
          @click="navigateTo(example.path)"
        >
          <h3>{{ example.title }}</h3>
          <p>{{ example.description }}</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>
        <a href="https://github.com/your-org/wizzard-packages" target="_blank" rel="noopener">
          GitHub
        </a>
        •
        <a href="https://www.npmjs.com/package/@wizzard-packages/vue" target="_blank" rel="noopener">
          npm
        </a>
        •
        <a href="https://wizzard-packages.dev/docs" target="_blank" rel="noopener">
          Documentation
        </a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.header {
  text-align: center;
  padding: 3rem 1rem 2rem;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin: 0;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

.intro {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.example-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: white;
}

.example-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #667eea;
}

.example-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
}

.footer a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: opacity 0.2s;
}

.footer a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style>
