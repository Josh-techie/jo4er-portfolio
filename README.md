# jo4er-portfolio

A modern, multi-language portfolio website showcasing cybersecurity expertise, projects, and professional experience.

## Features

- **Multi-Language Support**: Automatically detects browser language and supports 5 languages:
  - French (FR)
  - English (EN)
  - Spanish (ES)
  - Italian (IT)
  - German (DE)

- **Theme Adaptation**: Automatically detects system color scheme preference (light/dark mode)

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

- **Interactive UI**: 
  - Smooth scroll navigation
  - Animated transitions using Framer Motion
  - Language dropdown with solid background (no transparency issues)
  - Back-to-top button

- **Content Sections**:
  - Hero/Landing page with typewriter animation
  - Services overview
  - About Me with GitHub stats integration
  - Portfolio projects with filtering
  - Experience timeline
  - Resume download (language-specific CVs)
  - Footer with navigation and social links

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14
- **Styling**: [Styled Components](https://styled-components.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Material-UI Icons
- **Deployment**: Docker + Docker Compose

## Project Structure

```
Portfolio/
├── components/          # React components
│   ├── LayoutTemplate.jsx      # Main layout with navbar
│   ├── FooterPage.jsx          # Footer with navigation
│   ├── LanguageDropdown.jsx    # Language selector
│   ├── TechsGrid.jsx           # Technology stack display
│   └── ...
├── pages/              # Next.js pages
│   ├── index.jsx               # Landing page
│   ├── portfolio.jsx           # Projects showcase
│   ├── experience.jsx          # Experience timeline
│   └── a-propos.jsx            # About me page
├── data/               # Static data
│   ├── experiences.js          # Work experience by language
│   └── projects.js             # Projects by language
├── config/localization/# Translation files
│   ├── frfr.json               # French
│   ├── enuk.json               # English
│   ├── eses.json               # Spanish
│   ├── itit.json               # Italian
│   └── dede.json               # German
├── context/            # React context providers
│   └── SettingsContext.jsx     # Theme & language state
├── public/             # Static assets
│   └── cv/                     # Resume PDFs
│       ├── CV_Fr_YoussefAbouyahia.pdf
│       └── CV_Eng_YoussefAbouyahia.pdf
├── Dockerfile          # Docker configuration
└── compose.yaml        # Docker Compose setup
```

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (optional)

## Customization

### Adding a New Language

1. Create a new JSON file in `config/localization/` (e.g., `ptbr.json`)
2. Add the language import to `context/SettingsContext.jsx`
3. Add the language to the `listaIdiomas` object and `browserLangToId` mapping
4. Add the language option to `LanguageDropdown.jsx`
5. Add translated content to `data/experiences.js` and `data/projects.js`

### Updating Content

- **Experience**: Edit `data/experiences.js`
- **Projects**: Edit `data/projects.js`
- **Text/Labels**: Edit the appropriate JSON file in `config/localization/`

### Theme Colors

Edit `styles/Theme.js` to customize the color scheme for both light and dark modes.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static site generation with Next.js
- Optimized images with Next.js Image component
- Lazy loading for below-the-fold content
- Minimal JavaScript bundle size

## License

MIT License - feel free to use this portfolio as a template for your own.

## Contact

- **Website**: [jo4er.com](https://jo4er-portfolio.vercel.app/)
- **GitHub**: [@Josh-techie](https://github.com/Josh-techie)

---

Built with passion by Youssef Abouyahia © 2026
