import { NgModel } from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard-service";


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},

    {path: 'users', component: UsersComponent, children:[
      {path: ':id/:name', component:UserComponent},
    ]},

    {path: 'users/:id/:name', component: UserComponent},
    {path: 'servers/:id/edit', component: EditServerComponent},  

    {path: 'servers', canActivateChild:[AuthGuard], component: ServersComponent, children:[
      {path: ':id', component:ServerComponent},
      {path: ':id/edit', component:EditServerComponent, canDeactivate: [CanDeactivateGuard]},
    ]},

    {path: 'servers/:id', component: ServerComponent},  
    {path: '**', redirectTo: '/notfound'},
    {path: 'notfound', component: PageNotFoundComponent},
  ]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],

    exports:[RouterModule]
})

export class AppRoutingModule{

}