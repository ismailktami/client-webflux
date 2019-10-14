import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EmployeeEv} from './employeeev';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  source: EventSource = null;
  constructor(private http: HttpClient) {}
  employees;
  subscribeevent = false;
  currentEmployee: any = null;
  employeesevents: any = [];
  id = '8e7063b2-7a4b-4ac8-a164-3c8ff29b1984';
  ngOnInit(): void {
   // this.connect();
    this.getData();
  }
  connect(e): void {
    this.currentEmployee = e;
    if (this.source != null) {
      this.employeesevents = [];
      this.source.close();
    }
    this.source = new EventSource('http://localhost:8082/rest/employee/' + e.id + '/events');
    this.source.addEventListener('message', message => {
      const item = JSON.parse(message.data) as any;
      console.log(item);
      this.employeesevents.push(item);
    });
  }
  getData() {
    this.http.get('http://localhost:8082/rest/employee/all').subscribe(data => {
      console.log(data);
      this.employees = data;
    });
  }

subsribeEvent(id) {

}

  ngOnDestroy(): void {
  }
}
