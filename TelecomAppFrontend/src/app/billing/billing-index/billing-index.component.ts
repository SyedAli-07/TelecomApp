import { Component, OnInit } from '@angular/core';
import { Plan } from 'app/plans/plans-model';
import { PlanService } from 'app/plans/plans.service';

@Component({
  selector: 'app-billing-index',
  templateUrl: './billing-index.component.html',
  styleUrls: ['./billing-index.component.css']
})
export class BillingIndexComponent implements OnInit {

  plans: Plan[] = [];
  planSubtotal:number=0;
  tax:number=0;
  total:number=0;

  constructor(private plansService: PlanService) { }

  ngOnInit(): void {
    this.retrievePlans();
  }

  retrievePlans(){
    this.plansService.getUsersPlans(1).subscribe(plans=>
      {
        this.plans=plans;
        this.plans.forEach(plan => {
          this.planSubtotal=(this.planSubtotal*100+plan.price*100)/100;  
        });

        this.planSubtotal=(this.planSubtotal*100 + 14*100)/100;
        this.tax=Number(((this.planSubtotal*100*0.0625)/100).toFixed(2));
        this.total=(this.planSubtotal*100+this.tax*100)/100;
      });
  }

}
