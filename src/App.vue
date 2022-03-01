<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="search-box">
    <h1>
      HB IBOV
      <span>Insira o ticket do ativo no campo de pesquisa</span>
    </h1>
    <form @submit="research">
      <input type="text" @change="onChange" placeholder="Pesquisar ação..." />
      <button>
        <vue-feather type="search" />
      </button>
    </form>
  </header>
  <section id="page">
    <RouterView />
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      searchValue: "",
    };
  },
  methods: {
    onChange(e) {
      this.searchValue = e.target.value;
    },
    research(e) {
      e.preventDefault();
      this.$router.replace({
        name: "ResultView",
        params: { ticket: this.searchValue },
      });
    },
  },
};
</script>

<style>
@import "@/assets/base.css";

#page {
  max-width: 1280px;
  margin: 0 auto;
}

header.search-box {
  width: 100%;
  display: flex;
  padding: 1rem;
  max-width: 1280px;
  margin: 1rem auto 0;
  justify-content: space-between;
  align-items: center;
}

header.search-box h1 {
  font-size: 1.5rem;
  line-height: 1.125rem;
  font-family: var(--font);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

header.search-box h1 span {
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.125rem;
  font-family: var(--font);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
}

header.search-box form {
  display: flex;
  align-items: center;
  border: 1px solid var(--dark);
  border-radius: 0.25rem;
  overflow: hidden;
}
header.search-box form input {
  width: 280px;
  background: var(--dark);
  color: var(--text-primary);
  border: none;
  padding: 0.5rem;
  text-transform: uppercase;
}
header.search-box form input::placeholder {
  text-transform: none;
}
header.search-box form button {
  padding: 0.5rem 1rem;
  background: var(--dark);
  color: var(--text-primary);
  border: none;
  border-left: 1px solid var(--text-secondary);

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

header.search-box form button:hover {
  background: var(--darken);
}

header.search-box form button svg {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 600px) {
  header.search-box {
    flex-direction: column;
  }
  header.search-box h1 {
    margin-bottom: 1rem;
  }
  header.search-box form {
    width: 100%;
  }
  header.search-box form input {
    max-width: 280px;
    width: 100%;
  }
}
</style>
