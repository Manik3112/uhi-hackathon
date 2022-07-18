# uhi-hackathon
This is the Repo Created for UHI-hackathon

#### @Definition<br>
function extractTextFromBase64() 
> This function takes base64 as an input and extract all the text from the PDF.


#### @Definition<br>
function getDocumentType()
> This function takes extracted text paragrah as an input <string> and matches few specific keywords to check is it a Medical Prescription or a Record.
 
#### @Definition<br>
function getDateFromPdf()
> This function takes extracted text paragrah as an input <string> and matches Date format from the text.
  
#### @Definition<br>
function getSymptomsFromPdf()
> This function takes extracted text paragrah as an input <string> and matches each keyword to our realtime database of symptoms _which gets updated with each prescription generated_ and return the symptoms if matched.

  
#### @Definition<br>
function getDiagnosisFromPdf()
> This function takes extracted text paragrah as an input <string> and matches each keyword to our realtime database of Diagnosis _which gets updated with each prescription generated_ and return the Diagnosis if matched.
  
  
#### @Definition<br>
function getMedicationFromPdf()
> This function takes extracted text paragrah as an input <string> and matches each keyword to our realtime database of Medication _which gets updated with each prescription generated_ and return the Medication if matched.
  

## Appointment/Emr/Document Postman Collection
***https://www.getpostman.com/collections/4d7042bba49902a70106***
  
## Symtomps Postman Collection
***https://www.getpostman.com/collections/8aad7865ab2628bfce3f***

## Code/Folder Structure Followed.
Code in Typescript and ExpressJs
> We have followed a Hybrid folder structure in which all the Modules are imported in _**frame**_ Folder, so if we need to upgrade or change the framework used, we don't need to change anything in the **_core_** Folder.
> All the framework or 3rd party npm packages are first imported to _**frame**_ folder and then converted and exported to **_core_** Folder so that no dependcies are there on the actual logic and database calls.

### NOTE
> Only Default Mongo function like find, findOne, Update are used directly from the **_core_** folder and not through **_frame_** folder but Database initialize still happens with **_frame_** folder
