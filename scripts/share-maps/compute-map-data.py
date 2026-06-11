#!/usr/bin/env python3
"""Compute data for the three Open Door Index share maps.

Run with cwd = ~/projects/passport-index-dataset (reads the CSVs by relative
path, same convention as generate-open-door-data.sh).

Outputs share-maps/map-data.json in the aiandtractors repo with, per country:
  reach      - the site's passport-strength metric: sum of annual tourist
               arrivals (M) at every destination the passport enters without
               a pre-arranged visa (visa free / VOA / ETA / numeric stay).
  welcome    - the mirror image: sum of annual outbound departures (M) of
               every passport this country admits without a pre-arranged
               visa. "The slice of the world's travelers you hold the door
               open for."
  arr / dep  - World Bank arrivals & departures (M), same year for both,
               preferring 2019 over COVID years (matches the UNWTO file's
               year-selection logic).
  rank       - reach rank (ties share a rank, like the site).
"""
import csv, json, re, os, sys

SH = os.path.expanduser('~/projects/aiandtractors/scripts/generate-open-door-data.sh')
OUT = os.path.expanduser('~/projects/aiandtractors/share-maps/map-data.json')

# Single-source the tourism table from the existing generator.
src = open(SH).read()
m = re.search(r'^TOURISM = (\{.*?\})$', src, re.S | re.M)
TOURISM = eval(m.group(1))

# --- passport access (identical rule to the site generator) ---------------
def is_open(req):
    req = req.strip().lower()
    if req in ('visa free', 'visa on arrival', 'eta'):
        return True
    try:
        int(req); return True
    except ValueError:
        return False

with open('passport-index-matrix-iso3.csv') as f:
    iso3_header = f.readline().strip().split(',')[1:]
with open('passport-index-matrix.csv') as f:
    name_header = f.readline().strip().split(',')[1:]
NAME2ISO3 = dict(zip(name_header, iso3_header))
ISO32NAME = {v: k for k, v in NAME2ISO3.items()}
with open('passport-index-matrix-iso2.csv') as f:
    iso2_header = f.readline().strip().split(',')[1:]
NAME2ISO2 = dict(zip(name_header, iso2_header))

access = {}            # passport -> set of open destinations
admits = {}            # destination -> set of admitted passports
with open('passport-index-tidy.csv') as f:
    for r in csv.DictReader(f):
        p, d, req = r['Passport'], r['Destination'], r['Requirement']
        if p == d:
            access.setdefault(p, set()).add(d)
            continue
        if is_open(req):
            access.setdefault(p, set()).add(d)
            admits.setdefault(d, set()).add(p)
for p in access:
    access[p].add(p)
    admits.setdefault(p, set()).add(p)

# --- Tourism flows ---------------------------------------------------------
# Departures: UN Tourism outbound (fresh, 2024 for most) merged over World
# Bank ST.INT.DPRT as fallback. Arrivals (map 2): the site's UNWTO inbound
# extract. All values in millions of trips/arrivals.

UNWTO_ALIASES = {
    'United States of America': 'United States',
    'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom',
    'Republic of Korea': 'South Korea',
    "Democratic People's Republic of Korea": 'North Korea',
    'Russian Federation': 'Russia',
    'China, Hong Kong Special Administrative Region': 'Hong Kong',
    'China, Hong Kong SAR': 'Hong Kong',
    'China, Macao Special Administrative Region': 'Macao',
    'China, Macao SAR': 'Macao',
    'Macau': 'Macao',
    'Taiwan Province of China': 'Taiwan',
    'Netherlands (Kingdom of the)': 'Netherlands',
    'Viet Nam': 'Vietnam',
    "Côte d'Ivoire": 'Ivory Coast',
    "Côte d’Ivoire": 'Ivory Coast',
    'Türkiye': 'Turkey',
    'Turkiye': 'Turkey',
    'Czechia': 'Czech Republic',
    'Bolivia (Plurinational State of)': 'Bolivia',
    'Iran (Islamic Republic of)': 'Iran',
    'Venezuela (Bolivarian Republic of)': 'Venezuela',
    'Republic of Moldova': 'Moldova',
    'United Republic of Tanzania': 'Tanzania',
    'Syrian Arab Republic': 'Syria',
    "Lao People's Democratic Republic": 'Laos',
    'State of Palestine': 'Palestine',
    'Brunei Darussalam': 'Brunei',
    'Cabo Verde': 'Cape Verde',
    'Democratic Republic of the Congo': 'DR Congo',
    'Republic of the Congo': 'Congo',
    'Eswatini': 'Swaziland',
    'Micronesia (Federated States of)': 'Micronesia',
    'Saint Vincent and the Grenadines': 'Saint Vincent and the Grenadines',
    'Sao Tome and Principe': 'Sao Tome and Principe',
    'São Tomé and Príncipe': 'Sao Tome and Principe',
    'Republic of North Macedonia': 'North Macedonia',
}
def norm(label):
    return UNWTO_ALIASES.get(label, label)

AT = os.path.expanduser('~/projects/aiandtractors')
unwto_out = json.load(open(AT + '/data/unwto-outbound-departures.json'))['data']
unwto_in = json.load(open(AT + '/data/unwto-tourism-2023.json'))['data']

def wb_latest(path):
    """iso3 -> (year, value), most recent year but preferring 2019 over
    the COVID years 2020-2022 (same logic as the UNWTO extracts)."""
    data = json.load(open(path))[1]
    by = {}
    for r in data:
        if r['value'] is None:
            continue
        by.setdefault(r['countryiso3code'], {})[int(r['date'])] = r['value']
    def pick(years):
        best = max(years)
        if best in (2020, 2021, 2022) and 2019 in years:
            return 2019
        return best
    return {iso: (pick(y), y[pick(y)]) for iso, y in by.items()}

WB_DEP = wb_latest('/tmp/wb-departures.json')

# departures per passport country (M), for the welcome metric + map 2
dep_m, dep_year, unmatched = {}, {}, []
for label, rec in unwto_out.items():
    name = norm(label)
    if name in access:
        dep_m[name] = rec['value']
        dep_year[name] = rec['year']
    else:
        unmatched.append(label)
for name, iso3 in NAME2ISO3.items():
    if name not in dep_m and iso3 in WB_DEP:
        y, v = WB_DEP[iso3]
        dep_m[name] = v / 1e6
        dep_year[name] = y

# arrivals per country (M) from the site's UNWTO inbound extract
arr_m = {}
for label, v in unwto_in.items():
    name = norm(label)
    if name in access:
        arr_m[name] = v

missing_dep = sorted(set(access) - set(dep_m))

countries = {}
for p in sorted(access):
    reach = sum(TOURISM.get(d, 0) for d in access[p])
    welcome = sum(dep_m.get(q, 0) for q in admits.get(p, set()))
    iso3 = NAME2ISO3.get(p, '')
    entry = {
        'iso3': iso3,
        'iso2': NAME2ISO2.get(p, ''),
        'reach': round(reach, 1),
        'welcome': round(welcome, 1),
        'admits': len(admits.get(p, set())),
        'opens': len(access[p]),
    }
    # Map 2: inbound arrivals vs outbound departures (UNWTO, latest
    # non-COVID year per series).
    if p in arr_m and p in dep_m:
        entry['arr'] = round(arr_m[p], 2)
        entry['dep'] = round(dep_m[p], 2)
        entry['depYear'] = dep_year[p]
    countries[p] = entry

# rank by reach, ties share
ranked = sorted(countries.items(), key=lambda kv: -kv[1]['reach'])
rank, last = 0, None
for i, (name, e) in enumerate(ranked):
    if e['reach'] != last:
        rank, last = i + 1, e['reach']
    e['rank'] = rank

world_reach = round(sum(TOURISM.values()), 1)
world_dep = round(sum(dep_m.values()), 1)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump({
    'meta': {
        'worldReach': world_reach,        # total annual arrivals in the table (M)
        'worldDep': world_dep,            # total annual departures with WB data (M)
        'passports': len(access),
        'missingDepOrigins': missing_dep, # origins counted as 0 in welcome
    },
    'countries': countries,
}, open(OUT, 'w'), indent=1)

print(f'world reach pool {world_reach}M, world departures pool {world_dep}M')
print('unmatched UNWTO outbound labels:', unmatched)
print(f'{len(countries)} countries, {len(missing_dep)} origins lack departure data:')
print(', '.join(missing_dep))
top = ranked[:3]
print('top reach:', [(n, e['reach']) for n, e in top])
hosp = sorted(countries.items(), key=lambda kv: kv[1]['welcome'] - kv[1]['reach'])
print('most net-guest (red):', [(n, round(c['welcome']-c['reach'])) for n, c in hosp[:5]])
print('most net-host (green):', [(n, round(c['welcome']-c['reach'])) for n, c in hosp[-5:]])
pairs = [(n, c) for n, c in countries.items() if 'arr' in c]
print(f'{len(pairs)} countries with arr/dep pairs')
