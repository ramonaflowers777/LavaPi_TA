    import { Page } from "@playwright/test";

    export class LoginPage {
        readonly page : Page;
            
        constructor(page: Page) {
            this.page = page;
        }

        async login(email: string, password: string): Promise<void> {
            await this.page.fill('#input-0', email);
            await this.page.fill('#input-2', password);
            //locator unda shevcvalo
            await this.page.click('.v-btn');
        }
        
        async getMainErrorMessageByText(text: string): Promise<string | null> {
            return await this.page.locator('[datatest = "login-error_message"]', { hasText : text}).textContent();
        }

        async getErrorMessageByText(text: string): Promise<string | null> {
            return await this.page.locator('.v-messages__message', { hasText : text }).textContent();
        }

        async isLogInBtnDisabled(): Promise<boolean | null> {
            return await this.page.locator('.v-btn').isDisabled();
        }
    }
