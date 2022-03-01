<template>
  <main>
    <Loading v-if="!loaded" />
    <Error v-if="loaded && !!error" :error="error" />
    <NotFound v-if="loaded && !error && !result" />
    <article class="ticket" v-if="loaded && !!result">
      <header class="ticket-info">
        <vue-feather type="activity" />
        <div class="text">
          <h1>Carteira</h1>
          <p>Ibovespa</p>
        </div>
      </header>
      <ul>
        <li class="data-item" :key="item?.id" v-for="item in result">
          <WalletItem :item="item" />
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import WalletItem from "@/components/WalletItem.vue";
import NotFound from "@/components/NotFound.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";

export default {
  name: "HomeView",
  data() {
    return {
      result: null,
      loaded: false,
      error: null,
    };
  },
  components: {
    WalletItem,
    NotFound,
    Loading,
    Error,
  },
  methods: {
    getIbovWallet() {
      this.loaded = false;
      this.error = null;

      this.result = fetch("https://api-cotacao-b3.labdo.it/api/carteira")
        .then((res) => res.json())
        .then((res) => {
          console.log(res?.length);
          if (res?.length > 0) {
            this.result = res;
          } else {
            this.result = null;
          }
        })
        .catch((error) => {
          this.error = error?.response?.message;
        })
        .finally(() => {
          this.loaded = true;
        });
    },
  },
  mounted() {
    this.getIbovWallet();
  },
};
</script>

<style scoped>
.text_icon_default {
  width: 1rem;
  height: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 1rem;
}

article.ticket {
  width: 100%;
  border-radius: 1rem;
}

header.ticket-info {
  width: 100%;
  background: var(--dark);
  color: var(--text-secondary);

  display: flex;
  align-items: center;
  padding: 1rem;
}

header.ticket-info .text {
  margin-left: 0.5rem;
}

header.ticket-info .text h1 {
  color: var(--text-primary);
  font-size: 1.24rem;
  line-height: 1.125rem;
  text-transform: uppercase;
}

header.ticket-info .text p {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.098rem;
  color: var(--text-secondary);
}

article.ticket ul {
  list-style: none;
  margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 389px) {
  article.ticket ul {
    flex-direction: column;
  }
  article.ticket li {
    width: 100%;
  }
}
</style>
