import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'
import { useMemo } from 'react'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

let relayEnvironment: Environment

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchQuery(operation: any, variables: any) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  })
  return await response.json()
}

// Export a singleton instance of Relay Environment configured with our network function:
export const createEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})

export const initEnvironment = (
  initalRecords: RecordMap | undefined
) => {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initalRecords) {
    environment.getStore().publish(new RecordSource(initalRecords))
  }
  // For SSG and SSR always create a new Relay environment
  if (typeof window === 'undefined') return environment
  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment

  return relayEnvironment
}

export function useEnvironment(initalRecords: RecordMap | undefined) {
  const store = useMemo(
    () => initEnvironment(initalRecords),
    [initalRecords]
  )
  return store
}
