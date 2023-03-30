<template>
    <div class="body bg-gray-100 p-5" v-if="isOpenedSelectYear">
        <div class="years-menu bg-gray-100 p-5">
            <span @click="selectYear(yiear)" v-for="yiear in years" :key="yiear" :class="{'currentYear': yiear == year}" class="cursor-pointer hover:bg-[#02c399c1] hover:text-white p-2 rounded text-2xl">{{ yiear }}</span>
        </div>
    </div>

    <div class="body bg-gray-100 p-5" v-if="!isOpenedSelectYear">

        <div class="header">
            <span @click="isOpenedSelectYear = true" class="text-2xl font-sans font-bold text-[#3a86ff] cursor-pointer hover:text-[#3a86ff]">{{ year }}</span>
        </div>
        <div class="controls flex justify-between mb-5 items-center">
            <div>
                <span class="text-2xl font-sans font-bold text-[#3a86ff]">{{ months[month] }}</span>
            </div>
            <div class="flex gap-1">
                <button @click="previousMonth" class="cursor-pointer disabled:opacity-50" >
                    <Icon icon="line-md:chevron-small-left" color="#3a86ff" width="26" height="26" />
                </button>
                <button @click="nextMonth" class="cursor-pointer disabled:opacity-50">
                    <Icon icon="line-md:chevron-small-right" color="#3a86ff" width="26" height="26" />
                </button>
            </div>
        </div>
        <table>
            <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
        </tr>


        <tr v-for="(weekDays, index) in days" :key="index">
            <td v-for="day in weekDays" :key="day.display" 
                :class="{'active': isSelected(day), 'disabled': day.disabled}" 
                @click="changeValue(day)"  
                class="hover:bg-[#3a85ff7d] rounded-lg cursor-pointer">
                {{ day.display }}
            </td>

        </tr>
    </table>
    
    <div class="footer mt-5">
        <button class="bg-[#3a85ff57] p-2 rounded" @click="clearInput">Clear date</button>
    </div>

    </div>
</template> 

<script setup lang="ts">

import { Icon } from '@iconify/vue';

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  setDay,
  isWithinInterval,
  isBefore,
  isAfter,
  isSameMonth,
  endOfDay,
  startOfDay,
  isValid,
  setDate,
  format as formatDate,
} from 'date-fns'

import IDateField from '../interfaces/IDateField'
import { PropType, computed, onMounted, ref } from "vue";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const props = defineProps({
    weekStartsOn: {
      type: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>,
      required: false,
      default: 0,
      validator: (i: unknown): boolean =>
        typeof i === 'number' && Number.isInteger(i) && i >= 0 && i <= 6,
    },
})


const inputValue = ref<IDateField>({
    value: "",
    date: new Date(),
    display: ""
})

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth())

const isOpenedSelectYear = ref<boolean>(false)

const selectYear = (value: number) => {
    year.value = value

    isOpenedSelectYear.value = false
}

const nextMonth = () => {
    if(month.value == 11){
        month.value = 0
        year.value++
    }else{
        month.value++
    }
}
const previousMonth = () => {
    if(month.value == 0){
        month.value = 11
        year.value--
    }else{
        month.value--
    }
}

const clearInput = () => {
    inputValue.value = { value: "", date: new Date(), display: ""}
}

const isSelected = (dateField: IDateField) =>{
    return inputValue.value.value === dateField.value
}

const changeValue = (dateField: IDateField) => {
    if(dateField.disabled) return;
    inputValue.value = dateField;
}

const years = computed<number[]>(() => {
    const result: number[] = []

    const currentYear = new Date().getFullYear();

    for(let i = currentYear - 100; i < currentYear; i++){
        result.push(i)
    }
    for(let i = currentYear; i < currentYear+30; i++){
        result.push(i)
    }

    return result;
})

const monthStart = computed(() => startOfMonth(new Date(year.value, month.value)))
const monthEnd = computed(() => endOfMonth(new Date(year.value, month.value)))


const displayedInterval = computed(() => ({
      start: startOfWeek(monthStart.value, {
        weekStartsOn: props.weekStartsOn,
      }),
      end: endOfWeek(monthEnd.value, {
        weekStartsOn: props.weekStartsOn,
      }),
}))


const format = computed(
      () => (format: string) => (value: Date | number) =>
        formatDate(value, format, {
          weekStartsOn: props.weekStartsOn,
        })
)


const days = computed<Array<IDateField[]>>(() => {
      const today = new Date(year.value, month.value)
      const allDays = eachDayOfInterval(displayedInterval.value).map(
        (date): IDateField => ({
          display:  format.value('dd')(date),
          disabled: !isSameMonth(today, date),
          value: format.value('dd/MM/yyyy')(date),
          date
        })
      )

      const slicedDays: Array<IDateField[]> = []
      const chunkSize = 7;
      for (let i = 0; i < allDays.length; i += chunkSize) {
            const chunk = allDays.slice(i, i + chunkSize);
            slicedDays.push(chunk);
      }

      return slicedDays
})

</script>

<style scoped lang="postcss">

.years-menu{
    @apply overflow-y-scroll flex flex-wrap w-96 h-96 gap-5;
}

.years-menu::-webkit-scrollbar{
    width: 6px;
}
.years-menu::-webkit-scrollbar-track{
    background-color: rgb(228, 228, 228);
    border-radius: 4px;
}
.years-menu::-webkit-scrollbar-thumb {
    background-color: #3a86ff;
    border-radius: 20px;
}

td {
    text-align: center;
    padding: 15px;
}

th{
    width: 50px;
}

.disabled{
    opacity: 50%;
    cursor: default;
}
.disabled:hover{
    background: none;
}

.active {
    @apply bg-[#3a85ff6b]
}

.currentYear{
    @apply bg-[#3a86ff] text-white
}
</style>