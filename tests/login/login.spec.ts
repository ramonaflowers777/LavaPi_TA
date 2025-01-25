import {test, expect, Page} from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { testData } from "../../data/testdata";
import { UserData } from "../../data/type";

test.describe('Valid Login tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}: { page: Page}) => {
        loginPage = new LoginPage(page);
        await page.goto('/login');
    });

    const validUsers = testData.filter((user) => user.expectedResult === 'success');
    const invalidUsers = testData.filter((user) => user.expectedResult === 'failure');

    test.describe('Valid Log in Tests', () => {
            validUsers.forEach((user) => {
            test(`Valid login for registered user ${user.email}`, async ({ page }: { page: Page}) => {
                await loginPage.login(user.email, user.password);
                await expect(page).toHaveURL('https://rapidreach-develop.magedge.com/');
            }); 
        })
    })

    test.describe('Invalid Log in Tests', () => {
        invalidUsers.forEach((user) => {
            if(user.type === 'Empty fields') {
                test(`invalid login with empty fields (email: "${user.email}", password: "${user.password}")`, async ({page}: {page: Page}) => {
                    await loginPage.login(user.email, user.password);

                    if(user.email === "") {
                        //type string roa
                        const emptyEmailErrMsg = await loginPage.getErrorMessageByText('Email is required');
                        await expect(emptyEmailErrMsg).toBe(user.errorMessage);
                    }

                    if(user.password === "") {
                        const emptyPassErrMsg = await loginPage.getErrorMessageByText('Password is required')
                        await expect(emptyPassErrMsg).toBe(user.errorMessage);
                    }

                    const isDisabled = await loginPage.isLogInBtnDisabled();
                    await expect(isDisabled).toBeTruthy();
                })};

             if(user.type === 'Incorrect email format') {
                test(`Validation for incorrect email format (email: "${user.email}")`, async ({page}: {page: Page}) => {
                    await loginPage.login(user.email, user.password);

                    const inncorectEmailErrMsg = await loginPage.getErrorMessageByText('Enter valid Email address');
                    console.log(inncorectEmailErrMsg);
                    await expect(inncorectEmailErrMsg).toBe(user.errorMessage);
                    
                    const isDisabled = await loginPage.isLogInBtnDisabled();
                    await expect(isDisabled).toBeTruthy();
            })};

            test(`Invalid Log in with ${user.email} and ${user.password}` , async ({page}: { page: Page }) => {
                await loginPage.login(user.email, user.password);
                
                const errMessage = await loginPage.getMainErrorMessageByText('Incorrect username or password.');
                expect(errMessage).toBe(user.errorMessage);
            });
        })
    })
})