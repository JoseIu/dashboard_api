export interface Booking {
  orderDate: string;
  checkin: Check;
  checkOut: Check;
  specialRequest: string;
  roomType: string;
  status: Status;
  guest: GuestClass;
}

export interface Check {
  date: string;
  time: string;
}

export interface GuestClass {
  name: string;
  lastName: string;
  reservationID: string;
  img: string;
}

export type Status = 'Check In' | 'Check Out' | 'In Progress';
