// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MessageService } from '../services/message.service';
// import { ApplogService } from '../services/applog.service';
// import { Subscription } from 'rxjs/Subscription';
// import { Globals } from '../globals';
// import { Headings } from '../models/IHeadings';
// import { EventDetails, LogDetail } from '../models/IEventDetails';
// import { DateService } from '../services/dates.service';
// import * as _ from 'lodash';
// // import * as $ from 'jquery';
// declare var $: any;

// @Component({
//   selector: 'app-skc-app-table',
//  templateUrl: './skc-app-table.component.html',
//   styleUrls: ['./skc-app-table.component.css']
// })

// export class SkcAppTableComponent implements OnInit, OnDestroy {

//   subscriptionApps: Subscription;
//   subscriptionLogs: Subscription;
//   applogs: any;
//   title: string;

//   headings: Headings = { all: [], filtered: [] };
//   eventDetails: EventDetails[] = [];
//   eventDetailsGraph: EventDetails[] = [];
//   attrs: any[] = [];
//   pageRange: any = { start: 0, length: 0, linkSize: 0 };

//   colspan: string = "0";

//   constructor(private globals: Globals,
//               private messageService: MessageService,
//               private appLogService: ApplogService, 
//               private dateService: DateService) {

//     this.subscriptionApps = messageService.getApplication().subscribe( appln => {
//       this.pageRange = {
//         start: 0,
//         length: globals.rowsPerPage,
//         linkSize: globals.pageSize
//       };

//       this.showTable(appln);
//     });

//     this.subscriptionLogs = messageService.getDaterange().subscribe( range => {

//       this.appLogService.getAppLogs().subscribe(logs => {
//           this.fillTable(logs);
//           this.appLogService.cache = logs;
//         })
//     });
    
//   }

//   showTable(appln: any) {
//     var __this = this;
//     // // document.getElementById('btnSpinner').click();
//     // $('#spinner').modal({ show: true });

//     $('#appTable').on('hide.bs.modal', function (e) {
//       // $('#spinner').modal('hide');
//       __this.messageService.setSpinner(false);
//     });

//     this.title = appln.name ? appln.name + ' / ' + appln.environment : appln.environment;

//     this.appLogService.getAppLogsById(appln.applicationId).subscribe(logs => {

//       this.fillTable(logs);

//       // document.getElementById('btnShow').click();
//       $('#appTable').modal({ show: true });

//       // document.getElementById('btnSpinner').click();
//       // $('#spinner').modal({ hide: true});

//       __this.messageService.setSpinner(false);

//       this.appLogService.cache = logs;
//     },
//     error => {
//         // $('#spinner').modal('hide');
//         __this.messageService.setSpinner(false);
//     })
//   }

//   fillTable(logs) {
//     let headings = logs.head ? logs.head.vars ? logs.head.vars : [] : [];
//     this.headings.all = headings;

//     this.headings.filtered = _.reduce(headings, (result, val, index) => {
//       let found = _.indexOf(this.globals.columnsHidden, val) > -1;
//       if (!found) {
//         result.push(val);
//       }
//       return result;
//     }, []);

//     this.colspan = (this.headings.filtered.length + 1).toString();

//     let bindings = logs.results ? logs.results.bindings ? logs.results.bindings : [] : [];

//     this.eventDetailsGraph = this.getDetailsGraph(bindings);

//     this.eventDetails = _.cloneDeep(this.eventDetailsGraph
//         .slice(this.pageRange.start, this.pageRange.start + this.pageRange.length));

//     this.fillAttrs();
//   }

//   getLogDetail(binding): LogDetail {

//     let cols = "col";
//     let value = binding && binding.value ? binding.value : "";
//     let trimmed = value.replace(/\s/g, "");

//     if (value.length && value.length != trimmed.length) {
//       let widths = Math.floor( value.length / this.globals.columnWidth ) + 1;
//       cols = widths == 1 ? cols : widths > 12 ? "col-12" : "col-" + widths;
//     }
//     let logDetail: LogDetail = { value: value, columns: cols };

//     return logDetail
// }

//   getDetailsGraph(bindings) {
//     let counter = 0;

//     let detailsGraph = _.reduce(bindings, (graph, binding, index) => {

//       let eventdetail: EventDetails = { all: [], filtered: [] };

//       let all = _.map(this.headings.all, (heading) => {

//         let logDetail = this.getLogDetail(binding[heading]);
//         return logDetail;
//       });

//       counter = counter + 1;

//       let filtered = _.reduce(this.headings.filtered, (result, heading, index) => {

//         let logDetail = this.getLogDetail( binding[heading] );

//         if (this.globals.localData && heading == 'SeqNum') {
//           // This is only for populating local mock test data
//           logDetail.value = counter.toString();
//         }
//         result.push(logDetail);

//         return result;
//       }, []);

//       eventdetail.all = all;
//       eventdetail.filtered = filtered;
//       graph.push(eventdetail);

//       return graph;
//     }, []);

//     return detailsGraph;
//   }

//   fillAttrs() {
//     this.attrs = [];
//     let isOdd: boolean = true;

//     _.times(this.pageRange.length, (index) => {
//       isOdd = !isOdd;
//       this.attrs.push({ styles: isOdd ? 'oddRow' : '', toggleIcon: 'right' });
//     })
//   }

//   paginate(event) {
//     if (event && event.first != null) {
//       this.pageRange.start = event.first;

//       this.eventDetails = _.cloneDeep(this.eventDetailsGraph
//           .slice(this.pageRange.start, this.pageRange.start + this.pageRange.length));

//       this.fillAttrs();

//       console.log("aya Paginate Event");
//       console.log(event);
//       console.log(this.pageRange);
//       console.log(this.eventDetailsGraph.length);
//       console.log(this.eventDetails);
//     }
//   }

//   ngOnInit() {
    
//   }

//   ngOnDestroy() {
//     this.subscriptionApps.unsubscribe();
//     this.subscriptionLogs.unsubscribe();
//   }

// }
