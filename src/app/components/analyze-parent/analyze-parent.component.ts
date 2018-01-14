import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory,
  ComponentFactoryResolver  } from '@angular/core';
import {WindowBodyComponent} from '../window-body/window-body.component';
import {AnalyzeComponent} from '../analyze-parent/analyze/analyze.component';

@Component({
  selector: 'app-analyze-parent',
  templateUrl: './analyze-parent.component.html',
  styleUrls: ['./analyze-parent.component.scss'],
  entryComponents: [
    WindowBodyComponent,
    AnalyzeComponent
  ]
})
export class AnalyzeParentComponent implements OnInit {

  @ViewChild('analyzeComponent', { read: ViewContainerRef }) analyzeContainer;
  analyzeComponentRef: ComponentRef<WindowBodyComponent>;

  constructor(private resolver: ComponentFactoryResolver, private vcRef: ViewContainerRef) { }

  ngOnInit() {
  }

  buildAnalyzeDashboard(){
    const vm = this;
    vm.analyzeContainer.clear();

    const windowBodyContentFactory: ComponentFactory<AnalyzeComponent> =
    this.resolver.resolveComponentFactory(AnalyzeComponent);
    const windowBodyFactory: ComponentFactory<WindowBodyComponent> =
        this.resolver.resolveComponentFactory(WindowBodyComponent);

    const analyzeDashboardContentRef = this.vcRef.createComponent(windowBodyContentFactory);

    this.analyzeComponentRef = this.analyzeContainer.createComponent(windowBodyFactory, 0, undefined,
    [[analyzeDashboardContentRef.location.nativeElement]]);
    this.analyzeComponentRef.instance.innerWidth = "1000px";
    this.analyzeComponentRef.instance.name = "Analyze";
    this.analyzeComponentRef.instance.deleteMeEvent.subscribe(event => this.analyzeComponentRef.destroy());
  }
}
