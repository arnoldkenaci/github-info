# Landed cost and margin per Ninja model for a VAT-registered Albanian importer. ASSUMPTIONS marked.
# Duty: WITS (2022) Albania MFN 10% for HS 8516.60 / 8509.40 / 8509.80; 2% for 8418.69 (Slushi, if classed as refrigerating).
models = [  # code, EU street price incl. 19% DE VAT (mid of Nov 2026 range), duty, units in test order
  ("Creami NC302EU",        240, 0.10, 3),
  ("Creami Deluxe NC502EU", 230, 0.10, 2),
  ("Dual fryer DZ400EU",    165, 0.10, 4),
  ("Double Stack SL400EU",  160, 0.10, 3),
  ("Slushi FS301EU",        250, 0.02, 2),
  ("Crispi FN101EU",        125, 0.10, 2),
]
FREIGHT_PALLET = 400    # ASSUMPTION: groupage Lithuania/Germany -> Tirana, one pallet
BROKER = 120            # ASSUMPTION: customs broker
SCAN = 22               # scanning fee, declarations over EUR 1,000
COURIER = 7             # ASSUMPTION: domestic courier + COD fee per order
ADS = 20                # ASSUMPTION: ad cost per sale
REFUSAL = 0.07 * 2 * COURIER
WARRANTY = 0.04         # reserve, higher because no SharkNinja warranty on grey stock
units = sum(m[3] for m in models)
fixed_per_unit = (FREIGHT_PALLET + BROKER + SCAN) / units
for label, disc in [("Small-order wholesaler (e.g. BigBuy/DistriHUB): ~8% below street ex-VAT", 0.08),
                    ("Official distributor (Comtrade): ~25% below street ex-VAT", 0.25)]:
    print(f"\n{label}   [{units} units, fixed import costs EUR {fixed_per_unit:.0f}/unit]")
    print(f"{'Model':24}{'Buy':>6}{'Landed':>8}{'Sell AL':>9}{'Profit':>8}{'Margin':>8}")
    tot_buy = tot_profit = 0
    for code, eu, duty, n in models:
        buy = eu / 1.19 * (1 - disc)
        customs_value = buy + fixed_per_unit * FREIGHT_PALLET / (FREIGHT_PALLET + BROKER + SCAN)  # CIF incl. freight
        landed = buy + fixed_per_unit + customs_value * duty
        sell_incl = round(eu * 1.15 / 10) * 10 - 1        # ASSUMPTION: Albanian price ~15% above German street price
        sell = sell_incl / 1.20
        profit = sell - landed - COURIER - ADS - REFUSAL - WARRANTY * sell
        tot_buy += buy * n; tot_profit += profit * n
        print(f"{code:24}{buy:6.0f}{landed:8.0f}{sell_incl:9.0f}{profit:8.0f}{profit/sell*100:7.0f}%")
    print(f"Stock cash needed ~EUR {tot_buy + FREIGHT_PALLET + BROKER + SCAN:,.0f}; profit if all {units} sell ~EUR {tot_profit:,.0f}")
