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
    return typeof val === 'object' ? JSON.parse(val) : val;
  }

  setLocal<T>(key: string, value: T) {
    const val = value ? value.toString() : null;
    localStorage.setItem(key, val);
  }

  getLocal<T>(key: string): T | null {
    const val = localStorage.getItem(key);
    return typeof val === 'object' ? JSON.parse(val) : val;
  }

  removeLocal(key: string) {
    localStorage.removeItem(key);
  }

  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }

  clearLocal() {
    localStorage.clear();
  }

  clearSession() {
    sessionStorage.clear();
  }
}
