<template>
    <div class="demo-page">
        <div ref="demoView" class="container">

        </div>
    </div>
</template>

<script>
    import {createStar, createDynamicPoint, roomMain, createShoot, nikeObj} from '@/lib/demo'
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
                }else if(route.params.name === 'room'){
                    roomMain(demoView.value)
                }else if(route.params.name === 'shoot'){
                    createShoot(demoView.value)
                }else if(route.params.name === 'nike'){
                    nikeObj(demoView.value)
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