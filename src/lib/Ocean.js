import { Water } from 'three/examples/jsm/objects/Water'
import { Sky } from 'three/examples/jsm/objects/Sky'
import waterNormals from '@/assets/images/textures/waternormals.jpg'
import threeLib from './threeLib'
class Ocean extends threeLib{
    constructor(container) {
        super(container);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.setCamera()
        this.water = this.createWater()
        this.createSky()
        this.scene.add(this.water)
        this.setControls()
    }
    createWater(){
        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
        const water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load( waterNormals, function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                } ),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        water.rotation.x = - Math.PI / 2;
        return water
    }
    createSky(){
        const sky = new Sky()
        const _this = this;
        const sun = new THREE.Vector3();
        sky.scale.setScalar( 10000 );
        this.scene.add(sky)
        const skyUniforms = sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        const parameters = {
            elevation: 1,
            azimuth: 180
        };

        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );

        function updateSun() {
            const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );

            sun.setFromSphericalCoords( 1, phi, theta );

            sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
            _this.water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

            scene.environment = pmremGenerator.fromScene( sky ).texture;

        }
        updateSun();
    }
    setControls(){
        this.createOrbitControls()
        this.orbitControls.maxPolarAngle = Math.PI * 0.495;
        this.orbitControls.target.set( 0, 10, 0 );
        this.orbitControls.minDistance = 40.0;
        this.orbitControls.maxDistance = 200.0;
        this.orbitControls.update();
    }
    setCamera(){
        this.camera.far = 20000;
        this.camera.position.set(30, 30, 100)
        this.camera.updateProjectionMatrix()
    }
    render() {
        const go = ()=>{
            this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame(go);
        }
        go()
    }
}
export const createOcean = function(container){
    return new Ocean(container)
}