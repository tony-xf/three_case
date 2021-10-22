import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


function getScene(){
    let scene = new THREE.Scene();
    return scene
}
function getCamera(width, height){
    let camera = new THREE.PerspectiveCamera(75, width/height, 1, 1000)
    camera.position.z = 130;
    return camera
}
function getRenderer(width, height){
    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(width, height)
    return renderer
}
class ThreeLib{
    constructor(container){
        const width = container.clientWidth;
        const height = container.clientHeight
        this.scene = getScene()
        window.scene = this.scene
        this.camera = getCamera(width, height)
        this.renderer = getRenderer(width, height)
        container.appendChild(this.renderer.domElement)
    }

    createGridHelper(){
        const gridHelper = new THREE.GridHelper(100,20);
        this.scene.add(gridHelper)
    }
    createOrbitControls(){
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.orbitControls.update()
    }
    createLight(){
        const light = new THREE.AmbientLight( 0xffffff );
        this.scene.add( light );
    }
    render(){
        const animation = ()=>{
            this.renderer.render(this.scene, this.camera)
            if(this.orbitControls){
                this.orbitControls.update()
            }
            requestAnimationFrame(animation)
        }
        animation()
    }
}
export default ThreeLib