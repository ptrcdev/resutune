# Resume Analyzer Frontend

A sleek, responsive Next.js application for analyzing resumes against job descriptions. This tool leverages state-of-the-art NLP techniques (via spaCy and OpenAI) from our backend services to provide actionable feedback, detailed scoring, and improvement suggestions to help job seekers optimize their resumes.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## Overview

This project is the frontend part of a Resume Analyzer application that allows users to either upload a resume file (PDF, DOCX, or TXT) or paste resume text. The application then sends the data to backend services (a NestJS API and a Python analysis service) to compute a comprehensive analysis report that includes:

- **Overall Fit Score** – A percentage score indicating how well the resume matches a given job description.
- **Detailed Metrics** – Including word count, sentence length, readability, keyword optimization, and more.
- **Improvement Suggestions** – Actionable tips to refine the resume.
- **OpenAI Feedback** – Qualitative and actionable feedback rendered from Markdown.

---

## Features

- **Multi-Mode Input:** Choose between uploading a resume file or pasting resume text.
- **Real-Time Analysis:** Submit your resume and receive a detailed analysis report.
- **Intuitive UI:** Clean, mobile-first design using Tailwind CSS and modern UI components.
- **Markdown Rendering:** Displays OpenAI feedback in a user-friendly format using react-markdown.
- **API Integration:** Seamlessly interacts with the deployed backend services.

---

## Technologies

- **Frontend Framework:** Vite with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components & Radix UI
- **Markdown Rendering:** react-markdown
- **State Management:** React hooks
- **API Integration:** Fetch API with environment variable support

---

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:ptrcdev/resutune.git
   cd resutune

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

## Environment Variables:

   Create a `.env.local` file in the root directory and add the following variables:

   ```bash
   VITE_NESTJS_API_URL=http://localhost:3100
   VITE_PYTHON_API_URL=http://localhost:8000
   ```

## Running Locally

   ```bash
   pnpm run dev
   ```

   Then open http://localhost:8080 on your browser.

## Project Structure

```bash
resutune/
├── src/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── App.tsx
├── .env.local
├── package.json
├── README.md
└── vite.config.ts
```

## Deployment

The frontend is deployed on Vercel with continuous integration from Github.

## Future Improvements

- Enhanced Feedback: Refine the resume analysis rubric based on user feedback.
- User Authentication: Allow users to save and revisit past analyses.
- Additional File Parsing: Improve file parsing capabilities for various resume formats.
- Progressive Web App (PWA): Implement PWA features for offline usage.
- UI/UX Enhancements: Further polish the user interface based on user testing.
