import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {



  private baseUrl = 'http://localhost:8090/event';
  private userUrl = 'http://localhost:8090/userdetails';
  private orderUrl = 'http://localhost:8090/orderdetails';
    
  

  constructor(private http: HttpClient) { }

  getMessage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  userdetailsIntoDb(name1:string,contact1:number,address1:string){
    const obj={name:name1,number:contact1,address:address1};
      
      return this.http.post(`${this.userUrl}`,obj);
    
    
    }
    orderIntoDb(orderId:number,status1:string){

      const obj={orderid:orderId,status:status1};
      return this.http.post(`${this.orderUrl}`,obj);
    }
      getOrderStatus(orderId){
        console.log('order id in services'+orderId);
           var url=this.orderUrl+'?orderid='+orderId;
    
         return this.http.get(`${url}`);
      }
}
