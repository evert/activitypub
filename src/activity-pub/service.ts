import { Actor, ActivityStreamOrderedCollection, ActivityStreamsEnvelope } from './types';
import { getGlobalOrigin } from '@curveball/kernel';
import { FeedData, read } from '@extractus/feed-extractor';

export function getActor(): ActivityStreamsEnvelope<Actor> {

  const origin = getGlobalOrigin();

  return {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: origin + '/actor',
    type: 'Person',
    inbox: origin + '/inbox',
    outbox: origin + '/outbox',
    // inbox: '/inbox',
    // outbox: '/outbox',
    //followers: origin + '/followers',
    //following: origin + '/following',
    preferredUsername: process.env.USERNAME,
    name: process.env.DISPLAY_NAME!,
    summary: process.env.SUMMARY!,
    url: process.env.WEBSITE!,
  }

}

export async function getOutbox(): Promise<ActivityStreamsEnvelope<ActivityStreamOrderedCollection>> {

  const origin = getGlobalOrigin();
  const outboxUrl = origin + '/outbox';
  const articles = await fetchArticles();

  return  {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: outboxUrl,
    type: 'OrderedCollection',
    totalItems: articles.entries!.length,
    orderedItems: articles.entries!.map( entry => ({

      id: origin + '/object/create?res=' + encodeURIComponent(entry.link!),
      type: 'Create',
      actor: origin + '/actor',
      object: {
        type: 'Note',
        id: origin + '/object/note?res=' + encodeURIComponent(entry.link!),
        attributedTo: origin + '/actor',
        content: entry.title,
        published: new Date(entry.published!).toISOString(),
      }
    })),
  };

}

let articles: null|FeedData = null;

async function fetchArticles(): Promise<FeedData> {

  if (!articles) {
    articles = await read(process.env.FEED_URL!);
  }
  return articles;

}

