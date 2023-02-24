<template>
  <header>
    <img alt="Vue logo" src="../assets/vue.svg" height="50" />
    <input type="text" name="id" placeholder="Title..." v-model="searchQuery" />
    <nav>
      <div class="wrapper">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li>
            <UserDropdown title="John Doe" />
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="wrapper" id="container-docs-filtered" v-if="searchQuery">
    <div class="item doc" v-for="doc in docsFiltered" :key="doc">
      <p>{{ doc.titulo }}</p>
    </div>
    <div class="item doc">
      <p>New document</p>
    </div>
  </div>
</template>

<script>
import UserDropdown from "../components/UserDropdown.vue";
export default {
  components: {
    UserDropdown
  },
  data() {
    return {
      searchQuery: null,
      docsFiltered: []
    };
  },
  computed: {
    async resultQuery() {
      if (this.searchQuery) {
        const res = await fetch(`${import.meta.env.VITE_URL_READ_TITLES}/api/docs/filter?title=${this.searchQuery}`, {
          method: 'POST', headers: { "Content-type": "application/json"}
        });
        const response = await res.json();
        if (response.status == 'OK') this.docsFiltered = response.data;
        return this.docsFiltered.slice(0,4)
      }
    },
  },
};
</script>

<style>
header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;
  height: 70px;
}

#container-docs-filtered {
  position: fixed;
  left: 22%;
  margin: 0px 0px;
}

header p {
  margin-left: 1rem;
}

nav {
  margin-left: auto;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline-flex;
  margin-left: 1rem;
}

input {
  display: block;
  width: 350px;
  margin: 20px 10px;
  padding: 10px 45px;
  background: white url("../assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

@media only screen and (min-width: 320px) and (max-width: 500px) and (orientation: portrait) {
  input {
    max-width: 200px;
  }

  .item {
    max-width: 200px;
  }

  header {
    display: inline-table;
  }
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.doc {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.error {
  background-color: tomato;
}
</style>