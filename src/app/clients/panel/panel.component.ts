import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  object = Object;
  clients = null;
  status = {
    'Aguardando ativação': 'waiting',
    Ativo: 'active',
    Inativo: 'inactive',
    Desativado: 'disabled'
  };

  constructor(
    private clientsService: ClientsService
  ) { }

  async ngOnInit() {
    this.clients = await this.clientsService.getClients();
  }


}
