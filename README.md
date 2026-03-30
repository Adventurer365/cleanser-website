# OneClean Website

This is a simple static website for OneClean, a handmade household and personal cleaning products business. It uses plain HTML, CSS, and JavaScript, so you do not need a framework or build step to get started.

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
- Replace `OneClean` with your actual product or company name if it changes.
- Update the contact section near the bottom of the page with your name and business email.

### Update product details

- Update the product list section with your current categories.
- Add new product cards by duplicating one of the existing product items in `index.html`.
- Edit the about and benefits sections so they match your actual business.
- Add your pricing, ordering method, or social links in the contact section.

### Add photos

1. Create an `images` folder.
2. Add your product photos there.
3. Insert image tags into `index.html`, for example:

```html
<img src="images/body-wash.jpg" alt="OneClean body wash bottle" />
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
