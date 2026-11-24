"""Export the idea backlog to the CSV the Albania Import Tracker dashboard reads.
Usage: python3 -I export_csv.py <ideas.jsonl> <out.csv>"""
import csv, json, sys
rows = [json.loads(l) for l in open(sys.argv[1]) if l.strip()]
order = {"shortlisted": 0, "new": 1, "in research": 2, "brainstormed": 3, "researched": 4, "rejected": 5}
rows.sort(key=lambda r: (order.get(r.get("status"), 9), -(r.get("score") or -1), r["id"]))
with open(sys.argv[2], "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["id", "idea", "buyer", "status", "score", "origin_country", "duty_pct", "local_competition", "price_point_eur", "note", "last_checked"])
    for r in rows:
        w.writerow([r["id"], r["idea"], r.get("buyer", ""), r.get("status", ""), "" if r.get("score") is None else r["score"],
                    r.get("origin_country", ""), "" if r.get("duty_pct") is None else r["duty_pct"], r.get("local_competition", ""),
                    r.get("price_point_eur", ""), r.get("note", ""), r.get("last_checked", "")])
print(len(rows), "ideas exported")
