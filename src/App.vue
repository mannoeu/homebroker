<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <h1>Digite o ticket da ação para pesquisar...</h1>
    <form @submit="research">
      <input type="text" @change="onChange" placeholder="Pesquisar ação..." />
      <button>Buscar</button>
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
        name: "Result",
        params: { ticket: this.searchValue },
      });
      console.log(this.searchValue);
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
</style>
