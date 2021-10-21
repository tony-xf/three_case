import Vue from 'vue';
const useComponents = (arr)=>{
    arr.forEach(item=>{
        Vue.component(item.name, item)
    })
}
export default useComponents