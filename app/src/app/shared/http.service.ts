import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get(partialURL: string) {
    return this.httpClient.get(`${environment.apiURL}${partialURL}`);
  }
}
