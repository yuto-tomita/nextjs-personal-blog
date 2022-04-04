/**
 * @generated SignedSource<<fbf7ab440cd5ddc92e3f84bfba4809c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ContributionsCalendarQuery$variables = {};
export type ContributionsCalendarQuery$data = {
  readonly user: {
    readonly contributionsCollection: {
      readonly contributionCalendar: {
        readonly colors: ReadonlyArray<string>;
        readonly totalContributions: number;
        readonly weeks: ReadonlyArray<{
          readonly contributionDays: ReadonlyArray<{
            readonly contributionCount: number;
            readonly date: any;
          }>;
        }>;
      };
    };
  } | null;
};
export type ContributionsCalendarQuery = {
  variables: ContributionsCalendarQuery$variables;
  response: ContributionsCalendarQuery$data;
};

const node: ConcreteRequest = (function(){
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
          "name": "colors",
          "storageKey": null
        },
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
    "cacheID": "d576672f7398abb2bd0133df4959384b",
    "id": null,
    "metadata": {},
    "name": "ContributionsCalendarQuery",
    "operationKind": "query",
    "text": "query ContributionsCalendarQuery {\n  user(login: \"yuto-tomita\") {\n    contributionsCollection {\n      contributionCalendar {\n        colors\n        totalContributions\n        weeks {\n          contributionDays {\n            contributionCount\n            date\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6bac9edf2f8dc097f224e37e79507f62";

export default node;
