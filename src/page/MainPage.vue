<template>
    <div
        class="main-page container"
    >
        <header class="row items-center justify-between">
            <img
                class="main-page__logo"
                src="/icons/logo.svg"
                alt="Логотип"
            />
            
            <button
                v-if="!isAuth"
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
            
            <div
                v-else
                class="user-info row items-center"
            >
                <p class="text-small mr-xs">
                    {{ $store.getters.getPersonalInfo.email }}
                </p>
                
                <div class="main-page__user">
                    <img
                        src="/icons/account.svg"
                        alt="Иконка пользователя"
                        class="pointer"
                        @click="openMenu = !openMenu"
                    >
                    
                    <TransitionDefault>
                        <div
                            v-if="openMenu"
                            class="main-page__logout"
                            @click="$store.dispatch('logout')"
                        >
                            <a>Выйти</a>
                        </div>
                    </TransitionDefault>
                </div>
            </div>
        </header>
        
        <TransitionDefault>
            <div
                v-if="!isAuth"
                class="main-page__content"
            >
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
            
            <div
                v-else
                class="notes-list"
            >
                <NotesCard
                    v-for="(item, index) in notesList"
                    :key="item.id"
                    :item="item"
                    @delete="id => deleteNotes(id, index)"
                />
            </div>
        </TransitionDefault>
        
        <TransitionDefault>
            <button
                class="button-default button-default-circle main-page__add-btn"
                @click="openAddDialog = true"
            >
                <img
                    src="/icons/plus.svg"
                    alt="Иконка добавления"
                />
            </button>
        </TransitionDefault>
        
        <ModalContainer
            v-model="openModal"
            :title="isNewUser ? 'Регистрация' : 'Вход в ваш аккаунт'"
            width="840px"
            @close="errorMessage = []"
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
                :class="isNewUser ? 'mb-md' : 'mb-40'"
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
            
            
            <InputDefault
                v-if="isNewUser"
                v-model="data.confirm_password"
                label="Пароль еще раз"
                placeholder="Введите пароль"
                class="mb-40"
                :type="visiblePasswordConfirm ? 'text' : 'password'"
                :rules="[ val => !!val || 'Обязательное поле' ]"
            >
                <template
                    v-slot:append
                >
                    <img
                        src="/icons/eye.svg"
                        alt="Глаз"
                        class="pointer"
                        @click="visiblePasswordConfirm = !visiblePasswordConfirm"
                    >
                </template>
            </InputDefault>
            
            <div class="row items-center justify-between mb-md">
                <span
                    class="text-small text-gray"
                >
                    У вас нет аккаунта?
                    
                    <a
                        @click="registerForm = !registerForm"
                    >
                        {{ isNewUser ? 'Войдите' : 'Зарегистрируйтесь' }}
                    </a>
                </span>
                
                <button
                    class="button-default"
                    @click="handleAction"
                >
                    {{ isNewUser ? 'Зарегистрироваться' : 'Войти' }}
                </button>
            </div>
            
            <div
                v-if="errorMessage.length"
                class="row negative-banner full-width"
            >
                <template
                    v-for="(item, index) in errorMessage"
                    :key="index"
                >
                    <p>
                        {{ item }}
                    </p>
                    <br/>
                </template>
            </div>
        </ModalContainer>
        
        <ModalContainer
            v-model="openAddDialog"
            title="Добавление заметки"
            width="780px"
            class-name="main-page__add-dialog"
            @close="errorMessageAdd = []"
        >
            <InputDefault
                v-model="newNotes.title"
                label="Название заметки"
                placeholder="Введите название"
                class="mb-40"
                counter
                :maxlength="100"
                :rules="[ val => !!val || 'Обязательное поле' ]"
            />
            
            <InputDefault
                v-model="newNotes.content"
                label="Текст заметки"
                placeholder="Введите текст"
                type="text"
                autogrow
                counter
                class="text-notice"
                :rules="[ val => !!val || 'Обязательное поле' ]"
            />
            
            <div
                v-if="errorMessageAdd.length"
                class="row negative-banner full-width mb-md"
            >
                <template
                    v-for="(item, index) in errorMessageAdd"
                    :key="index"
                >
                    <p>
                        {{ item }}
                    </p>
                    <br/>
                </template>
            
            </div>
            
            <div class="row justify-end">
                <button
                    class="button-default button-default-add"
                    @click="addNotice"
                >
                    Добавить
                </button>
            </div>
        </ModalContainer>
    </div>
</template>

<script
    setup
>

import {
    computed,
    ref,
} from 'vue';
import ModalContainer from '@/components/ModalContainer.vue';
import InputDefault from '@/components/InputDefault.vue';
import { useStore } from 'vuex';
import TransitionDefault from '@/components/TransitionDefault.vue';
import NotesCard from '@/components/NotesCard.vue';

const openModal = ref(false);
const visiblePassword = ref(false);
const visiblePasswordConfirm = ref(false);
const errorMessage = ref([]);
const errorMessageAdd = ref([]);
const registerForm = ref(false);
const openMenu = ref(false);
const openAddDialog = ref(false);

const notesList = computed(() => $store.getters.getNotesList);

const data = ref({
    email:            null,
    password:         null,
    confirm_password: null,
});

const newNotes = ref({
    title:   null,
    content: null,
});

const $store = useStore();

const openSign = () => {
    openModal.value = !openModal.value;
};

const isNewUser = computed(() => {
    return registerForm.value;
});

const isAuth = computed(() => {
    return $store.getters.isAuth;
});

const handleAction = () => {
    if (isNewUser.value) {
        register();
    }
    else {
        sign();
    }
};

const sign = async () => {
    if (!data.value.email || !data.value.password) {
        errorMessage.value = [ 'Заполните все поля' ];
        return;
    }
    
    const response = await $store.dispatch('login', { ...data.value });
    
    
    if (!response.error) {
        openModal.value = false;
        clearFields(data.value);
        return;
    }
    
    if (Array.isArray(response.error) && response.error.length) {
        errorMessage.value = response.error;
    }
    else {
        errorMessage.value = [ 'Произошла ошибка при входе' ];
    }
};

const register = async () => {
    if (Object.values(data.value).some(val => !val)) {
        errorMessage.value = [ 'Заполните все поля' ];
        return;
    }
    
    const response = await $store.dispatch('register', { ...data.value });
    
    
    if (!response.error) {
        registerForm.value = false;
        clearFields(data.value);
        return;
    }
    
    if (Array.isArray(response.error) && response.error.length) {
        errorMessage.value = response.error;
    }
    else {
        errorMessage.value = [ 'Произошла ошибка при регистрации' ];
    }
};

const addNotice = async () => {
    if (Object.values(newNotes.value).some(val => !val)) {
        return;
    }
    
    const response = await $store.dispatch('createNotes', { ...newNotes.value });
    
    if (!response.error) {
        openAddDialog.value = false;
        clearFields(newNotes.value);
        return;
    }
    
    if (Array.isArray(response.error) && response.error.length) {
        errorMessageAdd.value = response.error;
        console.log(errorMessageAdd.value);
    }
    else {
        errorMessageAdd.value = [ 'Произошла ошибка при добавлении' ];
    }
};

const deleteNotes = async (id, index) => {
    await $store.dispatch('deleteNotes', { id, index });
};

const clearFields = (obj) => {
    for (const key of Object.keys(obj)) {
        obj[key] = null;
    }
};
</script>
