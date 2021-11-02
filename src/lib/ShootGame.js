import threeLib from './threeLib'
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
export const shootGame = function(container){
    function createPlane(){
        const geometry = new THREE.PlaneBufferGeometry(2000, 2000, 32, 32)
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
    function createPath(){
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3( 0, 0, 50 ),
            new THREE.Vector3( -100, 0, 0 ),
            new THREE.Vector3( 0, 0, -50 ),
            new THREE.Vector3( 100, 0, 0 ),
        ])
        const points = curve.getPoints(500);
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({color: 0xff0000})
        return {
            points,
            mesh:new THREE.Line(geometry, material)
        }
    }
    function createCar(){
        const loader = new FBXLoader()
        const base = process.env.BASE_URL
        return new Promise((resolve, reject)=>{
            loader.load(`${base}models/gltf/car.FBX`, function(object){
                resolve(object.children[0])
            })
        })
    }
    class ShootGame extends  threeLib{
        constructor(container) {
            super(container);
            this.createOrbitControls()
            this.initModel()
            this.setCamera()
            addEvent()
            this.createLight()
        }
        setCamera(){
            this.camera.far = 5000;
            this.camera.position.set(0, 100, 300)
            this.camera.updateProjectionMatrix()
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
            //this.scene.rotation.x = -Math.PI/2
            const plane = createPlane()
            plane.rotation.x = -Math.PI/2
            this.scene.add(plane)
            const path = createPath()
            this.points = path.points
            this.scene.add(path.mesh)
            createCar().then((mesh)=>{
                console.log(mesh)
                mesh.name = 'car'
                mesh.scale.set(0.08,0.08,0.08)
                mesh.position.set(this.points[0].x, this.points[0].y, this.points[0].z);
                mesh.lookAt(this.points[1].x,this.points[1].z,this.points[1].y)
                mesh.rotation.x = -Math.PI/2
                mesh.rotation.z = -Math.PI/4
                this.car = mesh

                const axesHelper = new THREE.AxesHelper(500);
                mesh.add(axesHelper)
                this.scene.add(mesh)
            })
        }
        render(){
            const size = this.points.length
            let i = 0
            const animation = ()=>{
                if(i < size-1){
                    i++;
                    if(this.car){
                        this.car.position.set(this.points[i].x, this.points[i].y, this.points[i].z)
                        if(this.points[i+1]){
                            this.car.lookAt(this.points[i+1].x,this.points[i+1].z,this.points[i+1].y);
                        }else{
                            this.car.lookAt(this.points[i].x,this.points[i].z,this.points[i].y);
                        }
                        this.car.rotation.x = -Math.PI/2
                    }
                }
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