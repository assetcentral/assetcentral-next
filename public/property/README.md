# Hero property photo

The marketing-site hero's central card loads its photo from this folder:

    /public/property/oakfield-road.webp

Drop the file in at that exact path before deploying. The image renders inside a 5:3 aspect box, ~220–240px wide on mobile and ~260px on desktop, so a source of around 800×480px (or larger, same ratio) keeps it crisp on retina without bloating the bundle.

If you swap the filename — say to use a JPG or a different address — update the `src` in `components/marketing/DontBuyBlindHero.tsx` (search for `/property/oakfield-road.webp`).

Until a file exists at this path, the card shows a soft slate/indigo gradient as a placeholder.
