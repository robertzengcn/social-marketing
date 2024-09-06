export {};
import {EmailClusterdata} from '@/entityTypes/emailextraction-type'

export const extractLink = async (page, val: EmailClusterdata,domain:string,maxPageLevel: number ) => {
    const url = val.url;
    if (!url) return;

    await page.goto(url);
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
        return pathSegments.length < maxPageLevel&&url.hostname.endsWith(domain);
        }catch(e){
            return false;
        }
    });

    return {
        pageTitle,
        filteredLinks
    };
};
export const crawlSite = async (page, url:string, domain:string,maxPageLevel:number,visited = new Set()) => {
    if (visited.has(url)) return;
    visited.add(url);

    const result = await extractLink( page, {url:url} ,domain,maxPageLevel); 
    if (!result) return;

    console.log(`Page Title: ${result.pageTitle}`);
    console.log(`URL: ${url}`);
    console.log(`Filtered Links: ${result.filteredLinks}`);

    for (const link of result.filteredLinks) {
        await crawlSite(page, link, domain,maxPageLevel,visited);
    }
};
