import ThreeLib from './threeLib';
const snowImages = require.context("@/assets/images/snow", true, /^\.\/.*\.png$/);
const snowArr = snowImages.keys().map(snowImages);
const textureLoader = new THREE.TextureLoader()
function generateVertices(){
    let vertices = []
    let width = 2000
    for(let i = 0; i < 10000; i++){
        let x = Math.random()*width - width/2;
        let y = Math.random()*width - width/2;
        let z = Math.random()*width - width/2;
        vertices.push(x, y, z)
    }
    return vertices
}
function animation(){
    var time = Date.now()*0.00005
    this.camera.position.x += this.camera.position.x*5
    this.camera.position.y += this.camera.position.y*5
    for(let i = 0; i < this.scene.children.length; i++){
        const object = this.scene.children[i]
        if(object instanceof THREE.Points){
            object.rotation.y = time*(i < 4? i+1: -(i+1));
        }
    }
    for(let i =0; i< this.materials.length; i++){
        const color = this.params[i].color
        const h = (360 * (color[0]+time)/ 360)/360
        this.materials[i].color.setHSL(h, color[1], color[2])
    }
    this.renderer.render(this.scene, this.camera)
}
function loadTexture(url){
    return new Promise((resolve, reject)=>{
        textureLoader.load(url, (texture)=>{
            resolve(texture)
        },undefined, (err)=>{
            reject(err)
        })
    })
}
async function loadAllTexture(){
    const arr = []
    snowArr.forEach(item=>{
        arr.push(loadTexture(item))
    })
    return new Promise((resolve)=>{
        Promise.all(arr).then((res)=>{
            resolve(res)
        }).catch((err)=>{ console.log(err) })
    })
}
export default class Snow extends ThreeLib{
    constructor(container){
        super(container)
        this.materials = []
        this.params = []
    }
    windowResize(){
        const width = window.innerWidth
        const height = window.innerHeight
        this.camera.accept = width/height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( width, height)
    }
    setCameraPosition(){
        this.camera.position.set(0, 0, 1000)
    }
    async createObject(){
        let geometry = new THREE.BufferGeometry();
        let vertices = generateVertices.call(this);

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        const snows =  await loadAllTexture()
        this.params = [
            {color: [1.0, 0.2, 0.5], sprite: snows[1], size: 20},
            {color: [0.95, 0.1, 0.5], sprite: snows[2], size: 15},
            {color: [0.9, 0.05, 0.5], sprite: snows[0], size: 10},
            {color: [0.85, 0, 0.5], sprite: snows[4], size: 8},
            {color: [0.85, 0, 0.5], sprite: snows[3], size: 5},
        ]
        this.params.forEach(item=>{
            let material = new THREE.PointsMaterial({ map: item.sprite, size: item.size, blending: THREE.AdditiveBlending, transparent: true, depthTest: false})
            material.color.setHSL(item.color[0], item.color[1], item.color[2])
            this.materials.push(material)
            let particles = new THREE.Points(geometry, material)
            particles.rotation.x = Math.random()*6
            particles.rotation.y = Math.random()*6
            particles.rotation.z = Math.random()*6
            this.scene.add(particles)
        })
    }

    render(){
        const go = ()=>{
            animation.call(this)
            requestAnimationFrame(go)
        }
        go()
    }
}