import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getRequest<T>(partialURL: string) {
    return this.httpClient.get<T>(`${environment.apiURL}${partialURL}`);
  }

  postRequest<T>(partialURL: string, data: T) {
    return this.httpClient.post<T>(`${environment.apiURL}${partialURL}`, data);
  }
}
