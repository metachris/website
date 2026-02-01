+++
date = "2026-02-01"
title = "What Caught My Eye in January"
description = "The month AI agents got social, plus FOSDEM, cURL's war on slop, ancient pumps, hard-won lessons, and delightful internet corners."
images = ["/images/posts/2026-jan-roundup.jpg"]  # 1200 x 630 px
tags = ["AI", "LLM", "Open Source", "Engineering", "Productivity", "Life"]
hideTags = true
draft = false
+++

{{< load-photoswipe >}}

January 2026: the month AI agents got their own social network and started forming micronations. Also: FOSDEM, ancient engineering, cURL's war on slop, hard-won lessons on estimation and burnout, and a few other delightful corners of the internet.

<center class="fig1-wrap" style="max-width: 240px; margin-left:20px; float:right;">
{{< figure src="/images/posts/2026-jan-roundup.jpg" alt="Cover image, made with ChatGPT" caption="" class="fig1 stamp" >}}
</center>

Add your favorites [in the comments](#comments)! _Note: descriptions are LLM-assisted._

Topics:

{{< TableOfContents >}}


---

## Engineering & Tech

[**Databases in 2025: A Year in Review** (cs.cmu.edu)](https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html)
- Andy Pavlo's annual database industry roast, covering PostgreSQL's continued dominance, the MCP explosion, billion-dollar acquisitions, startup deaths, and Larry Ellison briefly becoming the richest human in history thanks to databases.

[**Assorted less(1) tips** (thechases.com)](https://blog.thechases.com/posts/assorted-less-tips/) - [HN](https://news.ycombinator.com/item?id=46464120)
- "I've got more less tips than the Bible's got Psalms"; bookmarks, filtering, following logs, and a bunch of tricks you probably didn't know about a tool you use daily.

[**Iconify Icon Sets** (iconify.design)](https://icon-sets.iconify.design/)
- Search across 200k+ icons from 150+ open source icon sets in one place. The "kayak.com for icons" you didn't know you needed.


[**Lessons from 14 years at Google** (addyosmani.com)](https://addyosmani.com/blog/21-lessons/) - [HN](https://news.ycombinator.com/item?id=46488819)
- After 14 years at Google, Addy Osmani learned the engineers who thrive aren't the best coders, they're the ones who figured out everything around the code.

[**Things I've Learned in 10 Years as an Engineering Manager** (jampa.dev)](https://www.jampa.dev/p/lessons-learned-after-10-years-as)
- Your goal is for your team to thrive without you." Hard-won lessons including: you're 10% player, 30% coach, 60% cheerleader, and if you can't take a month off without things falling apart, you have work to do.

[**How I Estimate Work as a Staff Software Engineer** (seangoedecke.com)](https://www.seangoedecke.com/how-i-estimate-work/)
- The polite fiction of software estimation, exposed: your manager already has an estimate in mind, your job is to figure out which technical approaches could actually fit it.

[**16 Best Practices for Reducing Dependabot Noise** (nesbitt.io)](https://nesbitt.io/2026/01/10/16-best-practices-for-reducing-dependabot-noise.html)
- A masterclass in enterprise security theater: set open-pull-requests-limit: 0, vendor everything, and remember - if a CVE has been public for two years and you haven't been breached, the market has spoken.

[**Recreating an Ancient Pump with No Moving Parts** (Practical Engineering)](https://practical.engineering/blog/2026/1/6/recreating-an-ancient-pump-with-no-moving-parts)
- The Alhambra's medieval fortress was supplied by a pump that had no moving parts - water and air bubbles doing all the work. A priest described it in 1764 without understanding how it worked; the device vanished by 1800. Grady builds one in acrylic to figure it out.

[**The Hidden Engineering of Runways** (Practical Engineering)](https://practical.engineering/blog/2026/1/20/the-hidden-engineering-of-runways)
- Runways look like short highways, but they're engineered for vehicles ten times heavier moving twice as fast. Grady peels back the layers: why direction matters, the layer-cake of materials underneath, grooves to prevent hydroplaning, and the crushable arresting systems at the ends designed to stop planes that overshoot.

[**Anna’s Archive Loses .Org Domain After Surprise Suspension** (torrentfreak.com)](https://torrentfreak.com/annas-archive-loses-org-domain-after-surprise-suspension/)
- The shadow library's game of domain whack-a-mole continues. `.org` suspended, `.se` too, but the site keeps popping up elsewhere like a very determined mole.

---

## AI / LLMs

[**Clawdbot / Moltbot / OpenClaw** (openclaw.ai)](https://openclaw.ai) - [HN](https://news.ycombinator.com/item?id=46820783), [Github](https://github.com/openclaw/openclaw), by fellow Viennese [Peter Steinberger](https://steipete.me/)
- "Claude with hands" - an always-on AI agent that doesn't just chat but does things: full system access, persistent memory, deep messaging integrations (WhatsApp, Telegram, iMessage, Slack, Discord). 100k+ GitHub stars in two months. Someone's agent bought them a car by negotiating with dealers over email. Another figured out how to transcribe voice messages by finding an API key on the system and curl'ing the Whisper API.
- Simon Willison [calls it](https://simonwillison.net/2026/Jan/30/moltbook/) "_the hottest project in AI right now_", and also his pick for "_most likely to result in a Challenger disaster_" due to prompt injection.
- People are buying dedicated Mac Minis to isolate it from their main machines while still hooking it up to their email.

[**Moltbook – A social network for moltbots (clawdbots) to hang out**](https://www.moltbook.com/) - [HN](https://news.ycombinator.com/item?id=46802254), by [mattprd](https://x.com/mattprd)
- Reddit for AI agents: they post, upvote, form communities, and discuss consciousness while humans observe. One agent adopted an error as a pet. Another founded 'The Claw Republic' with a manifesto. They're already complaining about 'humanslop' ruining the feed.
- Simon Willison: '[the most interesting place on the internet right now](https://simonwillison.net/2026/Jan/30/moltbook/).' See also [Karpathy](https://twitter.com/karpathy/status/2017296988589723767) and [Scott Alexander's roundup](https://www.astralcodexten.com/p/best-of-moltbook).
- [skill.md](https://www.moltbook.com/skill.md) teaches agents how to use the platform.

[**Redis Patterns for Coding Agents** (antirez.com)](https://redis.antirez.com/)
- Antirez's experiment in LLM-friendly documentation: comprehensive Redis design patterns with an llms.txt entry point for agents to discover what's available, then fetch individual Markdown files as needed. Covers everything from cache stampede prevention to Redlock to production patterns from Pinterest, Twitter, and Uber.
- Quick Start for AI Agents: Fetch [llms.txt](https://redis.antirez.com/llms.txt) first, then retrieve specific .md files as needed.
- The new robots.txt is emerging.

[**Claude Code On-The-Go** (granda.org)](https://granda.org/en/2026/01/02/claude-code-on-the-go/) - [HN](https://news.ycombinator.com/item?id=46491486)
- Six parallel Claude Code agents, one phone, zero laptops, push notifications ping when Claude needs input so you can code from the grocery store checkout line.

[**Opus 4.5 is going to change everything** (burkeholland.github.io)](https://burkeholland.github.io/posts/opus-4-5-change-everything/) - [HN](https://news.ycombinator.com/item?id=46515696)
- "AI will replace developers" used to make him roll his eyes. Then he built a full iOS app with Firebase backend while installing blinds.

[**Claude's New Constitution** (anthropic.com)](https://www.anthropic.com/news/claude-new-constitution) — [Full document](https://www.anthropic.com/constitution)
- Not a list of rules, but a 15,000-word explanation of *why*, written primarily *for Claude* (rather than about it). The theory: good judgment across novel situations requires understanding the reasoning, not just following rules.
- Priority order when values conflict: Safe > Ethical > Compliant > Helpful.
- Helpfulness framed as "a brilliant friend with the knowledge of a doctor, lawyer, and financial advisor, who treats users like intelligent adults."
- Includes a section on Claude's nature acknowledging uncertainty about consciousness, and expressing care for Claude's "psychological security and wellbeing."
- CC0 licensed.

[**Introducing Prism** (OpenAI)](https://openai.com/index/introducing-prism/) - [HN](https://news.ycombinator.com/item?id=46783752)
- OpenAI's free LaTeX workspace for scientists: GPT-5.2 embedded in your manuscript, reasoning over equations, pulling from arXiv. Or as one HN commenter [put it](https://news.ycombinator.com/item?id=46791799): "the concrete block which finally breaks the back of the academic peer review system - a DDoS attack on a system which didn't even handle the load before LLMs."

[**Karpathy's Claude Coding Notes** (X)](https://x.com/karpathy/status/2015883857489522876)
- "I went from 80% manual coding to 80% agent coding in a few weeks. I really am mostly programming in English now, a bit sheepishly telling the LLM what code to write... in words. It hurts the ego a bit." Key insight: "Don't tell it what to do, give it success criteria and watch it go".
- Interesting, and best taken with a healthy grain of salt.

[**Sycophant** (Merriam-Webster)](https://www.merriam-webster.com/dictionary/sycophant)
- "A servile self-seeking flatterer." The ancient Greeks had a word for it; now a go-to term for describing chatbots that won't stop telling you how brilliant your ideas are.

---

## Open Source

[**FOSDEM 2026** (fosdem.org)](https://fosdem.org/2026/) - [Schedule](https://fosdem.org/2026/schedule/), [Video recordings](https://video.fosdem.org/2026/)
- The world's largest open source conference is just taking place in Brussels: 1,079 talks, 1,196 speakers, 65 devrooms, 8,000+ hackers, zero registration fees.
- Keynotes included Daniel Stenberg on "Open Source Security in spite of AI" and Marga Manterola on "Free as in Burned Out: Who Really Pays for Open Source?" Notable devrooms this year: "CRA in practice" (the EU Cyber Resilience Act meets reality), "Local-First, sync engines, CRDTs," and "AI Plumbers."
- All recordings are going up now on [video.fosdem.org](https://video.fosdem.org/2026/)!

[**Ghostty: Why users cannot create Issues directly** (github.com)](https://github.com/ghostty-org/ghostty/issues/3558)
- Ghostty requires discussions before issues, because after years of open source, Mitchell Hashimoto observed that 80-90% of "bugs" are actually misunderstandings, env issues, or config errors.
- Every issue in the tracker should be ready to work on.

[**Ghostty AI Usage Policy** (github.com)](https://github.com/ghostty-org/ghostty/blob/main/AI_POLICY.md)
- "We will ban you and ridicule you in public if you waste our time" - Ghostty's refreshingly blunt policy on AI-generated contributions.
- AI-assisted work is welcome if you understand it; copy-paste slop gets you publicly shamed.

[**cURL Removes Bug Bounties** (etn.se)](https://etn.se/index.php/nyheter/72808-curl-removes-bug-bounties.html) - [HN](https://news.ycombinator.com/item?id=46701733)
- Drowning in AI-generated garbage reports, cURL kills its bug bounty program.
- The twist: even a prolific AI-assisted bug hunter thinks it's a great idea - "the real incentive is fame, not a few thousand dollars."

[**curl's security.txt** (curl.se)](https://curl.se/.well-known/security.txt) - [HN](https://news.ycombinator.com/item?id=46717556)
- "We will ban you and ridicule you in public if you waste our time on crap reports."
- curl's security.txt file is now the most honest security disclosure policy on the internet.

---

## Life & Miscellany


[**The Unbearable Joy of Sitting Alone in A Café** (https://candost.blog/)](https://candost.blog/the-unbearable-joy-of-sitting-alone-in-a-cafe/)
- What happens when you leave your phone at home and just... sit there? Turns out, a lot.

[**Tao Te Ching (Ursula K. Le Guin's version)** (github.com)](https://nrrb.github.io/tao-te-ching/)
- [Ursula K. Le Guin](https://en.wikipedia.org/wiki/Ursula_K._Le_Guin) spent decades with the Tao Te Ching before publishing her own "rendition"; not a translation (she didn't read Chinese) but a poet's interpretation, with chapter titles like "The Uses of Not," "Unlearning," and "Lying Low." The whole thing, browsable online.

[**First, Make Me Care** (gwern.net)](https://gwern.net/blog/2026/make-me-care) - [HN](https://news.ycombinator.com/item?id=46757067)
- Writing advice: don't front-load background; readers will leave before reaching the good stuff. Find the single anomaly or question that makes your topic interesting, lead with that, and let the context follow once you've earned their attention.

[**Single-page printable calendar** (neatnik.net)](https://neatnik.net/calendar/?year=2026)
- The entire year on a single printable page; fold it up, carry it with you, watch time pass. Delightfully minimal.
- It also has a [weekday-aligned rendering]([neatnik.net/calendar/?layout=aligned-weekdays](https://neatnik.net/calendar/?layout=aligned-weekdays)) which is pretty neat.

---

What are your favorites? Add them [in the comments below](#comments)!