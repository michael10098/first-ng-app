import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: async () => {
            const m = await import('./home/home');
            return m.Home;
        },
    },
    {
        path: 'todos',
        loadComponent: async () => {
            const m = await import('./todos/todos');
            return m.Todos;
        }
    }
];
