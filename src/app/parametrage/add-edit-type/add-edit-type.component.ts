import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-type',
  templateUrl: './add-edit-type.component.html',
  styleUrls: ['./add-edit-type.component.scss']
})
export class AddEditTypeComponent implements OnInit {

  typeForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;
  familles: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private typeService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      familleId: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadTypeData();
      }
    });
    this.loadFamilles();
  }

  loadTypeData(): void {
    if (this.id) {
      this.typeService.getTypeById(this.id).subscribe(type => {
        this.typeForm.patchValue({
          name: type.name,
          familleId: type.familleId
        });
      });
    }
  }

  loadFamilles(): void {
    this.typeService.getFamilles().subscribe(familles => {
      this.familles = familles;
    });
  }

  onSubmit(): void {
    if (this.typeForm.valid) {
      const typeData = this.typeForm.value;
      if (this.isEdit && this.id) {
        this.typeService.updateType(this.id, typeData).subscribe(
          () => this.router.navigate(['/AllType']),
          error => console.error('Error updating type', error)
        );
      } else {
        this.typeService.addType(typeData).subscribe(
          () => this.router.navigate(['/AllType']),
          error => console.error('Error adding type', error)
        );
      }
    }
  }
}
