import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  manager: any;
  role: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.manager = this.authService.getManager();
    this.role = this.authService.getRole();
  }
}
