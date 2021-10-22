import StarModel from "./StarModel";
import DynamicPoint from './DynamicPoint'
import { createRoom } from "./Room";

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