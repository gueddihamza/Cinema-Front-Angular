import { Component, OnInit } from '@angular/core';
import {JwtClientService} from '../services/jwt-client.service';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  authRequest:any={
    "username" : "hamzagueddi",
    "password" : "7_5inoz5_"
  };

  response:any;
  constructor(private service : JwtClientService ) { }

  ngOnInit() {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest){
    let resp=this.service.generateToken(authRequest);
    resp.subscribe(data=>this.accessAPI(data));
  }

  public accessAPI(token){
    let resp=this.service.welcome(token);
    resp.subscribe(data=>this.response=data);
  }


}
