<template>
    <Teleport to="body">
        <div
            v-if="isOpen"
            class="modal-container"
            aria-modal="true"
            role="dialog"
            :aria-labelledby="title"
            :aria-describedby="`modal-description ${title}`"
            :class="[
                {
                    'modal-container--show': isVisible,
                    'modal-container--hide': !isVisible,
                },
                className
            ]"
            :style="{
                zIndex: zIndex,
            }"
        >
            <div
                class="modal-container__block text-center"
                :style="{
                    width: width,
                }"
                @click.stop=""
            >
                <div class="modal-container__card">
                    <div
                        class="modal-container__header--action"
                    >
                        <button
                            class="button-default button-default-circle"
                            aria-label="Закрыть окно"
                            title="Закрыть"
                            @click="hide"
                        >
                            <img
                                src="/icons/close.svg"
                                alt="Иконка закрытия"
                            >
                        </button>
                    </div>
                    <div class="modal-container__header">
                        <h2 class="title modal-container__title">
                            <slot name="title">
                                {{ title }}
                            </slot>
                        </h2>
                    </div>
                    <div class="modal-container__body">
                        <slot name="default"/>
                    </div>
                </div>
                
                <div class="modal-container__append">
                    <slot name="append"/>
                </div>
            </div>
            
            <p :id="`modal-description ${title}`" class="sr-only">
               Данные модального окна
            </p>
        </div>
    </Teleport>
</template>

<script setup>
import {
    ref,
    defineProps,
    defineEmits,
    watch,
    Teleport,
} from 'vue';

const isOpen = ref(false);
const isVisible = ref(false);

const emit = defineEmits([ 'update:model-value', 'close' ]);

const props = defineProps({
    modelValue: {
        type:    Boolean,
        default: false,
    },
    title:      {
        type:    String,
        default: '',
    },
    width:      {
        type:    String,
        default: '540px',
    },
    className: {
        type:    String,
        default: '',
    },
});

const zIndex = ref(1020);
const updateZIndex = () => {
    zIndex.value = 1020 + document.querySelectorAll('.modal-container').length;
};

const show = () => {
    updateZIndex();
    isVisible.value = true;
    isOpen.value = true;
    document.body.classList.add('overflow-hidden');
};

const hide = () => {
    isVisible.value = false;
    setTimeout(() => {
        isOpen.value = false;
        emit('update:model-value', false);
        emit('close');
    }, 500);
    if (document.querySelectorAll('.modal-container').length <= 1) {
        document.body.classList.remove('overflow-hidden');
    }
};

watch(() => props.modelValue, (value) => {
    if (value === isOpen.value) return;
    if (value) {
        show();
    }
    else {
        hide();
    }
});
</script>
