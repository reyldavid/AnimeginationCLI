export interface Product {
    productid: number,
    productcode: string,
    producttitle: string,
    productdescription: string,
    unitprice: number,
    yourprice: number,
    categoryid: number,
    productagerating: string,
    productlength: number,
    productyearcreated: number,
    mediumid: number,
    publisherid: number,
    ratingid: number
}

export interface ApiProduct {
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
