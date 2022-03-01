<template>
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
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["item"],
  methods: {
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
};
</script>

<style scoped>
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
