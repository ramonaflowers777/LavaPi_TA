import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { testData } from '../../data/testdata';
import { UserData } from '../../data/type';

test.describe('Valid Login tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}: { page: Page}) => {
        loginPage = new LoginPage(page);
        await page.goto('/login');
    });

    const validUsers: UserData[] = testData.filter((user) => user.expectedResult === 'success');
    const invalidUsers: UserData[] = testData.filter((user) => user.expectedResult === 'failure');

    test.describe('Valid Log in Tests', () => {
            validUsers.forEach((user) => {
                if(!user.type) {
            test(`Valid login for registered user ${user.email}`, async ({ page }: { page: Page}) => {
                await loginPage.login(user.email, user.password);
                await expect(page).toHaveURL('/');
            }); 
        }
        else {
            test(`Validation of Keep signed in functionality with ${user.email} and ${user.password}`, async ({ page }: { page: Page}) => {
                await loginPage.checkKeepSignedIn();
                await loginPage.login(user.email, user.password);
                
                await page.close();

                const newPage: Page = await page.context().newPage();
                newPage.goto('/login');

                await expect(newPage).toHaveURL('https://rapidreach-develop.magedge.com/');
            });
        };
        })
    })

    test.describe('Invalid Log in Tests', () => {
        invalidUsers.forEach((user) => {
            if( user.type === 'Empty fields' ) {
                test(`invalid login with empty fields (email: '${user.email}', password: '${user.password}')`, async () => {
                    await loginPage.login(user.email, user.password);

                    if(user.email === "") {
                        const emptyEmailErrMsg: string | null = await loginPage.getErrorMessageByText('Email is required');
                        expect(emptyEmailErrMsg).toBe(user.errorMessage);
                    }

                    if(user.password === "") {
                        await loginPage.fillAndClearPasswordInput('testpassword');

                        const emptyPassErrMsg: string | null = await loginPage.getErrorMessageByText('Password is required')
                        expect(emptyPassErrMsg).toBe(user.errorMessage);
                    }

                    const isDisabled: boolean | null = await loginPage.isLogInBtnDisabled();
                    expect(isDisabled).toBeTruthy();
                })}

             if( user.type === 'Incorrect email format' ) {
                test(`Validation for incorrect email format (email: '${user.email}')`, async () => {
                    await loginPage.login(user.email, user.password);

                    const inncorectEmailErrMsg: string | null = await loginPage.getErrorMessageByText('Enter valid Email address');
                    expect(inncorectEmailErrMsg).toBe(user.errorMessage);
                    
                    const isDisabled: boolean | null = await loginPage.isLogInBtnDisabled();
                    expect(isDisabled).toBeTruthy();
            })}

            if( !user.type ) { test(`Invalid Log in with ${user.email} and ${user.password}` , async () => {
                await loginPage.login(user.email, user.password);
                
                const errMessage: string | null =  await loginPage.getMainErrorMessageByText();

                expect(errMessage).toMatch(/Incorrect username or password\.?|Password attempts exceeded\.?/);
            });
        };
        })
    })
})