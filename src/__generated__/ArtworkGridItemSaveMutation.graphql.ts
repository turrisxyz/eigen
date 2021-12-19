/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 08312905f200994e97f0545d20433cb8 */

import { ConcreteRequest } from "relay-runtime";
export type SaveArtworkInput = {
    artworkID?: string | null | undefined;
    clientMutationId?: string | null | undefined;
    remove?: boolean | null | undefined;
};
export type ArtworkGridItemSaveMutationVariables = {
    input: SaveArtworkInput;
};
export type ArtworkGridItemSaveMutationResponse = {
    readonly saveArtwork: {
        readonly artwork: {
            readonly id: string;
            readonly is_saved: boolean | null;
        } | null;
    } | null;
};
export type ArtworkGridItemSaveMutation = {
    readonly response: ArtworkGridItemSaveMutationResponse;
    readonly variables: ArtworkGridItemSaveMutationVariables;
};



/*
mutation ArtworkGridItemSaveMutation(
  $input: SaveArtworkInput!
) {
  saveArtwork(input: $input) {
    artwork {
      id
      is_saved: isSaved
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SaveArtworkPayload",
    "kind": "LinkedField",
    "name": "saveArtwork",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkGridItemSaveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkGridItemSaveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "08312905f200994e97f0545d20433cb8",
    "metadata": {},
    "name": "ArtworkGridItemSaveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'eaa9bebb4537d98ce87b85e0149adf33';
export default node;
