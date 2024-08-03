import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-famille',
  templateUrl: './add-edit-famille.component.html',
  styleUrls: ['./add-edit-famille.component.scss']
})
export class AddEditFamilleComponent implements OnInit {

  familleForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;
  groups: any[] = []; 
  
  constructor(
    private fb: FormBuilder,
    private familleService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.familleForm = this.fb.group({
      name: ['', Validators.required],
      groupId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadFamilleData();
      }
    });
    this.loadGroups(); 
  }

  loadFamilleData(): void {
    if (this.id) {
      this.familleService.getFamilleById(this.id).subscribe(famille => {
        this.familleForm.patchValue({
          name: famille.name,
          groupId: famille.groupId
        });
      });
    }
  }

  loadGroups(): void {
    this.familleService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  onSubmit(): void {
    if (this.familleForm.valid) {
      const familleData = this.familleForm.value;
      if (this.isEdit && this.id) {
        this.familleService.updateFamille(this.id, familleData).subscribe(
          () => this.router.navigate(['/AllFamille']),
          error => console.error('Error updating famille', error)
        );
      } else {
        this.familleService.addFamille(familleData).subscribe(
          () => this.router.navigate(['/AllFamille']),
          error => console.error('Error adding famille', error)
        );
      }
    }
  }
}
