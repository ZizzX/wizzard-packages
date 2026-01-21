<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pageName = route.name as string;

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="placeholder-container">
    <div class="placeholder-content">
      <h1>🚧 {{ pageName }}</h1>
      <p class="message">This example page is under construction.</p>
      <p class="info">
        For now, please check the
        <strong>Comprehensive Demo</strong> which covers basic navigation, validation, and reactive
        updates.
      </p>
      <div class="actions">
        <button class="btn btn-primary" @click="goHome">← Back to Examples</button>
      </div>
      <div class="note">
        <p><strong>Coming soon:</strong></p>
        <ul>
          <li>Array data operations</li>
          <li>Dependency tracking</li>
          <li>Error handling patterns</li>
          <li>Middleware integration</li>
          <li>Navigation control modes</li>
          <li>Advanced validation scenarios</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.placeholder-content {
  max-width: 600px;
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.message {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1rem;
}

.info {
  font-size: 1rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.actions {
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.note {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: left;
  margin-top: 2rem;
}

.note p {
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #333;
}

.note ul {
  list-style-position: inside;
  color: #666;
  font-size: 0.95rem;
}

.note li {
  margin-bottom: 0.5rem;
}
</style>
