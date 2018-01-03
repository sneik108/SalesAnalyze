import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input
} from "@angular/core";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ColorPickerService } from "../../services/color-picker.service";
import * as $ from "jquery";

@Component({
  selector: "app-chart-donut",
  templateUrl: "./chart-donut.component.html",
  styleUrls: ["./chart-donut.component.scss"],
  providers: [ColorPickerService]
})
export class ChartDonutComponent implements OnInit {
  @Input() donutId = "chartdiv";
  @Input() innerText = '';
  @Input() showLegend = false;
  @Input() innerRadius = '94%';
  @Input() innerHeight = "200px";
  @Input() innerWidth = "180px";
  @Input() items: any[] = [];

  private chart: AmChart;

  constructor(
    private AmCharts: AmChartsService,
    private colorPickerService: ColorPickerService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    const vm = this;
    vm.chart = vm.AmCharts.makeChart(vm.donutId, {
      type: "pie",
      theme: "none",
      fontFamily: "Montserrat",
      dataProvider: vm.items,
      titleField: "title",
      valueField: "value",
      labelRadius: 5,
      radius: "42%",
      innerRadius: vm.innerRadius,
      labelText: "[[title]]",
      export: {
        enabled: false
      },
      labelsEnabled: false,
      colorField: 'color',
      legend: {
        markerType: "circle",
        enabled: false,
        markerSize: 5,
        fontSize: 9,
        horizontalGap: 1,
        valueWidth: 34,
        // verticalGap: 1,
        align: "left",
        autoMargins: false,
        divId: 'graphLegendId' + vm.donutId
      },
      allLabels: [
        {
          y: "40%",
          align: "center",
          size: 13,
          bold: true,
          text: vm.innerText,
          color: "#555"
        }
      ],
      balloonFunction: function(graphDataItem, graph) {
        return;

        // if (value < 500) {
        //   return value + "<br>(Little)";
        // } else {
        //   return value + "<br>(A Lot)";
        // }
      }
    });
    vm.chart.addListener('rendered', () => $(".amcharts-chart-div a").css("display", "none"));
    // vm.chart.addListener('rendered', function(event) {
    //   $(".amcharts-chart-div a").css("display", "none");
    //   // populate our custom legend when chart renders
    //   vm.chart.customLegend = document.getElementById('graphLegendIdcostPerDatabaseChartId');
    //   vm.chart.customLegend.innerHTML = '';
    //   for (var i in vm.chart.chartData) {
    //     var row = vm.chart.chartData[i];
    //     var color = vm.chart.colors[i];
    //     var percent = Math.round(row.percents * 100) / 100;
    //     var value = row.value;
    //     console.log('custom legend');
    //     console.log(vm.chart);
    //     vm.chart.customLegend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.title + '<div class="legend-value">' + value + '</div></div>';
    //   }
    // });

  }
  ngAfterViewChecked() {
    const vm = this;
    // vm.chart.addListener('rendered', function(event) {
    //   $(".amcharts-chart-div a").css("display", "none");
    //   // populate our custom legend when chart renders
    //   vm.chart.customLegend = document.getElementById('graphLegendIdcostPerDatabaseChartId');
    //   vm.chart.customLegend.innerHTML = '';
    //   for (var i in vm.chart.chartData) {
    //     var row = vm.chart.chartData[i];
    //     var color = vm.chart.colors[i];
    //     var percent = Math.round(row.percents * 100) / 100;
    //     var value = row.value;
    //     console.log('custom legend');
    //     console.log(vm.chart);
    //     vm.chart.customLegend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.title + '<div class="legend-value">' + value + '</div></div>';
    //   }
    // });
    $(".amcharts-chart-div a").css("display", "none");
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
