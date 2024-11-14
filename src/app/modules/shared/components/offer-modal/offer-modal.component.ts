import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss'],
})
export class OfferModalComponent {
    form: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<OfferModalComponent>
    ) {
      this.form = this.fb.group({
        amount: ['', [Validators.required, Validators.min(1)]]
      });
    }
  
    sendMessage() {
      if (this.form.valid) {
        this.dialogRef.close(this.form.value.amount);
      }
    }
  
    close() {
      this.dialogRef.close();
    }
  }