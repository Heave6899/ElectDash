import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfaService {

  constructor(private http: HttpClient) { }

  getSecret(): Observable<any> {
    return this.http.get("http://localhost:4000/mfa/generate");
  }

  actdeactmfa(mfaRequest) {
    return this.http.post("http://localhost:4000/users/activate/mfa", mfaRequest);
  }

  isMFAEnabled() {
    return this.http.get("http://localhost:4000/users/ismfaenabled");
  }


}
