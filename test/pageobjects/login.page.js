

const Page = require('./page');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get enterWithFacebook(){
        return $("//div[contains(text(),'Facebook ile Giriş yap')]");
    }
    
    get loginButton(){
        return $("//a[@id='login']");
    }

    get okeyCookies(){
        return $("//button[@title='Sadece temel çerezlere izin ver']");
    }

    get selectEmail(){
        return $("//*[@id='email']");
    }

    get facebookEMail(){
        return $("//*[@id='email']");
    }

    get facebookPassword(){
        return $("//*[@id='pass']");
    }

    get facebookLoginButton(){
        return $("//*[@id='loginbutton']");
    }

    get hepsiburadaTitle(){
        return $("//a[@title='Hepsiburada']");
    }

    get searchTab(){
        return $("//input[@type='text']");
    }

    get searchButton(){
        return $("//div[@class='SearchBoxOld-buttonContainer']");
    }

    get product(){
        return $("//a[@title='Yenilenmiş Apple iPhone X 64 GB (12 Ay Garantili)']");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async maximizeWindow (){
        browser.maximizeWindow();
    }

    async clickEnterWithFacebook(){
        await this.enterWithFacebook.waitForExist({timeout:5000});
        await this.enterWithFacebook.click();
    }

    async clickOkeyCookies(){
        await this.okeyCookies.waitForExist({timeout:5000});
        await this.okeyCookies.click();
    }

    async clickEmailTab(){
        await this.selectEmail.waitForExist({timeout:5000});
        await this.selectEmail.click();
    }

    async enterFacebookEMail(){
        await this.facebookEMail.waitForExist({timeout:5000});
        await this.facebookEMail.setValue("baristemiz335@gmail.com");
    }

    async enterFacebookPassword(){
        await this.facebookPassword.waitForExist({timeout:5000});
        await this.facebookPassword.setValue("Hbtesting123.");
    }

    async clickFacebookLoginButton(){
        await this.facebookLoginButton.waitForExist({timeout:5000});
        await this.facebookLoginButton.click();
    }

    async enterSearchTab(){
        await this.searchTab.waitForExist({timeout:5000});
        await this.searchTab.setValue("iphone7");
    }

    async clickSearchButton(){
        await this.searchButton.waitForExist({timeout:5000});
        await this.searchButton.click();
    }

    async clickProduct(){
        await this.product.waitForExist({timeout:5000});
        await this.product.click();
    }

    async login () {
        await this.maximizeWindow();

        await this.clickEnterWithFacebook();
        await this.clickOkeyCookies();
        await this.enterFacebookEMail();
        await this.enterFacebookPassword();
        await this.clickFacebookLoginButton();

        await this.hepsiburadaTitle.waitForDisplayed();
        await this.enterSearchTab();
        await this.clickSearchButton();

        var element1 = await $("//h3[contains(text(),'Yenilenmiş Apple iPhone X 64 GB (12 Ay Garantili)')]");
        await element1.waitForDisplayed({timeout:15000});
        var text1 =await element1.getProperty("innerText");
        console.log("First Text: " + text1);

        await expect(element1).toHaveTextContaining("iPhone X 64 GB");

        await browser.waitUntil (
            async () => (await element1.getProperty("innerText")) === "Yenilenmiş Apple iPhone X 64 GB (12 Ay Garantili)",
                {
                    timeout :5000,
                    timeoutMsg : "Element bulunamadı"
                }


        );

        browser.pause(2500)
        console.log("************* "+await $("//h3[contains(text(),'Yenilenmiş Apple iPhone X 64 GB (12 Ay Garantili)')]").getProperty("textContent"))



        await this.clickProduct();
        await browser.switchWindow('https://www.hepsiburada.com/yenilenmis-apple-iphone-x-64-gb-12-ay-garantili-p-HBV00000HCZ94');

        var element2 = await $("//h1[contains(text(),'Yenilenmiş Apple iPhone X 64 GB (12 Ay Garantili)')]");
        await element2.waitForDisplayed({timeout:15000});

         browser.pause(2500)
        var text2 =await element2.getProperty("innerText");
        console.log("Second Text: " + text2);

        if(text1 == text2){
            console.log("Assert true!");
        }

        else{
            console.log("Assert False!");
        }

    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

module.exports = new LoginPage();
