import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthendicated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(true);
      }, 1000)
    })
  }
}
