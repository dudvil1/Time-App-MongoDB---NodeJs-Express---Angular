export class allMyShifts {
  _id: number;
  date: string;
  enteryTime: string;
  exitTime: string;
  location: [
    {
      latitude: number;
      longitude: number;
    }
  ];
  note: string;
}
