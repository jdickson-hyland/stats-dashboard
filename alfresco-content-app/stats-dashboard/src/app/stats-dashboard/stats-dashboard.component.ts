import { ContentService, NodesApiService, SearchService } from '@alfresco/adf-content-services';
import { SearchRequest } from '@alfresco/js-api';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {

  loading:boolean = true;
  jsonReports = []; //array of objects {}
  constructor( 
    private searchService:SearchService, 
    private nodeService:NodesApiService
  ) { }

  ngOnInit(): void {
   this.searchStatsReport();
   console.log(this.jsonReports)
  }

  /**Gets content of reports and populates jsonReports with it */
  searchStatsReport(){
    const queryBody:SearchRequest = {
      query:{
        query:"TYPE:'venzia:statsReport'"
      },
      paging:{maxItems:1000}
    };

    //get all nodes of type venzia:statsReport
    this.searchService.searchByQueryBody(queryBody).subscribe(results => {
      let arrayOfContents:Observable<any>[] = [];
      if(results.list.entries.length > 0){
        results.list.entries.forEach(node => {//obtain the content of each node
          arrayOfContents.push(this.nodeService.getNodeContent(node.entry.id))
        })

        forkJoin(arrayOfContents).subscribe(contents => {
          let contentsToStringPromises = [];
          contents.forEach( content => {contentsToStringPromises.push((content as Blob).text())}); //read blobs
          forkJoin(contentsToStringPromises).subscribe(parsedContents => {
            parsedContents.forEach(parsed => { this.jsonReports.push( JSON.parse((parsed as string)))});
            this.loading=false;
          });

        })
      }
    })
  }

}
