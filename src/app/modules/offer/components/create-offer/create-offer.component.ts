import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-offer",
  templateUrl: "./create-offer.component.html",
  styleUrls: ["./create-offer.component.scss"],
})
export class CreateOfferComponent {
  createOfferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createOfferForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  onSubmit() {
    this.createOfferForm.markAllAsTouched();
    if (this.createOfferForm.valid) {
      // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
      console.log("Formulario enviado", this.createOfferForm.value);
      window.location.href = "/home";
    }
  }
}