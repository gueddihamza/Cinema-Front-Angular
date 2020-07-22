import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  public getCities(){
    return this.http.get(this.host+"/cities");
  }

  public getCinemas(city){
    return this.http.get(city._links.cinemas.href);
  }

  public getRooms(cinema){
    return this.http.get(cinema._links.rooms.href);
  }

  public getMovieProjections(room){
    let url = room._links.movieProjections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
  }

  public getTickets_Seats(projection){
    let url = projection._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj");
  }

  public payTickets(dataForm){
    return this.http.post(this.host+"/payTickets",dataForm);

  }
}
