
## Playwright Login Functionality Test Suite

## Overview

The suite includes both valid and invalid test cases, leveraging Playwright, TypeScript, and the Page Object Model (POM).

## Features
- **Page Object Model(POM)**: The LoginPage class encapsulates all login page interactions, making the tests more maintainable.
- **Valid Login**: Tests for successful login using valid credentials, as well as, testing "Keep me signed in" functionality and handling email addresses in a case-insensitive manner.
- **Invalid Login**: Tests for handling various invalid login scenarios such as empty fields, incorrect email format, invalid password formats, unregistered users.
- **Parallel Test Execution**: Tests are designed to run in parallel, significantly reducing execution time.

- **Code Structure**: 
  - pages/login.page.ts: Page Object Model for login functionality.
  - data/testdata.ts: Contains test data for login functionality.
  - data/type.ts: TypeScript interface for user data.
  - playwright/fixtures.ts: Playwright fixtures for managing authentication across tests.

## Cross-Browser Testing

The test suite is configured to run on the following browsers:
- **Chromium** (Chrome)
- **Firefox**
- **WebKit** (Safari)

### Getting Started

1. **Installation**:
```sh
git clone git@github.com:ramonaflowers777/LavaPi_TA.git
```

2. **Install dependencies**:
```sh
cd ./LavaPi_TA
npm install
```

3. **Run the tests**:
```sh
npx playwright test
```

4. **View the test report**:
```sh
npx playwright show-report
```
   
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