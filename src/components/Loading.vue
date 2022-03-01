<template>
  <div class="loading-container">
    <p>Carregando informações</p>
    <div class="loading-box">
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped>
div.loading-container {
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

div.loading-container p {
  font-family: var(--font);
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.125rem;
}

.loading-box {
  width: 100%;
  max-width: 70px;
  margin: 1rem auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  place-items: center;
}

.loading-box span {
  width: 0.75rem;
  height: 0.75rem;
  background: var(--text-secondary);
  border-radius: 50%;
  animation: loading 1s linear infinite;
  transition: all 0.3s ease;
}
.loading-box span:nth-child(1) {
  animation-delay: 0.1s;
}
.loading-box span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-box span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes loading {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
