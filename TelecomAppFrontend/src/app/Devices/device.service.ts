import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Device } from './devices-model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesUrl="https://localhost:7238/api/Devices";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http:HttpClient) { }

  getDevice(id:number):Observable<Device>{
    let url=`${this.devicesUrl}/${id}`;
    return this.http.get<Device>(url,this.httpOptions);
  }

  addDevice(device:Device):Observable<Device>{
    return this.http.post<Device>(this.devicesUrl,device,this.httpOptions);
  }

  updateDevice(device:Device):Observable<Device>{
    let url=`${this.devicesUrl}/${device.deviceId}`;
    return this.http.put<Device>(url,device,this.httpOptions);
  }

  deleteDevice(id:number):Observable<Device>{
    let url=`${this.devicesUrl}/${id}`;
    return this.http.delete<Device>(url,this.httpOptions);
  }
}