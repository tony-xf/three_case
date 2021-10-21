<template>
    <aside class="aside-view">

    </aside>
</template>

<script setup>
    import { defineProps, reactive } from 'vue'

    defineProps({
        msg: String
    })

    const state = reactive({ count: 0 })
</script>

<style lang="scss" scoped>
.aside-view{
    width: 200px;
    height: 100vh;
}
</style>
