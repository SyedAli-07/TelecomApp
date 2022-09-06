import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Plan } from '../plans-model';
import { PlanService } from '../plans.service';
import { DeviceService } from 'app/Devices/device.service';
import { PlanDTO } from '../plan-DTO';
import { Device } from 'app/Devices/devices-model';
import { AddDeviceFormComponent } from 'app/Devices/add-device-form/add-device-form.component';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-plans-index',
  templateUrl: './plans-index.component.html',
  styleUrls: ['./plans-index.component.css']
})
export class PlansIndexComponent implements OnInit {

  constructor(private planService:PlanService, private deviceService:DeviceService, private router:Router, private _msalService: MsalService) { }

  ngOnInit(): void {
    this.getUsersPlans();
    const account = this._msalService.instance.getAllAccounts()[0];
    this.username = account.username;
  }

  username: string = '';
  plans:Plan[]=[];
  planIds:string[]=[];
  showAddPlan:boolean=false;
  selectedPlan?:PlanDTO;
  planOptions:PlanDTO[]=[
    {
      planName: 'Basic',
      deviceLimit:1,
      price:19.99,
      userId:1,
      devices: []
    },
    {
      planName: 'Family',
      deviceLimit:4,
      price:89.99,
      userId:1,
      devices: []
    },
    {
      planName: 'Premium',
      deviceLimit:6,
      price:109.99,
      userId:1,
      devices: []
    }
  ]

  expandPlan(plan:Plan):void{
    if(plan.expand==null){
      plan.expand=true;
    } else if(plan.expand==false){
      plan.expand=true;
    }
    else{
      plan.expand=false;
    }
  }

  expandDevice(device:Device):void{
    if(device.edit==null){
      device.edit=true;
    } else if(device.edit==false){
      device.edit=true;
    }
    else{
      device.edit=false;
    }
  }

  showAddDevice(plan:Plan):void{
    if(!plan.devices ||plan.devices.length < plan.deviceLimit){
    if(plan.addForm==null){
      plan.addForm=true;
    } else if(plan.addForm==false){
      plan.addForm=true;
    }
    else{
      plan.addForm=false;
    }
  }
  }

  // getUsersPlans():void{

  //   const account= this._msalService.instance.getAllAccounts()[0];

  //   this.username= account.username;

  //   this.planService.getUsersPlans(this.username).subscribe(plans=>{

  //     this.plans=plans;

  //     plans.forEach(plan => {

  //       if(!plan.devices || plan.deviceLimit>plan.devices.length)
  //       this.planIds.push(plan.planId.toString())
  //     });
  //   });
  // }

  getUsersPlans():void{
    this.planService.getUsersPlans(1).subscribe(plans=>{
      this.plans=plans;
      plans.forEach(plan => {
        if(!plan.devices || plan.deviceLimit>plan.devices.length)
        this.planIds.push(plan.planId.toString())
      });
    });
  }

  deletePlan(id:number):void{
    this.planService.deletePlan(id).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/plans']).then(() => {
        location.reload();
    });
    }})
  }

  deleteDevice(id:number):void{
    this.deviceService.deleteDevice(id).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/plans']).then(() => {
        location.reload();
    });
    }})
  }

  toggleAddPlanForm():void{
    if(this.showAddPlan==true){
      this.showAddPlan=false;
    }
    else{
      this.showAddPlan=true;
    }
  }
  selectPlanOption(plan:PlanDTO):void{
    this.selectedPlan=plan;
  }
  addNewPlan():void{
    if(this.selectedPlan){
    this.planService.addPlan(this.selectedPlan).subscribe({next:(res)=>{
      console.log(res);
      this.router.navigate(['/plans']).then(() => {
        location.reload();
    });
    }})
    }
  }
}
