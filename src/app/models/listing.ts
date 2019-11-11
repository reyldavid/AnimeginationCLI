export interface Listing {
    // listingid: number,
    // listingtypeid: number,
    // listingtypedescription: string,
    // rank: number,
    // productid: number,
    // effectivedate: string,
    // expirationdate: string,
    // created: string

    ListingID: number,
    ListingTypeID: number,
    ListingTypeDescription: string,
    Rank: number,
    EffectiveDate: string,
    Expiration: string,
    ProductID: number,
    ProductCode: string,
    ProductTitle: string,
    ProductDescription: string,
    UnitPrice: number,
    YourPrice: number,
    CategoryName: string,
    ProductAgeRating: string,
    ProductLength: number,
    ProductYearCreated: number,
    MediumName: string,
    PublisherName: string,
    OnSale: boolean,
    RatingID: number
}

export interface ListingModel {
    ListingID: number,
    ListTypeID: number, 
    Rank: number, 
    ProductID: number,
    Effective: string,
    Expiration: string,
    Created: string
}