import { Input, Output, EventEmitter, Component } from "@angular/core";
import { User } from "../../models/user";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
  })
export class UserCardComponent {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<User>();

  selectUser() {
    this.userSelected.emit(this.user);
  }
}    