import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();     
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return parseInt(tokenPayload.sub[1], 10); 
    }
    return null;
  }

  loadCurrentUser(token: string | null): Observable<void> {
    if (token == null) {
      this.currentUserSource.next(null);
      return of();
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserSource.next(user);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    const id = this.getUserIdFromToken();
    return this.http.get<User>(this.baseUrl + `/Users/${id}`, { headers }).pipe(
      map(response => {
        if (response) {
          this.currentUserSource.next(response);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post<User>(this.baseUrl + "/Auth/authenticate", values).pipe(
      map(user => {         
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + '/Users', values).pipe(
      map(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
      })
    );
  }

  // register(values: any) {
  //   return this.http.post<User>(this.baseUrl + 'Users', values).pipe(
  //     map(user => {
  //       localStorage.setItem('token', user.token);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.currentUserSource.next(user);
  //     })
  //   );
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + '/Users/checkEmailExists/' + email);
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + '/account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + '/account/address', address);
  }

//ajouter
  getcurentuserfromlocalstorage(){
    const s: string = localStorage.getItem("user") ?? '{}'; 
    const jsonObject: User = JSON.parse(s);
    
    this.currentUserSource.next(jsonObject);
  }

  getcurentuservalue(){
    const s: string = localStorage.getItem("user") ?? '{}'; 
    const jsonObject: User = JSON.parse(s);
    return jsonObject ;
  }
  setuserinlocalstorage(user : User){
    let jsonString: string = JSON.stringify(user);
    localStorage.setItem("user" ,jsonString )

  }
  updateusertaddres(id : number , data : User){
   //return this.put(this.baseUrl)

  }
}






// import { Injectable } from '@angular/core';
// import { Observable, ReplaySubject, map, of } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Address, User } from '../shared/models/user';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {
//   baseUrl = environment.apiUrl;
//   private currentUserSource = new ReplaySubject<User | null>(1);
//   currentUser$ = this.currentUserSource.asObservable();

//   constructor(private http: HttpClient, private router: Router) { }
//   getToken(): string | null {
//     return localStorage.getItem("token");
//   }
  
//   getUserIdFromToken(): number | null {
//     const token = this.getToken();     

//     if (token) {
//       const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//       console.log(tokenPayload.sub[1]);
//       return parseInt(tokenPayload.sub[1], 10); 

//     }
//     return null;
//   }


  
  
//   loadCurrentUser(token: string | null) {
//     if (token == null) {
//       this.currentUserSource.next(null);
//       return of(null);
//     }

//     let headers = new HttpHeaders();
//     headers = headers.set('Authorization', `Bearer ${token}`);

//    const id = this.getUserIdFromToken()
//     return this.http.get<User>(this.baseUrl + `Users/${id}`, {headers})
//   }

// login1(values: any) {
//     return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
//       map(user => {
//         localStorage.setItem('token', user.token);
//         this.currentUserSource.next(user);
//       })
//     )
//   }

//     login(values: any){
//       return this.http.post<User>(this.baseUrl+"Auth/authenticate", values).pipe(
//         map(user => {         
        

//           localStorage.setItem('token', user.token);
          
//           console.log(user)
//           this.currentUserSource.next(user);
//           console.log(this.currentUserSource)
//         })
//       );
//     }
//   register(values: any) {
//     return this.http.post<User>(this.baseUrl + 'Users', values).pipe(
//       map(user => {
//         localStorage.setItem('token', user.token);
//         this.currentUserSource.next(user);
//       })
//     )
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.currentUserSource.next(null);
//     this.router.navigateByUrl('/');
//   }

//   checkEmailExists(email: string) {
//     return this.http.get<boolean>(this.baseUrl + 'Users/checkEmailExists/' + email);
//   }

//   getUserAddress() {
//     return this.http.get<Address>(this.baseUrl + 'account/address');
//   }

//   updateUserAddress(address: Address) {
//     return this.http.put(this.baseUrl + 'account/address', address);
//   }


//   getcurentuserfromlocalstorage(){
//     const s: string = localStorage.getItem("user") ?? '{}'; 
//     const jsonObject: User = JSON.parse(s);
    
//     this.currentUserSource.next(jsonObject);
//   }

//   getcurentuservalue(){
//     return this.currentUserSource ;
//   }
//   setuserinlocalstorage(user : User){
//     let jsonString: string = JSON.stringify(user);
//     localStorage.setItem("user" ,jsonString )

//   }
// }
