import { Component, OnInit } from '@angular/core';
import { TokenModel } from '../models/tokenmodel';
import { RegisterModel } from '../models/registermodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/accounts.service';
import { UserAccountsService } from '../services/userAccounts.service';
import { SessionService } from '../services/session.service';
import { StatesService } from '../services/states.service';
import { States } from '../models/states';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MessageService } from '../services/message.service';
import { ValidatorsService, EmailValidation, PasswordValidation, RepeatPasswordValidation, PhoneValidation, ZipCodeValidation } from '../validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  token: TokenModel = { token: "" };
  registerInput: RegisterModel = {
      UserId: "",
      Username: "",
      RoleName: "",
      Password: "",
      ConfirmPassword: "",
      FirstName: "",
      LastName: "",
      Address: "",
      City: "",
      StateId: 8, // CA, by default
      ZipCode: "",
      CellPhone: "",
      HomePhone: "",
      Email: "",
      CreditCardType: "",
      CreditCardNumber: "",
      CreditCardExpiration: ""
  };
  states: States[];
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  registerForm: FormGroup;

  constructor(private accountService: AccountService, 
    private userAccountService: UserAccountsService, 
    private sessionService: SessionService, 
    private statesService: StatesService, 
    private router: Router, 
    private loginService: LoginService, 
    private messageService: MessageService) { }

  ngOnInit(): any {
      console.log('register init');

      this.registerForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(3)]), 
        firstname: new FormControl("", [Validators.required]), 
        lastname: new FormControl("", [Validators.required]), 
        email: new FormControl("", EmailValidation), 
        password: new FormControl("", PasswordValidation), 
        confirmPassword: new FormControl("", PasswordValidation), 
        address: new FormControl("", [Validators.required]), 
        city: new FormControl("", [Validators.required]),
        zipcode: new FormControl("", ZipCodeValidation), 
        state: new FormControl("8", [Validators.required]),
        cellphone: new FormControl("", PhoneValidation), 
        homephone: new FormControl("", PhoneValidation)
      }, { validators: RepeatPasswordValidation })

      this.statesService.getAnimeStates().subscribe(states => {
        this.states = states;
        this.statesService.States = states;
      })
  }

  Register(registerForm, isValid: boolean) {

    if (isValid) {
      this.registerInput.Username = registerForm.username;
      this.registerInput.FirstName = registerForm.firstname;
      this.registerInput.LastName = registerForm.lastname;
      this.registerInput.Email = registerForm.email;
      this.registerInput.Address = registerForm.address;
      this.registerInput.City = registerForm.city;
      this.registerInput.StateId = registerForm.state;
      this.registerInput.ZipCode = registerForm.zipcode;
      this.registerInput.CellPhone = registerForm.cellphone;
      this.registerInput.HomePhone = registerForm.homephone;
      this.registerInput.Password = registerForm.password;
      this.registerInput.ConfirmPassword = registerForm.confirmPassword;

      this.accountService.createUser(this.registerInput).subscribe(createdUser => {
        this.registerInput.UserId = createdUser.id;
        console.log("aya created user");
        console.log(this.registerInput);

        let sessionAccount = this.sessionService.UserAccount;
        sessionAccount.userId = this.registerInput.UserId;
        sessionAccount.userName = this.registerInput.Username;
        sessionAccount.firstName = this.registerInput.FirstName;
        sessionAccount.lastName = this.registerInput.LastName;
        sessionAccount.email = this.registerInput.Email;
        sessionAccount.address = this.registerInput.Address;
        sessionAccount.city = this.registerInput.City;
        sessionAccount.zipCode = this.registerInput.ZipCode;
        sessionAccount.stateId = this.registerInput.StateId;
        sessionAccount.cellPhone = this.registerInput.CellPhone;
        sessionAccount.homePhone = this.registerInput.HomePhone;

        this.sessionService.UserAccount = sessionAccount;

        this.userAccountService.createUserAccount(this.registerInput)
          .subscribe(token => {
            this.sessionService.UserToken = token;
            this.loginService.login(sessionAccount.firstName);

            this.messageService.selectUserAccount(sessionAccount);
            this.messageService.setSpinner(false);

            this.isSuccess = true;
            this.isFailure = false;
            this.router.navigate(['/account']);
          }, 
          (error) => {
            this.isSuccess = false;
            this.isFailure = true;
            this.setErrorMessage(error);
            this.messageService.setSpinner(false);
            console.log("Error creating user account: ", error);
          })
      }, 
      (error) => {
        this.isSuccess = false;
        this.isFailure = true;
        this.setErrorMessage(error);
        this.messageService.setSpinner(false);
        console.log("Error creating ASPNet user: ", error);
      })
    }
    else {
      this.isSuccess = false;
      this.isFailure = true;
    }
  }

  setErrorMessage(error) {
    if (error && error.modelState) {
      if (error.modelState[""] && error.modelState[""][0] ) {
        this.errorMessage = error.modelState[""][0];
      } 
    }
    else if (error && error.message ) {
      this.errorMessage = error.message;
    }
  }
}
