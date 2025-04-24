import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import {NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-home-component',
  imports: [NgChartsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
 // Line Chart

 ngOnInit(): void {
  if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    location.reload();
  }
}
 public lineChartData: ChartData<'line'> = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      data: [10, 20, 10, 40],
      label: 'Sales',
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }
  ]
};

public lineChartOptions: ChartOptions<'line'> = {
  responsive: true
};

// Pie Chart
public pieChartData: ChartData<'pie', number[], string> = {
  labels: ['Sales', 'Expenses', 'Profits'],
  datasets: [
    {
      data: [45, 25, 30]
    }
  ]
};
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
};

// Doughnut Chart
public doughnutChartData: ChartData<'doughnut', number[], string> = {
  labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
  datasets: [
    {
      data: [35, 25, 40]
    }
  ]
};
public doughnutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};

// Bar Chart
public barChartData: ChartData<'bar'> = {
  labels: ['Department 1', 'Department 2', 'Department 3'],
  datasets: [
    {
      data: [65, 59, 80],
      label: 'Department Sales',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }
  ]
};
public barChartOptions: ChartOptions<'bar'> = {
  responsive: true
};

//radar chart
radarChartOptions: ChartConfiguration<'radar'>['options'] = {
  responsive: true,
  scales: {
    r: {
      angleLines: { display: true },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
};
radarChartData: ChartConfiguration<'radar'>['data'] = {
  labels: ['Communication', 'Teamwork', 'Problem Solving', 'Creativity', 'Technical Knowledge', 'Leadership'],
  datasets: [
    {
      label: 'Employee A',
      data: [80, 70, 85, 65, 90, 75],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
    }
  ]
};
}