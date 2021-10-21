import ThreeLib from "./threeLib";
const starImages = require.context("@/assets/images/star", true, /^\.\/.*\.jpg$/);
const stars = starImages.keys().map(starImages)

async function loadTexture(url){
    const textrueLoader = new THREE.TextureLoader()
    return new Promise((resolve, reject)=>{
        textrueLoader.load(url, function(texture){
            resolve(texture)
        }, undefined, function(err){
            reject(err)
        })
    })
}
function loadAllTexture(){
    const map = {
        earth: '',
        jupiter: '',
        mars: '',
        mercury: '',
        neptune: '',
        saturn: '',
        saturn_ring: '',
        sun: '',
        uranus: '',
        uranus_ring: '',
        venus: ''
    }
    return new Promise(async (resolve, reject)=>{
        for(let i in map){
            const url = stars.find((item)=> item.indexOf(i) > -1)
            if(url){
                map[i] = await loadTexture(url)
            }
        }
        resolve(map)
    })
}
function create(radius, texture){
    const geometry = new THREE.SphereBufferGeometry(radius, 64, 64)
    const material = new THREE.MeshBasicMaterial({map:texture})
    return new THREE.Mesh(geometry, material)
}
function createTrack(radius){
    const curve = new THREE.EllipseCurve(0, 0, radius, radius)
    const points = curve.getPoints(radius)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({color: 0x222222})
    const line = new THREE.LineLoop(geometry, material)
    line.rotateX(Math.PI/2)
    return line
}
export default class StarModel extends ThreeLib{
    constructor(container){
        super(container);
        this.camera.position.set(-100, 60, 100)
        const k = 1
        const scale = 3000
        this.starMap = {
            earth: { r: 3.2*k, trackR: 40*k, speed: 30/scale, start:0},  //地球
            jupiter: { r: 5*k, trackR: 60*k, speed: 13/scale, start:0},  //木星
            mars:  { r: 2.5*k, trackR: 50*k, speed: 24/scale, start:0},  //火星
            mercury: { r: 2.5*k, trackR: 20*k, speed: 48/scale, start:0},  //水星
            neptune: { r: 4*k, trackR: 100*k, speed: 5/scale, start:0},  //海王星
            saturn:  { r: 3.5*k, trackR: 70*k, speed: 10/scale, start:0}, //土星
            sun: { r: 10*k},
            uranus: { r: 3.5*k, trackR: 80*k, speed: 9/scale, start:0}, //天王星
            venus: { r: 3*k, trackR: 30*k, speed: 35/scale, start:0} //金星
        }

        this.starGroup = new THREE.Group()
        this.createTracks()
        loadAllTexture().then((data)=>{
            this.createModel(data)

        })
    }
    createTracks(){
        for(let i in this.starMap){
            if(this.starMap[i].trackR){
                this.scene.add(createTrack(this.starMap[i].trackR))
            }
        }
    }
    createRing(r, texture){
        const geometry = new THREE.RingBufferGeometry(r+r/4, r+r/2, 32)
        const material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide})
        const ring = new THREE.Mesh(geometry, material)
        ring.rotateX(Math.PI/2)
        return ring
    }
    createGroup(sphere, ring){
        const group = new THREE.Group()
        group.name = sphere.name
        sphere.name = '';
        group.add(sphere)
        group.add(ring)
        return group
    }
    createModel(textureMap){
        const ring = {
            saturn: this.createRing(this.starMap.saturn.r, textureMap['saturn_ring']),
            uranus: this.createRing(this.starMap.uranus.r, textureMap['uranus_ring'])
        }
        for(let i in this.starMap){
            const sphere = create(this.starMap[i].r, textureMap[i])
            if(i === 'saturn' || i === 'uranus'){
                const saturnRingGroup = this.createGroup(sphere, ring[i])
                saturnRingGroup.name = i
                saturnRingGroup.position.set(this.starMap[i].trackR, 0, 0)
                this.starGroup.add(saturnRingGroup)
            }else{
                if(this.starMap[i].trackR){
                    sphere.name = i;
                    sphere.position.set(this.starMap[i].trackR, 0, 0)
                }
                this.starGroup.add(sphere)
            }
        }

        this.scene.add(this.starGroup)
    }
    go(){
        if(this.starGroup.children.length > 0){
            this.starGroup.children.forEach((item)=>{
                const star = this.starMap[item.name]
                item.rotation.y += 0.01
                if(star && star.trackR){
                    star.start += star.speed
                    item.position.x = Math.sin(star.start)*star.trackR
                    item.position.z = Math.cos(star.start)*star.trackR
                }
            })
        }
    }
    render(){
        const animation = ()=>{
            this.go()
            this.renderer.render(this.scene, this.camera)
            if(this.orbitControls){
                this.orbitControls.update()
            }
            requestAnimationFrame(animation)
        }
        animation()
    }
}

