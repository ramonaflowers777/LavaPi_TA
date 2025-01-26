    import { Locator, Page } from '@playwright/test';

    export class LoginPage {
        readonly page : Page;
        
        private readonly emailInput: Locator;
        private readonly passwordInput: Locator;
        private readonly loginButton: Locator;
        private readonly mainErrorMessage: Locator;
        private readonly inputFieldErrorMessage: Locator;
            
        constructor(page: Page) {
            this.page = page;
            
            this.emailInput = this.page.locator('#input-0');
            this.passwordInput = this.page.locator('#input-2');
            this.loginButton = this.page.locator('.v-btn');
            this.mainErrorMessage = this.page.locator('[datatest = "login-error_message"]');
            this.inputFieldErrorMessage = this.page.locator('.v-messages__message');
        }

        async login(email: string, password: string): Promise<void> {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            //locator unda shevcvalo
            
            if(await this.isLogInBtnDisabled()) {
                console.warn("Log in button is disabled.skipping this action.");
                return;
            }

            await this.loginButton.click();
        }
        
        async fillAndClearPasswordInput(password: string): Promise<void> {
            await this.passwordInput.fill(password);
            await this.passwordInput.clear();
        }

        async getMainErrorMessageByText(): Promise<string | null> {
            return await this.mainErrorMessage.textContent();
        }

        async getErrorMessageByText(text: string): Promise<string | null> {
            return await this.inputFieldErrorMessage.filter({ hasText : text }).textContent();
        }

        async isLogInBtnDisabled(): Promise<boolean | null> {
            return await this.loginButton.isDisabled();
        }
    }
