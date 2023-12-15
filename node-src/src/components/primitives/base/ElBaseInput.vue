<script setup lang="ts">

</script>
<template>
  <div class="relative pt-36 ml-auto">
    <div class="space-y-6 bg-white px-4 py-5">
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-6 bg-white px-4 py-">
          <el-base-input>
            <slot name="el-base-input"></slot>
          </el-base-input>

        </div>
        <div class="bg-gray-50 px-4 py-5 text-right">
          <el-action>
            <slot name="el-action"></slot>
          </el-action>
        </div>
      </div>
    </div>

  </div>
</template>
