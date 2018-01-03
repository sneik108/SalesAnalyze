import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ColorPickerService } from '../../services/color-picker.service';
import { IChartItem } from '../../interfaces/IChartItem';
import {IFeature} from '../../interfaces/IFeature';
import * as $ from 'jquery';
// export enum ChartType {
//   Pie,
//   Column
// }

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ColorPickerService]
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() color: string;
  @Input() title: string;
  @Input() titleDescription: string;
  @Input() seriesName: string;
  @Input() chartItems: any[];
  @Input() yAxisName: string;
  @Input() chartType = 'column';
  @Input() yAxisMax;
  @Input() titlePosition = 'center';
  @Input() showAllValues = false;
  @Input() innerHeight: string;

  chart: Chart;
  successScore: number;


  @Output() onItemSelectEvent = new EventEmitter();

  constructor(private colorPickerService: ColorPickerService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // setTimeout(() => this.renderChart(), 100);
    // this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this;
    if (changes['chartItems']) {
      // alert('voy voy voy');
      // setTimeout(() => this.renderChart(), 100);
      this.renderChart();
    }
  }

  renderChart() {
    const _this = this;

    if (_this.chartItems == null) {
      return;
    }
    const names: string[] = _this.chartItems.map(item => item.name);
    const values: number[] = _this.chartItems.map(item => item.value);

    if (
      names == null ||
      values == null ||
      names.length === 0 ||
      values.length === 0
    ) {
      // return;
    }

    let items: any[] = [];
    let showLegend = false;
    let maxZoom;
    let columnWidth;
    let graphWidth;
    let graphHeight;

    if (_this.chartType === 'pie') {
      showLegend = true;
      this.successScore = this.getNumbersSum(values);
      for (let index = 0; index < names.length; index++) {
        items.push({'name': names[index], 'y': values[index]});
      }
    } else {
      items = values;
      if (_this.title === 'Recommended Databases For Migration') {
        const serverNumber = items.length;
        if (serverNumber < 11) {
          graphWidth = 800;
          graphHeight = 200;
        }
        else {
          const widthCoefficient = serverNumber * 1.52;
          maxZoom = 1;
          columnWidth = 50;
          graphWidth = columnWidth * widthCoefficient;
          graphHeight = 200;
        }
      }
    }
    this.chart = new Chart({
      chart: {
        type: this.chartType,
        width: graphWidth,
        height: graphHeight,
      },
      legend: {
        enabled: showLegend
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                formatter: function() {
                  return 't';
              }
            },
            showInLegend: true,
            point: {
              events: {
                legendItemClick: function() {
                  return false;
                }
              }
            }
        },
        series: {
          cursor: 'pointer', // Clickable chart has pointer cursor,
          allowPointSelect: true,
          point: {
            events: {
              select: this.onPointSelect.bind(this),
            }
          },
          events: {
            legendItemClick: this.onLegendItemClick.bind(this),
          },
          dataLabels: {
            align: 'center',
            enabled: _this.showAllValues
          }
        },
        column: {
          pointWidth: columnWidth
        },
        bar: {
          dataLabels: {
            align: 'left'
          }
        }
    },
      xAxis: {
        type: 'string',
        categories: names,
        // min: 0,
        // max: 5,
        labels: {
          enabled: true
        }
        // maxZoom: maxZoom
      },
      yAxis: {
        title: {
            text: this.yAxisName
        },
        max: this.yAxisMax
      },
      title: {
        text: null,
        align: _this.titlePosition
      },
      tooltip: {
        formatter: function() {
          if (_this.chartType === 'column' || _this.chartType === 'bar') {
            if (_this.seriesName === 'Cost') {
              const formattedValue = _this.formatNumber(this.y);
              return `$${formattedValue}`;
            }
            else {
              return `<b>${_this.seriesName}:</b> ${this.y}`;
            }
          }
          else if(_this.chartType === 'line') {
            const formattedValue = _this.formatNumber(this.y);
            return `$${formattedValue}`;
          }
          else {
            return `<b>${this.point.name}:</b> ${this.y}`;
          }
        },
        positioner: function(labelWidth, labelHeight, point) {
          let tooltipX, tooltipY;
          tooltipX = point.plotX;
            //  if (point.plotX + labelWidth > this.chart.plotWidth) {
            //      tooltipX = point.plotX ;
            //  }
            //  else {
            //      tooltipX = point.plotX + this.chart.plotLeft + 40;
            //  }
             tooltipY = point.plotY + this.chart.plotTop - 20;
             return {
                 x: tooltipX,
                 y: tooltipY
             };
     }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: this.seriesName,
          data: items,
          color: this.getColor(),
        }
      ],
    });
  }

  getColor(): string {
    return this.colorPickerService.selectColor(this.color);
  }
  onPointSelect (e) {
    // alert('Yeeeeeah');
    if (this.chartType === 'column' || this.chartType === 'bar') {
      const selectedItem = e.target.category;
      const selectedItemId = this.chartItems.filter(item => item.name === selectedItem)[0].id;
      this.onItemSelectEvent.emit(selectedItemId);
    } else if (this.chartType === 'pie') {
      const featureName = e.target.name;
      const serverAndInstanceArr = this.getServerAndInstance(e.target.series.name);
      const serverName = serverAndInstanceArr[0];
      const instanceName = serverAndInstanceArr[1];

      const selectedFeature: IFeature = {serverId: serverName, instanceName: instanceName, featureName: featureName};

      this.onItemSelectEvent.emit(selectedFeature);
    }
  }

  onLegendItemClick(e) {
    // alert('opa');
  }

  // someCLick() {
  //   // alert('op');
  // }

  getNumbersSum(values: number[]) {
    const sum = values.reduce((a, b) => a + b, 0);
    return sum;
  }

  private formatNumber(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private getServerAndInstance(name: string) {
    return name.split(':');
  }

  private getnae() {
    return this.yAxisName;
  }
}
