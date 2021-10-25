import threeLib from './threeLib'

export const shootGame = function(container){
    function createPlane(){
        const geometry = new THREE.PlaneBufferGeometry(120, 100, 32, 32)
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})
        return new THREE.Mesh(geometry, material)
    }
    class ShootGame extends  threeLib{
        constructor(container) {
            super(container);
            this.createOrbitControls()
            this.initModel()
            this.setCamera()
        }
        setCamera(){
            this.camera.position.set(0, 50, 50)
        }
        initEvent(){

        }
        initModel(){
            const plane = createPlane()
            plane.rotation.x = -Math.PI/2
            this.scene.add(plane)
        }
    }
    return new ShootGame(container)
}