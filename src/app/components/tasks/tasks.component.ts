import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../Task';
import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'tt-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  displayedColumns: string[] = ['id', 'name', 'date', 'done'];
  taskArr = TASKS;

  dataSource = new MatTableDataSource(this.taskArr);

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDone(task: Task): void {
    task.done = !task.done;
  }

  getTotalDone(): number {
    return this.taskArr
      .map((task) => (task.done ? 1 : 0) as number)
      .reduce((acc, val) => acc + val, 0);
  }
}
