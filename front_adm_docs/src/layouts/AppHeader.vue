<template>
  <header>
    <img alt="Vue logo" src="../assets/logo.png" height="50" />
    <input type="text" id="title" name="id" placeholder="Title..." />
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

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
</style>