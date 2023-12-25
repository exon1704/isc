import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errors: Map<string, string> = new Map<string, string>();

  get errors(): Map<string, string> {
    return this._errors;
  }

  private _activarError: boolean;

  get activarError(): boolean {
    return this._activarError;
  }

  set activarError(value: boolean) {
    this._activarError = value;
  }

  setError(key: string, value: string, activarError: boolean) {
    this._errors.set(key, value);
    this._activarError = activarError;
  }

  clearError(key: string) {
    this._errors.delete(key);
  }

  clearAll() {
    this._errors.clear();
  }
}
