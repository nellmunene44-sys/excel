# Excel Reporting Portfolio Website

Professional 3-page portfolio website for **Nelis Munene** (Excel Reporting & Automation Specialist).

## Live Site Purpose
Positioning:
- Excel Reporting & Executive Dashboard Expert
- Automated dashboards, reporting systems, and board-ready outputs

Primary goal:
- Convert visitors into qualified inquiries through clear service messaging and contact forms

## Pages
- `index.html` - Home page (services, process, trust, CTA form)
- `samples-about.html` - Project samples and background
- `contact.html` - Dedicated contact page with qualification form
- `thank-you.html` - Post-submission confirmation page
- `404.html` - Custom not-found page

## Tech Stack
- HTML5
- CSS3 (modular structure)
- Vanilla JavaScript

## Project Structure
```text
.
├─ assets/
│  ├─ favicon.png
│  ├─ nelis-hero.jpg
│  ├─ sample-1.jpg ... sample-6.jpg
├─ css/
│  ├─ base.css
│  ├─ layout.css
│  ├─ components.css
│  └─ pages.css
├─ js/
│  ├─ main.js
│  └─ samples.js
├─ index.html
├─ samples-about.html
├─ contact.html
├─ thank-you.html
├─ 404.html
├─ styles.css
├─ robots.txt
└─ sitemap.xml
```

## Forms and Email Delivery
Forms are configured with **FormSubmit** to send inquiries to:
- `thuomunene04@gmail.com`

Features:
- Required validation (name, email, details + qualification fields)
- Anti-spam honeypot (`_honey`)
- Redirect to `thank-you.html` using `_next`

Important:
- If FormSubmit is new, submit once and confirm the activation email.

## Analytics
Event tracking hooks are wired in JavaScript for:
- Form submissions
- Sample filter/sort actions
- Sample file opens

Plausible script is included in page `<head>` tags.

## SEO / Metadata
Implemented:
- Canonical tags
- Open Graph tags
- Twitter card tags
- Structured data (Person + ProfessionalService where applicable)
- `robots.txt`
- `sitemap.xml`

## Run Locally
You can open the HTML files directly, but for best behavior use a local server.

Example (VS Code Live Server or Python):
```bash
python -m http.server 5500
```

Then open:
- `http://localhost:5500/index.html`

## Deploy (GitHub Pages)
1. Push to `main` branch.
2. In GitHub repo settings, open **Pages**.
3. Set source to **Deploy from a branch**.
4. Select `main` and root (`/`) folder.
5. Save and wait for publish.

## Contact
- **Name:** Nelis Munene
- **Title:** Excel Reporting & Automation Specialist
- **Email:** `thuomunene04@gmail.com`
