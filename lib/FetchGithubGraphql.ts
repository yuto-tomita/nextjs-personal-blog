import { RequestParameters } from 'relay-runtime'

async function fetchGraphQL(operation, variables) {
  const REACT_APP_GITHUB_AUTH_TOKEN =
    process.env.NEXT_PUBLIC_GITHUB_TOKEN

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  })

  const data = await response.json()

  if (response.status >= 400) {
    throw data.errors
  }

  if (!data.data) {
    throw data.errors
  }

  return data
}

export default fetchGraphQL
