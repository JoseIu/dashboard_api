export interface BookingInterface {
  guest: GuestClass;
  orderDate: string;
  checkin: Check;
  checkOut: Check;
  roomType: string;
  roomNumber: string;
  roomID: string;
  specialRequest: string;
  status: Status;
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
