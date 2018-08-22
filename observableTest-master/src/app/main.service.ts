import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const allInfo = 'assets/json/products.json';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private user = new BehaviorSubject<string>('Kevin');
  cast = this.user.asObservable();

  public data: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private _http: Http) { }

  list() {
    return this._http.get(allInfo).pipe(map(response => response.json()));
  }

  getUser(searchText): Observable<any> {
    const url = 'http://api.github.com/search/users?q=' + searchText;

    return this._http.get(url).pipe(map(
      res => {
        const resultData = res.json();
        console.log(resultData);
        return resultData;
      }
    )
    )
    // return this._http.get(url).pipe(map(response => response.json()));
  }
}
