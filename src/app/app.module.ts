import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { FilterComponent } from './header/filter/filter.component';
import { FilterModalComponent } from './header/filter/filter-modal/filter-modal.component';
import { ViewComponent } from './view/view.component';
import { CardItemComponent } from './view/card-item/card-item.component';
import { InnerPgComponent } from './view/inner-pg/inner-pg.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';
import { TermsComponent } from './footer/terms/terms.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { LoginComponent } from './user-account/login/login.component';
import { RegisterComponent } from './user-account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WildCardComponent } from './wild-card/wild-card.component';
import { ImageSliderComponent } from './sharedComponents/image-slider/image-slider.component';
import { PaymentsComponent } from './sharedComponents/payments/payments.component';
import { AccountDetailsComponent } from './user-account/account-details/account-details.component';
import { PasswordComponent } from './user-account/password/password.component';
import { OrderHistoryComponent } from './user-account/order-history/order-history.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { GalleriaModule } from 'primeng/galleria';

import { AmenitiesModalComponent } from './view/inner-pg/amenities-modal/amenities-modal.component';
import { AircoverModalComponent } from './view/inner-pg/aircover-modal/aircover-modal.component';
import { DescriptionModalComponent } from './view/inner-pg/description-modal/description-modal.component';

import { CarouselModule } from 'primeng/carousel';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './view/inner-pg/map/map.component';
import { InnerPgFooterComponent } from './view/inner-pg/inner-pg-footer/inner-pg-footer.component';
import { PrivacyComponent } from './footer/privacy/privacy.component';
import { CalendarComponent } from './sharedComponents/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReservationComponent } from './view/inner-pg/reservation/reservation.component';
import { MatNativeDateModule } from '@angular/material/core';
import { InputNumberModule } from 'primeng/inputnumber';

import { OrderModalComponent } from './user-account/order-history/order-modal/order-modal.component';
import { LoadingComponent } from './sharedComponents/loading/loading.component';
import { LoadingInterceptor } from './sharedInterceptors/loading.interceptor';
import { LoadingService } from './sharedServices/loading.service';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FilterComponent,
    FilterModalComponent,
    ViewComponent,
    CardItemComponent,
    InnerPgComponent,
    FooterComponent,
    ContactUsComponent,
    TermsComponent,
    UserAccountComponent,
    LoginComponent,
    RegisterComponent,
    WildCardComponent,
    ImageSliderComponent,
    PaymentsComponent,
    AccountDetailsComponent,
    PasswordComponent,
    OrderHistoryComponent,
    AmenitiesModalComponent,
    AircoverModalComponent,
    DescriptionModalComponent,
    MapComponent,
    InnerPgFooterComponent,
    PrivacyComponent,
    CalendarComponent,
    AmenitiesModalComponent,
    AircoverModalComponent,
    DescriptionModalComponent,
    MapComponent,
    InnerPgFooterComponent,
    ReservationComponent,
    OrderModalComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    GoogleMapsModule,
    AngularFirestoreModule,
    CarouselModule,
    GalleriaModule,
    CalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputNumberModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
