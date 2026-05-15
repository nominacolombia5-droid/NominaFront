import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-company',
  imports: [FormsModule, NgIf, Navbar],
  templateUrl: './company.html',
  styleUrl: './company.css'
})
export class Company {

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
    const tenMinimumSalaries = minimumSalary * 10;

    const isServiceContract = this.form.contractType === 'services';
    const isPartTime = this.form.contractType === 'partTime';

    const proportionalSalary = (salary / 30) * days;

    const hasTransportAllowance =
      salary <= minimumSalary * 2 &&
      !isServiceContract;

    const transport = hasTransportAllowance
      ? (transportAllowance / 30) * days
      : 0;

    const arlRates: any = {
      I: 0.00522,
      II: 0.01044,
      III: 0.02436,
      IV: 0.04350,
      V: 0.06960
    };

    let healthCompany = 0;
    let pensionCompany = 0;
    let arl = 0;
    let compensationFund = 0;
    let icbf = 0;
    let sena = 0;
    let serviceBonus = 0;
    let severance = 0;
    let severanceInterest = 0;
    let vacation = 0;

    let contractorIbc = 0;
    let contractorHealth = 0;
    let contractorPension = 0;
    let contractorArl = 0;
    let contractorNet = 0;

    const benefitsBase = proportionalSalary + transport;

    if (!isServiceContract) {
      healthCompany = proportionalSalary * 0.085;
      pensionCompany = proportionalSalary * 0.12;
      arl = proportionalSalary * arlRates[this.form.arlLevel];

      compensationFund = proportionalSalary * 0.04;

      if (salary >= tenMinimumSalaries) {
        icbf = proportionalSalary * 0.03;
        sena = proportionalSalary * 0.02;
      }

      serviceBonus = benefitsBase * 0.0833;
      severance = benefitsBase * 0.0833;
      severanceInterest = severance * 0.12;
      vacation = proportionalSalary * 0.0417;

      if (isPartTime) {
        vacation = proportionalSalary * 0.0208;
      }
    }

    if (isServiceContract) {
      contractorIbc = proportionalSalary * 0.40;
      contractorHealth = contractorIbc * 0.125;
      contractorPension = contractorIbc * 0.16;
      contractorArl = contractorIbc * arlRates[this.form.arlLevel];

      contractorNet =
        proportionalSalary -
        contractorHealth -
        contractorPension -
        contractorArl;
    }

    const totalCompanyCost =
      proportionalSalary +
      transport +
      healthCompany +
      pensionCompany +
      arl +
      compensationFund +
      icbf +
      sena +
      serviceBonus +
      severance +
      severanceInterest +
      vacation;

    this.result = {
      contractType: this.form.contractType,
      isServiceContract,
      isPartTime,

      proportionalSalary,
      transport,

      healthCompany,
      pensionCompany,
      arl,

      compensationFund,
      icbf,
      sena,

      serviceBonus,
      severance,
      severanceInterest,
      vacation,

      contractorIbc,
      contractorHealth,
      contractorPension,
      contractorArl,
      contractorNet,

      totalCompanyCost
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