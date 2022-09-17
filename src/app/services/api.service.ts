import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private router: Router) { }

  //baseServerUrl = 'http://localhost:8181/';
  baseServerUrl = 'https://mydirt.herokuapp.com/';

  logout(): void {
         sessionStorage.setItem('isLoggedIn', 'false');
         sessionStorage.removeItem('authvalue');
         sessionStorage.removeItem('emailvalue');
         sessionStorage.removeItem('passwordvalue');
         sessionStorage.removeItem('userTypevalue');

         sessionStorage.clear();
         this.router.navigate(['login']);
  }

  loginUser(username: any, password: any) {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password),
      });

      return this.http.get(this.baseServerUrl + 'login/'+username, {
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

  addAdmin(username: any, password: any,Admin:Array<any>) {
        const headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(username + ':' + password),
        });

        return this.http.post(this.baseServerUrl + 'admin',
         {
          first_name:Admin[0],
          last_name:Admin[1],
          telephone:Admin[2],
          email:Admin[3],
          password:Admin[4]
         },
         {
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

  addDriver(username: any, password: any,DriverDtao:Array<any>) {
          const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(username + ':' + password),
          });

          return this.http.post(this.baseServerUrl + 'admin/driver',
          {
            first_name:DriverDtao[0],
            last_name:DriverDtao[1],
            telephone:DriverDtao[2],
            email:DriverDtao[3],
            password:DriverDtao[4],
            status:DriverDtao[5],
            idadmin:DriverDtao[6]
          },
          {
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

            return this.http.post(this.baseServerUrl + 'admin/city',
             {
              city_name:city
             },
             {
              headers,
            });
  }

  addQuarter(username: any, password: any,QuarterDtao:any) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.post(this.baseServerUrl + 'admin/quarter',
               {
                quarter_name:QuarterDtao[0],
                idcity:QuarterDtao[1]
               },
               {
                headers,
              });
    }

  addPlace(username: any, password: any,PlaceDtao:Array<any>) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.post(this.baseServerUrl + 'admin/place',
              {
                place_name:PlaceDtao[0],
                idquarter:PlaceDtao[1]
              },
              {
                headers,
              });
  }

  addDustbin(username: any, password: any,DustbinDtao:Array<any>) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.post(this.baseServerUrl + 'admin/dustbin',
               {
                dustbin_name:DustbinDtao[0],
                idplace:DustbinDtao[1]
               },
               {
                headers,
              });
  }

  addNotification(username: any, password: any) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.get(this.baseServerUrl + 'admin/notifications', {
                headers,
              });
  }

  aSignDustbinToDriver(username: any, password: any,Driver_dustbinDtao:Array<any>) {
              const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(username + ':' + password),
              });

              return this.http.post(this.baseServerUrl + 'admin/driver/dustbin',
               {
                iddustbin:Driver_dustbinDtao[0],
                iddriver:Driver_dustbinDtao[1]
               },
               {
                headers,
              });
    }

  getAllDustbin(username: any, password: any) {
                const headers = new HttpHeaders({
                  Authorization: 'Basic ' + btoa(username + ':' + password),
                });

                return this.http.get(this.baseServerUrl + 'admin/dustbins',
                 {
                  headers,
                });
  }

  getUserInfoByEmail(username: any, password: any) {
                  const headers = new HttpHeaders({
                    Authorization: 'Basic ' + btoa(username + ':' + password),
                  });

                  return this.http.get(this.baseServerUrl + 'admin/admin/'+username,
                   {
                    headers,
                  });
  }

 getAllNotification(username: any, password: any) {
                  const headers = new HttpHeaders({
                      Authorization: 'Basic ' + btoa(username + ':' + password),
                   });

                   return this.http.get(this.baseServerUrl + 'admin/notifications',
                   {
                     headers,
                  });
 }

 getAllDustbinOfDriver(username: any, password: any,id:any) {
                   const headers = new HttpHeaders({
                       Authorization: 'Basic ' + btoa(username + ':' + password),
                    });

                    return this.http.get(this.baseServerUrl + 'user/dustbins/'+id,
                    {
                      headers,
                   });
  }

 changeDriverState(username: any, password: any,id:any) {
                    const headers = new HttpHeaders({
                        Authorization: 'Basic ' + btoa(username + ':' + password),
                     });

                     return this.http.get(this.baseServerUrl + 'admin/driver/'+id,
                     {
                       headers,
                    });
  }

 getPictureById(username: any, password: any,id:any) {
                      const headers = new HttpHeaders({
                          Authorization: 'Basic ' + btoa(username + ':' + password),
                       });

                       return this.http.get(this.baseServerUrl + 'admin/notifications/'+id+'/pictures',
                       {
                         headers,
                      });
    }


}
