import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PickupTimeslotsService {

  constructor() { }

  // now: number[] = [
  //   new Date().getTime(),
  //   new Date(2021,0,22).setHours(17,0,0,0), // 1
  //   new Date(2021,0,22).setHours(17,14,0,0), // 2
  //   new Date(2021,0,22).setHours(17,16,0,0), // 3
  //   new Date(2021,0,22).setHours(17,29,0,0), // 4
  //   new Date(2021,0,22).setHours(17,31,0,0), // 5
  //   new Date(2021,0,22).setHours(17,34,0,0), // 6
  //   new Date(2021,0,22).setHours(17,36,0,0), 
  //   new Date(2021,0,22).setHours(17,44,0,0),
  //   new Date(2021,0,22).setHours(17,46,0,0),
  //   new Date(2021,0,23).setHours(17,46,0,0),
  // ]

  maxLength: number;


  private createStartPickupTimestamps(selectedDate) {
    // CREATE AN ARRAY WITH A TIMESTAMP FOR THE START OF EACH TIMESLOT, STARTING TODAY AT 17:00 UNTILL 19:45, WITH FITEEN MINUTES IN BETWEEN
    const minutesInterval = 15;
    const startPickupTimestamps: number[] = [];

    let firstTimeslotStart = selectedDate.setHours(17, 0, 0, 0);
    startPickupTimestamps.push(firstTimeslotStart);
    const lastTimeslotStart = selectedDate.setHours(18, 45, 0, 0);
    const fifteen = minutesInterval * 60 * 1000;
    while (firstTimeslotStart < lastTimeslotStart) {
      firstTimeslotStart = firstTimeslotStart + fifteen
      startPickupTimestamps.push(firstTimeslotStart);
    }
    this.maxLength = startPickupTimestamps.length;
    return startPickupTimestamps
  }

  private filterTimestamps(selectedDate) {
    // TAKE OUT THE TIMESTAMPS THAT OCCUR BEFORE THE GIVEN ARGUMENT
    const filteredTimestamps = [];
    const startPickupTimestamps = this.createStartPickupTimestamps(selectedDate)
    startPickupTimestamps.forEach((stamp: number) => {
      // ? now
      // SLOT AVAILABLE UNTIL 10 MINUTES BEFORE THE NEXT SLOT EXPIRES
      if ((stamp - (10 * 60 * 1000)) > new Date().getTime()) {
        filteredTimestamps.push(stamp);
      }
    });
    return filteredTimestamps

  }
  private createTimestampSlots(selectedDate) {
    // CREATE AN ARRAY OF ARRAYS WITH THE STARTSTAMP AND ENDSTAMP FOR EACH STARTSTAMP
    const filteredTimestamps = this.filterTimestamps(selectedDate);
    const filteredStampSlots = []
    filteredTimestamps.forEach((stamp: number) => {
      filteredStampSlots.push([stamp, stamp + 15 * 60 * 1000]);
    })
    return filteredStampSlots
  }

  private convertTimestampsToStrings(selectedDate) {
    // FOR EACH ARRAY IN THE ARRAY: CREATE A STRING SHOWING THE HOUR AND MINUTES FOR THE BEGINSTAMP AND THE ENDSTAMP AND SEPARATE WITH '-'
    // RETURN THE ARRAY
    const filteredStampSlots = this.createTimestampSlots(selectedDate)
    const filteredStringSlots = [];
    filteredStampSlots.forEach((slot: number[]) => {
      filteredStringSlots.push(
        new Date(slot[0]).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + ' - ' +
        new Date(slot[1]).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }))
    });
    if (filteredStringSlots.length < this.maxLength) {
      filteredStringSlots.unshift('haast?, bel 06 522 99 522')
    } else {
    }
    return filteredStringSlots;
  }

  public getTimeslots(selectedDate: Date) {
    // CARRY selectedDate ALL THE WAY UP TO "this.createStartPickupTimestamps()"
    return this.convertTimestampsToStrings(selectedDate)
  }

  // =====================================================================

  public getMaxDate(date: Date) {
    // const myNow = new Date('2-2-2021')
    // const now = date
    // GETDATE(): RETURNS THE DATE
    // GETDAY(): RETURNS THE NUMBER OF THE DAY (SUN: 0, MON: 1, TUE: 2 ETC.)
    // GETTING THE DATE AND SUBTRACTING THE DAY-NUMBER LANDES YOU ON THE PREVIOUS SUNDAY, ADDING 7 LANDS YOU ON THE FIRST COMMING SUNDAY
    let maxDate = date.getDate() - date.getDay() + 7;
    const maxDay = new Date(date.setDate(maxDate));
    return maxDay;

     
    
  }
}
