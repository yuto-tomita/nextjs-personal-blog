/**
 * @generated SignedSource<<6017370b78b2f800050b2b81fd1cd68b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ContributionsCalendarQuery$variables = {||};
export type ContributionsCalendarQuery$data = {|
  +user: ?{|
    +contributionsCollection: {|
      +contributionCalendar: {|
        +totalContributions: number,
        +weeks: $ReadOnlyArray<{|
          +contributionDays: $ReadOnlyArray<{|
            +contributionCount: number,
            +date: any,
          |}>,
        |}>,
      |},
    |},
  |},
|};
export type ContributionsCalendarQuery = {|
  variables: ContributionsCalendarQuery$variables,
  response: ContributionsCalendarQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "login",
    "value": "yuto-tomita"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "ContributionsCollection",
  "kind": "LinkedField",
  "name": "contributionsCollection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ContributionCalendar",
      "kind": "LinkedField",
      "name": "contributionCalendar",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalContributions",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ContributionCalendarWeek",
          "kind": "LinkedField",
          "name": "weeks",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ContributionCalendarDay",
              "kind": "LinkedField",
              "name": "contributionDays",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "contributionCount",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContributionsCalendarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "user(login:\"yuto-tomita\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ContributionsCalendarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "user(login:\"yuto-tomita\")"
      }
    ]
  },
  "params": {
    "cacheID": "14a0977376724558c1283a050a42c8fb",
    "id": null,
    "metadata": {},
    "name": "ContributionsCalendarQuery",
    "operationKind": "query",
    "text": "query ContributionsCalendarQuery {\n  user(login: \"yuto-tomita\") {\n    contributionsCollection {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            contributionCount\n            date\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "c1d100f8e3196f1f458e97c7911a6650";

module.exports = ((node/*: any*/)/*: Query<
  ContributionsCalendarQuery$variables,
  ContributionsCalendarQuery$data,
>*/);
