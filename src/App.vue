<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const $store = useStore();

onMounted(async () => {
    const checkToken = localStorage.getItem('token');
    
    if (!!checkToken) {
        await $store.dispatch('setToken', checkToken);
        await $store.dispatch('getInfo');
    }
})
</script>