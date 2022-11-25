<template>
  <div id="app">
    <div id="s">
      <i class="globe icon" />
      <select v-model="locale">
        <option value="zh-TW">繁中</option>
        <option value="zh-CN">简中</option>
        <option value="en">English</option>
        <option value="fr">français</option>
      </select>
    </div>
    <router-view :locale="locale"/>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'App',
  data () {
    return {
      locale: 'zh-TW'
    }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  },
  mounted () {
    console.log(navigator.languages[0])
    this.locale = navigator.languages[0] || 'zh-TW'
    if (this.locale.indexOf('en') > -1) {
      this.locale = 'en'
    }
  }
}
</script>

<style>

#s {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
