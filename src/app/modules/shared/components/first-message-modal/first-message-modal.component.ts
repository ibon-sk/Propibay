import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-message-modal',
  templateUrl: './first-message-modal.component.html',
  styleUrls: ['./first-message-modal.component.scss']
})
export class FirstMessageModalComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FirstMessageModalComponent>
  ) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.dialogRef.close(this.messageForm.value.message);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
