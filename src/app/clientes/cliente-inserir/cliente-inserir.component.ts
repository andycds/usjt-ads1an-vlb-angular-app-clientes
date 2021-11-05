import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ClienteService } from "../cliente.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css'],
})

export class ClienteInserirComponent implements OnInit{

  private modo: string = "criar";

  constructor(public clienteService: ClienteService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idCliente")) {
        this.modo = "editar";
      }
      else {
        this.modo = "criar";
      }
    });
  }

  onAdicionarCliente(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.clienteService.adicionarCliente(
      form.value.nome,
      form.value.fone,
      form.value.email
    );
    form.resetForm();

  }
}
