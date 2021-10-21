import StarModel from "./StarModel";
import DynamicPoint from './DynamicPoint'
export const createStar = (container)=>{
    const lib = new StarModel(container)
    lib.createOrbitControls()
    lib.render()
}

export const createDynamicPoint = (container)=>{
    const lib = new DynamicPoint(container)
    lib.render()
}