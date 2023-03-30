<template>
    <button 
    class=" 
             text-lg 
             transition-colors
             flex 
             items-center 
             gap-1
             justify-center
          " 
    :class="[
             disabled ? 'disabled' : '',
             getColorClass,
             pill ? 'rounded-full' : 'rounded',
             extended ? 'w-full' : '',
             circle ? 'px-2 py-2 rounded-full' : 'px-5 py-1'
             ]"
    :disabled="disabled"
    v-ripple="rippleColor"
    >
      <slot/>
    </button>
</template>

<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue';


const props = defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },
  ripple: {
    default: false,
    type: Boolean,
  },
  pill: {
    default: false,
    type: Boolean
  },
  circle: {
    default: false,
    type: Boolean
  },
  type: {
    default: 'default',
    type: String as PropType<"outline" | "text" | "default">
  },
  color: {
    default: "primary",
    type: String as PropType<"primary" | "secondary" | "error" | "success" | "warning" | "dark" | "light">
  },
  extended:{
    type: Boolean,
    default: false
  }
})

const getColorClass = computed(() => {
  switch (props.type) {
    case "default":
      return props.color
    case "outline":
      return `${props.color}-outline`
    case "text":
      return `${props.color}-text`
  }
})

const colorsRGBA = reactive({
  primary: 'rgba(108, 92, 232, 0.1)',
  secondary: 'rgba(9, 132, 227, 0.1)',
  error: 'rgba(229, 46, 92, 0.1)',
  success: 'rgba(55, 177, 109, 0.1)',
  warning: 'rgba(255, 199, 63, 0.1)',
  dark: 'rgba(43, 43, 43, 0.1)',
  light: 'rgba(255, 255, 255, 0.1)'
})

const rippleColor = computed<String>(() => {
  if(props.ripple){
    if(props.type == 'text'){
      // console.log(colorsRGBA[props.color])
      return colorsRGBA[props.color]
    }
    return 'rgba(255,255,255, 0.2)'
  }
  return 'rgba(0,0,0, 0)'
})
</script>

<style scoped lang="postcss">
.disabled{
  @apply opacity-50
}

.primary{
  @apply bg-primary text-white
}

.secondary{
  @apply bg-secondary text-white
}

.warning{
  @apply bg-warning text-white
}

.error{
  @apply bg-error text-white
}

.success{
  @apply bg-success text-white
}
.dark{
  @apply bg-dark text-white
}
.light{
  @apply bg-light text-dark
}

.primary-text{
  @apply text-primary
}

.secondary-text{
  @apply text-secondary
}

.warning-text{
  @apply text-warning
}

.error-text{
  @apply text-error
}

.success-text{
  @apply text-success 
}
.dark-text{
  @apply text-dark
}
.light-text{
  @apply text-light 
}
.primary-outline{ 
  @apply border border-primary text-primary hover:bg-primary hover:text-white
}

.secondary-outline{
  @apply border border-secondary text-secondary hover:bg-secondary hover:text-white
}

.warning-outline{
  @apply border border-warning text-warning hover:bg-warning hover:text-white
}

.error-outline{
  @apply border border-error text-error hover:bg-error hover:text-white
}

.success-outline{
  @apply border border-success text-success hover:bg-success hover:text-white
}
.dark-outline{
  @apply border border-dark text-dark hover:bg-dark hover:text-white
}
.light-outline{
  @apply border border-light text-light hover:bg-light hover:text-dark
}
</style>