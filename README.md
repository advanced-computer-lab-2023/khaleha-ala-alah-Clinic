# el7a2ni Clinc





in this project we have a clinc reservation system .
the system has registered doctors and patients .
the patient can register to the system and the doctor can apply to this system and wait for the admin approval . Doctors can add their available slots where they can examine patients. the system also has integrations with the stripe paymenmt system and has wallet system related to the website.

in this readme file you will be provided with all the screenshots  from postman and from the website as a frontend system 

## *Tech/Framework Used*

*Frontend:*

- React.js

- MUI

- CSS for styling

*Backend:*

- Node.js with Express framework

- MongoDB for database

*Authentication:*

- JSON Web Tokens (JWT)

*Testing:*

- Postman for API testing

*CI/CD:*

- GitHub Actions for continuous integration

*Version Control:*

- Git

*Other Tools:*

- Prettier for code formatting


## Installation

Follow these steps to set up and run the frontend and backend of the project.

### Frontend Installation

1. *Clone the Repository*

   First, clone the repository to your local machine:

   bash
   git clone https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinc
   

2. *Open the Folder*

   Navigate to the project directory:

   bash
   cd khaleha-ala-alah-Clinc
   

3. *Install Frontend Dependencies*

   Change to the frontend directory and install the necessary dependencies:

   bash
   cd react-app
   npm i
   

4. *Start the Frontend*

   Start the frontend application:

   bash
   npm start
   

   This should launch the frontend of your application in your default web browser.

### Backend Installation

1. *Install Backend Dependencies*

   Navigate to the backend directory from the root of the project:

   bash
   cd server
   npm i
   

2. *Start the Backend Server*

   Start the backend server in development mode:

   bash
   npm run start:dev
   

   The backend server should now be running and listening for requests.



first we have this home page that is rendered when the app starts 




## Screenshots

![App Screenshot](https://drive.google.com/uc?id=1CBjkvhprH4C9PH24iuQLh9kpgnKy2xJX)

here we have the login page where all the users can log in (doctors , admins , patients) 

 REGISTER AS PATIENT 

 REGISTER AS DOCTOR 

 FORGOT PASSWORD

 let's discuss each page 

 REGISTER AS PATIENT

 ![App Screenshot](https://drive.google.com/uc?id=115A7HBgzFrMH-_L0Xr7NuWmVtSqgLbpT)

the patient enter all the details and the cliclk on register 

he will be redirected to the verfiy user using the OTP sent to the mail 


 ![App Screenshot](https://drive.google.com/uc?id=1YPd65Uj4gVTCAYt_M2ptHvzvF2rE3pyV)


After entering the number the patient will be directed to the home page 


 ![App Screenshot](https://drive.google.com/uc?id=1IonT7z89cQN4OGNoqSy9m9_NSDZpHAL2)

  ![App Screenshot](https://drive.google.com/uc?id=1b1e7AIWtuhhMLJwW_vbJJr4VGZZs96VO)

clicking on the logout will redirect the user to the login page 

  ![App Screenshot](https://drive.google.com/uc?id=1H3O5gY0ntnHtuOfhtjC1wjU0XY3JwOur)

  now we can enter our username and password and we will be directed back to the home page 







## API Reference

#### Get all items

```http
  POST /users/register
```
#### this will register a user regarding his role

```http
  POST  /users/login
```

#### this will login a user regarding his role and will generate a token for the user 

 ![App Screenshot](https://drive.google.com/uc?id=13BBSB6HmyugchoSAO1QbtOzs_6U3Jp1y)

 now lets move to the doctor registeration 

REGISTER AS DOCTOR 

in this page the doctor enters all the details and then click view contract and will agree to it and then click register 


```http
  POST /users/register
```
#### this will register a user regarding his role


 ![App Screenshot](https://drive.google.com/uc?id=1Se2Io6XAYbeG9nFeKn3lio6xotdCX60e)

  ![App Screenshot](https://drive.google.com/uc?id=11tfd8WNNxxBoaon9cpD9lU0kgTEct7rx)


the user will be redirected to verify OTP 

 ![App Screenshot](https://drive.google.com/uc?id=1YPd65Uj4gVTCAYt_M2ptHvzvF2rE3pyV)

the doctor will be redirected to this page after entering the OTP . Doctors will remain not approved till the admin approves them 

 ![App Screenshot](https://drive.google.com/uc?id=1RLpiXTBO52OG8GOnnSlbgRzrhNGyi5tx)

lets try to login as admin and approve the doctor 

in admin home we will click on view pending doctors 


 ![App Screenshot](https://drive.google.com/uc?id=1IUkc1xpUl_nHRwUXEwfiy2bolzrXg4Ep)

 we will be directed to the pending doctors and admin can view the uploaded files and accept the doctor 


 ![App Screenshot](https://drive.google.com/uc?id=1JuoYuEltqrXlvFsREmHm6Ml222iUpnRq)



now lets register with an approved doctor the doctor will be redirected to the doctor home page. 

\\home page doctor 1

```http
  POST  /users/login
```

#### this will login a user regarding his role and will generate a token for the user 


 ![App Screenshot](https://drive.google.com/uc?id=1eRSTgZKYh2U5RBOFB_xBN_xq43zXl7Ut)


in this screenshoot you have many options to choose from in the navigation bar the home will render u to the home page if u went to another one.

The view patients will render u to this page which have all of ur patients with their details and u have different options 

 ![App Screenshot](https://drive.google.com/uc?id=1Ou5iwFpjcOoItLK3ni9m1Gic-7A5tgn8)

the first option is manage health records where u can add a file to health records of the selected patient

 ![App Screenshot](https://drive.google.com/uc?id=1sVItwjiyqtyYPH0LtbJUqpjrLRFr5B7J)
the second option is schedule a followup where u can choose between different dates and timings then u click on schedule a follow up so that the choosen date can be scheduled 


 ![App Screenshot](https://drive.google.com/uc?id=1IL_LDmyhqRZJTGP_YcFZ2CskBJVVrpfv)

the third option is viewing the given prescription for that patient before with their dosage and the prescribed dates and u have the option to edit the given prescriptions download it or open it in a pdf format 

 ![App Screenshot](https://drive.google.com/uc?id=11rbVjxAAOe1UPqQkIilA_LUMtmmZ6re9)
the fourth and last option is to add prescription for the patient
u add it bychoosing the medecine and prescripping a specific dosage 


 ![App Screenshot](https://drive.google.com/uc?id=1crYP2xel60dz6Wougvi2RZhOkdLCty-T)

the view appiontements will render u to this page that contains all the appiontements with the logged in dr with all the details of the appiontements


 ![App Screenshot](https://drive.google.com/uc?id=1_XU__xNw3l19ytfoLn6IfUjvMdPqyvvx)



also u can filter the appiontements according to different options and then u click on filtrer so what will appear are the only appiontements that satisfy this condition 


 ![App Screenshot](https://drive.google.com/uc?id=1RkxvCrdq56BxxXHPzIJ7L_nz8Nt0sr8W)
 
u have another chioce to filter the appiontments according tp the dates u choose the start date and the end date and click on the filter button the appiontements that will appear are the ones whthin that time interval
 
 ![App Screenshot](https://drive.google.com/uc?id=1EP-1JQBEIkR1yDWHhuySs04cH8j8goI9)

the chat in the navigation bar will render u to this page which contains the different patients u can chat with 

 ![App Screenshot](https://drive.google.com/uc?id=1XF6EzPFDsVAXDpTFTjVIyDfojH3-KS3j)

when u choose a patient u will be rendered to this page which will contains the chat with the choosen patient


 ![App Screenshot](https://drive.google.com/uc?id=1DV4zyn72P3WAj7AreOR0h8JKGMBbVXss)



at the top left of any page u have a notification button when u click on it it veiws a number of different notifications



 ![App Screenshot](https://drive.google.com/uc?id=1z-GYZtVKP-Bq17k0Zlb383gZpltnJxoq)



and when u click on them u can view every one details 

//screen shoot not taken l mafrod fl URL /notification bs mesh zabet m3ya 

also u have a setting button when clicked it view these different opyions to choose from 

 
 ![App Screenshot](https://drive.google.com/uc?id=1i4gkjXDIJRQWpjuk-cOoFEkCYectZJIM)
when u choose edit profile u are rendered to this page in whcich u can add all the info u want to edit,then u click on update profile so all the written info will be updated 


 ![App Screenshot](https://drive.google.com/uc?id=1uY0JTrIaQEC-8yWbEUnMwOdgCPca-pgm)

when u click on user profile u will be rendered to this page which contains all the info about the logged in dr 

 ![App Screenshot](https://drive.google.com/uc?id=12L7UAiyoSivejezyZsiTnNjedlGe0UB4)

when u click on change password u will be rendered to this page where u have to enter the doctors current password and the new password the click on update password so thepassword will be updates 


 ![App Screenshot](https://drive.google.com/uc?id=1_LMHZlCuxk2AGLN16_IZ6UEwchIwswJ3)

the last option which is the log out will render u to the main login page 

Now when we login with the patient credintials u will be rendered to this page which is the patient home page 


 ![App Screenshot](https://drive.google.com/uc?id=1Cy8C375tOolq7RJt2ArdremWCZgQSwOM)


in this page's navigationbar u will have all different services u will be offered as a patient;the first one is family members u will choose between two opyions in this drop down list 

//drop down family memebers patient on phone 

when u choose the first option which is view family memebers u will be rendered to this page which will contain all the added family members with their details 


 ![App Screenshot](https://drive.google.com/uc?id=10QtmZwxMyp3kdd0-WYHQQTLzoVs-sJvu)


and when u click on add fmily member u will be directed to this page where u can choose between different ways u can add him/her 
with it 

 ![App Screenshot](https://drive.google.com/uc?id=1NFVPNjBNtGmPi94JarHWBoXSdqJpPY-3)


the first option is using the national ID and when u add a family member using ID this member should not be an already existing patient,and u enter the required details then click on add member to be added 

 ![App Screenshot](https://drive.google.com/uc?id=1G0llNevxAAIxlZojWEQ0au4t53Lj3uGp)

the second and third options are using mail or using  a phone number if u used any the added family must be an already existing patient and u will be linked to him/her;u will need to enter the email or phone no with the type of the relation with this member 
then click on add member to be added 

//add family mem patient phone

 ![App Screenshot](https://drive.google.com/uc?id=1XWhq5jwZOZtbLy7VZsXhynMQqunXWfOX)

the second chioce in the nav bar is appiontements when u click on it u can view all ur scheduled appiontements where all of their details will appear


 ![App Screenshot](https://drive.google.com/uc?id=1g9r3UKaJpqrTXT2bL22MPJFS16hlBTpn)

also u can filter the appiontements according to different options and then u click on filtrer so what will appear are the only appiontements that satisfy this condition 


  ![App Screenshot](https://drive.google.com/uc?id=11D315IuKQL7fOWdCyX-923531wvTGaVa)


u have another chioce to filter the appiontments according tp the dates u choose the start date and the end date and click on the filter button the appiontements that will appear are the ones whthin that time interval
 

  ![App Screenshot](https://drive.google.com/uc?id=11D315IuKQL7fOWdCyX-923531wvTGaVa)

the third option in the nav bar is packages which have two different options to choose between them appeared as a drop down list 

//on phone drop down patient packages

the first chioce is manage ur package when u click on it it will renderu to this page where u can subscribe to new packages and when u click subscribe u will need to pay using a card and u will enter all the card details that will be needed to make the payment sucessful 


  ![App Screenshot](https://drive.google.com/uc?id=1_Xz54BnsaIJzltvTEJVL14DEQr1ovKJn)
    ![App Screenshot](https://drive.google.com/uc?id=1nbu-rmpFwtHSpYSXezNth9NK0CyAkpuf)
      ![App Screenshot](https://drive.google.com/uc?id=1AFQ_aCgEcRfdHh6SreEDeV0jLX67P9-k)


the second one is manage ur family member packages when u click on it it renders u to this page where u will be viewed all the family packages that u have with all the details about the member whom u share the package with

//family member package patient

when u click on a row it will render u to this page which includes all the details about the package and if u want to unsubscribe to it and if u choose to unsubscribe the status of it will be changed to ended 

//family member package details patient

the option prescription in the nave bar when clicked will redirect you to this page which will contain all the precriptions 
and all of its details 

//prescription patient 

and u have the option to filter ur appiontements using different parameters as the date os issuance and/or doc name ,status

//prescription patient filter

the view all dr option will redirect u to this page whcich contains all the availabledrs with all of their info 

//view drs pateint 

and u will also have the option to search about the drs by name 
and u can filter the drs by speciality and/or differentdates and timings 

//view all drs filter patient

the chat in the navigation bar will render u to this page which contains the different doctors u can chat with 

//chat rendering page patient

when u choose a doctor u will be rendered to this page which will contains the chat with the choosen doctor

//chat with a specific doctor

at the top left of any page u have a notification button when u click on it it veiws a number of different notifications

  ![App Screenshot](https://drive.google.com/uc?id=1z-GYZtVKP-Bq17k0Zlb383gZpltnJxoq)

and when u click on them u can view every one details 

//screen shoot not taken l mafrod fl URL /notification bs mesh zabet m3ya 

also u have a setting button when clicked it view these different options to choose from 


  ![App Screenshot](https://drive.google.com/uc?id=1i4gkjXDIJRQWpjuk-cOoFEkCYectZJIM)

when u choose edit profile u are rendered to this page in whcich u can add all the info u want to edit,then u click on update profile so all the written info will be updated 

  ![App Screenshot](https://drive.google.com/uc?id=1oKLYzUUk9UyQfWbLP_H3IiOiPKZQCDoK)


when u click on user profile u will be rendered to this page which contains all the info about the logged in dr 

  ![App Screenshot](https://drive.google.com/uc?id=12L7UAiyoSivejezyZsiTnNjedlGe0UB4)

when u click on change password u will be rendered to this page where u have to enter the doctors current password and the new password the click on update password so thepassword will be updates 


  ![App Screenshot](https://drive.google.com/uc?id=1_LMHZlCuxk2AGLN16_IZ6UEwchIwswJ3)

the last option which is the log out will render u to the main login page 












