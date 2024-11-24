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
        >
            <InputDefault
                v-model="data.email"
                label="Email"
                placeholder="Введите значение"
                class="mb-md"
                :rules="[ val => !!val || 'Обязательное поле' ]"
            />
            
            <InputDefault
                v-model="data.password"
                label="Пароль"
                placeholder="Введите пароль"
                class="mb-40"
                :type="visiblePassword ? 'text' : 'password'"
                :rules="[ val => !!val || 'Обязательное поле' ]"
            >
                <template
                    v-slot:append
                >
                    <img
                        src="/icons/eye.svg"
                        alt="Глаз"
                        class="pointer"
                        @click="visiblePassword = !visiblePassword"
                    >
                </template>
            </InputDefault>
            
            <div class="row items-center justify-between">
                <span
                    class="text-small text-gray"
                >
                    У вас нет аккаунта?
                    
                    <a>Зарегистрируйтесь</a>
                </span>
                
                <button
                    class="button-default"
                >
                    Войти
                </button>
            </div>
        </ModalContainer>
    </div>
</template>

<script
    setup
>

import { ref } from 'vue';
import ModalContainer from '@/components/ModalContainer.vue';
import InputDefault from '@/components/InputDefault.vue';

const openModal = ref(false);
const visiblePassword = ref(false);
const data = ref({
    email:    null,
    password: null,
});

const openSign = () => {
    openModal.value = !openModal.value;
};
</script>

<style scoped>

</style>