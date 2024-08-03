import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  isEdit: boolean = false;
  groups: any[] = [];
  familles: any[] = [];
  types: any[] = [];
  filteredFamilles: any[] = [];
  filteredTypes: any[] = [];
  idn: any;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prixHT: [0 , [Validators.required, Validators.min(0)]],
      prixTTC: [0 , [Validators.required, Validators.min(0)]],
      prixBarre: [0 , [Validators.required, Validators.min(0)]],
      TVA: [0 , [Validators.required, Validators.min(0)]],
      groupId: [null, Validators.required],
      familleId: [null, Validators.required],
      typeId: [null, Validators.required],
      productimage: [null]
    });
  }

  ngOnInit(): void {
    this.getGroups();
    this.getFamilles();
    this.getTypes();
    this.route.params.subscribe(params => {
      this.idn = params['id'];
      if (this.idn) {
        this.isEdit = true;
        this.productService.getProduct(this.idn).subscribe({
          next: (product) => {
            this.productForm.patchValue(product);
            this.filterFamilles(product.groupId);
            this.filterTypes(product.familleId);
          },
          error: (err) => console.error('Error fetching product:', err)
        });
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getGroups() {
    this.productService.getGroups().subscribe({
      next: response => this.groups = [...response],
      error: error => console.log(error)
    });
  }

  getFamilles() {
    this.productService.getFamilles().subscribe({
      next: response => {
        this.familles = [...response];
        this.filteredFamilles = [...response];
      },
      error: error => console.log(error)
    });
  }

  getTypes() {
    this.productService.getTypes().subscribe({
      next: response => {
        this.types = [...response];
        this.filteredTypes = [...response];
      },
      error: error => console.log(error)
    });
  }

  onGroupChange() {
    const selectedGroupId =  parseInt(this.productForm.get('groupId')?.value, 10);
    console.log('Selected Group ID:', selectedGroupId);  
    this.filteredFamilles = this.familles.filter(f => f.groupID === selectedGroupId);
    this.productForm.patchValue({ familleId: null, typeId: null });
    this.filteredTypes = [];
  }

  onFamilleChange() {
    const selectedFamilleId = parseInt(this.productForm.get('familleId')?.value, 10);
    console.log('Selected Famille ID:', selectedFamilleId); 
    this.filterTypes(selectedFamilleId);
    this.productForm.patchValue({ typeId: null });
  }

  filterFamilles(groupId: number | undefined) {
    this.filteredFamilles = this.familles.filter(f => f.groupID === groupId);
    console.log('Filtered Familles:', this.filteredFamilles);  
  }

  filterTypes(familleId: number | undefined) {
    this.filteredTypes = this.types.filter(t => t.familleid === familleId);
    console.log('Filtered Types:', this.filteredTypes);  // Debugging line
  }

  saveProduct() {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      Object.keys(this.productForm.controls).forEach(key => {
        formData.append(key, this.productForm.get(key)?.value);
      });
      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      }
  
      if (this.isEdit) {
        this.productService.updateProduct(this.idn, formData).subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error updating product:', err)
        });
      } else {
        this.productService.addProduct(formData).subscribe({
          next: () => this.router.navigate(['/shop']),
          error: (err) => console.error('Error adding product:', err)
        });
      }
    }
  }

  onPrixHTChange() {
    const prixHT: number = this.productForm.get('prixHT')?.value;
    const TVA: number = this.productForm.get('TVA')?.value;
    this.productForm.get('prixTTC')?.setValue((prixHT + (prixHT * TVA) / 100));
  }

  onTVAChange() {
    const prixHT = this.productForm.get('prixHT')?.value;
    const TVA = this.productForm.get('TVA')?.value;
    this.productForm.get('prixTTC')?.setValue((prixHT + (prixHT * TVA) / 100));
  }

  onPrixTTCChange() {
    const prixTTC = this.productForm.get('prixTTC')?.value;
    const TVA = this.productForm.get('TVA')?.value;
    this.productForm.get('prixHT')?.setValue(prixTTC / (1 + TVA / 100));
  }
}
