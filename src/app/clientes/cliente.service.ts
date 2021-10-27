import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient) {

  }

  getClientes(): void {
    this.httpClient.get<{mensagem: string, clientes: any}>
    ('http://localhost:3000/api/clientes')
    .pipe(map((dados) => {
      return dados.clientes.map(cliente => {
        return {
          id: cliente._id,
          nome: cliente.nome,
          fone: cliente.fone,
          email: cliente.email
        }
      })
    }))
    .subscribe(
      (clientes) => {
        this.clientes = clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      }
    )
  }

  adicionarCliente(nome: string, fone: string, email: string) {
// TODO: O código abaixo foi comentado pois mudamos o modelo do cliente para incluir o id,
// mas ainda não alteramos essa parte.

//    const cliente: Cliente = {
//      nome: nome,
//      fone: fone,
//      email: email
//    };
//    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/clientes', cliente)
//      .subscribe((dados) => {
//        console.log(dados.mensagem);
//        this.clientes.push(cliente);
//        this.listaClientesAtualizada.next([...this.clientes]);
//      })
  }

  removerCliente(id: string): void {
    this.httpClient.delete('http://localhost:3000/api/clientes/${id}').subscribe(() => {
      console.log(`Cliente de id: ${id} removido`);
    })
  }

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }

}
