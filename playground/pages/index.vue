<template>
  <div>
    Hello from nuxt-gtm !
  </div>
</template>

<script setup lang="ts">
import { useGTM } from '~~/.nuxt/imports';

const gtm = useGTM();
console.log(gtm);
</script>
