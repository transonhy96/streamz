<template>
  <div class="columns">
    <div class="column is-2 side">
      <aside class="menu">
        <p class="menu-label">Followed Channels</p>
        <ul class="menu-list">
          <li>
            <a>{{'Dashboard'}}</a>
          </li>
        </ul>
        <p class="menu-label">Online Friends</p>
        <ul class="menu-list"></ul>
      </aside>
    </div>
    <div class="column">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: "channel"
};
</script>
<style scoped>
.menu-list {
  list-style: none;
}

.menu-label {
  margin-left: 10%;
}
.filter {
  border-style: dashed;
}
.header {
  display: inline-flex;
  flex-wrap: nowrap;
}
.header > button {
  margin-right: 5px;
}
.force-overflow {
  min-height: 450px;
}
.breadcrumb {
  margin-top: 0px;
}
button {
  font-family: "GTEestiDisplayRegular2";
  font-size: 16px;
}
</style>

