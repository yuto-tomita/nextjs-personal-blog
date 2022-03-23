import { gql, ApolloServer } from 'apollo-server-micro'

const typeDef = gql`
  type ContributionCalendarMonth {
    firstDay: Date
    name: String
    totalWeeks: Int
    year: Int
  }

  type ContributionCalendarWeek {
    contributionDays: [ContributionCalendarDay]
    firstDay: Date
  }

  type ContributionCalendarDay {
    color: String
    contributionCount: Int
    contributionLevel: ContributionLevel
    date: Date
    weekday: Int
  }

  enum ContributionLevel {
    FIRST_QUARTILE
    FOURTH_QUARTILE
    NONE
    SECOND_QUARTILE
    THIRD_QUARTILE
  }

  type ContributionCalendar {
    colors: String
    isHalloween: Boolean
    months: [ContributionCalendarMonth]
    totalContributions: Int
    weeks: [ContributionCalendarWeek]
  }
`
