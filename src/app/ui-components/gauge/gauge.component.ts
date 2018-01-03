import { Component, OnInit, AfterViewInit, OnDestroy, Input } from "@angular/core";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ColorPickerService } from "../../services/color-picker.service";
import * as $ from 'jquery';

@Component({
  selector: "app-gauge",
  templateUrl: "./gauge.component.html",
  styleUrls: ["./gauge.component.scss"],
  providers: [ColorPickerService]
})
export class GaugeComponent implements OnInit {

  @Input() gaugeId = "chartdiv";
  @Input() score = 0;

  private chart: AmChart;

  constructor(
    private AmCharts: AmChartsService,
    private colorPickerService: ColorPickerService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const vm = this;

    this.chart = this.AmCharts.makeChart(vm.gaugeId, {
      type: "gauge",
      theme: "none",
      fontFamily: "Montserrat",
      axes: [
        {
          axisThickness: 1,
          axisAlpha: 0,
          tickAlpha: 0,
          valueInterval: 20,
          inside: false,
          bands: [
            {
              color: vm.colorPickerService.selectColor('Atlantis'),
              endValue: 30,
              startValue: 0
            },
            {
              color: vm.colorPickerService.selectColor('YellowOrange'),
              endValue: 70,
              startValue: 30
            },
            {
              color: vm.colorPickerService.selectColor('Valencia'),
              endValue: 100,
              // "innerRadius": "95%",
              startValue: 70
            }
          ],
          bottomText: vm.score,
          bottomTextFontSize: 30,
          bottomTextBold: true,
          bottomTextYOffset: -50,
          endValue: 100
        }
      ],
      arrows: [{
        value: vm.score,
        alpha: 1,
        borderAlpha: 0,
        nailAlpha: 0,
        innerRadius: 30
        }],
      export: {
        enabled: false
      }
    });
    $('.amcharts-main-div a').css("display", 'none');
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
