import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {
  @Input() clientes = [];

  constructor() {}

  ngOnInit(): void {
  }

}
