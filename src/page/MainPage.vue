<template>
    <div
        class="main-page container"
    >
        <header class="row items-center justify-between">
            <img
                src="/icons/logo.svg"
                alt="Логотип"
            />
            
            <button class="button-default">
                <img
                    src="/icons/sign.svg"
                    alt="Иконка войти"
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
    </div>
</template>

<script>
export default {
    name: 'MainPage',
};
</script>

<style scoped>

</style>