import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todosService';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';
import { debouncedSignal } from '../signal-utils';

@Component({
  selector: 'app-todos',
  imports: [TodoItem, FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos implements OnInit {
  todosService = inject(TodosService)
  todoItems = signal<Array<Todo>>([]);
  searchInput = signal('');
  searchDebounced = debouncedSignal(this.searchInput, 500);

  ngOnInit(): void {
    this.todosService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      })
  }

  updateTodoItem(todoItem: Todo)
  {
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    })
  }
}
