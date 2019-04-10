import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  get getFromAPI(): Observable<any> {
    return this.http.get('https://demo5283088.mockable.io/customers');
  }

  saveClients(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  convertAPIDataAndSaveInLocalStorage(dataFromAPI) {
    this.saveClients(this.structureLocalData(dataFromAPI));
  }

  private structureLocalData(clients: [any]) {
    const localStructure = {};
    clients.forEach(client => {
      localStructure[client._id] = {
        _id: client._id,
        name: client.name,
        cpf: client.cpf,
        email: client.contact.email,
        tel: client.contact.tel,
        status: client.status
      };
    });
    return localStructure;
  }

  async getClients() {
    const clients = () => localStorage.getItem('clients');
    if (!clients()) {
      const response = await this.getFromAPI.toPromise();
      this.convertAPIDataAndSaveInLocalStorage(response.data);
    }
    return JSON.parse(clients());
  }

  async createClient(userData) {
    const newUserId = Math.floor(Date.now() / 1000);
    userData._id = newUserId;
    const localClients = await this.getClients();
    localClients[newUserId] = userData;
    this.saveClients(localClients);
  }

  async updateClient(userId, userData){
    const localClients = await this.getClients();
    localClients[userId] = userData;
    this.saveClients(localClients);
  }

  async getClient(userId): Promise<Client> {
    const clients = await this.getClients();
    return clients[userId];
  }

}
