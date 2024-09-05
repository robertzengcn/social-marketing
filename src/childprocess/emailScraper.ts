const extractTitle = async ({ page, data }) => {
    const { url, position } = data;
    await page.goto(url);
    const pageTitle = await page.evaluate(() => document.title);
    console.log(`Page title of #${position} ${url} is ${pageTitle}`);
};