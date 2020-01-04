export class Globals {
    localData: boolean = false;
    localHostUrl: string = 'http://localhost:65164/api/';
    azureHostUrl: string = 'https://animegination2.azurewebsites.net/api/';
    animeApiClientKey: string = 'AA46C009-49F8-4411-A4D6-131D4BA6D91B';
    spinnerDelay: number = 1000;
    deliveryDays: number = 5;
    orderPrefix: string = "W109-852036";
    // trackingPrefix: string = "78553924";
    trackingPrefix: string = "91018690088450";
    rssFeedUrl: string ="http://www.animenewsnetwork.com/all/rss.xml";
    rss2JsonServiceUrl: string ="https://rss2json.com/api.json?rss_url=";
    // proxyServerUrl: string = "https://cors-anywhere.herokuapp.com/";
    minHistoryVisitsToShow: number = 6;
}
