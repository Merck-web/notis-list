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
            
            <div class="row items-center justify-between mb-md">
                <span
                    class="text-small text-gray"
                >
                    У вас нет аккаунта?
                    
                    <a>Зарегистрируйтесь</a>
                </span>
                
                <button
                    class="button-default"
                    @click="sign"
                >
                    Войти
                </button>
            </div>
            
            <div
                v-if="errorMessage"
                class="row negative-banner full-width"
            >
                {{ errorMessage }}
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
import { useStore } from 'vuex';

const openModal = ref(false);
const visiblePassword = ref(false);
const errorMessage = ref('');

const data = ref({
    email:    null,
    password: null,
});

const $store = useStore();

const openSign = () => {
    openModal.value = !openModal.value;
};

const sign = async () => {
    if (!data.value.email || !data.value.password) {
        errorMessage.value = 'Заполните все поля';
        return;
    }
    
    const response = await $store.dispatch('login', { ...data.value });
    
    
    if (response.error && Array.isArray(response.error) && response.error[0]) {
        errorMessage.value = response.error[0];
    }
    else {
        errorMessage.value = 'Произошла ошибка при входе';
    }
};
</script>
