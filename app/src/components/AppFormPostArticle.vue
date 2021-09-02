<template>
  <div class="container mx-auto flex items-center justify-center relative">
    <div
      class="grid bg-white p-6 rounded-md shadow-2xl w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div class="font-mono text-2xl text-gray-600 flex justify-center pb-3">
        家計簿の投稿
      </div>
      <form class="space-y-6">
        <div>
          <label
            for="foodExpenses"
            class="block text-sm font-bold text-gray-700"
            >食費</label
          >
          <input class="form" type="number" name="foodExpenses" />
        </div>

        <div>
          <label
            for="householedItemExpenses"
            class="block text-sm font-bold text-gray-700"
            >日用雑貨費</label
          >
          <input class="form" type="number" name="householedItemExpenses" />
        </div>

        <div>
          <label
            for="utilityExpenses"
            class="block text-sm font-bold text-gray-700"
            >水道,光熱費</label
          >
          <input class="form" type="number" name="utilityExpenses" />
        </div>

        <div>
          <label
            for="internetExpenses"
            class="block text-sm font-bold text-gray-700"
            >通信費</label
          >
          <input class="form" type="number" name="internetExpenses" />
        </div>

        <div>
          <label
            for="riberalartsExpenses"
            class="block text-sm font-bold text-gray-700"
            >教育,教養費</label
          >
          <input class="form" type="number" name="riberalartsExpenses" />
        </div>

        <div>
          <label
            for="insuranceExpenses"
            class="block text-sm font-bold text-gray-700"
            >医療,保険費</label
          >
          <input class="form" type="number" name="insuranceExpenses" />
        </div>

        <div>
          <label
            for="entertainmentExpenses"
            class="block text-sm font-bold text-gray-700"
            >交際費</label
          >
          <input class="form" type="number" name="entertainmentExpenses" />
        </div>

        <div>
          <label
            for="freeExpenses"
            class="block text-sm font-bold text-gray-700"
            >美容,娯楽,衣服費</label
          >
          <input class="form" type="number" name="freeExpenses" />
        </div>

        <div>
          <label for="comment" class="block text-sm font-bold text-gray-700"
            >コメント</label
          >
          <textarea class="form" type="" name="comment" />
        </div>
        <div class="flex justify-center">
          <button class="btn">投稿</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {} from '@heroicons/vue/solid'
</script>
