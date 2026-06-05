# neebtools

NebTools
Smart Tools for NEB Students — A free, modern, and comprehensive educational platform built for NEB (National Examination Board) Grade 11 & 12 students in Nepal.
 
Overview
NebTools is a production-ready, static website designed to be hosted directly on GitHub Pages. It provides a suite of powerful, easy-to-use tools specifically tailored for the NEB curriculum, including GPA calculation, accounting automation, formula lookup, and productivity tools.
Key Features
•	GPA Calculator — Calculate GPA instantly using the official NEB grading system
•	Accounting Automator — Auto-generate Trial Balance, Income Statement, and Balance Sheet
•	Formula Hub — Search 65+ formulas across Accounting, Economics, and Business Studies
•	Percentage Calculator — Quick percentage calculations for exams and data analysis
•	CGPA Calculator — Calculate cumulative GPA across multiple semesters
•	Study Timer — Pomodoro-style timer to boost focus and productivity
•	Dark/Light Mode — Toggle between themes with persistent preference
•	Fully Responsive — Optimized for mobile, tablet, and desktop
•	PWA Ready — Can be installed as a Progressive Web App
•	Print & PDF Export — Export accounting statements directly
 
Tech Stack
Table
Technology	Purpose
HTML5	Semantic markup, SEO optimization
CSS3	Modern styling, animations, glassmorphism
Vanilla JavaScript	All functionality, no frameworks needed
Font Awesome	Icons
Google Fonts (Inter)	Typography
GitHub Pages	Free hosting
 
Project Structure
plain
nebtools/
│
├── index.html          # Main HTML file (single page application)
├── style.css           # Complete stylesheet with CSS variables
├── script.js           # All JavaScript functionality
├── assets/
│   ├── logo.png        # NebTools logo (book + gear icon)
│   └── favicon.png     # Site favicon
├── sw.js               # Service Worker (optional, for PWA)
└── README.md           # This file
 

 
Brand Assets
Logo Requirements
The logo should be placed in assets/logo.png. It should be:
•	Format: PNG with transparent background (preferred)
•	Size: 512x512px or larger for high DPI displays
•	Design: Book + gear icon combination (as shown in the project)
Favicon
The favicon should be placed in assets/favicon.png:
•	Size: 32x32px or 64x64px
•	Format: PNG
You can generate a favicon from your logo using favicon.io
 
Customization Guide
Changing Brand Colors
Edit the CSS variables in style.css:
css
:root {
    --primary: #0E7490;       /* Main brand color */
    --primary-light: #0891B2; /* Secondary color */
    --accent: #06B6D4;        /* Accent color */
    --bg-dark: #0A0E17;       /* Dark background */
    --bg-card: #111827;       /* Card background */
}
Adding New Tools
1.	Add a new card in the Bento Grid section of index.html
2.	Create a new modal section following the existing pattern
3.	Add the JavaScript functionality in script.js
Adding More Formulas
Edit the FORMULA_DB array in script.js:
JavaScript
{ 
    name: 'Your Formula Name', 
    formula: 'Formula = Expression', 
    category: 'accounting', // or 'economics' or 'business'
    desc: 'Description of what this formula does' 
}
 
Browser Support
Table
Browser	Version
Chrome	90+
Firefox	88+
Safari	14+
Edge	90+
Opera	76+
Mobile Chrome	90+
Mobile Safari	14+
 
Performance Optimization
The site is optimized for fast loading:
•	No external JS frameworks — Pure vanilla JS for zero dependencies
•	CSS-only animations — No JS animation libraries
•	Lazy loading — Intersection Observer for scroll animations
•	Minimal HTTP requests — Only 3 files needed (HTML, CSS, JS)
•	CDN fonts — Google Fonts loaded with display=swap
Lighthouse Scores (Expected)
•	Performance: 95-100
•	Accessibility: 95-100
•	Best Practices: 100
•	SEO: 95-100
 
SEO Features
•	Semantic HTML5 structure
•	Meta description and keywords
•	Open Graph tags for social sharing
•	Twitter Card support
•	Structured heading hierarchy (H1 → H2 → H3)
•	Alt text on all images
•	Mobile-friendly responsive design
•	Fast loading times
 
Contributing
We welcome contributions! If you'd like to improve NebTools:
1.	Fork the repository
2.	Create a feature branch: git checkout -b feature-name
3.	Make your changes
4.	Commit: git commit -m "Add feature"
5.	Push: git push origin feature-name
6.	Open a Pull Request
Ideas for Contributions
•	Add more NEB-specific formulas
•	Add a notes/flashcards feature
•	Add a question bank
•	Improve accessibility (ARIA labels)
•	Add Nepali language support
•	Add unit conversion tools
 
License
This project is open source and available under the MIT License.
plain
MIT License

Copyright (c) 2026 NebTools

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 
Contact
•	Email: help.nebtool@gmail.com
•	Website: nebtools.github.io
•	Issues: GitHub Issues


