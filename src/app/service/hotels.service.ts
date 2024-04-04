import { Injectable } from '@angular/core';
import { Hotels } from '../interface/hotels';
import { HOTELS } from '../mock-hotels/mock-hotels';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HotelsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HotelsService: ${message}`);
}

private hotelsUrl = 'api/hotels';  // URL to web api

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getHotels(): Observable<Hotels[]> {
   // const hotels = of(HOTELS);
    //this.messageService.add('HotelsService: fetched hotels');
    return this.http.get<Hotels[]>(this.hotelsUrl)
    .pipe(
      tap(_ => this.log('fetched hotels')),
      catchError(this.handleError<Hotels[]>('getHotels', []))
    );
  }

  getHotel(id: number): Observable<Hotels> {
    const url = `${this.hotelsUrl}/${id}`;
        return this.http.get<Hotels>(url).pipe(
            tap(_ => this.log(`fetched hotels id=${id}`)),
            catchError(this.handleError<Hotels>(`getHotels id=${id}`))
  );
  }

  /** PUT: update the hero on the server */
updateHero(hotels: Hotels): Observable<any> {
  return this.http.put(this.hotelsUrl, hotels, this.httpOptions).pipe(
    tap(_ => this.log(`updated hotel id=${hotels.id}`)),
    catchError(this.handleError<any>('updateHotel'))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/** POST: add a new hero to the server */
addHotel(hotels: Hotels): Observable<Hotels> {
  return this.http.post<Hotels>(this.hotelsUrl, hotels, this.httpOptions).pipe(
    tap((newHotel: Hotels) => this.log(`added hotel w/ id=${newHotel.id}`)),
    catchError(this.handleError<Hotels>('addHotel'))
  );
}

/** DELETE: delete the hero from the server */
deleteHotel(id: number): Observable<Hotels> {
  const url = `${this.hotelsUrl}/${id}`;

  return this.http.delete<Hotels>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hotel id=${id}`)),
    catchError(this.handleError<Hotels>('deleteHotel'))
  );
}

/* GET heroes whose name contains search term */
searchHotel(term: string): Observable<Hotels[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hotels[]>(`${this.hotelsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found hotel matching "${term}"`) :
       this.log(`no hotel matching "${term}"`)),
    catchError(this.handleError<Hotels[]>('searchHotel', []))
  );
}

 
}
