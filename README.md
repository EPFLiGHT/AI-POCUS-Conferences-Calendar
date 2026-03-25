# AI-POCUS Conferences Calendar

A website for tracking AI-POCUS research conference deadlines and important dates. Built with Next.js and designed to be embedded via iframe.

A project by [Omar Ziyad Azgaoui](https://github.com/AZOGOAT) from [LiGHT Lab](https://github.com/EPFLiGHT)

## Features

- ⏱️ Live countdown timers with timezone awareness
- 🔍 Search and filtering by year, subject, and type
- 📥 Export individual events to your calendar (ICS format)
- 🖼️ Designed to be embedded via iframe (no header/footer)

## Quick Start

We use **pnpm** for package management.

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Validate YAML data
pnpm validate

# Build for production
pnpm build
```

## Conference Data

Conference information is stored in three YAML files:
- `public/data/conferences.yaml` - Academic conferences
- `public/data/summits.yaml` - Industry summits
- `public/data/workshops.yaml` - Workshops and smaller events

### Basic Schema

```yaml
- title: ShortName              # e.g., NeurIPS, CVPR
  year: 2025
  id: shortname25               # lowercase title + 2-digit year
  full_name: Full Conference Name
  link: https://conference-website.com
  deadline: 2025-05-21 20:00    # YYYY-MM-DD HH:MM
  abstract_deadline: 2025-05-14 20:00  # Optional
  timezone: America/Los_Angeles # IANA timezone
  place: City, Country
  date: May 21-25, 2025
  start: 2025-05-21             # YYYY-MM-DD
  end: 2025-05-25
  paperslink: https://...       # Link to submit papers
  hindex: 150.0                 # h5-index from Google Scholar
  sub: ML                       # Subject tag
  note: Additional information  # Optional notes
  type: conference              # conference, summit, or workshop
```

### Required Fields
- `title`, `year`, `id`, `type`, `timezone`

All other fields are optional and will display as "TBA" if omitted.

**Note:** Find valid IANA timezones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## Tech Stack

- **Framework:** Next.js 16 + React 19
- **UI Library:** Chakra UI v3
- **Icons:** Lucide React
- **Timezone:** Luxon
- **YAML Parsing:** js-yaml
- **Package Manager:** pnpm
- **Deployment:** GitHub Pages

## Contributing

### Adding Conferences

**Option 1: Submit an Issue**
[Open an issue](https://github.com/EPFLiGHT/AI-POCUS-Conferences-Calendar/issues/new/choose) with conference details.

**Option 2: Pull Request**
1. Fork and create a new branch
2. Edit the appropriate YAML file (`conferences.yaml`, `summits.yaml`, or `workshops.yaml`)
3. Run `pnpm validate`
4. Submit PR

### Guidelines
- Only modify YAML files in `public/data/`
- Include all required fields
- Use valid IANA timezones
- Follow ID naming: lowercase title + 2-digit year (e.g., `neurips25`)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Maintainer

Maintained by [Omar Ziyad Azgaoui](https://github.com/AZOGOAT)
Contact: [omar.azgaoui@epfl.ch](mailto:omar.azgaoui@epfl.ch)

---

Made with ❤️ by [LiGHT Lab](https://github.com/EPFLiGHT)
