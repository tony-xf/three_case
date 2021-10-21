<template>
    <div class="demo-page">
        <div ref="demoView" class="container">

        </div>
    </div>
</template>

<script>
    import {createStar, createDynamicPoint} from '@/lib/demo'
    import {ref, onMounted} from 'vue';
    import { useRoute } from 'vue-router'
    export default {
        name: "Demo",
        setup(){
            let demoView = ref(null)
            const route = useRoute()
            onMounted(()=>{
                if(route.params.name === 'star'){
                    createStar(demoView.value)
                }else if(route.params.name === 'dynamic'){
                    createDynamicPoint(demoView.value)
                }
            })
            return {
                demoView
            }
        }
    }
</script>

<style scoped>

</style>