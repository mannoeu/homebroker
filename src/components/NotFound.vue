<template>
  <div class="not-found">
    <p>Ativo não encontrado</p>
    <span
      >O ativo que você buscou não foi encontrado na base de dados. Por favor,
      tente buscar por outro ativo!</span
    >
  </div>
</template>

<style scoped>
div.not-found {
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

div.not-found p {
  font-family: var(--font);
  color: var(--text-primary);
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.125rem;
}

div.not-found span {
  font-family: var(--font);
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.098rem;
  margin-top: 0.25rem;
}
</style>
