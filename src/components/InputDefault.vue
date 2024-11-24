<template>
    <div
        class="input-default"
        :class="{
            'input-default--error': validateError!== null,
            'input-default--with-icon': $slots.append
        }"
    >
        <div class="input-default__label">
            <span>
                {{ label }}
            </span>
        </div>
        <div class="input-default__input-wrapper w-full">
            <div
                v-if="numberType"
                class="flex-1"
            >
                <input
                    ref="InputDefaultRef"
                    :value="`${ addSpacesToNumber(modelValue)}${suffix && !isFocus ? ` ${suffix}` : '' }`"
                    class="input-default__input"
                    :class="{ key }"
                    :type="type"
                    inputmode="numeric"
                    :placeholder="placeholder"
                    :style="styleInput"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
            </div>
            <div
                v-else-if="autogrow"
                class="flex-1"
            >
                <textarea
                    ref="InputDefaultRef"
                    :value="modelValue"
                    class="input-default__input"
                    :class="{ key }"
                    :inputmode="inputmode"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :style="styleInput"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
            </div>
            <div
                v-else
                class="flex-1"
            >
                <input
                    ref="InputDefaultRef"
                    :value="modelValue"
                    :data-maska="mask"
                    :data-maska-tokens="dataMaskaTokens"
                    class="input-default__input"
                    :class="{ key }"
                    :type="type"
                    :inputmode="inputmode"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :style="styleInput"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
            </div>
            
            <div class="input-default__append">
                <slot name="append"/>
            </div>
        </div>
        
        <slot name="default"/>
        
        <TransitionDefault>
            <div
                v-if="validateError"
                class="input-default__error"
            >
                {{ validateError }}
            </div>
        </TransitionDefault>
        
        <div
            v-if="counter"
            class="input-default__length"
        >
            {{ computedLength }} / {{ maxlength }}
        </div>
    </div>
</template>

<script setup>
import { addSpacesToNumber } from '@/scripts/helpers.js';
import {
    defineProps,
    defineEmits,
    ref,
    defineExpose,
    nextTick,
    computed,
} from 'vue';

import TransitionDefault from '@/components/TransitionDefault.vue';

const emit = defineEmits([ 'update:modelValue', 'blur', 'focus' ]);

const props = defineProps({
    modelValue:      {
        type:    [ String, Number ],
        default: null,
    },
    label:           {
        type:    String,
        default: '',
    },
    placeholder:     {
        type:    String,
        default: '',
    },
    mask:            {
        type:    String,
        default: null,
    },
    dataMaskaTokens: {
        type:    String,
        default: '',
    },
    rules:           {
        type:    Array,
        default: [],
    },
    
    counter: {
        type:    Boolean,
        default: false,
    },
    
    maxlength:       {
        type:    Number,
        default: 500,
    },
    
    numberType: {
        type:    Boolean,
        default: false,
    },
    min:        {
        type:    Number,
        default: 0,
    },
    max:        {
        type:    Number,
        default: 100,
    },
    step:       {
        type:    Number,
        default: 1,
    },
    suffix:     {
        type:    String,
        default: null,
    },
    inputmode:  {
        type:    String,
        default: 'text',
    },
    type:       {
        type:    String,
        default: 'text',
    },
    tooltip:    {
        type:    String,
        default: '',
    },
    autogrow: {
        type: Boolean,
        default: false,
    },
    styleInput: {
        type: String,
        default: '',
    }
});

const validateError = ref(null);
const caretPosition = ref(0);
const oldValue = ref(null);
const isFocus = ref(false);
const InputDefaultRef = ref(null);
const key = ref(0);

const saveCaretPosition = () => {
    caretPosition.value = InputDefaultRef.value.selectionStart;
};

const setCaretPosition = () => {
    const oldValueWithSpaces = addSpacesToNumber(oldValue.value);
    const modelValueWithSpaces = addSpacesToNumber(props.modelValue);
    const oldSpacesCount = oldValueWithSpaces.split(' ').length - 1;
    const newSpacesCount = modelValueWithSpaces.split(' ').length - 1;
    const oldNumbersCount = oldValueWithSpaces.split(/\d/).length - 1;
    const newNumbersCount = modelValueWithSpaces.split(/\d/).length - 1;
    
    let change = newSpacesCount - oldSpacesCount;
    if (Math.abs(oldNumbersCount - newNumbersCount) > 1) {
        change = 0;
    }
    if (caretPosition.value + change < 0) {
        change = -caretPosition.value;
    }
    let newPosition = caretPosition.value + change;
    if (newPosition === 0 && modelValueWithSpaces === '0') {
        newPosition = 1;
    }
    
    InputDefaultRef.value.setSelectionRange(newPosition, newPosition);
};

const handleInput = async (event) => {
    event.preventDefault();
    let newValue = event.target.value;
    
    if (props.numberType) {
        await nextTick();
        saveCaretPosition();
        
        newValue = newValue.replace(/\D/g, '');
        newValue = parseInt(newValue || 0);
        if (props.max && newValue > props.max) {
            newValue = props.max;
        }
    }
    oldValue.value = props.modelValue;
    emit('update:modelValue', newValue);
    key.value++;
    
    if (props.numberType) {
        await nextTick();
        setCaretPosition();
    }
    
    if (validateError.value !== null) {
        validate();
    }
};

const handleBlur = (event) => {
    emit('blur', event);
    isFocus.value = false;
    validate();
};

const handleFocus = (event) => {
    emit('focus', event);
    isFocus.value = true;
};

const validate = () => {
    const error = props.rules.map(rule => rule(props.modelValue)).find(error => error !== true);
    if (error === undefined) {
        validateError.value = null;
        return true;
    }
    else {
        validateError.value = error;
        return false;
    }
};

const computedLength = computed(() => {
    if (props.modelValue) {
        return String(props.modelValue).length;
    }
    else {
        return 0;
    }
});

defineExpose({
    validate,
});
</script>
