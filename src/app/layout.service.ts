import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private httpClient: HttpClient,
  ) {

   }



  sendRequesta(data: any): Promise<Observable<any>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };

    // var fdf= this.httpClient.post<any>(url,data,httpOptions)
    try {
      return this.httpClient.post<any>(environment.apiUrl+"Layouts/SaveLayout", data, httpOptions).toPromise();
    } catch (error) {
      console.error('HTTP Request Error:', error);
      throw error; // Rethrow the error to handle it in the calling code.
    }
  }

  getLayoutByName(layoutName){
    var data =  this.httpClient.get<any>(environment.apiUrl+"Layouts/GetAllLayout?layoutName="+ layoutName);

    return data;
  }

  order(dataList: number[]): Observable<any> {
    const url = environment.apiUrl+"WeatherForecast/UpdateLayout"; // Replace with your API endpoint

    return this.httpClient.post(url, dataList);
  }
  deleteItem(layoutName: any): Observable<any> {
    const url = environment.apiUrl+`WeatherForecast/RemoveLayout?layoutName=${layoutName}`; // Replace with your API endpoint
    return this.httpClient.get(url);
  }
}
