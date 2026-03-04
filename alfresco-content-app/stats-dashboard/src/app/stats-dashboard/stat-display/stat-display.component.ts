import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-display',
  templateUrl: './stat-display.component.html',
  styleUrls: ['./stat-display.component.scss']
})

/**Stats dashboard pases each stat to this component, this handles the parsing and rendering */
export class StatDisplayComponent implements OnInit {

  @Input("stat") stat; //object {outputLabel, outputType, results} diferent outputType can have diferent props
  defaultIcon="dashboard";
  defaultIconColor="#212121";
  defaultBgColor="#333";
  defaultTextColor = "#000000";
  constructor() { }

  ngOnInit(): void {
  }

  getbgcolor(){
    if(this.stat.hasOwnProperty("outputCardbgColor") && this.stat.outputCardbgColor != ""){
      return this.stat.outputCardbgColor;
    }
    return this.defaultBgColor;
  }

  getTextColor(){
    if(this.stat.hasOwnProperty("outputTextColor") && this.stat.outputTextColor != ""){
      return this.stat.outputTextColor;
    }
    return this.defaultTextColor;
  }

  getIcon(){
    if(this.stat.hasOwnProperty("outputIcon") && this.stat.outputIcon != ""){
      return this.stat.outputIcon;
    }
    return this.defaultIcon;
  }

  getIconColor(){
    if(this.stat.hasOwnProperty("outputIconColor") && this.stat.outputIconColor != ""){
      return this.stat.outputIconColor;
    }
    return this.defaultIconColor;
  }
}
