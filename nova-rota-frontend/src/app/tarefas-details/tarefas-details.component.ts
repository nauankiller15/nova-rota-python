import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-tarefas-details',
  templateUrl: './tarefas-details.component.html',
  styleUrls: ['./tarefas-details.component.css'],
})
export class TarefasDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  selected_tarefa = { titulo: '', descricao: '' };

  ngOnInit(): void {
    this.loadTarefa();
  }

  loadTarefa() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.api.getTarefa(id).subscribe(
      (data) => {
        console.log(data);
        this.selected_tarefa = data;
      },
      (error) => {
        console.log('Aconteceu um Erro!', error.message);
      }
    );
  }
}
