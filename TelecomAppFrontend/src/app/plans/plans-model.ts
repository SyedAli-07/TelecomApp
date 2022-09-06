import { Device } from "../Devices/devices-model"

export interface Plan {
        planId:number,
        planName:string,
        deviceLimit:number,
        price:number,
        username:string,
        devices:Device[]
        expand:boolean,
        addForm:boolean
}
