<template>
    <div
        class="main-page container"
    >
        <header class="row items-center justify-between">
            <img
                src="/icons/logo.svg"
                alt="Логотип"
            />
            
            <button
                class="button-default"
                @click="openSign"
            >
                <img
                    src="/icons/sign.svg"
                    alt="Иконка войти"
                    class="button-default-img"
                />
                
                Вход
            </button>
        </header>
        
        
        <div class="main-page__content">
            <div class="main-page__content--text">
                <h1>
                    Мои <br> заметки
                </h1>
                
                <h3 class="text-gray">
                    Не забывай о важном, <br> храни его в облаке.
                </h3>
            </div>
            
            <img
                class="main-page__content--img"
                src="/images/main-img.png"
                alt="Главная картинка"
            />
        </div>
        
        <ModalContainer
            v-model="openModal"
            title="Вход в ваш аккаунт"
            width="840px"
        />
    </div>
</template>

<script
    setup
>

import { ref } from 'vue';
import ModalContainer from '@/components/ModalContainer.vue';

const openModal = ref(false);

const openSign = () => {
    openModal.value = !openModal.value;
};
</script>

<style scoped>

</style>