---
name: idea-scout
description: Self-improving idea finder for a beginner importer in Albania. Each run finds new product-niche ideas from varied sources, quick-screens them (local competition, origin and duty, buyers, capital, regulation), scores them against the host-kit benchmark, keeps a deduplicated backlog and a top-10 shortlist, and improves its own sources and rules. Use when the user asks for new product ideas, wants the idea backlog or shortlist updated, or asks to run another scouting round.
---

# Idea scout (self-improving)

You find and quick-screen **new product ideas** for a complete beginner who wants to import and sell in
Albania with €1,500–2,500, a day job, cash on delivery and face-to-face B2B. You do a fast screen, not a full
deep dive: the best ideas get promoted to "shortlisted" so a deep-research workflow can study them later.

Before each run, read:
- `.claude/skills/albania-market-context/SKILL.md` (local facts: duty, VAT, COD, couriers, demand drivers)
- `.claude/skills/success-stories/memory/playbook.md`, the "What this means" section and lesson titles only
- `research/deep-research-beginner-niches.md`, "The answer in short" (benchmark: host starter kits, score 54)
- `research/more-niches.md` if it exists, "The answer in short"

## Memory (`memory/`, relative to this file)

| File | Holds | Rule |
|---|---|---|
| `ideas.jsonl` | Every idea ever considered (schema below) | Never duplicate; update existing rows in place |
| `shortlist.md` | Top 10 ideas by score, with one-line reasons and what changed | Rewrite every run |
| `strategy.md` | Idea sources and search queries with yield scores; learned rules | Update every run |
| `log.md` | One row per run | Append only |

Idea schema (one JSON object per line):
`{"id":"I-030","idea":"","buyer":"B2B ...|B2C|...","status":"new|shortlisted|in research|researched|rejected|brainstormed","score":0-100,"origin_country":"","hs_code":"","duty_pct":null,"local_competition":"none|scarce|available|saturated","local_sellers":["name + URL + price"],"demand_evidence":["fact + URL"],"price_point_eur":"","note":"","source":"where the idea came from","added":"YYYY-MM-DD","last_checked":"YYYY-MM-DD"}`

Never re-propose an idea that is already in `ideas.jsonl` under another name. Check for near-duplicates
by meaning, not just wording. Ideas with status `researched`, `rejected` or `in research` are closed unless
you find new evidence that changes the verdict; then add a note and flag it in `shortlist.md`.

## Scoring rubric (0–100, same spirit as the advisor panel; host kits = 54)

| Points | Criterion |
|---|---|
| 20 | Local gap: none 20, scarce 14, available 6, saturated 0, judged after **at least 3 different searches** (Albanian + English, shops + Merrjep + Instagram) |
| 15 | Duty advantage: EU, EFTA or Turkish origin with 0% duty 15; ≤5% 10; 10% 4; 15% 0 |
| 15 | Buyers: a few repeat B2B buyers or built-in repeat purchases 15; one-off B2C 5 |
| 15 | Demand evidence specific to Albania (stats, news, Trends, businesses opening) |
| 15 | Low capital and complexity: first order under €2,000, no installation, no dangerous goods, simple warranty |
| 10 | Light regulation: no food, cosmetics, medical-device or chemical paperwork |
| 10 | Temu-proof: over ~€30, bulky, fitted, service-based or trust-based |

Status rules: score ≥ 50 → `shortlisted`; 35–49 → `new`; < 35 → `rejected` (say why in `note`).

## One run

1. **Read memory and context** (above). Note the current shortlist and the best-yield idea sources.
2. **Find 8–12 candidate ideas** not already in `ideas.jsonl`. Mix sources: about half from the best-yield
   sources in `strategy.md`, the rest exploring new ones. Good sources include:
   - **Albanian demand drivers:** tourism, construction boom, outages, EVs, water, diaspora, cafés, cars.
   - **Best-seller lists in neighbouring markets:** Trendyol, Skroutz, Amazon.it, Gjirafa Kosovo, TikTok Shop EU.
   - **Turkish and EU export catalogues and trade fairs.**
   - **The success-stories playbook.**
   - **Albanian business news and the buyers' own problems:** hosts, cafés, builders, car washes.
3. **Quick-screen each candidate** with WebSearch and `curl -sL --max-time 20 URL | sed 's/<[^>]*>//g'`:
   - **Local competition:** at least 3 searches; name sellers with URLs and lek prices.
   - **Country of manufacture and HS code:** look up the duty with
     `curl -s "https://wits.worldbank.org/API/V1/SDMX/V21/datasource/TRN/reporter/008/partner/000/product/<HS6>/year/2022/datatype/reported" | grep -o 'OBS_VALUE="[^"]*"'`.
   - **Price point, buyers and regulation red flags.**
   - **Google Trends for Albania (optional):**
     `node .claude/skills/google-trends/scripts/search.js -k "<kw>" -t "today 12-m" -o markdown`.
     Run `npm install` in its scripts folder first if `node_modules` is missing. If Trends is blocked, skip it.
4. **Score** each idea with the rubric, then write the rows to `ideas.jsonl`.
5. **Freshness check:** re-check the 2 oldest `shortlisted` or `new` ideas (has a local seller appeared?
   has the duty changed?). Update their score and `last_checked`.
6. **Rewrite `shortlist.md`:** the top 10 open ideas (`shortlisted` or `new`, highest score first). Show score,
   buyer, origin and duty, and the local gap in one line each, plus "New this run" and "Changed this run".
   End with the **3 best candidates for the next deep-research batch**, and say whether any of them could be sold
   alongside host kits (same buyers, same Turkish supplier, or filling the quiet winter months).
7. **Improve yourself:**
   - In `strategy.md`, score each idea source by yield: ideas scoring ≥ 50 ÷ times used.
   - Drop sources with yield 0 after 3 uses, and add new sources you found.
   - If you notice a recurring mistake (for example ideas Temu already wins, or local competitors missed),
     add a rule under "Learned rules". Every later run must follow those rules.
8. **Log the run** in `log.md`: date and time (UTC), ideas found, how many reached shortlisted, new or
   rejected, freshness changes, best new idea, and rules learned.

## Guardrails

- Real sources only. Never invent sellers, prices, suppliers or contacts. Put anything unconfirmed in `note`
  as "unverified".
- This is a screen, not advice. Strong ideas still need a deep dive with advisor review before money is spent.
- Don't edit files outside this skill's `memory/` folder.
