
## Playwright Login Functionality Test Suite

## Overview

This project is a test suite for validating the login functionality of a web application. The suite includes both valid and invalid test cases, using Playwright with TypeScript and Page Object Model (POM) for better maintainability and scalability.

## Features
- **Page Object Model(POM)**: The LoginPage class encapsulates all login page interactions, making the tests more maintainable.
- **Typescript**: Adds type safety and improves code maintainability.
- **Valid Login**: Tests for successful login using valid credentials, as well as, testing "Keep me signed in" functionality and handling email addresses in a case-insensitive manner.
- **Invalid Login**: Tests for handling various invalid login scenarios such as empty fields, incorrect email format, invalid password formats, unregistered users.
- **Error Handling**: Proper validation of error messages for each failure scenario.
- **Parallel Test Execution**: Tests are designed to run in parallel, significantly reducing execution time.
- **Authentication Once Per Worker**: Each worker authenticates once and reuses the authenticated state across tests, improving performance and isolation.

- **Code Structure**: 
  - pages/login.page.ts: Page Object Model for login functionality.
  - data/testdata.ts: Contains test data for login functionality.
  - data/type.ts: TypeScript interface for user data.
  - playwright/fixtures.ts: Playwright fixtures for managing authentication across tests.

## Test Data
The test data is stored in `loginData.json` and follows the `UserData` interface defined in `type.ts`. Each test case includes:

- **email**: The email address for the login attempt.
- **password**: The password for the login attempt.
- **expectedResult**: Whether the login should succeed (`success`) or fail (`failure`).
- **errorMessage**: The expected error message for failed login attempts.
- **type**: Additional context for the test case (e.g., "Keep signed in", "Incorrect password format").

### Getting Started

1. **Clone the repository**:
   - git clone "https://github.com/ramonaflowers777/LavaPi_TA"
   - cd LavaPi_TA

2. **Install dependencies**:
   - npm install

3. **Run the tests**:
   - npx playwright test

4. **View the test report**:
   - npx playwright show-report
   

## Findings and Recommendations
During testing, the following observations were made regarding password validation:

### Current Behavior
- The system does not provide specific error messages for password length or complexity validation.
- Instead, it displays a generic error message: `"Incorrect email or password."`

### Impact
- **User Experience**: Users are not informed about the specific requirements for their passwords.

### Recommendations
1. **Client-Side Validation**:
   - Client-side validation to provide immediate feedback on password requirements (e.g., length, complexity).
   - Example: Displaying real-time feedback as the user types their password.

2. **Server-Side Validation**:
   - Displaying specific error messages on the server side if the password does not meet requirements.
   - Example:
     - `"Password must be at least 8 characters long."`
     - `"Password must contain at least one special character and one number."`

---   
## Authentication Once Per Worker

To further enhance the test suite, **authentication once per worker** has been implemented. This approach offers the following benefits:

1. **Performance**: Reduces the overhead of logging in for every test.
2. **Isolation**: Each worker uses a unique account, preventing conflicts between tests.
3. **Reusability**: The authenticated state is reused across all tests in the same worker.

- Since this test suite only covers log in functionality, it is not used, but for further enhancements this approach
is recommended because authenticated state is reused across all tests in the same worker.
---