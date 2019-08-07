import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class APIService {
  public API_PORT: string =
    window.location.hostname === "localhost" ? ":3000" : "";
  constructor() {}

  public getApiUrl(): string {
    return `${window.location.protocol}//${window.location.hostname}${
      this.API_PORT
    }`;
  }
}
