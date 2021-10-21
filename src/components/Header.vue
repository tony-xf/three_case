<template>
    <header class="header-view">
        <section class="wrap">
            <div class="logo">
                <img src="@/assets/images/logo.png">
            </div>
            <ul class="menu clear">
                <li :class="{active: route.name === item.key}" :key="item.key" v-for="item in menuArr" @click="changeItem(item.name)">
                    <span>{{item.name}}</span>
                    <div class="line"></div>
                </li>
            </ul>
        </section>
    </header>
</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    export default {
        setup(){
            const curItem = ref('Home');
            const menuArr = ref([{
                name: 'Home',
                key: 'Home',
                href: '/'
            },{
                name: 'Case',
                key: 'Case',
                href: '/case'
            },{
                name: 'Contact',
                key: 'Contact',
                href: '/contact'
            },{
                name: 'About',
                key: 'About',
                href: '/about'
            }])
            const state = reactive({ curItem: 'Home' })
            const route = useRoute()
            const router = useRouter()
            const changeItem = (name)=>{
                router.push({name})
            }
            return {
                curItem,
                menuArr,
                state,
                route,
                changeItem
            }
        }
    }

</script>

<style lang="scss" scoped>
.header-view{
    font-size: $base-font-size;
    width: 100%;
    background: rgba(0,0,0, .3);
    color: $base-font-color;
    .wrap{
        @include flexCenter();
        font-size: 15px;
        .logo{
            flex: 0 0 140px;
            img{
                height: 75px;
            }
        }
        .menu{
            display: flex;
            flex-grow: 1;
            padding: 15px 0;
            justify-content: flex-end;
            li{
                height: 40px;
                line-height: 40px;
                margin: 0 15px;
                cursor: pointer;
                transition: all .3s linear;
                .line{
                    width: 100%;
                    height: 3px;
                    background-image: linear-gradient(to right, #2af598 0%, #009efd 100%);
                    transform: scale(0);
                    transition: transform .2s linear;
                }
                &.active, &:hover{
                    color: $base-active-color;
                    background-image: linear-gradient(to right, #2af598 0%, #009efd 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
                    .line{
                        transform: scale(1);
                    }
                }

            }
        }
    }
}
</style>
