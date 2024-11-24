<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const $store = useStore();

onMounted(() => {
    const checkToken = localStorage.getItem('token');
    
    if (!!checkToken) {
        $store.dispatch('setToken', checkToken);
    }
})
</script>