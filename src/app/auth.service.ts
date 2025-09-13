import { Injectable, computed, inject, signal } from '@angular/core';
import { APP_SETTINGS } from './app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToekn = signal('');
  private authUrl = inject(APP_SETTINGS).apiUrl + '/auth';
  isLoggedIn = computed(() => this.accessToekn() !== '');

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(this.authUrl + '/login', {
      username, password
    }).pipe(tap((token  => this.accessToekn.set(token))));
  }

  logout() {
    this.accessToekn.set('');
  }
}
