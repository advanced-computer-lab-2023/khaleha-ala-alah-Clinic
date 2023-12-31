# Khaleeha Ala Allah Clinic Management System

The Khaleeha Ala Allah Clinic Management System is an integrated web application meticulously crafted to optimize clinic operations, catering to the needs of administrators, patients, and doctors. This project is dedicated to elevating the standard of healthcare management by facilitating efficient patient care, streamlining appointment scheduling, and enhancing medical record keeping.

# Motivation 

The genesis of the Khaleeha Ala Allah Clinic Management System was driven by the imperative to transform and optimize the functionality of clinical operations. In the swiftly evolving realm of healthcare, the necessity for an integrated and fluid platform is paramount, catering to the needs of healthcare providers and patients alike.

We identified the myriad of challenges confronted by administrators, patients, and doctors in efficiently orchestrating clinical activities. The objective of this project is to surmount these obstacles by introducing a centralized, user-friendly system that simplifies procedures, bolsters communication, and, in turn, elevates the overall clinical experience.

With the development of the Khaleeha Ala Allah platform, we endeavor to play a pivotal role in the advancement of clinic management. This initiative is geared towards empowering medical professionals and ensuring that patients receive exemplary care. Our dedication is centered on crafting a solution that not only addresses current demands but also proactively adapts to the future developments in the constantly progressing healthcare sector.

# Build Status

In the iterative and dynamic process of software development, encountering bugs is as certain as the code itself. No matter how rigorous the development cycle, some issues often surface as a natural byproduct of innovation and complexity. This project, while meticulously crafted, is no exception. In our commitment to transparency and continuous improvement, we acknowledge these challenges openly.

Below, we document known issues that have emerged in our build process. This candid disclosure serves not only as an informational resource for users and contributors but also as a roadmap for future enhancements. Each listed bug is a milestone on our journey towards refinement, and with each update, we aim to resolve these issues, enhancing the robustness and reliability of our system.

By sharing our current build status, including any identified bugs, we invite our community to contribute to the project’s progress. Whether through problem-solving, submitting patches, or offering workaround strategies, every contribution is a valuable step towards collective growth.

Let's navigate these challenges together, and in doing so, elevate the quality of the Khaleeha Ala Allah Clinic Management System to new heights.

**1- Slow Loading of Follow-Up Scheduler**

We've observed that the Follow-Up Scheduler feature is experiencing longer than expected load times. This issue is currently under investigation by our development team. The performance lag may affect the user experience by causing delays when trying to schedule follow-up appointments. We are prioritizing this issue to identify the root cause—be it server-side processing, database queries, or frontend rendering—and implement the appropriate optimizations. Our goal is to resolve this promptly to restore the scheduler's responsiveness and maintain the smooth operation of the clinic management system. We appreciate your patience and understanding as we work to enhance system performance.

**2-Navigation Loop Between Payment and Package Selection Pages**

We have detected a navigation flaw within the system that causes an infinite loop between the payment page and the package selection page. Users experiencing this issue report that after selecting a package and proceeding to the payment page, pressing the back button does not return them to the expected previous state. Instead, it leads back to the payment page, creating a loop between these two pages.

This looping behavior suggests a problem with the navigation stack or the state management in our web application. It is likely that the 'back' action is being incorrectly handled, causing the application to revert to an unintended state.

Our development team is delving into this with high urgency to correct the state transitions and ensure that the 'back' navigation functions as intended, taking the user to the logically previous page without unexpected redirects. We are examining both client-side routing and server-side session management to diagnose and address the root cause.

We understand the frustration that such an issue can cause and are taking immediate steps to resolve it. In the interim, we recommend that users avoid using the browser's back button on the payment and package selection pages and instead utilize the in-app navigation controls provided.

Your patience and cooperation are greatly appreciated while we implement a permanent fix to enhance the system's navigational integrity.

**3- Prescription State Not Updating**

We have identified a persistent issue within our platform regarding the state management of prescriptions. Users are encountering a scenario where, regardless of the action taken — whether choosing to 'Buy Now' or deciding not to proceed with the purchase — the prescription's state does not update to reflect the action. This can lead to confusion as the interface fails to indicate the current status of the prescription, which is essential for tracking the progress of patient care and medication dispensing.

This issue points towards a potential flaw in our state handling logic or a breakdown in the communication between the client interface and the server. It's possible that the event meant to trigger the state change is not being captured correctly or that the response from the server does not correctly alter the prescription's status in the user's session.

Our development team is delving into the system's state management functionality to diagnose and remedy this critical flaw. Ensuring that prescription states transition appropriately in response to user actions is vital for the integrity and reliability of the pharmacy management process.

We are prioritizing a fix for this issue to provide accurate real-time feedback within the user interface, thereby improving the accuracy of the information displayed. We understand the importance of this functionality for our users and are working diligently to implement a solution.

We appreciate the patience and understanding of our users as we work to resolve this issue and apologize for any inconvenience caused. We are dedicated to providing a seamless and trustworthy experience within our pharmacy management system.


# Code Style

To maintain the quality and readability of our code, we adhere to a set of coding standards and style guidelines. Our code style choices are designed to ensure consistency across the project and to make our code as intuitive and accessible as possible to new contributors.

### Key Guidelines:

- **Indentation**: We use spaces for indentation and maintain a consistent level of indentation throughout our codebase. For most of our files, we use 2-space indentation.

- **Naming Conventions**: Variable and function names follow camelCase notation. For constants, we use UPPER_SNAKE_CASE. Class names are written in PascalCase.

- **Comments and Documentation**: Code is adequately commented to explain complex logic or decisions. Comments are concise and relevant. We also use JSDoc (or relevant documentation tool) for function and class documentation.

- **Code Linting**: We use [ESLint](https://eslint.org/) for JavaScript linting to ensure our code meets the best practices and standards.

- **Code Formatting**: [Prettier](https://prettier.io/) is used for code formatting.

- **Testing Conventions**: Tests are written for new features and bug fixes. We aim for high test coverage and meaningful test cases.

- **Pull Request Process**: All code changes are submitted through pull requests. PRs require review and approval from the team before merging.

We appreciate your adherence to these guidelines, as it helps to keep our codebase clean, organized, and accessible to everyone!

# Screenshots

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


 now lets move to the doctor registeration 

REGISTER AS DOCTOR 

in this page the doctor enters all the details and then click view contract and will agree to it and then click register 


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


#### this will login a user regarding his role and will generate a token for the user 


 ![App Screenshot](https://drive.google.com/uc?id=1eRSTgZKYh2U5RBOFB_xBN_xq43zXl7Ut)


in this screenshoot you have many options to choose from in the navigation bar the home will render you to the home page if you went to another one.

The view patients will render you to this page which have all of your patients with their details and you have different options 

 ![App Screenshot](https://drive.google.com/uc?id=1Ou5iwFpjcOoItLK3ni9m1Gic-7A5tgn8)

the first option is manage health records where you can add a file to health records of the selected patient

 ![App Screenshot](https://drive.google.com/uc?id=1sVItwjiyqtyYPH0LtbJUqpjrLRFr5B7J)
the second option is schedule a followup where you can choose between different dates and timings then you click on schedule a follow up so that the choosen date can be scheduled 


 ![App Screenshot](https://drive.google.com/uc?id=1IL_LDmyhqRZJTGP_YcFZ2CskBJVVrpfv)

the third option is viewing the given prescription for that patient before with their dosage and the prescribed dates and you have the option to edit the given prescriptions download it or open it in a pdf format 

 ![App Screenshot](https://drive.google.com/uc?id=11rbVjxAAOe1UPqQkIilA_LUMtmmZ6re9)
the fourth and last option is to add prescription for the patient
you add it bychoosing the medecine and prescripping a specific dosage 


 ![App Screenshot](https://drive.google.com/uc?id=1crYP2xel60dz6Wougvi2RZhOkdLCty-T)

the view appiontements will render you to this page that contains all the appiontements with the logged in doctor with all the details of the appiontements


 ![App Screenshot](https://drive.google.com/uc?id=1_XU__xNw3l19ytfoLn6IfUjvMdPqyvvx)



also you can filter the appiontements according to different options and then you click on filtrer so what will appear are the only appiontements that satisfy this condition 


 ![App Screenshot](https://drive.google.com/uc?id=1RkxvCrdq56BxxXHPzIJ7L_nz8Nt0sr8W)
 
you have another chioce to filter the appiontments according tp the dates you choose the start date and the end date and click on the filter button the appiontements that will appear are the ones whthin that time interval
 
 ![App Screenshot](https://drive.google.com/uc?id=1EP-1JQBEIkR1yDWHhuySs04cH8j8goI9)

the chat in the navigation bar will render you to this page which contains the different patients you can chat with 

 ![App Screenshot](https://drive.google.com/uc?id=1XF6EzPFDsVAXDpTFTjVIyDfojH3-KS3j)

when you choose a patient you will be rendered to this page which will contains the chat with the choosen patient


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

# Tech/Framework Used

**Frontend:**

- React.js

- MUI

- Ant Design

- CSS for styling

**Backend:**

- Node.js with Express framework

- MongoDB for database

**Authentication:**

- JSON Web Tokens (JWT)

**Testing:**

- Postman for API testing

**CI/CD:**

- GitHub Actions for continuous integration

**Version Control:**

- Git

**Other Tools:**

- Prettier for code formatting

# Features

**Features for Doctors:**

-Patient Records Access: View and update patient medical records, including history, medications, allergies, and test results.

-Appointment Management: Schedule, view, and manage patient appointments.

-Prescription Management: Create, renew, and manage prescriptions for patients.

-Diagnostic Reporting: Record and access diagnostic reports and test results.

-Treatment Plans: Develop and monitor treatment plans for patients.

-Communication Tools: Communicate with patients and other healthcare providers through secure messaging or notifications.

-Alerts and Reminders: Receive reminders for patient follow-ups, appointments, and treatment milestones.

-Data Analysis and Reporting: Access to analytics for patient outcomes, clinic performance, and other relevant metrics.

**Features for Admins:**

-User Management: Manage user accounts for staff, doctors, and patients, including access controls and permissions.

-Appointment Scheduling: Oversee and manage the scheduling of all appointments.

-Inventory Management: Track and manage medical supplies and inventory.

-Financial Management: Handle billing, invoicing, insurance claims, and financial reporting.

-Compliance and Reporting: Ensure the clinic is compliant with healthcare regulations and standards; generate required reports.

-Facility Management: Oversee clinic facilities, including maintenance schedules and usage.

-Staff Scheduling and Payroll: Manage schedules for all staff and handle payroll processing.

-Data Security and Backup: Ensure the security of clinic data and manage backups.

**Features for Patients:**

-Appointment Booking: Schedule, reschedule, or cancel appointments online.

-Medical Records Access: View their personal medical records, including treatment history and test results.

-Prescription Access and Renewal: View prescriptions and request renewals online.

-Communication with Doctors: Secure messaging or chat features to consult with doctors.

-Treatment Plans and Follow-ups: Access treatment plans and follow-up schedules.

-Billing and Payments: View and pay bills online, access insurance information.

-Health Tips and Information: Access to educational materials, health tips, and clinic updates.

-Feedback and Surveys: Provide feedback on their healthcare experience.

 # Code Examples

**Example 1 (Add Prescription):**

```javascript
exports.addPrescription = async function (req, res) {
  try {
    const { patient, medications } = req.body;
    const doctor = await Doctor.findOne({ userID: req.user._id });
    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "..",
      "utilities",
      "prescription-template.html"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
    // Create a Handlebars template function
    const templateFunction = handlebars.compile(htmlTemplate);
    // Replace placeholders with actual data
    const filledTemplate = templateFunction({
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      doctorAffiliation: doctor.affiliation,
      doctorSpeciality: doctor.speciality,

      patientName: patient.name,
      patientGender: patient.gender,
      patientDateOfBirth: moment(patient.dateOfBirth).format("DD/MM/YYYY"),

      issuedDate: new Date().toLocaleDateString("en-US", {}),

      medicationsList: medications,
    });
    // Options for pdf creation
    const pdfOptions = {
      format: "Letter",
    };
    // Convert HTML to PDF
    pdf.create(filledTemplate, pdfOptions).toBuffer(async (err, pdfBuffer) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      } else {
        // Create a write stream for GridFS
        const writeStream = gfs.openUploadStream("prescription.pdf", {
          contentType: "application/pdf",
        });

        writeStream.on("finish", () => {
          console.log("File uploaded to GridFS");
        });

        // Pipe the PDF buffer to the write stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(pdfBuffer);
        await bufferStream.pipe(writeStream);

        // Save the prescription to the database
        const prescription = new Prescription({
          doctorID: req.user._id,
          patientID: patient.userID,
          medications,
          pdfFileID: writeStream.id,
        });
        await prescription.save();

        // Set the response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "inline; filename=prescription.pdf"
        );

        // Send the PDF buffer as the response
        res.status(200).send(pdfBuffer);
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

```
**Example 2 (View Patient Prescription):**

```javascript
exports.viewPatientPrescriptions = async function (req, res) {
  try {
    const { patient } = req.body;
    const doctorID = req.user._id;
    const prescriptions = await Prescription.find({
      doctorID,
      patientID: patient.userID,
    });
    const prescriptionsWithFiles = await Promise.all(
      prescriptions.map(async (prescription) => {
        if (prescription.pdfFileID) {
          const file = await gfs
            .find({ _id: prescription.pdfFileID })
            .toArray();
          const fileStream = gfs.openDownloadStream(prescription.pdfFileID);
          const chunks = [];
          return new Promise((resolve, reject) => {
            fileStream.on("data", (chunk) => {
              chunks.push(chunk);
            });
            fileStream.on("end", () => {
              const fileData = Buffer.concat(chunks);
              resolve({ ...prescription.toObject(), fileData });
            });
            fileStream.on("error", (error) => {
              reject(error);
            });
          });
        } else {
          return prescription.toObject();
        }
      })
    );
    res.status(200).json({ prescriptions: prescriptionsWithFiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

```

# Installation

Follow these steps to set up and run the frontend and backend of the project.

 **Frontend Installation**

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinic
   ```

2. **Open the Folder**

   Navigate to the project directory:

   ```bash
   cd khaleha-ala-alah-Clinic
   ```

3. **Install Frontend Dependencies**

   Change to the frontend directory and install the necessary dependencies:

   ```bash
   cd react-app
   npm i
   ```

 **Backend Installation**

1. **Install Backend Dependencies**

   Navigate to the backend directory from the root of the project:

   ```bash
   cd server
   npm i
   ```


   # How to Use

In this section, you'll find step-by-step instructions on how to use and configure the project using the provided environment variables.

 **Prerequisites**

Before you begin, make sure you have the following prerequisites:

- [Node.js](https://nodejs.org/): Ensure you have Node.js installed to run the project.
- [React](https://reactjs.org/): Ensure you have React installed to run the project.

Create an .env file in the root of the project and add the following environment variables:

```bash
NODE_ENV=development
PORT=4002
DATABASE=mongodb+srv://magdy_hussien:<DATABASE_PASSWORD>@cluster0.vftrsrv.mongodb.net/el7a2ni
USERNAME=magdy
DATABASE_PASSWORD=Mm123456
JWT_SECRET=Khleeha-Ala-Allah

```
**Start the Frontend**

   Start the frontend application:

   ```bash
   npm start
   ```

   This should launch the frontend of your application in your default web browser.


 **Start the Backend Server**

   Start the backend server in development mode:

   ```bash
   npm run start:dev
   ```

   The backend server should now be running and listening for requests.

# API Refrences

This section provides a detailed overview of the available API endpoints for our application. The API is structured around REST principles, delivering access to resources such as messages, conversations, admins, patients, doctors, and other entities. Authentication is required for most endpoints, ensuring secure access and operations.

**Authentication**

POST /login: User login

POST /validateToken: Validate user token

POST /verifyUser: Verify user account

POST /changePassword: Change user password (Authenticated)

POST /forgotPassword: User forgot password

POST /resetPassword: Reset user password

**User Management**

POST /register: Register a new user

GET /getUsers: Get all users (Authenticated)

GET /getUserID: Get user ID (Authenticated)

**Admin Management**

GET /getCurrentAdmin: getCurrentUserAdmin(Authenticated)

GET /pendingDoctors:viewPendingDoctors

GET /getPending: getPendingDoctors

POST /approveOrRejectDoctor:approveDoctor (Authenticated)

GET / : getAllAdmins

POST /  :addAdmin

DELETE / :delAdminDoctorPatient

**Patient Management**

PUT /wallet-amount-update :updateWalletValue  (Authenticated)

POST /save-stripe-token:payForPackage (Authenticated)

GET /patientdoctors:getPatientDoctors  (Authenticated)

GET /mydoctors:getMyDoctors    (Authenticated)

PATCH /add-family-members:addFamilyMembers   (Authenticated),

GET /currentPatient:getCurrentPatient  (Authenticated)

GET /getAppointments:getAppointments (Authenticated)

GET /persecriptions:getPatientPrescribtions     (Authenticated)

PATCH /subscribeToPackage:subscribeToPackage  (Authenticated)

PATCH /subscribeForFamilyMember:subscribeForFamilyMember (Authenticated)

GET /getFamilyMembersPatients:getFamilyMemberPatients (Authenticated)

PATCH /unsubscribeFromPackage:cancelHealthPackage  (Authenticated)

PATCH /unsubscribeFromFamilyMember :cancelFamilyMemberPackage  (Authenticated)

GET /viewCurrentHealthPackage:viewCurrentHealthPackage    (Authenticated)

GET /viewFamilyMemberHealthPackages:viewFamilyMemberHealthPackages (Authenticated)

PATCH /addFamilyMemberUsingEmail (Authenticated)

PATCH /addFamilyMemberUsingMobileNumber (Authenticated)

GET /getHealthCareDetails:getHealthCareDetails   (Authenticated)

GET /getHealthCareDetailsForFamilyMember  (Authenticated)

GET /:id :getPatients

GET /getDoctorApp/:id : GetDoctorAppointments

GET /doctorAppointments/:doctorID:.viewDoctorAppointmentsForMonth (Authenticated)

POST /SelectAppointment/:doctorID/:selectedDateTime : .SelectAppointmentPatient (Authenticated)

POST / SelectAppointmentFamilyMember/:doctorID/:selectedDateTime/:FamilyMember:SelectAppointmentFamilyMember (Authenticated)

PATCH /rescheduleAppointment/:appointmentID/:newDateTime:rescheduleAppointment (Authenticated)

PATCH /rescheduleFamilyMemberAppointment/:appointmentID/:newDateTime/:familyMemberID:.rescheduleFamilyMemberAppointment (Authenticated)

GET /viewPrescriptions:viewPrescriptions (Authenticated)

PATCH /cancelAppointment/:appointmentID" (Authenticated)

POST /followUpRequest:followUpRequestAppointment  (Authenticated)

**Doctor Management**

GET /:getAppointmentsPatients   (Authenticated)

GET /appointments:getAppointments   (Authenticated)

PATCH /addAvaliableSlots:addAvailableSlots  (Authenticated)

POST /scheduleFollowUpPatient/:patientID/:selectedDateTime  
:scheduleFollowUpWithPatients (Authenticated)

POST /addHealthRecord/:username:addNewHealthRecordForPatient
 (Authenticated)
PATCH /update-profile:updateDoctor    (Authenticated)

PATCH /update-email :updateDoctorEmail   (Authenticated)

GET /getPatients: getPatientsByDoctorId     (Authenticated)

GET /allPrescriptions :getAllPrescriptions

GET /:doctorId/:patientId/get-info : getPrescriptionsByDoctorAndPatient

POST /addPrescription: .addPrescription  (Authenticated)

POST /viewPrescriptions:viewPatientPrescriptions (Authenticated)

POST /updatePrescription : .updatePatientPrescriptions (Authenticated)

GET /viewAllDoctors:viewAllDoctors

GET /getCurrDoc :getCurrDoc (Authenticated)

PATCH /rescheduleAppointmentPatient/:appointmentID/:newDateTime :.rescheduleAppointmen
(Authenticated)

PATCH /cancelAppointment/:appointmentID:cancelAppointment  (Authenticated)

PATCH /revokeFollowUpRequest:revokeFollowUpRequest (Authenticated)

PATCH /acceptFollowUpRequest:acceptFollowUpRequest (Authenticated)

**Package Management**

GET / :getAllPackages 

POST /createPackage:addPackage

PUT /updatePackage:updatePackage

DELETE /deletePackage:deletePackage

**Notfication Management**

GET /: getAllNotifications (Authenticated)

POST /:  createNewNotfication (Authenticated)

DELETE /:deleteNotfication  (Authenticated)

**Message Management**

GET /notifications :getMessagesNotifications   (Authenticated)

POST / ,upload.single("file"),: .createMessage 

GET /:conversationId:getM

# Tests

Throughout the development of our API, we extensively utilized Postman for testing and validating our endpoints. Postman, a popular API client, enabled us to efficiently test each API route for functionality, error handling, and response accuracy. This tool proved invaluable in ensuring that our API met the expected standards of performance and reliability. By leveraging Postman’s user-friendly interface and comprehensive testing capabilities, we were able to simulate client requests and fine-tune our API responses, ensuring a robust and dependable service for our users. In the following sections, we will provide some examples of these Postman tests to demonstrate how our API endpoints can be interacted with and tested effectively.

![logintest](https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinic/assets/126784831/34719794-5fb8-4254-a03b-f748751ebfb1)

This test verifies the user authentication process. A POST request is made to the /users/login endpoint with the user's credentials. The test confirms that upon successful authentication, the server responds with a 200 OK status and a JSON object containing a success message, user role, and authentication token.

![packages](https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinic/assets/126784831/adc63a5a-5eae-4e1f-b2ef-53b8ca1950ac)

This test checks the retrieval of all available packages. A GET request is made to the /packages endpoint. The expected outcome is a 200 OK status and a JSON response with an array of package objects, confirming the system can successfully list available packages, including details like name, price, and description.

![createpackages](https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinic/assets/126784831/b9134b56-f505-4453-98f6-63462ebfb28e)

This test demonstrates the API's capability to create a new package. A POST request is sent to the /packages/createPackage endpoint with package details such as name, price, and description, along with discounts applicable to doctors and families. The successful creation of a package is indicated by a 201 Created status and a JSON response containing the new package's details.

![prescriptions](https://github.com/advanced-computer-lab-2023/khaleha-ala-alah-Clinic/assets/126784831/da801815-6eaf-43dc-ae62-51c04c311644)

The purpose of this test is to confirm that the system can retrieve all prescriptions for a doctor. A GET request is sent to the /doctors/allPrescriptions endpoint. The successful execution is indicated by a 200 OK status and a JSON response that lists all prescriptions, including details such as patient ID, doctor ID, medication, and dosage instructions.




# Contribute

We welcome contributions from the community and are pleased to have you join us. If you wish to contribute code and you have not yet done so, please review our contribution guide.

## Quickstart:
 
1- Fork the repository.

2- Clone your fork and create a new branch: git checkout -b my-branch-name.

3- Make your changes, test them, and ensure they follow the project's coding standards.

4- Commit your changes with a clear and detailed commit message.

5- Push your changes to your forked repository.

6- Open a pull request to the main branch of the original repository.

7- Provide as much information as possible with the pull request description.



If you need help, don't hesitate to ask questions in the issues section or reach out directly via our contact channels.

Thank you for your contributions!

# Credits
Our gratitude extends to the following resources and communities that have been instrumental in the development of our project:

-MongoDB Documentation: For offering comprehensive guides and references that serve as the cornerstone for designing our database architecture. [MongoDB Manual](https://www.mongodb.com/docs/)

-W3Schools MongoDB Tutorial: For providing an accessible and practical introduction to MongoDB. [W3Schools MongoDB Tutorial](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)

-Node.js Documentation: For detailed documentation and API references that form the backbone of our server-side application logic. [Node.js Documentation](https://nodejs.org/en/docs/)

-React Documentation: For the official tutorials and guides that have enabled us to build dynamic and high-performing user interfaces. [React Documentation](https://reactjs.org/docs/getting-started.html)

-Ant Design Documentation: For a rich set of React UI components that have enhanced the aesthetic and functional aspects of our application. [Ant Design](https://ant.design/docs/react/introduce)


-MUI Documentation: For their robust React components that have allowed us to implement Google's Material Design in our project seamlessly. [MUI Documentation](https://mui.com/getting-started/installation/)

-Postman Documentation: For their collaborative platform and educational resources that have streamlined our API testing processes. [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)

-GitHub Docs: For their version control platform and guides that have facilitated our collaborative development efforts. [GitHub Docs](https://docs.github.com/)

Each of these resources has played a pivotal role in our project's success, and we wholeheartedly recommend them to any aspiring or established developers looking to delve into full-stack development.


# License 

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) and [MIT License](https://opensource.org/licenses/MIT).







