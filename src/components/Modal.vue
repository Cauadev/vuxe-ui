<template>
    <div class="z-10 modal" @click.self="emit('escape')" v-if="visible">
        <div :style="`background: ${background}; width: ${width}px; height: ${height}px;`" :class="{'rounded-sm': isRounded}">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        width: { type: String, required: false },
        height: { type: String, required: false },
        background: { type: String, default: '#fff' },
        isRounded: { type: Boolean, default: false },
        visible: {type: Boolean, default: false}
    })

    const emit = defineEmits(['escape'])
</script>

<style lang="postcss" scoped>
.modal{
    background: rgba(0, 0, 0, 0.2); 
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>