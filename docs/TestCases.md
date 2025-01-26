# Test Cases for Login Functionality

## 1. Valid Logins
| Test Case ID | Test Description                            | Steps                                                                                       | Expected Result                    |
|--------------|--------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------|
| TC001        | Login with valid email and password         | 1. Navigate to login page<br>2. Enter valid and registered email and password<br>3. Click sign in button    | User is redirected to the main page |
| TC002        | Use "Keep signed in" functionality with valid credentials       | 1. Check "Keep signed in" checkbox<br>2. Enter valid credentials for registered user<br>3. Close and reopen browser<br>4. Verify session persists | User remains logged in and is on the main page     |
| TC003        | Login with case-insensitive email       | 1.Navigate to the login page<br>2. Enter registered email with different casing(using uppercase and lowercase characteres)<br>3.Enter valid password for registered emailr<br>4. User is redirected to the main page |

## 2. Invalid Logins
| Test Case ID | Test Description                             | Steps                                                                                       | Expected Result                          |
|--------------|---------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------|
| TC004      | Login with registered and valid email and incorrect password  | 1. Navigate to login page<br>2.Enter valid registered email and incorrect password<br>3. Click login button    | Error message:"Incorrect username or password." is displayed |
| TC005      | Login with incorrect email for corrected password   | 1. Enter unregistered email with valid format<br>2. Enter correct password "Gabedava123@"<br>3. Click login button                   | Error message: "Incorrect username or password."     |
| TC006    | Login with unregistered email and password  | 1. Enter unregistered email with valid format<br>2. Enter incorrect password,with valid format   <br>3. Click login button                   | Error message: "Incorrect username or password."     |
| TC007  | Login with empty email and correct password format   | 1. Enter empty email<br>2. Enter correct password format "Somepassword123@"<br>3. Click login button                   | Error message: "Email is required" is displayed     |
| TC008  | Login with valid email format and empty password  | 1. Enter valid email format <br>2. Enter some text in password field<br>4.Clear password input<br>5.Click login button                  | Error message: "Password is required" is displayed     |
| TC009  | Login with incorrect email format and valid password   | 1. Enter email with incorrect format(e.g test@test)<br>2. Enter correct password format "Somepassword123@"<br>3. Click login button                   | Error message: "Enter valid Email address" is displayed  and "Sign in" button is disabled|
| TC010  | Login with incorrect password format and valid email  | 1. Enter password with incorrect format(e.g 123,)<br>2. Enter correct password format "Somepassword123@"<br>3. Click login button                   | Error message: "Enter valid Email address" is displayed  and "Sign in" button is disabled|







