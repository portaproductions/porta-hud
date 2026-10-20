#!/usr/bin/env python3
"""Exact session numbers for the Porta HUD. Prints: data-c="PCT" data-t="TOKENS" data-time="ELAPSED"
Reads the newest Claude session transcript (~/.claude/projects/*/*.jsonl). Context window default 1,000,000."""
import glob, json, os, sys
from datetime import datetime, timezone
WIN = int(os.environ.get('HUD_WINDOW', '1000000'))
files = sorted(glob.glob(os.path.expanduser('~/.claude/projects/*/*.jsonl')), key=os.path.getmtime)
if not files: sys.exit('no transcript')
f = files[-1]
first = None; ctx = 0; out = 0
for line in open(f, errors='ignore'):
    try: d = json.loads(line)
    except Exception: continue
    ts = d.get('timestamp')
    if ts and first is None: first = ts
    u = (d.get('message') or {}).get('usage') if isinstance(d.get('message'), dict) else None
    if u and not d.get('isSidechain'):
        ctx = u.get('input_tokens', 0) + u.get('cache_read_input_tokens', 0) + u.get('cache_creation_input_tokens', 0)
        out += u.get('output_tokens', 0)
pct = round(ctx * 100 / WIN)
k = lambda n: f'{n/1000:.0f}K' if n < 1e6 else f'{n/1e6:.2f}M'
el = ''
if first:
    s = (datetime.now(timezone.utc) - datetime.fromisoformat(first.replace('Z', '+00:00'))).total_seconds()
    h, m = int(s // 3600), int(s % 3600 // 60)
    el = f'{h}h {m}m' if h else f'{m}m'
print(f'data-c="{pct}" data-t="{k(ctx)}" data-time="{el}"  # out {k(out)}')
