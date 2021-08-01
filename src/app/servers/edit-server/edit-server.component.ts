import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './../../can-deactivate-guard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;
  changesSaved: boolean;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.server = this.serversService.getServer(+params['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    })
    this.route.queryParams.subscribe(qParams => {
      this.allowEdit = +qParams['allowEdit'] === 1;
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.router.navigate(['../'], {relativeTo: this.route});
    this.changesSaved = true;
  }

  componentDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) { 
      return true; 
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && this.allowEdit && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }
    else {
      return true;
    }
  }

}
