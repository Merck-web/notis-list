<template>
    <div class="notes-card">
        <h4 class="notes-card__header">
            {{ item.title || 'Заголовок' }}
        </h4>
        
        <p class="notes-card__body text-normal">
            {{ item.content || '-' }}
        </p>
        
        <div class="notes-card__actions">
            <button
                class="row items-center justify-between button"
                @click="emits('delete', item.id)"
            >
                <img
                    src="/icons/close.svg"
                    alt="Иконка закрытия"
                >
                Удалить
            </button>
        </div>
    </div>
</template>

<script
    setup
>
import {
    defineProps,
    defineEmits,
} from 'vue';

const emits = defineEmits([ 'delete' ]);

defineProps({
    item: {
        type:    Object,
        default: () => {
        },
    },
});
</script>
