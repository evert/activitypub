export type ActivityStreamsEnvelope<T extends ActivityStreamObject> = {
  '@context': 'https://www.w3.org/ns/activitystreams';
} & T;

export interface Actor extends ActivityStreamObject {
  type: 'Person';
  id: string;
  inbox: string;
  outbox: string;
  following?: string;
  followers?: string;
  liked?: string;
  streams?: string;
  preferredUsername?: string;
  endpoints?: {
    proxyUrl?: string;
    oauthAuthorizationEndpoint?: string;
    oauthTokenEndpoint?: string;
    provideClientKey?: string;
    signClientKey?: string;
    sharedInbox?: string;
  };
}

export interface Create extends ActivityStreamActivity {

  type: 'Create';

}

export interface ActivityStreamObject {

  id: string;
  type: string;
  name?: string;
  summary?: string;
  icon?: string;
  url?: string;

}

export interface ActivityStreamActivity extends ActivityStreamObject {

  actor: string;
  object: ActivityStreamObject;

}


interface ActivityStreamBaseCollection extends ActivityStreamObject {
  totalItems: number;
  first?: string;
  last?: string;
  current?: string;
}

type ActivityStreamCollectionMember = Create;

export interface ActivityStreamCollection extends ActivityStreamBaseCollection {
  type: 'Collection';
  items: ActivityStreamCollectionMember[];
}
export interface ActivityStreamCollectionPage extends ActivityStreamBaseCollection {
  type: 'CollectionPage';
  items: ActivityStreamCollectionMember[];
  partOf?: string;
  next?: string;
  prev?: string;
}


export interface ActivityStreamOrderedCollection extends ActivityStreamBaseCollection {
  type: 'OrderedCollection';
  orderedItems: ActivityStreamCollectionMember[];
}

export interface ActivityStreamOrderedCollectionPage extends ActivityStreamBaseCollection {
  type: 'OrderedCollectionPage';
  orderedItems: ActivityStreamCollectionMember[];
  partOf?: string;
  next?: string;
  prev?: string;
}
