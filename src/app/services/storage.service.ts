import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setSeesion<T>(key: string, value: T) {
    const val = value ? value.toString() : null;
    sessionStorage.setItem(key, val);
  }

  getSeesion<T>(key: string): T | null {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null ;
  }

  setLocal<T>(key: string, value: T) {
    const val = value ? value.toString() : null;
    localStorage.setItem(key, val);
  }

  getLocal<T>(key: string): T | null {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null ;
  }
}
