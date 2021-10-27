import threeLib from './threeLib'

export const shootGame = function(container){
    function createPlane(){
        const geometry = new THREE.PlaneBufferGeometry(1000, 2000, 32, 32)
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})
        return new THREE.Mesh(geometry, material)
    }
    const keyCode = {}
    function addEvent(){
        document.addEventListener('keydown', (event)=>{
            if(!keyCode[event.keyCode]){
                keyCode[event.keyCode] = true
            }
        }, false)
        document.addEventListener('keyup', (event)=>{
            if(keyCode[event.keyCode]){
                keyCode[event.keyCode] = false
            }
        }, false)
    }
    class ShootGame extends  threeLib{
        constructor(container) {
            super(container);
            this.createOrbitControls()
            this.initModel()
            this.setCamera()
            addEvent()
        }
        setCamera(){
            this.camera.position.set(0, 100, 0)
        }
        rotateCamera(){
            if(keyCode[65]){
                this.camera.rotation.y += Math.PI/72
            }
            if(keyCode[68]){
                this.camera.rotation.y -= Math.PI/72
            }
        }
        initModel(){
            const plane = createPlane()
            plane.rotation.x = -Math.PI/2
            this.scene.add(plane)
        }
        render(){
            const animation = ()=>{
                this.rotateCamera()
                this.renderer.render(this.scene, this.camera)
                // if(this.orbitControls){
                //     this.orbitControls.update()
                // }
                requestAnimationFrame(animation)
            }
            animation()
        }
    }
    return new ShootGame(container)
}