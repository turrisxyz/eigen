/**
 * @generated SignedSource<<3d90e1491126fffd12606e9eb90c9339>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionTestsQuery$variables = {};
export type MyCollectionTestsQueryVariables = MyCollectionTestsQuery$variables;
export type MyCollectionTestsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollection_me">;
  } | null;
};
export type MyCollectionTestsQueryResponse = MyCollectionTestsQuery$data;
export type MyCollectionTestsQuery = {
  variables: MyCollectionTestsQueryVariables;
  response: MyCollectionTestsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "CREATED_AT_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionTestsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollection_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionTestsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "includesPurchasedArtworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "MyCollectionConnection",
            "kind": "LinkedField",
            "name": "myCollectionConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyCollectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "medium",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "pricePaid",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "minor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "sizeBucket",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v2/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkConsignmentSubmission",
                        "kind": "LinkedField",
                        "name": "consignmentSubmission",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayText",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "small"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"small\")"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDefault",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myCollectionConnection(first:30,sort:\"CREATED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "MyCollection_myCollectionConnection",
            "kind": "LinkedHandle",
            "name": "myCollectionConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "14a9c87888fac7bd2c97c9ed3f5d2f0f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v4/*: any*/),
        "me.myCollectionConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyCollectionConnection"
        },
        "me.myCollectionConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MyCollectionEdge"
        },
        "me.myCollectionConnection.edges.cursor": (v5/*: any*/),
        "me.myCollectionConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.myCollectionConnection.edges.node.__typename": (v5/*: any*/),
        "me.myCollectionConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.myCollectionConnection.edges.node.artist.id": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.artist.internalID": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.artist.name": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.artistNames": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.myCollectionConnection.edges.node.attributionClass.id": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.attributionClass.name": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "me.myCollectionConnection.edges.node.consignmentSubmission.displayText": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.date": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.height": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.id": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.myCollectionConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "me.myCollectionConnection.edges.node.image.url": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "me.myCollectionConnection.edges.node.images.isDefault": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.myCollectionConnection.edges.node.images.url": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.internalID": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.medium": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.myCollectionConnection.edges.node.pricePaid.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "me.myCollectionConnection.edges.node.sizeBucket": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.slug": (v4/*: any*/),
        "me.myCollectionConnection.edges.node.title": (v6/*: any*/),
        "me.myCollectionConnection.edges.node.width": (v6/*: any*/),
        "me.myCollectionConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.myCollectionConnection.pageInfo.endCursor": (v6/*: any*/),
        "me.myCollectionConnection.pageInfo.hasNextPage": (v7/*: any*/),
        "me.myCollectionConnection.pageInfo.startCursor": (v6/*: any*/),
        "me.myCollectionInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyCollectionInfo"
        },
        "me.myCollectionInfo.includesPurchasedArtworks": (v7/*: any*/)
      }
    },
    "name": "MyCollectionTestsQuery",
    "operationKind": "query",
    "text": "query MyCollectionTestsQuery {\n  me {\n    ...MyCollection_me\n    id\n  }\n}\n\nfragment InfiniteScrollArtworksGrid_myCollectionConnection_15nBhX on MyCollectionConnection {\n  pageInfo {\n    hasNextPage\n    startCursor\n    endCursor\n  }\n  edges {\n    node {\n      title\n      slug\n      id\n      image {\n        aspectRatio\n      }\n      artistNames\n      medium\n      artist {\n        internalID\n        name\n        id\n      }\n      pricePaid {\n        minor\n      }\n      sizeBucket\n      width\n      height\n      date\n      ...MyCollectionArtworkGridItem_artwork\n    }\n  }\n}\n\nfragment MyCollectionArtworkGridItem_artwork on Artwork {\n  internalID\n  artist {\n    internalID\n    id\n  }\n  images {\n    url\n    isDefault\n  }\n  image {\n    aspectRatio\n  }\n  artistNames\n  medium\n  slug\n  title\n  date\n}\n\nfragment MyCollectionArtworkListItem_artwork on Artwork {\n  internalID\n  title\n  slug\n  id\n  medium\n  image {\n    url(version: \"small\")\n    aspectRatio\n  }\n  artistNames\n  artist {\n    internalID\n    name\n    id\n  }\n  pricePaid {\n    minor\n  }\n  sizeBucket\n  width\n  height\n  date\n}\n\nfragment MyCollectionArtworkList_myCollectionConnection on MyCollectionConnection {\n  pageInfo {\n    hasNextPage\n    startCursor\n    endCursor\n  }\n  edges {\n    node {\n      ...MyCollectionArtworkListItem_artwork\n      title\n      slug\n      id\n      artistNames\n      medium\n      artist {\n        internalID\n        name\n        id\n      }\n      pricePaid {\n        minor\n      }\n      sizeBucket\n      width\n      height\n      date\n    }\n  }\n}\n\nfragment MyCollection_me on Me {\n  id\n  myCollectionInfo {\n    includesPurchasedArtworks\n  }\n  myCollectionConnection(first: 30, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        id\n        medium\n        title\n        pricePaid {\n          minor\n        }\n        attributionClass {\n          name\n          id\n        }\n        sizeBucket\n        width\n        height\n        artist {\n          internalID\n          name\n          id\n        }\n        consignmentSubmission {\n          displayText\n        }\n        __typename\n      }\n      cursor\n    }\n    ...MyCollectionArtworkList_myCollectionConnection\n    ...InfiniteScrollArtworksGrid_myCollectionConnection_15nBhX\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f92871534f578770b84dd56aca4132bc";

export default node;
