import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {

  userForm: FormGroup;
  isEdit: boolean = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: ShopService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      type: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); 
      if (this.id) {
        this.isEdit = true;
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    if (this.id) {
      this.userService.getUserById(this.id).subscribe(user => {
        this.userForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          type: user.type,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.isEdit && this.id) {
        // Update existing type
        this.userService.updateUser(this.id, userData).subscribe(
          () => this.router.navigate(['/AllUser']),
          error => console.error('Error updating user', error)
        );
      } else {
        // Add new type
        this.userService.addUser(userData).subscribe(
          () => this.router.navigate(['/AllUser']),
          error => console.error('Error adding user', error)
        );
      }
    }
  }

}
