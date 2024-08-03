import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';
import { Commande, DétailsCommande } from 'src/app/shared/models/user';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit{

  ngOnInit(): void {}

  @Input() appStepper?: CdkStepper;
  @Input() checkoutForm?: FormGroup;

  constructor(private router : Router ,private basketService: BasketService, private toastr: ToastrService,private acount : AccountService,private checkout : CheckoutService) {}

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: error => this.toastr.error(error.message)
    })
  }

  //ajouter
  mapData(data: any): Commande {
    const items = data.basket.items.map((item: any) => {
        const detail = new DétailsCommande();
        detail.qte = item.quantity;
        detail.prixUnitaire = item.prixTTC;
        detail.prixTotal = item.prixTTC * item.quantity;
        detail.idProduit = item.id;
        return detail;
      });
  
      const commande = new Commande();
      commande.idUser = this.acount.getUserIdFromToken() || 1
      commande.items = items;
      commande.fraisLivraison = data.basket.shippingPrice;
      commande.totalHT = items.reduce((acc: number, item: { prixUnitaire: number; qte: number; }) => acc + item.prixUnitaire * item.qte, 0);
  commande.totalTVA = items.reduce((acc: number, item: { prixTotal: number; }) => acc + item.prixTotal * 0.2, 0); // Example TVA calculation
    commande.totalTTC = items.reduce((acc: any, item: { prixTotal: any; }) => acc + item.prixTotal, 0) + commande.fraisLivraison;

      //commande.totalTTC = data.basket.items.reduce((acc: number, item: { prixTTC : number; qte: number; }) => acc + item.prixTTC * item.qte, 0);
     // commande.totalTVA = data.basket.items.reduce((acc: number, item: { tva: number; qte: number; }) => acc + item.tva *item.qte, 0); 
      //commande.totalHT = data.basket.items.reduce((acc: any, item: { prixHT: any; qte: number;  }) => acc + item.prixHT *item.qte, 0) 
  
      const now = new Date();
      commande.date =now.getDate().toString()+"/0"+now.getMonth().toString()+"/"+now.getFullYear().toString();
      commande.heure = now.getHours().toString()+":"+now.getMinutes().toString();
      commande.status="en cours"
      return commande;
    }
  
  callform() : any{
    const data = this.checkoutForm?.value;
    const commande: Commande = this.mapData(data)
     this.checkout.createcommande(commande).subscribe(
      {
        next :  ()=> this.router.navigate(["checkout/success"]),
   
        error(err) {
          console.log(err.error)
        },
      }
     )
    console.log(commande);

}
 }
