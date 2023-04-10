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
import { ProfileComponent } from './profile/profile.component';
import { UploadResultsCsvComponent } from './upload.results.csv/upload.results.csv.component';
import { CertificateApplicationComponent } from './certificate-application/certificate-application.component';

const routes: Routes = [
	{ path: '', redirectTo: "/home", pathMatch: 'full'},
	{ path: "home", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "profile", component: ProfileComponent },
	{ path: "upload-notifications", component: NotificationsComponent },
	{ path: "delete-notifications", component: DeleteNotificationComponent},
	{ path: "update-regulation", component: UpdateRegulationComponent},
	{ path: "upload-results", component: UploadResultsComponent },
	{ path: "upload-results-csv", component: UploadResultsCsvComponent },
	{ path: "upload-supplyresults", component: UploadSupplyResultsComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "semester-application", component: SemesterApplicationComponent },
	{ path: "semester-supply-application", component: SupplySemesterApplicationComponent },
	{ path: "certificate-application", component: CertificateApplicationComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
