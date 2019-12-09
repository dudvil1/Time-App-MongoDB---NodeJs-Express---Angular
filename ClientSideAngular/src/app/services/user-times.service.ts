import { Injectable } from "@angular/core";
import { allMyShifts } from '../components/user-times/all-my-shifts/all-my=shifts.model';

@Injectable({
  providedIn: "root"
})
export class UserTimesService {
  Timelist: allMyShifts[];
  
  constructor() {
  }

}
