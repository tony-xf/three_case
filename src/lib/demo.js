import StarModel from "./StarModel";
import DynamicPoint from './DynamicPoint'
import { createRoom } from "./Room";
import { shootGame } from "./ShootGame";

export const createStar = (container)=>{
    const lib = new StarModel(container)
    lib.createOrbitControls()
    lib.render()
}

export const createDynamicPoint = (container)=>{
    const lib = new DynamicPoint(container)
    lib.render()
}

export const roomMain = (container)=>{
    const lib = createRoom(container)
    lib.render()
}
export const createShoot = (container)=>{
    const lib = shootGame(container)
    lib.render()
}