const { test, expect } = require('@playwright/test');


test("Search the text 'Palm Treo Pro", async ({ page }) => {

await page.goto('https://ecommerce-playground.lambdatest.io/');

await page.locator("span.title", {hasText: 'Mega Menu' }).hover()

await page.locator("a[title=Desktop]").click();

const palmTreoProItems = page.locator("div.carousel-item.active > img[title='Palm Treo Pro']");
await expect(palmTreoProItems).toBeVisible();
    //await palmTreoProItems.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForLoadState('networkidle');
await palmTreoProItems.first().waitFor({ state: 'visible', timeout: 10000 });

// Navigate through the carousel to ensure the product is visible
const count =   await palmTreoProItems.count();
console.log(`Number of Palm Treo Pro items found: ${count}`);
if (count > 0) {    
for (let i = 0; i < count; i++) {
    const palmTreoProItem = palmTreoProItems.nth(i);
    await expect(palmTreoProItem).toBeVisible();
    await palmTreoProItem.click();
    const addToCart =  page.locator("#container button[title='Add to Cart']");
        //wait for timeout period of 5 seconds without object to be visible
    //await addToCart.waitFor({ state: 'attached', timeout: 5000 });
//const isVisible = await addToCart.isVisible();
    //await page.waitForLoadState('networkidle');

const isDisabled = await addToCart.isDisabled();
console.log(`Palm Treo Pro item ${i + 1} clicked, isDisabled: ${isDisabled}`);    // Check if the 'Add to Cart' button is visible and enabled
    if (!isDisabled) {
        await expect(addToCart).toBeVisible();
        await addToCart.click();
        await page.locator("a.btn.btn-primary.btn-block",{hasText: 'View Cart'}).click()
        await expect(page.locator("td.text-left", {hasText: 'Palm Treo Pro'})).toBeVisible()
        await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue("1")
    }else{
        //await addToCart.waitFor({ state: 'attached' });
        await expect(addToCart).toBeDisabled();
    }
    await page.goBack();
}
}

});

test("Search the text 'Canon EOS 5D", async ({ page }) => {

await page.goto('https://ecommerce-playground.lambdatest.io/');

await page.locator("span.title", {hasText: 'Mega Menu' }).hover()

await page.locator("a[title=Desktop]").click();

const canonProduct = page.locator("div.carousel-item.active > img[title='Canon EOS 5D']");
await expect(canonProduct).toBeVisible();
await page.waitForLoadState('networkidle');
await canonProduct.first().waitFor({ state: 'visible', timeout: 10000 });

// Navigate through the carousel to ensure the product is visible
const count =   await canonProduct.count();
console.log(`Number of canonProduct items found: ${count}`);
if (count > 0) {    
for (let i = 0; i < count; i++) {
    const canonProd = canonProduct.nth(i);
    await expect(canonProd).toBeVisible();
    await canonProd.click();
    const addToCart =  page.locator("#container button[title='Add to Cart']");
        //wait for timeout period of 5 seconds without object to be visible
    //await addToCart.waitFor({ state: 'attached', timeout: 5000 });
//const isVisible = await addToCart.isVisible();
    //await page.waitForLoadState('networkidle');

const isDisabled = await addToCart.isDisabled();
console.log(`canonProd item ${i + 1} clicked, isDisabled: ${isDisabled}`);    // Check if the 'Add to Cart' button is visible and enabled
    if (!isDisabled) {
        await expect(addToCart).toBeVisible();
        await addToCart.click();
        await page.locator("a.btn.btn-primary.btn-block",{hasText: 'View Cart'}).click()
        await expect(page.locator("td.text-left", {hasText: 'Palm Treo Pro'})).toBeVisible()
        await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue("1")
    }else{
        //await addToCart.waitFor({ state: 'attached' });
        await expect(addToCart).toBeDisabled();
    }
    await page.goBack();
}
}

});

test('Open ecommerce playground homepage', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    // Assert that the homepage loaded by checking the title
    await expect(page).toHaveTitle(/Your Store/);

    // Optionally, check for a visible element on the homepage
    await expect(page.locator('header')).toBeVisible();
});

test('Search for a product and add to cart', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    // Type 'Macbook' into the search box and press Enter
    const searchBox = page.getByPlaceholder('Search For Products').first();
    await searchBox.fill('Macbook');
    await searchBox.press('Enter');

    // Assert that the search results page loaded by checking the title
    await expect(page).toHaveTitle(/Search - Macbook/);

    // Check that the search results are visible
    const firstProduct = page.getByText('MacBook Pro').first();
    await expect(firstProduct).toBeVisible();

    // Click on the first product in the search results
    await firstProduct.click();

    // Click on the 'Add to Cart' button
    const addToCartButton = page.getByPlaceholder('Add to Cart').first();
    if (await addToCartButton.isVisible()) {
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Assert that the cart has been updated
    const successMessage = page.locator('.alert-success');
    await expect(successMessage).toContainText('Success: You have added Macbook to your shopping cart!');
} else {
    // If 'Add to Cart' is not visible, check for 'Out Of Stock'
    const outOfStock = page.locator('button:has-text("OUT OF STOCK")').first();
    await outOfStock.waitFor({ state: 'attached' });
    await expect(outOfStock).toBeDisabled();
    //await expect(outOfStock).toBeVisible();
}   
});

