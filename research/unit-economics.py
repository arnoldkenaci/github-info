# Illustrative unit economics for a VAT-registered Albanian importer. All inputs are ASSUMPTIONS.
FX=89.78
rows=[
 # name, EU retail incl VAT (EUR), origin duty %, freight % of cost, local price incl 20% VAT (EUR), courier+COD EUR, ad cost per sale EUR
 ("Power station 1kWh (Bluetti/Jackery class)", 650, 0.027, 0.10, 799, 12, 45),
 ("Self-cleaning litter box (Petkit class)",    450, 0.027, 0.08, 529, 10, 35),
 ("Ninja Creami / dual air fryer",              220, 0.027, 0.08, 279, 7, 20),
 ("Bugaboo/Joolz stroller (EU dist.)",           900, 0.0,  0.05, 1090, 15, 60),
 ("Gaggia Classic Evo Pro (Italy origin)",      460, 0.0,  0.05, 559, 10, 35),
 ("Compressor dehumidifier 20L",                220, 0.027, 0.08, 269, 8, 20),
 ("Foldable Pilates reformer",                  360, 0.073, 0.15, 449, 20, 35),
 ("Padel racket (mid-range, Spain origin)",     150, 0.0,  0.04, 169, 5, 12),
]
print(f"{'Product':44} {'Buy':>6} {'Landed':>7} {'Sell ex-VAT':>11} {'Contrib.':>9} {'Margin':>7}")
for n,eu,duty,fr,loc,cour,ads in rows:
    buy = eu/1.20*0.70          # distributor price ~70% of EU retail ex-VAT (assumption)
    landed = buy*(1+fr)*(1+duty) + 3   # +~€3 customs/broker/scanning fees per unit (assumption)
    sell = loc/1.20             # output VAT 20% (import VAT reclaimed)
    refusal = 0.07*(cour*2)     # 7% COD refusals cost a round trip (assumption)
    warranty = 0.03*sell        # 3% reserve for 2-year liability (assumption)
    c = sell - landed - cour - ads - refusal - warranty
    print(f"{n:44} {buy:6.0f} {landed:7.0f} {sell:11.0f} {c:9.0f} {c/sell*100:6.0f}%")
