import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  userId: number;
  private subRouter: any;
  userData: Client;

  status = [
    'Ativo',
    'Aguardando ativação',
    'Inativo',
    'Desativado'
  ];
  message = null;

  form: FormGroup;
  formDefaultValues = {
    name: null,
    cpf: null,
    email: null,
    tel: null,
    status: ''
  };

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subRouter = this.route.params.subscribe(async params => {
      if (Object.keys(params).length === 0) {
        this.createForm(this.formDefaultValues);
      } else {
        this.userId = params.id;
        this.userData = await this.clientsService.getClient(this.userId);
        this.createForm(this.userData);
      }
    });
  }

  ngOnDestroy(): void {
    this.subRouter.unsubscribe();
  }

  private createForm({ name, cpf, email, tel, status }) {
    this.form = new FormGroup(
      {
        name: new FormControl(name, { validators: Validators.required }),
        cpf: new FormControl(cpf, { validators: Validators.required }),
        email: new FormControl(email, { validators: Validators.required }),
        tel: new FormControl(tel, { validators: Validators.required }),
        status: new FormControl(status, { validators: Validators.required })
      }
    );
  }

  onSubmit() {
    if (!this.userId) {
      this.clientsService.createClient(this.form.value);
      this.showMessage('create');
      this.resetForm();
    } else {
      this.clientsService.updateClient(this.userId, this.form.value);
      this.showMessage('update');
    }
  }

  private resetForm() {
    this.form.reset();
    this.form.get('status').setValue('');
  }

  private showMessage(type) {
    const messages = {
      create: `O usuário "${this.form.value.name}" foi criado com sucesso.`,
      update: `O usuário "${this.form.value.name}" foi atualizado com sucesso.`
    };
    this.message = messages[type];
    setTimeout(() => this.message = null, 5000);
  }

}
