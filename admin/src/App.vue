<template>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  created() {},

  beforeCreate() {
    const currentPath = this.$router.history.current.path;
    if (currentPath === "/" || currentPath === "/app") {
      this.$router.push("/app/dashboard");
    }
  }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
