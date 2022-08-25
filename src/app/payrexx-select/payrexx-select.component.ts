import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import { PayrexxOptions } from '../payrexx-options';


@Component({
  selector: 'app-payrexx-select',
  templateUrl: './payrexx-select.component.html',
  styleUrls: ['./payrexx-select.component.scss']
})
export class PayrexxSelectComponent implements OnInit {

  @Output() startEvent = new EventEmitter<PayrexxOptions>();

  payrexxOptions: PayrexxOptions = {
    start_date: new Date('2022-01-01'),
    end_date: new Date()
  }

  start_date = new FormControl(this.payrexxOptions.start_date);

  end_date = new FormControl(this.payrexxOptions.end_date);

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.payrexxOptions = {
      start_date: new Date(this.start_date.value),
      end_date: new Date(this.end_date.value)
    }
    console.log(this.payrexxOptions);

    this.startEvent.emit(this.payrexxOptions);
  }

}
