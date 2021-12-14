import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  stripeTest: FormGroup;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.http
            .post(`${environment.HOST_URL}/api/payments/charge`, {
              amount: 100,
              currency: 'inr',
              source: result.token.id,
              description: 'Test charge',
            })
            .subscribe((result) => {
              console.log('charge created successfully', result);
            });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
