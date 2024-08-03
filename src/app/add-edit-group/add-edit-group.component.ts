import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent implements OnInit {

  groupForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private groupService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadGroupData();
      }
    });
  }

  loadGroupData(): void {
    if (this.id) {
      this.groupService.getGroupById(this.id).subscribe(group => {
        this.groupForm.patchValue({
          name: group.name,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData = this.groupForm.value;
      if (this.isEdit && this.id) {
        this.groupService.updateGroup(this.id, groupData).subscribe(
          () => this.router.navigate(['/Allgroupe']),
          error => console.error('Error updating group', error)
        );
      } else {
        this.groupService.addGroup(groupData).subscribe(
          () => this.router.navigate(['/Allgroupe']),
          error => console.error('Error adding group', error)
        );
      }
    }
  }
}
