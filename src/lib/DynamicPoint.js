import threeLib from './threeLib'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {BufferAttribute, BufferGeometry} from "three";
const base = process.env.BASE_URL
function loadModel(){
    const loader = new OBJLoader()
    const　_this = this
    loader.load(`${base}models/obj/male02.obj`, function (object) {
        const geometry = createBufferGeometry(object)
        createMale.call(_this, geometry, 200,0, -60, 0x00ffff)
        createMale.call(_this, geometry, -200,0, 60, 0x0000ff)
        createMale.call(_this, geometry, 20,0, -100, 0xff3300)
        createMale.call(_this, geometry, 400,0, 100, 0xff0077)
        createMale.call(_this, geometry, 200,0, 60, 0xffff77)
        createMale.call(_this, geometry, 400,0, -200, 0xff33ff)
    })
}
function createBufferGeometry(object){
    let count = 0
    object.traverse(function (children) {
        if(children.isMesh){
            const size = children.geometry.attributes['position'].count
            count += size
        }
    })
    let arr = []
    object.traverse(function (children) {
        if(children.isMesh){
            const positions = children.geometry.attributes['position'].array
            arr = [...arr, ...positions]
        }
    })
    let buffer = new Float32Array(arr);
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(buffer, 3))
    geometry.setAttribute('tempPosition', new BufferAttribute(buffer, 3))
    return geometry
}
function createMale(geometry, x, y, z, color){
    const clone = geometry.clone()
    let point = null;
    var clones = [
        [ 1200, 0, -800 ],
        [ 1000, 0, 0 ],
        [ 200, 0, 1000 ],
        [ 200, 0, -1000 ],
        [ 800, 0, 400 ],
        [ - 800, 0, 200 ],
        [ - 1000, 0, -1000 ],
        [ 0, 0, 0 ]
    ];
    for(let i = 0; i < clones.length; i++){
        let c = i !== (clones.length-1) ? 0x252525: color;
        point = new THREE.Points(clone, new THREE.PointsMaterial({color: c, size: 2}))
        point.position.x = x+clones[i][0]
        point.position.y = y+clones[i][1]
        point.position.z = z+clones[i][2]
        point.rotation.y = Math.random()*2
        this.group.add(point)
    }
    this.meshArr.push({point, speed: 10, down: 0, up: 0, direction: 0, delay: Math.floor( 200 + 200 * Math.random() ), start: Math.floor( 100 + 200 * Math.random() )})
}
function createModel(){
    const plane = new THREE.PlaneBufferGeometry(5000, 5000, 64, 64)
    const material = new THREE.PointsMaterial({color: 0xff0000, size: 3})
    const pointsPlane = new THREE.Points(plane, material)
    pointsPlane.rotation.x = Math.PI/2
    this.group.add(pointsPlane)
}
export default class DynamicPoint extends threeLib{
    constructor(container){
        super(container)
        this.group = new THREE.Group()
        this.clock = new THREE.Clock()
        this.meshArr = [];
        this.scene.add(this.group)
        this.setCamera()
        createModel.call(this)
        this.createOrbitControls()
        loadModel.call(this)
    }
    setCamera(){
        this.camera.far = 5000;
        this.camera.position.set(0,  100, 600);
        this.camera.updateProjectionMatrix()
    }
    render(){
        const animation = ()=>{
            if(this.meshArr.length > 0){
                this.go()
            }
            this.renderer.render(this.scene, this.camera)
            if(this.orbitControls){
                this.orbitControls.update()
            }
            requestAnimationFrame(animation)
        }
        animation()
    }
    go(){
        let delta = 10 * this.clock.getDelta();
        delta = delta < 2 ? delta : 2;
        this.group.rotation.y += - 0.02 * delta;
        for(let i = 0; i < this.meshArr.length; i++){
            const data = this.meshArr[i]
            const position = data.point.geometry.attributes.position;
            const tempPosition = data.point.geometry.attributes.tempPosition;
            const count = position.count
            if(data.direction === 0){
                data.direction = -1
            }
            for(let j = 0; j < count; j++){
                let px = position.getX(j)
                let py = position.getY(j)
                let pz = position.getZ(j)
                if(data.direction < 0){
                    if(py > 0){
                        position.setXYZ(
                            j,
                            px + 1.5*(0.5 - Math.random())*data.speed*delta,
                            py + 3*(0.25 - Math.random())*data.speed*delta,
                            pz + 1.5*(0.5 - Math.random())*data.speed*delta,
                        )
                    }else{
                        data.down += 1
                    }
                }
                if(data.direction > 0){
                    const tx = tempPosition.getX(j)
                    const ty = tempPosition.getY(j)
                    const tz = tempPosition.getZ(j)
                    const dx = Math.abs( px - tx );
                    const dy = Math.abs( py - ty );
                    const dz = Math.abs( pz - tz );
                    const d = dx + dy + dz
                    if ( d > 1) {
                        position.setXYZ(
                            j,
                            px - ( px - tx ) / dx * data.speed * delta * ( 0.85 - Math.random() ),
                            py - ( py - ty ) / dy * data.speed * delta * ( 1 + Math.random() ),
                            pz - ( pz - tz ) / dz * data.speed * delta * ( 0.85 - Math.random() )
                        );
                    } else {
                        data.up += 1;
                    }

                }


            }

            if ( data.down >= count ) {
                if ( data.delay <= 0 ) {
                    data.direction = 1;
                    data.speed = 5;
                    data.down = 0;
                    data.delay = Math.floor( 200 + 200 * Math.random() );
                } else {
                    data.delay -= 1;
                }

            }
            if ( data.up >= count ) {
                if ( data.delay <= 0 ) {
                    data.direction = - 1;
                    data.speed = 10;
                    data.up = 0;
                    data.delay = Math.floor( 300 + 200 * Math.random() );
                } else {
                    data.delay -= 1;
                }
            }
            position.needsUpdate = true
        }
    }
}