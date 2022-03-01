<template>
  <div class="error-container">
    <p>Um erro ocorreu durante sua busca</p>
    <span>{{ error }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["error"],
};
</script>

<style scoped>
div.error-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

div.error-container p {
  font-family: var(--font);
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.125rem;
}

div.error-container span {
  font-family: var(--font);
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.098rem;
  margin-top: 0.25rem;
}
</style>
