import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './admin-layout.html',
  styles: [`
    .sidebar {
      background-color: #000000; /* Negro según tu paleta */
      min-height: 100vh;
    }
    .nav-link.active {
      background-color: #386114 !important; /* Verde principal */
    }
    .nav-link:hover {
      background-color: #333333 !important; /* Negro más claro al hover */
    }
  `],
})
export class AdminLayout {

}
