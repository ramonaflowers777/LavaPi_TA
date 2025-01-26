# Test Cases for Login Functionality

## 1. Valid Logins
| Test Case ID | Test Description                            | Steps                                                                                       | Expected Result                    |
|--------------|--------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------|
| TC001        | Login with valid email and password         | 1. Navigate to login page<br>2. Enter valid email and password<br>3. Click login button    | User is redirected to the homepage |
| TC002        | Keep signed in with valid credentials       | 1. Check "Keep signed in" checkbox<br>2. Enter valid credentials<br>3. Close and reopen browser<br>4. Verify session persists | User remains logged in             |

## 2. Invalid Logins
| Test Case ID | Test Description                             | Steps                                                                                       | Expected Result                          |
|--------------|---------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------|
| TC003        | Login with empty email and password fields  | 1. Navigate to login page<br>2. Leave email and password blank<br>3. Click login button    | Error messages displayed for both fields |
| TC004        | Login with incorrect password format        | 1. Enter valid email<br>2. Enter password "123"<br>3. Click login button                   | Error message: "Incorrect password."     |
