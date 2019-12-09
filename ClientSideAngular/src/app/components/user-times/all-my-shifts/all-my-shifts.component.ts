import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import * as moment from "moment";
import { UserTimesService } from "../../../services/user-times.service";
import { from } from "rxjs";
import { MapService } from "src/app/services/map.service";
interface Itime{
  location:{

  }
}

@Component({
  selector: "app-all-my-shifts",
  templateUrl: "./all-my-shifts.component.html",
  styleUrls: ["./all-my-shifts.component.css"]
})
export class AllMyShiftsComponent implements OnInit {

  clickOnMyShifts = false;
  months = [
    { Value: 1, Text: "Jan" },
    { Value: 2, Text: "Feb" },
    { Value: 3, Text: "Mar" },
    { Value: 4, Text: "Apr" },
    { Value: 5, Text: "May" },
    { Value: 6, Text: "June" },
    { Value: 7, Text: "July" },
    { Value: 8, Text: "Aug" },
    { Value: 9, Text: "Sep" },
    { Value: 10, Text: "Oct" },
    { Value: 11, Text: "Nov" },
    { Value: 12, Text: "Dec" }
  ];
  selectedMonth: any = this.months[new Date().getMonth()];
  totalHoursForMonth: number = 0;

  constructor(
    private _Service: ApiService,
    public UserService: UserTimesService,
    private Map: MapService
  ) {}

  ngOnInit() {}

  onSubmitMyShift() {
    this._Service.GetAllMyShifts(this.selectedMonth);
    this.clickOnMyShifts = true;
  }

  calcTotalHours(start: any, finish: any) {
    const now = moment(start, "HH:mm:ss");
    const end = moment(finish, "HH:mm:ss");
    const duration = moment.duration(end.diff(now));
    const hours = duration.asHours().toFixed(2);
    this.totalHoursForMonth += parseInt(hours);
    return hours;
  }

  @Output() newLocation = new EventEmitter<any>()
  populateForm(location: any) {
    console.log("emitOutPut",location.location);
    this.Map.changeLocation(location.location);
     this.newLocation.emit(location.location);
  }
}
