<template>
    <div class="home-page">
        <div class="canvas" ref="canvasContainer"></div>
    </div>
</template>

<script>
    import SnowLib from '@/lib/snowLib'
    import { oceanMain } from "@/lib/demo";
    import {ref, onMounted, onUnmounted} from 'vue';
    export default {
        setup(){
            const canvasContainer = ref(null)
            let lib = null;
            // function resize(){
            //     lib.windowResize()
            // }
            onMounted(async ()=>{
                // lib = new SnowLib(canvasContainer.value)
                // await lib.createObject()
                // lib.setCameraPosition()
                // window.addEventListener( 'resize', resize, false );
                // lib.render()
              oceanMain(canvasContainer.value)
            })
            onUnmounted(()=>{
                //window.removeEventListener( 'resize', resize, false );
            })
            return {
                canvasContainer
            }
        },
    }

</script>

<style lang="scss" scoped>
.home-page{
    .canvas{
        width: 100vw;
        height: 100vh;
    }
}
</style>