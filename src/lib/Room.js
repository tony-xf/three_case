import threeLib from './threeLib'
import room from '@/assets/images/maps/room.jpg'
export const createRoom = function(container){
    function loadTexture(){
        return new Promise((resolve, reject)=>{
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(room, function(texture){
                const material = new THREE.MeshBasicMaterial({ map: texture})
                resolve(material)
            },undefined, function(err){
                reject(err)
            })
        })
    }
    function createModel(){
        const geometry = new THREE.SphereBufferGeometry(5, 64, 64)
        geometry.scale( - 1, 1, 1 );
        loadTexture().then((material)=>{
            const mesh = new THREE.Mesh(geometry, material)
            this.scene.add(mesh)
        })
    }
    class Room extends threeLib{
        constructor(container){
            super(container)
            createModel.call(this)
            this.createOrbitControls()
            this.orbitControls.maxDistance = 5
            this.orbitControls.mouseButtons  = {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY
            }
            this.setCamera()
        }
        setCamera(){
            this.camera.position.z = 3
            this.camera.target = new THREE.Vector3(0,0,0)
        }
    }
    return new Room(container)
}