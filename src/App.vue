<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import { defineComponent } from "vue";
import qs from "qs";
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const store = useStore();
        const href = location.search || location.hash;
        const i = href.indexOf("?");
        const search = href.substr(i + 1);
        const query = qs.parse(search);
        const { code } = query;
        store.dispatch("loginFn", code);
    },
});
</script>
<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
