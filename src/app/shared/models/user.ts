export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    type: number;
    token: string; 
    NomRaisonSocial? : string ;
    MFcin ?: string ;
    Adresse? : string ;
    CodePostal ?: string ;
    Gouvernorat ?: string;

}

export interface Address {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
}

//ajouter
export class Commande {
    id!: number;
    date!: string;
    heure!: string;
    items!: DétailsCommande[];
    totalTTC!: number;
    totalTVA!: number;
    totalHT!: number;
    fraisLivraison!: number;
    status!: string;
    idUser!: number;
    NomRaisonSocial? : string ;
    MFcin ?: string ;
    Adresse?: string ;
    CodePostal?: string ;
    Gouvernorat?: string;
  }
 
  export class DétailsCommande {
  id!: number;
  qte!: number;
  prixUnitaire!: number;
  prixTotal!: number;
  idProduit!: number;
  
}