import { Device } from "../Devices/devices-model"

export interface PlanDTO {
        planName:string,
        deviceLimit:number,
        price:number,
        username:string,
        devices:Device[]
}