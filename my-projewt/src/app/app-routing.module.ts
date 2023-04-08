import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DeleteNotificationComponent } from './delete.notification/delete.notification.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';
import { SupplySemesterApplicationComponent } from './supply-semester-application/supply-semester-application.component';
import { UpdateRegulationComponent } from './update.regulation/update.regulation.component';
import { UploadResultsComponent } from './upload.results/upload.results.component';
import { UploadSupplyResultsComponent } from './upload.supply-results/upload.supply-results.component';

const routes: Routes = [
	{ path: '', redirectTo: "/home", pathMatch: 'full'},
	{ path: "home", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "upload-notifications", component: NotificationsComponent },
	{ path: "delete-notifications", component: DeleteNotificationComponent},
	{ path: "update-regulation", component: UpdateRegulationComponent},
	{ path: "upload-results", component: UploadResultsComponent },
	{ path: "upload-supplyresults", component: UploadSupplyResultsComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "semester-application", component: SemesterApplicationComponent },
	{ path: "semester-supply-application", component: SupplySemesterApplicationComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
