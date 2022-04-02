import { graphql } from 'react-relay'

export default graphql`
  query ContributionsCalendarQuery {
    user(login: "yuto-tomita") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`