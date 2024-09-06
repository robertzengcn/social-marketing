export {};
import {EmailClusterdata} from '@/entityTypes/emailextraction-type'
import { Page} from 'puppeteer';

export const extractLink = async (page: Page, val: EmailClusterdata ) => {
    const url = val.url;
    if (!url) return;

    await page.goto(url,{
        waitUntil: "networkidle2",
        timeout: 60000
    });
    const pageTitle = await page.evaluate(() => document.title);

    // Extract all links from the page
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(anchor => anchor.href);
    });

    // Filter links with page level less than 3
    const filteredLinks = links.filter(link => {
        try{
        const url = new URL(link);
        const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
        return pathSegments.length < val.maxPageLevel&&url.hostname.endsWith(val.domain);
        }catch(e){
            return false;
        }
    });
    const emails = await page.evaluate(() => {
        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g;
        const bodyText = document.body.innerText;
        return bodyText.match(emailRegex) || [];
    });

    return {
        pageTitle,
        filteredLinks,
        emails
    };
};
export async function crawlSite ({ page, data }: { page: Page; data: EmailClusterdata })  {
    if(data.url.length==0){
        return;
    }
    if(!data.visited){
        data.visited=new Set() 
    }
    if (param.val.visited.has(param.val.url)) return;
    param.val.visited.add(param.val.url);

    const result = await extractLink( param.page, {url:param.val.url,domain:param.val.domain,maxPageLevel:param.val.maxPageLevel} ); 
    if (!result) return;

    console.log(`Page Title: ${result.pageTitle}`);
    console.log(`URL: ${param.val.url}`);
    console.log(`Filtered Links: ${result.filteredLinks}`);

    for (const link of result.filteredLinks) {
        const crawdata:EmailClusterdata={
            url:link,
            domain:param.val.domain,
            maxPageLevel:param.val.maxPageLevel,
            visited:param.val.visited
        }
        await crawlSite({page:param.page, val:crawdata});
    }
};

export async function crawlSiteex({ page, data }: { page: Page; data: EmailClusterdata }) {
    // Your crawling logic here
  }
