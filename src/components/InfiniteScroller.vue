<script setup lang="ts">
import { computed, h } from "vue"


const props = defineProps({
    barStyle: Object,
    duration: {
      type: String,
      default: '12s'
    },
    direction: {
      type: String,
      default: 'normal'
    },
    delay: {
      type: String,
      default: '0s'
    },
    paused : {
      type: Boolean,
      default: false
    }
})

const customStyle = computed(() => {
    return {
        ...props.barStyle,
        'animation-duration': props.duration,
        'animation-direction': props.direction,
        'animation-delay': props.delay,
        'animation-play-state' : (props.paused) ? 'paused' : 'running'
    }
})

</script>

<template>
    <div class="vifnslb-container">
        <div class="vifnslb-element" :style="customStyle">
            <div class="vifnslb-bar">
                <slot></slot>
            </div>
            <div class="vifnslb-bar">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes moveSlideshow {
  100% {
    transform: translateX(-50%);
  }
}
.vifnslb-container {
  width: 100%;
  overflow: hidden;
}
.vifnslb-element {
  transform: translate3d(0, 0, 0); /* Hey browser, please use my GPU */
  position: relative;
  overflow: hidden;
  animation-name: moveSlideshow;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  display: flex;
  width: max-content;
  min-width: 200%;
}
.vifnslb-bar {
  width: 50%;
}
</style>