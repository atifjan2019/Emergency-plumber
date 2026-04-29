# Website Media Files

All generated images for the Emergency Plumber Now website.
Images are named after the section/page where they should be used.

## Folder Structure

```
media/
├── hero-engineer.png       → Homepage hero (right column) - 1200×900 recommended
├── hero-van.png            → Homepage emergency section & CTA background - 1600×900
├── about-team.png          → About page hero - 1600×900
├── services/
│   ├── burst-pipe.png      → Burst Pipe Repair service page hero - 1200×800
│   ├── boiler-repair.png   → Emergency Boiler Repair service page hero - 1200×800
│   ├── blocked-drain.png   → Blocked Drain Clearance service page hero - 1200×800
│   ├── leak-detection.png  → (NOT YET GENERATED - quota hit)
│   ├── no-hot-water.png    → (NOT YET GENERATED - quota hit)
│   ├── heating-repair.png  → (NOT YET GENERATED - quota hit)
│   ├── blocked-toilet.png  → (NOT YET GENERATED - quota hit)
│   └── 24-7-plumber.png    → (NOT YET GENERATED - quota hit)
└── cities/
    ├── london.png          → (NOT YET GENERATED - quota hit)
    ├── manchester.png      → (NOT YET GENERATED - quota hit)
    ├── birmingham.png      → (NOT YET GENERATED - quota hit)
    ├── glasgow.png         → (NOT YET GENERATED - quota hit)
    ├── leeds.png           → (NOT YET GENERATED - quota hit)
    ├── liverpool.png       → (NOT YET GENERATED - quota hit)
    ├── bristol.png         → (NOT YET GENERATED - quota hit)
    ├── sheffield.png       → (NOT YET GENERATED - quota hit)
    ├── edinburgh.png       → (NOT YET GENERATED - quota hit)
    ├── newcastle.png       → (NOT YET GENERATED - quota hit)
    ├── nottingham.png      → (NOT YET GENERATED - quota hit)
    └── cardiff.png         → (NOT YET GENERATED - quota hit)
```

## ✅ Generated (6 images)

| File | Used On | Description |
|------|---------|-------------|
| `hero-engineer.png` | Homepage hero section (right column) | Plumber repairing copper pipework under a kitchen sink |
| `hero-van.png` | Homepage emergency block, CTA section bg | Plumber van on UK street at dusk, engineer walking to house |
| `about-team.png` | About page hero section | Team of 6 plumbing engineers in blue uniforms |
| `services/burst-pipe.png` | Burst Pipe Repair service page | Plumber cutting out corroded copper pipe section |
| `services/boiler-repair.png` | Emergency Boiler Repair service page | Engineer diagnosing a wall-mounted combi boiler |
| `services/blocked-drain.png` | Blocked Drain Clearance service page | Drain engineer using high-pressure jetting |

## ❌ Still Needed (17 images - image generation quota exhausted)

### Service Images (5 remaining)
| File | Used On | Suggested Prompt |
|------|---------|-----------------|
| `services/leak-detection.png` | Leak Detection service page | Plumber using thermal imaging camera on a kitchen floor |
| `services/no-hot-water.png` | No Hot Water service page | Plumber repairing hot water cylinder and immersion heater |
| `services/heating-repair.png` | Central Heating Repair service page | Heating engineer bleeding a radiator in a UK living room |
| `services/blocked-toilet.png` | Blocked Toilet service page | Plumber with auger equipment clearing a toilet blockage |
| `services/24-7-plumber.png` | 24 Hour Plumber service page | Plumber arriving at a front door at night with headtorch |

### City Images (12)
| File | Used On | Suggested Subject |
|------|---------|-------------------|
| `cities/london.png` | London city page header | London residential street, Victorian terraces |
| `cities/manchester.png` | Manchester city page header | Manchester Edwardian terraces |
| `cities/birmingham.png` | Birmingham city page header | Birmingham residential area |
| `cities/glasgow.png` | Glasgow city page header | Glasgow sandstone tenements |
| `cities/leeds.png` | Leeds city page header | Leeds back-to-back terraces |
| `cities/liverpool.png` | Liverpool city page header | Liverpool Georgian terraces |
| `cities/bristol.png` | Bristol city page header | Bristol Clifton townhouses |
| `cities/sheffield.png` | Sheffield city page header | Sheffield residential streets |
| `cities/edinburgh.png` | Edinburgh city page header | Edinburgh New Town buildings |
| `cities/newcastle.png` | Newcastle city page header | Newcastle residential area |
| `cities/nottingham.png` | Nottingham city page header | Nottingham suburban streets |
| `cities/cardiff.png` | Cardiff city page header | Cardiff residential area |

## Also Used As (multi-use images from homepage)

These homepage images appear in multiple sections:
- `hero-engineer.png` → Also used for service deep-dive sections, prevention section, "Why choose us" section
- `hero-van.png` → Also used for emergency block section, recent jobs section, final CTA overlay

## Integration Notes

When ready to add to the live site:
1. Convert PNG to JPG for web performance (or use Next.js Image component which handles optimisation)
2. Copy to `public/images/` following the path structure in `public/images/README.md`
3. Update `PLACEHOLDER_IMAGE` constant in `lib/plumbingContent.ts` to use local paths
4. Update `REVIEWER.photoUrl` in `lib/constants.ts` for the reviewer headshot
