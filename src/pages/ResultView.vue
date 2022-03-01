<template>
  <main>
    <Loading v-if="!loaded" />
    <Error v-if="loaded && !!error" :error="error" />
    <NotFound v-if="loaded && !error && !result" />
    <article class="ticket" v-if="loaded && !!result">
      <header class="ticket-info">
        <vue-feather type="activity" />
        <div class="text">
          <h1>{{ informations?.ticket }}</h1>
          <p>{{ informations?.empresa }}</p>
        </div>
      </header>
      <ul>
        <li class="data-item" :key="item?.id" v-for="item in result">
          <QuoteDetail :item="item" />
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import QuoteDetail from "@/components/QuoteDetail.vue";
import NotFound from "@/components/NotFound.vue";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";

export default {
  name: "ResultView",
  data() {
    return {
      result: null,
      informations: null,
      loaded: false,
      error: null,
    };
  },
  components: {
    QuoteDetail,
    NotFound,
    Loading,
    Error,
  },
  methods: {
    getData() {
      this.loaded = false;
      this.error = null;

      this.result = fetch(
        "https://api-cotacao-b3.labdo.it/api/cotacao/cd_acao/" +
          this.$route.params.ticket +
          "/5"
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res?.length);
          if (res?.length > 0) {
            this.result = res?.slice(0, 5);
            this.informations = {
              empresa: res[0].nm_empresa_rdz,
              ticket: res[0].cd_acao,
            };
          } else {
            this.result = null;
            this.informations = null;
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
  watch: {
    "$route.params.ticket"() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
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

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  row-gap: 3rem;
}

@media (max-width: 480px) {
  article.ticket ul {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
