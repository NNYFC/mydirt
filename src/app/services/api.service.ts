import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseServerUrl = 'http://localhost:8181/';

  loginUser(username: any, password: any) {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password),
      });

      return this.http.get(this.baseServerUrl + 'login', {
        headers,
      });
  }

  getAllCity() {
        return this.http.get(this.baseServerUrl + 'city');
    }

  getAllQuarter() {
        return this.http.get(this.baseServerUrl + 'quarter');
    }

  getAllPlace() {
        return this.http.get(this.baseServerUrl + 'place');
    }

  addAdmin(username: any, password: any,Admin:Array<String>) {
        const headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(username + ':' + password),
        });

        return this.http.post(this.baseServerUrl + 'admin', {
          headers,
        });
    }

  getAllAdmin(username: any, password: any) {
        const headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(username + ':' + password),
        });

        return this.http.get(this.baseServerUrl + 'admin', {
          headers,
        });
    }

  addDriver(username: any, password: any,Driver:Array<String>) {
          const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(username + ':' + password),
          });

          return this.http.post(this.baseServerUrl + 'admin/driver', {
            headers,
          });
      }

  getAllDrivers(username: any, password: any) {
          const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(username + ':' + password),
          });

          return this.http.get(this.baseServerUrl + 'admin/drivers', {
            headers,
          });
      }

  addCity(username: any, password: any,city:any) {
            const headers = new HttpHeaders({
              Authorization: 'Basic ' + btoa(username + ':' + password),
            });

            return this.http.get(this.baseServerUrl + 'admin/city', {
              headers,
            });
        }


}
