import { FeedInfo } from './feedInfo';
import { FeedEntry } from './feedEntry';

export interface Feed {
  status: string,
  feed: FeedInfo,
  items: Array<FeedEntry>
}