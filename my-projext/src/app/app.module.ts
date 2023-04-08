import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ResultsComponent } from './results/results.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		SidebarComponent,
		LoginComponent,
		RegisterComponent,
		ProfileComponent,
		FooterComponent,
		ResultsComponent,
		SemesterApplicationComponent,
		NewsfeedComponent,
		NotificationsComponent,
  ContactComponent
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
