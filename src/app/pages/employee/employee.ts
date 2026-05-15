import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, NgIf, Navbar],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {

  form = {
    contractType: '',
    salary: 0,
    workedDays: 30,
    arlLevel: 'I'
  };

  result: any = null;

  calculate() {

    const salary = Number(this.form.salary);
    const days = Number(this.form.workedDays);

    const minimumSalary = 1750905;
    const transportAllowance = 249095;

    const isServiceContract =
      this.form.contractType === 'services';

    const proportionalSalary =
      (salary / 30) * days;

    const hasTransportAllowance =
      salary <= minimumSalary * 2 &&
      !isServiceContract;

    const transport =
      hasTransportAllowance
        ? (transportAllowance / 30) * days
        : 0;

    const employeeHealth =
      isServiceContract
        ? 0
        : proportionalSalary * 0.04;

    const employeePension =
      isServiceContract
        ? 0
        : proportionalSalary * 0.04;

    let contractorIbc = 0;
    let contractorHealth = 0;
    let contractorPension = 0;
    let contractorArl = 0;

    const arlRates: any = {
      I: 0.00522,
      II: 0.01044,
      III: 0.02436,
      IV: 0.04350,
      V: 0.06960
    };

    if (isServiceContract) {

      contractorIbc =
        proportionalSalary * 0.40;

      contractorHealth =
        contractorIbc * 0.125;

      contractorPension =
        contractorIbc * 0.16;

      contractorArl =
        contractorIbc *
        arlRates[this.form.arlLevel];

    }

    const totalDeductions =
      employeeHealth +
      employeePension +
      contractorHealth +
      contractorPension +
      contractorArl;

    const netSalary =
      proportionalSalary +
      transport -
      totalDeductions;

    this.result = {

      isServiceContract,

      proportionalSalary,
      transport,

      employeeHealth,
      employeePension,

      contractorIbc,
      contractorHealth,
      contractorPension,
      contractorArl,

      totalDeductions,
      netSalary

    };

  }

  format(value: number) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }

}