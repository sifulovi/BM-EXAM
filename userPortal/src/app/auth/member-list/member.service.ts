import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Member} from '../member/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  apiUrl = 'https://localhost:44344/api/auth/userList';
  apiUserProfileUrl = 'https://localhost:44344/api/auth/memberProfile';

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched member')),
        catchError(this.handleError('getMembers', []))
      );
  }


  getMemberProfile(id): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUserProfileUrl)
      .pipe(
        tap(_ => this.log('fetched member')),
        catchError(this.handleError('getMembers', []))
      );
  }

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
