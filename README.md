# PureNest Cleanser Website

This is a simple static website for a homemade cleanser company. It uses plain HTML, CSS, and JavaScript, so you do not need a framework or build step to get started.

## Files

- `index.html` contains the page structure and content.
- `styles.css` controls the visual design and layout.
- `script.js` adds the mobile menu toggle.

## How to run locally

### Option 1: Open directly

1. Open `index.html` in your browser.
2. The site will load without installing anything.

### Option 2: Use a local server

If you want a cleaner development workflow, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## How to customize it

### Update your branding

- Change the company name in `index.html`.
- Replace `PureNest` with your actual product or company name.
- Update the email link near the bottom of the page.

### Update product details

- Replace the placeholder ingredient descriptions with your real cleanser ingredients.
- Edit the about and benefits sections so they match your actual product.
- Add your pricing, ordering method, or social links in the contact section.

### Add photos

1. Create an `images` folder.
2. Add your product photos there.
3. Insert image tags into `index.html`, for example:

```html
<img src="images/cleanser-bottle.jpg" alt="Bottle of homemade cleanser" />
```

## How to publish it

You can deploy this static site with services like GitHub Pages, Netlify, or Vercel.

The simplest path is:

1. Put these files in a GitHub repository.
2. Connect the repository to GitHub Pages or Netlify.
3. Publish the site.

## Suggested next improvements

- Add real product photography
- Add testimonials
- Add pricing and product sizes
- Add an order form or checkout link
