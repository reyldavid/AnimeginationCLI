import { ApiProduct } from "./product";
import { Category } from "./category";
import { Listing } from './listing';
import { ListType } from "./listtype";
import { States } from "./states";
import { Medium } from "./medium";
import { Publisher } from "./publisher";
import { Recommendation } from "./recommendation";

export interface Dictionary<T> {
    [key: string]: T
}

export class ApiProductCache {
    key: Dictionary<ApiProduct> = {}
}

export class ApiProductsCache {
    key: Dictionary<ApiProduct[]> = {}
}

export class CategoryCache {
    key: Dictionary<Category> = {}
}

export class CategoriesCache {
    key: Dictionary<Category[]> = {}
}

export class ListTypeCache {
    key: Dictionary<ListType> = {}
}

export class ListingCache {
    key: Dictionary<Listing[]> = {}
}

export class StatesCache {
    key: Dictionary<States[]> = {}
}

export class MediaCache {
    key: Dictionary<Medium[]> = {}
}

export class PublisherCache {
    key: Dictionary<Publisher[]> = {}
}

export class RecommendsCache {
    key: Dictionary<Recommendation[]> = {}
}
