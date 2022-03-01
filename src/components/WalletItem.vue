<template>
  <router-link :to="'/results/' + item?.cd_acao">
    <p class="enterprise-name">
      <vue-feather class="text_icon_default" type="activity" />
      <span class="code">
        <strong>{{ item?.cd_acao }}</strong>
        {{ item?.nm_empresa }}
      </span>
    </p>
  </router-link>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["item"],
};
</script>

<style scoped>
a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: inherit;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

a:hover > p {
  background: var(--text-secondary);
}

p.enterprise-name {
  font-size: 0.875rem;
  line-height: 1.098rem;
  display: flex;
  align-items: center;
  background: var(--dark);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  width: max-content;
  min-width: 150px;
  transition: all 0.2s ease;
}

@media (max-width: 389px) {
  p.enterprise-name {
    width: 100%;
  }
}

p.enterprise-name > span {
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  font-size: 0.75rem;
  font-family: var(--font);
}

p.enterprise-name > span > strong {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.15rem;
  font-family: var(--font);
}
</style>
