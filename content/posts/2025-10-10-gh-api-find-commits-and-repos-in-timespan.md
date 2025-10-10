+++
date = "2025-10-10"
title = "How to Query GitHub for User Contributions in a Specific Timeframe"
description = "A quick note on how to use the GitHub API to find user contributions within a specific timeframe."
images = ["/images/posts/20251010-ghapi.jpg"]  # 1200 x 630 px
tags = ["API", "GitHub"]
keywords = ["GitHub", "API", "Contributions", "Timeframe", "Query"]
hideTags = true
+++

{{< load-photoswipe >}}

I needed needed to find all public GitHub repositories a user has contributed to within a specific timeframe, and wanted to share - and record for myself - the API query I learned.

This can be a useful for generating reports, tracking progress, analyzing activity over a certain period, and more.

<center class="fig1-wrap" style="max-width: 400px; margin:auto; margin-top: 3.5rem;">
{{< figure src="/images/posts/20251010-ghapi.jpg" alt="Cooperation flow for creating a signature" >}}
</center>

## Use the GitHub GraphQL API

We leverage the [GitHub GraphQL API](https://docs.github.com/en/graphql/overview/about-the-graphql-api) to get the list of public repositories a user contributed to within a specific timeframe, using the `contributionsCollection` field to specify a time range and retrieve contributions made by a user during that period.

Here's the query (replace `metachris` with the desired username and adjust the `from` and `to` dates as needed):

```bash
gh api graphql -f query='
{
  user(login: "metachris") {
    contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
      commitContributionsByRepository {
        repository {
          nameWithOwner
        }
        contributions {
          totalCount
        }
      }
    }
  }
}' --jq '.data.user.contributionsCollection.commitContributionsByRepository[].repository.nameWithOwner'
```

The output is a plain list of repository names.

## Include Commit Counts and Format Output

Even better, we can include the number of commits per repository, and format the output to be more readable. This just needs a slight modification to the `--jq` part of the command, which is delightfully flexible:

```bash
gh api graphql -f query='
{
  user(login: "metachris") {
    contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
      commitContributionsByRepository {
        repository {
          nameWithOwner
        }
        contributions {
          totalCount
        }
      }
    }
  }
}' --jq '.data.user.contributionsCollection.commitContributionsByRepository[] | "\(.repository.nameWithOwner | .[0:50] + (" " * (50 - (. | length)))) \(.contributions.totalCount) commits"'
```

This is the output:

```bash
BuilderNet/website                                 84 commits
flashbots/system-api                               57 commits
flashbots/relayscan                                42 commits
flashbots/builder-hub                              37 commits
metachris/website                                  23 commits
flashbots/mev-boost                                20 commits
flashbots/suave-docs                               19 commits
flashbots/rbuilder                                 17 commits
flashbots/op-rbuilder                              15 commits
flashbots/cvm-reverse-proxy                        13 commits
flashbots/go-bob-firewall                          12 commits
flashbots/go-template                              12 commits
flashbots/mempool-dumpster                         10 commits
flashbots/go-utils                                 8 commits
flashbots/rbuilder-relay-measurement               6 commits
flashbots/mev-boost-relay                          6 commits
flashbots/suave-geth                               4 commits
flashbots/buildernet-orderflow-proxy               3 commits
flashbots/suave-specs                              3 commits
flashbots/prio-load-balancer                       2 commits
flashbots/flashbots-docs                           1 commits
flashbots/flashbots-writings-website               1 commits
ethereum/builder-specs                             1 commits
flashbots/rpc-endpoint                             1 commits
metachris/flashbotsrpc                             1 commits
```

🎉

---

Hope this is useful to you as it was to me! If you have any questions, suggestions or feedback, feel free to reach out or leave a comment below.