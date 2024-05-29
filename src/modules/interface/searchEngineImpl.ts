export interface searchEngineImpl{
    // Each scraper basically iterates over a list of
    // keywords and a list of pages. This is the generic
    //  method for that
    scraping_loop():void
    build_start_url():string
    parse(html)
    parse_async(html)
    search_keyword()
    next_page()
}