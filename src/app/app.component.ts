import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Address, AddressAPIJsonResponseModel} from "../model/model";
import {FormControl} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'class-3rd-api';


  constructor(public http: HttpClient) {
  }

  addressSuggestions: Address[] = [];
  addressField = new FormControl('');

  async updateSuggestions(): Promise<void> {
    if (this.addressField.value?.length! < 2) return;
    const address = "https://api.geoapify.com/v1/geocode/autocomplete";
    const apiKey = "13082696a2f040e186a2eb12c12cb15e"
    const params: any = {
      text: this.addressField.value,
      format: "json",
      apiKey: apiKey
    };
    const observable = this.http.get<AddressAPIJsonResponseModel>(address, {params: params});
    const addressResult = await firstValueFrom<AddressAPIJsonResponseModel>(observable);
    this.addressSuggestions = addressResult.results;
  }

  /* async updateSuggestions(): Promise<void> {
    const inputValue = this.addressField.value;

    if (!inputValue || inputValue.length < 3) {
      return;
    }

    const apiUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
    const apiKey = "13082696a2f040e186a2eb12c12cb15e";

    try {
      const params = {
        text: inputValue,
        format: "json",
        apiKey,
      };

      const response = await this.http.get<AddressAPIJsonResponseModel>(apiUrl, {params}).pipe(take(1)).toPromise();

      if (response && response.results) {
        this.addressSuggestions = response.results;
      } else {
        console.error("No results found in the API response.");
      }
    } catch (error) {
      console.error("An error occurred while fetching address suggestions:", error);
    }
  }*/
}
