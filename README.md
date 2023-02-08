## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Website functionalities](#Website-functionalities)

## General info

this project is a clone of Airbnb as a part of the angular development course.

## Technologies

The project is created with:

- Angular 14
- typescript
- rxjs
- ngrx
- bootstrap
- primeNG
- sweetalert
- font-awesome

## Setup

To run this project, install it locally using npm:

```
$ clone GitHub repository
$ npm install
$ ng serve

```

## Website functionalities

this segment explains how the website works and what you can do with it.

- View page
  when you first visit the website, the initial page looks like this.
  ![Algorithm schema](./images/1.png)

header page has clickable buttons

- Airbnb logo, which takes you to home(initial page)
- log in, lets you log in to your account
- register, lets you register your account
  ![Algorithm schema](./images/header.png)

filter that lets you filter hotels based on certain characteristics, these characteristics are associated with icons and text
![Algorithm schema](./images/filter.png)

filter button at the right side of the filter bar displays the filter modal, which lets you filter hotels with more specific data
![Algorithm schema](./images/filter-modal.png)

the card display area, where hotels are displayed, hotels are taken from API and then displayed on the view page
![Algorithm schema](./images/card-area.png)

the footer of the website, which has 3 buttons that take you to the following pages

- privacy
- contact
- terms
  ![Algorithm schema](./images/footer.png)

- inner-page

by clicking one of the hotels, you will be taken to the inner page where hotel information is displayed in detail, you can also make a reservation from this page.
![Algorithm schema](./images/inner_page_1.png)

hotel name and image gallery, you can scroll through images with an image slider.
![Algorithm schema](./images/inner_page_2.png)

hotel details, description, and what the hotel offers, each section has a button to get more detailed information with modal

![Algorithm schema](./images/inner_page_3.png)
![Algorithm schema](./images/inner_page_modal_1.png)
![Algorithm schema](./images/inner_page_modal_3.png)
![Algorithm schema](./images/inner_page_modal_2.png)

a calendar that lets you pick up the range of days you want to reserve the hotel, also a map that shows the hotel location, and host information

![Algorithm schema](./images/inner_page_4.png)

inner page footer
![Algorithm schema](./images/inner_page_5.png)

hotel reservation area that lets you pick the date range and the number of guests children and pets you want to reserve. reserve button takes you to the payments page where you will finalize your reservation.

![Algorithm schema](./images/inner_page_6.png)

- payment page

by submitting reserve details and clicking the reserve button, you will be taken to the payment page.
where you can finalize your reservation, on the payment page you can select which option you want for your payment, also enter your card information and mobile number, in case you already have card information saved, card information will be submitted automatically.

![Algorithm schema](./images/payment_1.png)

by clicking the reserve button on the payment page, your order will be saved on the order-history page in the account section.
in case you leave this page, you can continue your order within 24 hours and finalize your order with a link to this page. also in case you don't reserve an order it will be saved as pending order in the order history, but with yellow background, indicating that you need to finish the reservation or cancel the order.

- Account page

registration page, where you can submit your email and password and make a new account
![Algorithm schema](./images/register.png)

login page, where you can enter your email and password which you have already created, and log in to your account

![Algorithm schema](./images/login.png)

by clicking on the account button on the header you will be taken to your account. The initial page is the account detail page, where your information is displayed, by clicking the change button you can change your information and then either click apply to make changes or click Cancel to cancel changes.
![Algorithm schema](./images/account_1.png)

order history page, where you can see your reserved orders, yellow background orders are not yet reserved, by clicking on orders you can see their details, also, by clicking on yellow orders you are given the option to reserve your pending order.

![Algorithm schema](./images/order_history_1.png)
![Algorithm schema](./images/order_history_2.png)
![Algorithm schema](./images/order_history_3.png)

password page, by clicking on the password section of the account you will be taken to your password change page, where you can enter your current password and your new password, and change your password.
![Algorithm schema](./images/password.png)

- footer components 

by clicking on the footers privacy button, you will be taken to the privacy, the page where privacy information is displayed

![Algorithm schema](./images/privacy.png)

by clicking on the contact page on the footer, you will be taken to the contact page where contact information is displayed 
![Algorithm schema](./images/contact.png)

by clicking on the terms page on the footer, you will be taken to the terms page where terms and conditions are displayed

![Algorithm schema](./images/terms.png)
