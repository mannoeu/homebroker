<template>
  <main>
    <div v-if="!loaded">Carregando...</div>
    <div v-if="!!error">{{ error }}</div>
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
          <article>
            <p class="data-item-text">
              {{ item?.moeda_ref }} {{ formatMoney(item?.vl_abertura) }}
              <span>Abertura</span>
            </p>
            <p class="data-item-text">
              {{ item?.moeda_ref }} {{ formatMoney(item?.vl_fechamento) }}
              <span>Fechamento</span>
            </p>

            <p class="data-item-text">
              {{ item?.moeda_ref }} {{ formatMoney(item?.vl_maximo) }}
              <span>Máximo</span>
            </p>
            <p class="data-item-text">
              {{ item?.moeda_ref }} {{ formatMoney(item?.vl_minimo) }}
              <span>Mínimo</span>
            </p>
            <p class="data-item-text">
              {{ item?.moeda_ref }}
              {{ formatMoney(item?.vl_mlh_oft_compra) }}
              <span>Melhor oferta de compra</span>
            </p>
            <p class="data-item-text">
              {{ item?.moeda_ref }}
              {{ formatMoney(item?.vl_mlh_oft_venda) }}
              <span>Melhor oferta de venda</span>
            </p>
          </article>
          <p class="total-volume">
            <vue-feather class="text_icon_default" type="tag" />
            <span>{{ formatDate(item?.created_at) }}</span>
          </p>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      informations: null,
      loaded: false,
      error: null,
    };
  },
  methods: {
    getData() {
      this.loaded = false;
      this.error = null;
      this.informations = null;

      this.result = fetch(
        "https://api-cotacao-b3.labdo.it/api/cotacao/cd_acao/" +
          this.$route.params.ticket
      )
        .then((res) => res.json())
        .then((res) => {
          this.result = res?.slice(0, 5);
          this.informations = {
            empresa: res[0].nm_empresa_rdz,
            ticket: res[0].cd_acao,
          };
        })
        .catch((error) => {
          this.error = error?.response?.message;
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    formatMoney(value = 0, forcePositive = false) {
      let result = value;
      if (typeof value === "string") {
        let parse = result?.replace(",", ".");
        result = Number(parse);
      }

      if (forcePositive) {
        result = Math.abs(result);
      }

      return Number(result).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    formatDate(d) {
      return new Date(d).toLocaleDateString("pt-BR");
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

li.data-item {
  display: flex;
  flex-direction: column;
}

li.data-item article {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 400px) {
  li.data-item article {
    grid-template-columns: 1fr;
  }
}

p.data-item-text {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.098rem;
  color: var(--text-primary);
  border-bottom: 1px dashed var(--text-secondary);
}
p.data-item-text span {
  font-size: 0.75rem;
  line-height: 1.025rem;
  color: var(--text-secondary);
}

p.total-volume {
  font-size: 0.875rem;
  line-height: 1.098rem;
  display: flex;
  align-items: center;
  background: var(--red);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  width: max-content;
}
p.total-volume span {
  margin-left: 0.25rem;
}
</style>
