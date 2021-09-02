<template>
  <div class="flex items-center justify-center relative">
    <div class="grid bg-white p-6 rounded-md">
      <div class="font-mono text-2xl text-gray-600 flex justify-center pb-3">
        アカウントの編集
      </div>
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-bold text-gray-700"
            >名前</label
          >
          <input class="form" type="text" name="name" />
        </div>

        <div>
          <label for="age" class="block text-sm font-bold text-gray-700"
            >年齢</label
          >
          <input class="form" type="number" name="age" />
        </div>

        <div>
          <label
            for="familyMembers"
            class="block text-sm font-bold text-gray-700"
            >家族構成</label
          >
          <input class="form" type="number" name="familyMembers" />
        </div>

        <div>
          <label
            for="annualIncome"
            class="block text-sm font-bold text-gray-700"
            >世帯年収</label
          >
          <input class="form" type="number" name="annualIncome" />
        </div>

        <button class="btn ml-11">編集を完了</button>
      </form>
    </div>
  </div>
</template>

<script setup></script>
