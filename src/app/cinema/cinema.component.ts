import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CinemaService} from '../services/cinema.service'

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public cities; 
  public cinemas;
  public rooms;
  public currentCity;
  public currentCinema;
  public currentProjection;
  public selectedTickets:any;

  constructor(public cinemaService : CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getCities()
      .subscribe(data=>{
          this.cities=data;
      },err=>{
        console.log(err);

      }
      )
  }

  onGetCinemas(city){
    this.currentCity=city;
    this.currentCinema=undefined;
    this.rooms=undefined;
    this.cinemaService.getCinemas(city)
      .subscribe(data=>{
        this.cinemas=data;
    },err=>{
      console.log(err);

    }
    )
  }

  onGetRooms(cinema){
    this.currentCinema=cinema;
    this.cinemaService.getRooms(cinema)
    .subscribe(data=>{
      this.rooms=data;
      this.rooms._embedded.rooms.forEach(room => {
        this.cinemaService.getMovieProjections(room)
        .subscribe(data=>{
          room.movieProjections=data;
      },err=>{
        console.log(err);
  
      }
      )

      });
  },err=>{
    console.log(err);

  }
  )
  }

 onGetTickets_Seats(projection){
  this.currentProjection = projection;
  this.cinemaService.getTickets_Seats(projection)
    .subscribe(data=>{
     this.currentProjection.tickets=data;
     this.selectedTickets=[];
  },err=>{
    console.log(err);

  });

}

onSelectTicket(ticket){
  if(!ticket.selected){
    ticket.selected=true;
    this.selectedTickets.push(ticket);
  }
  else{
    ticket.selected=false;
    this.selectedTickets.splice(this.selectedTickets.indexOf(ticket),1);
  }


}

getTicketClass(ticket){
  let str="btn mr-1 mb-1 ticket ";
  if(ticket.booked)
    str+="btn-danger";
  else if(ticket.selected)
    str+="btn-warning";
  else
    str+="btn-secondary";

  return str;
}

onPayTickets(dataForm){
let tickets=[];
this.selectedTickets.forEach(ticket => {
  tickets.push(ticket.id);
});
dataForm.tickets=tickets;
this.cinemaService.payTickets(dataForm)
  .subscribe(data=>{
    alert("Ticket(s) have been reserved successfully!");
    this.onGetTickets_Seats(this.currentProjection);
  },err=>{
  console.log(err);

});
console.log(dataForm);
}

}
