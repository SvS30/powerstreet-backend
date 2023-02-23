<template>
  <header>
    <img alt="Vue logo" src="../assets/logo.png" height="50" />
    <input type="text" name="id" placeholder="Title..." v-model="searchQuery" />
    <div class="wrapper" v-if="searchQuery">
      <div class="item doc" v-for="doc in resultQuery" :key="doc">
        <p>{{ doc.title }}</p>
      </div>
    </div>
    <div class="item error" v-if="searchQuery && !resultQuery.length">
      <p>No results found!</p>
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: null,
      resources: [
        { title: "ABE Attendance", uri: "aaaa.com", category: "a", icon: null },
        {
          title: "Accounting Services",
          uri: "aaaa.com",
          category: "a",
          icon: null,
        },
        { title: "Administration", uri: "aaaa.com", category: "a", icon: null },
        {
          title: "Advanced Student Lookup",
          uri: "bbbb.com",
          category: "b",
          icon: null,
        },
        { title: "Art & Sciences", uri: "bbbb.com", category: "b", icon: null },
        {
          title: "Auxiliares Services",
          uri: "bbbb.com",
          category: "b",
          icon: null,
        },
        { title: "Basic Skills", uri: "cccc.com", category: "c", icon: null },
        {
          title: "Board of Trustees",
          uri: "dddd.com",
          category: "d",
          icon: null,
        },
      ],
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.resources.filter((doc) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => doc.title.toLowerCase().includes(v));
        });
      } else return this.resources;
    },
  },
};
</script>

<style>
header {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;
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
  margin: 20px auto;
  padding: 10px 45px;
  /* background: white url("assets/search-icon.svg") no-repeat 15px center; */
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

@media only screen
and (min-width: 320px)
and (max-width: 500px)
and (orientation: portrait)
{
  input { max-width: 200px; }
  .item { max-width: 200px; }
  header { display: inline-table; }
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