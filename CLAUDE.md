# Oliver Kießler - Static Website

## Projektübersicht

Dies ist die statische Website von Oliver Kießler (oliver-kiessler.de), einem Fullstack-Entwickler und AWS-zertifizierten Experten aus Köln. Die Website ist als mehrsprachige statische HTML-Site aufgebaut.

## Technische Details

### Domain & Hosting
- **Domain**: oliver-kiessler.de (konfiguriert in CNAME)
- **Hosting**: GitHub Pages (erkennbar an .nojekyll Datei)
- **SSL**: Automatisch über GitHub Pages

### Projektstruktur

```
/Users/oliver/workspace/versioned/oliver-kiessler.de-static/
├── de/                     # Deutsche Version der Website
│   ├── index.html         # Startseite (Deutsch)
│   ├── ueber_mich.html    # Über mich
│   ├── lebenslauf.html    # CV/Lebenslauf
│   ├── projekte*.html     # Projektseiten (projekte1-6)
│   ├── meine-dienstleistungen.html
│   ├── ki-llm-loesungen-fuer-unternehmen.html
│   ├── ai-mit-rag.html / ki-mit-rag.html
│   ├── aws-zertifizierter-entwickler.html
│   ├── ionic-app-version-migration.html
│   ├── rails-webapp-migration.html
│   ├── remote-dienstleistungen.html
│   ├── recruiter.html
│   ├── datenschutz.html
│   └── impressum.html
├── en/                     # Englische Version der Website
├── cv/                     # CV/Lebenslauf Bereich
├── assets/                 # Statische Ressourcen
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript Dateien
│   └── fonts/             # Schriftarten
├── images/                 # Bilder und Grafiken
├── index.html             # Landing-Page mit Sprachauswahl (DE/EN), kein Redirect mehr
├── 404.html, 422.html, 500.html  # Fehlerseiten
├── robots.txt             # SEO/Crawler Konfiguration
├── sitemap.xml            # Sitemap für Suchmaschinen
├── manifest.json          # Web App Manifest
├── browserconfig.xml      # Browser Konfiguration
├── humans.txt             # Credits/Team Info
├── CNAME                  # GitHub Pages Domain
├── .nojekyll              # Deaktiviert Jekyll-Processing
└── [diverse Favicon/Icon Dateien]  # App Icons für verschiedene Plattformen
```

## Wichtige Merkmale

### SEO & Meta-Tags
- Umfangreiche Meta-Tags für SEO
- Open Graph Tags für Social Media
- Strukturierte Daten (JSON-LD) für Suchmaschinen
- Mehrsprachige Unterstützung (de/en) mit hreflang-Tags
- Canonical URLs auf allen Seiten
- **Achtung**: Root (`/`) ist eine eigenständige Landing-Page (kein Redirect!)
  - Canonical: `https://oliver-kiessler.de/`
  - hreflang x-default: `/`
  - hreflang de: `/de/index.html`
  - hreflang en: `/en/index.html`
- `de/index.html` ist die deutsche Hauptseite (Canonical self-referencing, Prio 1.0 in Sitemap)
- `en/index.html` ist die englische Hauptseite (Canonical self-referencing, Prio 1.0 in Sitemap)
- hreflang-Tags sind reziprok zwischen allen drei Seiten (/, /de/index.html, /en/index.html)

### Keywords & Expertise
- Fullstack Entwickler
- NodeJS Entwickler/Freelancer
- TypeScript Entwickler
- Angular Freelancer
- AWS Berater/Experte/Entwickler
- IT Agentur & Dienstleister Köln
- AI/KI Software Beratung
- RAG (Retrieval-Augmented Generation) Lösungen

### Progressive Web App Support
- Diverse App Icons für alle Plattformen (iOS, Android, Windows)
- Web App Manifest
- Theme Color Konfiguration

### Technologien
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Vermutlich ein statisches Template-System
- **Hosting**: GitHub Pages
- **Build**: Statische HTML-Dateien (kein Jekyll)

## Entwicklungshinweise

### Lokale Entwicklung
```bash
# Da es eine statische Site ist, kann ein einfacher HTTP-Server verwendet werden:
python3 -m http.server 8000
# oder
npx serve .
```

### Deployment
Die Website wird automatisch über GitHub Pages deployed, wenn Änderungen zum Repository gepusht werden.

### GitHub Pages Redirect-Verhalten
- **HTTP → HTTPS**: Automatischer 301-Redirect durch GitHub Pages. Nicht änderbar, SEO-technisch korrekt.
- **www → apex**: Automatischer 301-Redirect (CNAME = `oliver-kiessler.de`). Nicht änderbar, SEO-technisch korrekt.
- Google Search Console meldet diese automatischen Redirects als "Seite mit Weiterleitung" – das ist erwartet und kein Fehler.
- Wichtig: Alle Canonicals, hreflangs und Sitemap-URLs müssen auf `https://oliver-kiessler.de` (apex, HTTPS) zeigen.

### Wichtige Dateien für Änderungen

1. **Inhalt aktualisieren**:
   - Deutsche Seiten in `/de/`
   - Englische Seiten in `/en/`

2. **Styling anpassen**:
   - `/assets/css/main.css`
   - IE-spezifische Styles in `/assets/css/ie*.css`

3. **SEO/Meta-Daten**:
   - Direkt in den HTML-Dateien
   - `sitemap.xml` für Suchmaschinen
   - `robots.txt` für Crawler-Anweisungen
   - **Sitemap-Konvention**: Nur Seiten aufnehmen, die indexiert werden sollen.
     - `projekte6.html` / `projects6.html`: ✅ in Sitemap
     - `ionic-app-version-migration.html`, `rails-webapp-migration.html`, `remote-dienstleistungen.html`: ❌ NICHT in Sitemap (sollen nicht indexiert werden)
   - **Canonical-Tags**: Jede Seite MUSS Canonical auf sich selbst haben (Ausnahme: Root = `https://oliver-kiessler.de/`)
   - **hreflang**: Neue Seiten brauchen hreflang de/en/x-default Tags

4. **Fehlerseiten**:
   - `404.html`, `422.html`, `500.html`

### Best Practices für Änderungen

1. **Mehrsprachigkeit beachten**: Änderungen sollten sowohl in `/de/` als auch `/en/` durchgeführt werden
2. **SEO erhalten**: Bei Seitenänderungen Meta-Tags und strukturierte Daten aktualisieren
3. **Mobile-First**: Die Site nutzt responsive Design - bei Änderungen Mobile-Ansicht testen
4. **Browser-Kompatibilität**: IE8/9-spezifische Stylesheets sind vorhanden
5. **Performance**: Da es eine statische Site ist, sollten Bilder optimiert und Assets minimiert werden

## Kontakt & Weitere Informationen

- **Website**: https://oliver-kiessler.de
- **Standort**: Köln, NRW, Deutschland (50858)

## Notizen für Claude Code

Bei der Arbeit an diesem Projekt:
- Achte auf die Zweisprachigkeit (de/en)
- Behalte die SEO-Optimierungen bei
- **Root `/` ist eine Landing-Page, kein Redirect!** Unique Content, kein Duplikat von de/index.html
- **`de/index.html` MUSS indexierbar bleiben** – Canonical self-referencing, robots=all, in Sitemap Prio 1.0
- Neue Seiten: Canonical, hreflang, Sitemap-Eintrag nicht vergessen
- Teste Änderungen lokal vor dem Deployment
- Beachte die GitHub Pages Limitierungen (keine serverseitigen Redirects, keine .htaccess)
- Halte die statische Natur der Site bei (kein serverseitiger Code)
- HTTP→HTTPS und www→apex Redirects sind automatisch und korrekt – nicht versuchen zu "fixen"
