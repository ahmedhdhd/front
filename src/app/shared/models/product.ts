export interface Product {
    id: number;
    name: string;
    description: string;
    prixHT: number;
    prixTTC: number;
    prixBarre?: number;
    tva: number;
    familleId?: number;
    typeId?: number;
    famille?: any; 
    groupId?: number;
    group?: any;
    type?: any;   imageUrl: string;

  }

  export interface Pagination<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T;
  }
  
  export interface Brand {
    id: number;
    name: string;
  }
    export interface Type {
    id: number;
    name: string;
  }
  

  export class ShopParams {
    brandId = 0;
    typeId = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 6;
    search = '';
}