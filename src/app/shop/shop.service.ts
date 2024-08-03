import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/product';
import { Type } from '../shared/models/product';
import { ShopParams } from '../shared/models/product';
import { Observable, map, of, tap } from 'rxjs';
import { isBs4 } from 'ngx-bootstrap/utils/theme-provider';
import { User } from '../shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  users: User[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();
  promo:boolean=false;

  constructor(private http: HttpClient) { }

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();
  
    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }
  
    let params = new HttpParams();
  
    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId.toString());
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId.toString());
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
  
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);
  
    return this.http.get<Pagination<Product[]>>(this.baseUrl + '/produit', { params }).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    );
  }
  getallproduct(promo: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Produit/all?promo=${promo}`);
}
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number): Observable<Product> {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + '/Produit/' + id);
  }
  
 
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/Produit`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/Produit/${id}`, formData);
  }
  deleteproduct(id : number){
    return this.http.delete(`${this.baseUrl}/Produit/${id}`)
  }


  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GroupTypeFamille/types`);
  }
  

  getTypeById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/TypeFamille/types/${id}`);
  }

  addType1(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.baseUrl}/TypeFamille/types`, type);
  }

  updateType1(id: number, typeData: Type): Observable<Type> {
    return this.http.put<Type>(`${this.baseUrl}/TypeFamille/types/${id}`, typeData);
  }
  deleteType(id: number) {
    return this.http.delete(`${this.baseUrl}/TypeFamille/types/${id}`);
  }
  addType(type: any): Observable<any> {
    return this.http.post(this.baseUrl+'/GroupTypeFamille/Type', type);
  }
  updateType(id: number, type: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/GroupTypeFamille/Type/${id}`, type);
  }
  //CRUD Brand

  getBrands(): Observable<Brand[]> {
    return this.http.get<Type[]>(`${this.baseUrl}/TypeFamille/Famille`);
  }

  getFamilleById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/TypeFamille/Famille/${id}`);
  }

  addBrand(brand: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/TypeFamille/Famille`, brand);
  }


  updateBrand(id: number, brand: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/TypeFamille/Famille/${id}`, brand);
  }

  deleteBrand(id: number) {
    return this.http.delete(`${this.baseUrl}/TypeFamille/Famille/${id}`);
  }


  //CRUD user

  getUser(search: string = ''): Observable<User[]> {
    if (this.users.length > 0 && !search) {
      return of(this.users);
    }

    return this.http.get<User[]>(`${this.baseUrl}/Users?search=${search}`).pipe(
      tap((users) => this.users = users)
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Users/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Users`, user);
  }

  updateUser(id: number, userData: User): Observable<User> {
    return this.http.put<any>(`${this.baseUrl}/Users/${id}`, userData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/Users/${id}`);
  }


  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'/GroupTypeFamille/Groups');
  }
  getFamilles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'/GroupTypeFamille/Familles');
  }
  addFamille(famille: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/GroupTypeFamille/Famille`, famille);
  }
  
  updateFamille(id: number, famille: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/GroupTypeFamille/Famille/${id}`, famille);
  }
  
  updateGroup(id: number, group: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/GroupTypeFamille/group/${id}`, group);
  }
  
  getGroupById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GroupTypeFamille/Group/${id}`);
  }
  
  addGroup(group: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/GroupTypeFamille/Group`, group);
  }
  
  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/GroupTypeFamille/groups/${id}`);
  }
  
  getmenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GroupTypeFamille/menu`);
  }
  }
