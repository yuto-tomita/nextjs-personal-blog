import axios from 'axios'

export const contributionCalendar = async () => {
  return await axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    },
    data: {
      query: `
				query {
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
    }
  })
}
