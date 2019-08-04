import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {LoginComponent} from './auth/login/login.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './auth/registration/registration.component';
import {DeshboardComponent} from './ui/deshboard/deshboard.component';
import {ChangepasswordComponent} from './auth/changepassword/changepassword.component';
import {ErrorComponent} from './error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './ui/navbar/navbar.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {SidebarComponent} from './ui/sidebar/sidebar.component';
import {MemberListComponent} from './auth/member-list/member-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {MemberComponent} from './auth/member/member.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DeshboardComponent,
    ChangepasswordComponent,
    ErrorComponent,
    NavbarComponent,
    SidebarComponent,
    MemberListComponent,
    MemberComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSidenavModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
