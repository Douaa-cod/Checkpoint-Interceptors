import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Personne } from '../Model/Personne'
const API_LINK = 'https://immense-citadel-91115.herokuapp.com/api/personnes'
@Injectable({
  providedIn: 'root'
})
export class CvService {
  personnes : Personne [];
  nbClick = 0;
  clickSubject = new Subject<number>();
  selectItemSubject = new Subject<Personne>();
  constructor(
    private http : HttpClient
  ) {
    this.personnes = [
      new Personne (1, 'Yazidi', 'Douaa', 29, 11111111, 'Développeur', "capture1.png"),
      new Personne (2, 'Marvel', 'John', 35, 22222222, 'CEO', "   "),
      new Personne (3, 'Andrew', 'Mike', 30, 33333333, 'Développeur', "capture3.png"),
      new Personne (4, 'Corman', 'Inna', 26, 44444444, 'Product Manager', "capture4.png")
    ];
   }
   getFakePersonnes(): Personne[]{
    return this.personnes
   }
   getPersonnes(): Observable<Personne[]>{
    return this.http.get<Personne[]>(API_LINK)
   }
   getFakePersonById(id): Personne{
      return this.personnes.find(
        (personne) => personne.id === +id
      );
   }
   getePersonById(id): Observable<Personne> {
    let headers = new HttpHeaders().set('Authorization', 'Douaa');
    let params = new HttpParams().set('code1', '0123').set('code2', '4657')
    return this.http.get<Personne>(API_LINK+`/${id}`, ({headers, params}) );

 }
   addFakePerson(person : Personne){
     if (person){
       const id = this.personnes[this.personnes.length-1].id
       person.id = id + 1
       this.personnes.push(person)
       console.log(this.personnes)
     }else
     {
       alert ("Nothing to add")
     }
   }
   addPerson(person : Personne): Observable<any>{
    //Gérer par l'intercepteur
/*      const token = localStorage.getItem('token');
     if (token){
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.post(API_LINK, person, ({headers}))
     } */
     return this.http.post(API_LINK, person)
   }
   deleteFakePersonById(person : Personne){
    let index;
    index = this.personnes.indexOf(person)
    console.log(index)
    if (index === -1){
      alert("Person does not exist")
      return 0
    } else {
      this.personnes.splice(index, 1)
      console.log(this.personnes)
      return 1
    }
   }
   deletPersonById(id : number): Observable<any>{
     //Gérer par l'intercepteur
/*     const token = localStorage.getItem('token');
    if(token){
      const headers = new HttpHeaders().set('Authorization', token)
      return this.http.delete(API_LINK+`/${id}`, ({headers}));
    } */
    return this.http.delete(API_LINK+`/${id}`);
   }

   click(){
     this.nbClick ++;
     this.clickSubject.next(this.nbClick);
   }
   clickOnItem( personne : Personne) {
    this.selectItemSubject.next(personne);
   }
}
