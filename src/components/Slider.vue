<template>
    <div>
        <div class="flex justify-between items-center">
            <VXButton ripple type="text" color="primary" circle @click="previous">
                <Icon icon="material-symbols:arrow-back-ios-new" color="#6c5ce8" width="28" height="28"/>
            </VXButton>
            <div>
                <template v-for="(item, index) in items" :key="index">
                    <div v-show="currentIndex == index + 1">
                        <slot :name="item.slot"/>
                    </div>
                </template>
                <slot name="action"></slot>
            </div>
            <VXButton ripple type="text" color="primary" circle @click="forward">
                    <Icon icon="material-symbols:arrow-forward-ios-sharp" color="#6c5ce8" width="28" height="28" />
            </VXButton>
        </div>
    </div>
    

</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import VXButton from "./VXButton.vue";

type Item = {
    slot: string
}

const props = defineProps({
    items: {
        type: Array<Item>,
        required: true
    }
})

const emit = defineEmits(['previous', 'forward'])

const currentIndex = ref(1)

const previous = () => {
    currentIndex.value = currentIndex.value > 1 ? currentIndex.value - 1 : props.items.length
    emit('previous', currentIndex.value)
}

const forward = () => {
    currentIndex.value = currentIndex.value < props.items.length ? currentIndex.value + 1 : 1
    emit('forward', currentIndex.value)
}
</script>

<style scoped lang="postcss">


</style>