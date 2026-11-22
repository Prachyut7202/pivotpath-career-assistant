from pathlib import Path
p=Path(__file__).parent
t=(p/'template.html').read_text()
t=t.replace('/*__CSS__*/',(p/'style.css').read_text()).replace('/*__DATA__*/',(p/'roles.json').read_text().strip()).replace('/*__JS__*/',(p/'app.js').read_text())
(p/'index.html').write_text(t)
print('Bundled index.html', (p/'index.html').stat().st_size,'bytes')
