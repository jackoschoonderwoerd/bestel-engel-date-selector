import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickupDatesService {

  constructor() { }

  getDateTimestamps() {
    let dates: Date[] = [];
    for(let i = 0; i < 7; i++) {
      dates.push(new Date(new Date().setDate(new Date().getDate() + i)))
    }
    
    dates = dates.filter((date: Date) =>  {
      return date.getDay() > 2
    })

    const datesTimestamps: number[] = dates.map((date: Date) => {
      return date.setHours(0,0,0,0)
    })

    datesTimestamps.forEach((stamp: number) => {
      console.log(new Date(stamp))
    })
    return datesTimestamps;
  }

  getISODates() {
    
    
    let dates: Date[] = [];
    for(let i = 0; i < 7; i++) {
      dates.push(new Date(new Date().setDate(new Date().getDate() + i)))
    }
    const ISODates = dates.map(date => {
      return date.toISOString();
    });
    console.log(ISODates)
    const currentHour = new Date().getHours();
    if(currentHour >= 19) {
      ISODates.shift();
    }
    return ISODates;
  }
}
