

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order';
import { Commande } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // 3. add 2 methods in the order service to get the list of orders and a single order

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCommandesForUser() {
    return this.http.get<Commande[]>(this.baseUrl + '/Commandes');
  }
  getCommandeDetailed(id: string) {
    return this.http.get<Commande>(this.baseUrl + `/Commandes/${id}` );
  }
  getallcommande(): Observable<Commande[]>{
    return this.http.get<Commande[]>(this.baseUrl+"/Commandes")
  }
  deleteitems(commandid : number, itemid : number){
    return this.http.delete(this.baseUrl+`/DetailsCommande/${commandid}/items/${itemid}`) }
    addItemToCommande(commandeId: number, item: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/commandes/${commandeId}/items`, item);
    }
  
    updateItem(commandeId: number, itemId: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/commandes/${commandeId}/items/${itemId}`, item);
    }}

