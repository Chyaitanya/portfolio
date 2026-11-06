# Chaitanya Sutrave — Portfolio

A responsive personal portfolio highlighting my work and interests in Python, Django, and database-driven applications.

## Features

- Responsive portfolio layout with About, Skills, Experience, Projects, and Contact sections
- Animated typing headline, scroll reveals, skill meters, and interactive project cards
- Contact form that opens the visitor's default email application
- No build step or package installation required

## Run locally

Open `index.html` in a browser, or start a local server from the project directory:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Portfolio content and page structure |
| `style.css` | Stylesheet loaded by the page |
| `script.js` | Typing effect, animations, and interactions |
| `styles.css` | Additional stylesheet, not currently loaded by `index.html` |

## Publish with GitHub Pages

This is a static site and can be hosted with GitHub Pages:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder, then save.

Once GitHub Pages finishes publishing, its URL will appear in the Pages settings.
