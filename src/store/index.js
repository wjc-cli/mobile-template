import { createStore } from "vuex";
import { login } from "@/service";
export default createStore({
    state: {
        token: "",
    },
    getters: {
        getToken(state) {
            return state.token;
        },
    },
    mutations: {
        setToken(state, value) {
            state.token = value;
        },
    },
    actions: {
        async loginFn({ commit }, code) {
            const res = await login({ code });
            if (res.code === 0) {
                const { data } = res;
                sessionStorage["extra-token"] = data;
                commit("setToken", data);
            }
        },
    },
});
