import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import ThreeLib from './threeLib';
const base = process.env.BASE_URL
function loadGLTFModel(url){
    const loader = new THREE.ObjectLoader();
    return new Promise((resolve, reject)=>{
        loader.load(url, (data)=>{
            resolve(data)
        },(progress)=>{
        }, (err)=>{
        })
    })
}
export default class Nike extends ThreeLib{
    constructor(container){
        super(container)
    }
    loadModel(){
        loadGLTFModel(`${base}models/bracelet.less`).then((data)=>{
            console.log(data)
            //this.scene.add(data)
        })
    }
    setMaterials(){

    }
    createGeometry(data){
        const geometry = new THREE.BufferGeometry()
        for(let i in data.attributes){
            geometry.setAttribute(i, data.attributes[i])
        }
    }
}