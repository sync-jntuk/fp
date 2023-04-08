import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResultsComponent } from './results/results.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';

const routes: Routes = [
	{ path: '', redirectTo: "/home", pathMatch: "full" },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'result', component: ResultsComponent },
	{ path: 'semesterapplication', component: SemesterApplicationComponent },
	{ path: 'newsfeed', component: NewsfeedComponent },
	{ path: 'notifications', component: NotificationsComponent },
	{ path: "contact", component: ContactComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
