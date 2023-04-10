import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FooterComponent } from './footer/footer.component';
import { DeleteNotificationComponent } from './delete.notification/delete.notification.component';
import { UpdateRegulationComponent } from './update.regulation/update.regulation.component';
import { UploadResultsComponent } from './upload.results/upload.results.component';
import { UploadSupplyResultsComponent } from './upload.supply-results/upload.supply-results.component';
import { ContactComponent } from './contact/contact.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';
import { SupplySemesterApplicationComponent } from './supply-semester-application/supply-semester-application.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadResultsCsvComponent } from './upload.results.csv/upload.results.csv.component';
import { CertificateApplicationComponent } from './certificate-application/certificate-application.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		HeaderComponent,
		SidebarComponent,
		NotificationsComponent,
		FooterComponent,
		DeleteNotificationComponent,
		UpdateRegulationComponent,
		UploadResultsComponent,
  UploadSupplyResultsComponent,
  ContactComponent,
  SemesterApplicationComponent,
  SupplySemesterApplicationComponent,
  ProfileComponent,
  UploadResultsCsvComponent,
  CertificateApplicationComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
