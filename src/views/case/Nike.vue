<template>
    <div class="nike-page">
        <div ref="nikeView" class="container">

        </div>
    </div>
</template>

<script>
    import NikeModel from '@/lib/nikeModel'
    import {ref, onMounted} from 'vue';
    export default {
        name: "Nike",
        setup(){
            let nikeView = ref(null)
            onMounted(()=>{
                const lib = new NikeModel(nikeView.value)
                lib.loadModel()
            })
            return {
                nikeView
            }
        }
    }
</script>

<style lang="scss" scoped>
.container{
    width: 100vw;
    height: 100vh;
}
</style>