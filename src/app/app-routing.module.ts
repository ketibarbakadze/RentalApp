import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';
import { PrivacyComponent } from './footer/privacy/privacy.component';
import { TermsComponent } from './footer/terms/terms.component';
import { CalendarComponent } from './sharedComponents/calendar/calendar.component';
import { PaymentsComponent } from './sharedComponents/payments/payments.component';
import { AuthGuard } from './sharedServices/accountServices/auth.guard';
import { PaymentsGuard } from './sharedServices/accountServices/payments.guard';
import { AccountDetailsComponent } from './user-account/account-details/account-details.component';
import { LoginComponent } from './user-account/login/login.component';
import { OrderHistoryComponent } from './user-account/order-history/order-history.component';
import { PasswordComponent } from './user-account/password/password.component';
import { RegisterComponent } from './user-account/register/register.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { InnerPgComponent } from './view/inner-pg/inner-pg.component';
import { ViewComponent } from './view/view.component';
import { WildCardComponent } from './wild-card/wild-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  { path: 'view/:id', component: InnerPgComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component:ContactUsComponent},
  { path: 'privacy', component:PrivacyComponent},
  { path: 'terms' , component:TermsComponent},
  { path: 'calendar' , component:CalendarComponent},
  { path: 'payments/:id', component: PaymentsComponent, canActivate:[AuthGuard,PaymentsGuard] },
  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'account-details', pathMatch: 'full' },
      { path: 'account-details', component: AccountDetailsComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'order-history', component: OrderHistoryComponent },
    ],
  },
  //wildcardcomponent should always be at the bottom,
  { path: '**', component: WildCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
