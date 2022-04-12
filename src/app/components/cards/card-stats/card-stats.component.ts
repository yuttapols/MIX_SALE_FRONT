import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
})
export class CardStatsComponent implements OnInit {
  @Input()
  get statSubtitle(): string {
    return this._statSubtitle;
  }
  set statSubtitle(statSubtitle: string) {
    this._statSubtitle = statSubtitle === undefined ? "" : statSubtitle;
  }
  private _statSubtitle = "";

  @Input()
  get statTitle(): string {
    return this._statTitle;
  }
  set statTitle(statTitle: string) {
    this._statTitle = statTitle === undefined ? "" : statTitle;
  }
  private _statTitle = "";

  @Input()
  get statIconName(): string {
    return this._statIconName;
  }
  set statIconName(statIconName: string) {
    this._statIconName =
      statIconName === undefined ? "" : statIconName;
  }
  private _statIconName = "";

  @Input()
  get statIconColor(): string {
    return this._statIconColor;
  }
  set statIconColor(statIconColor: string) {
    this._statIconColor =
      statIconColor === undefined ? "" : statIconColor;
  }
  private _statIconColor = "";

  @Input()
  get routerPath(): string {
    return this._routerPath;
  }
  set routerPath(routerPath: string) {
    this._routerPath =
    routerPath === undefined ? "" : routerPath;
  }
  private _routerPath = "";

  constructor() {}

  ngOnInit(): void {}
}
