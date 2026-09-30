# ResumeCraft - Online Resume Builder (Task 2, Problem #42)

React app where a user enters personal, education, experience, project and skill details and gets a live resume preview that can be printed / saved as PDF.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Views (3 routed pages, hash routing)
| Route | Page | Purpose |
|---|---|---|
| `#/` | Dashboard | create, search, filter, sort, duplicate, delete resumes |
| `#/builder/:id` | Builder | tabbed forms + live preview + strength score |
| `#/preview/:id` | Preview | full-size resume, template switch, print / save as PDF |

## Requirement checklist
- **Hooks**: `useState` (forms, tabs, filters), `useEffect` (localStorage save, hashchange listener, document title), custom hooks `useLocalStorage`, `useHashRoute`
- **Form handling + validation**: name, email, Indian phone, URLs, year, date order, duplicate skills, title length (`utils/validators.js`)
- **Add / edit / delete**: Education, Experience, Projects via reusable `EntryEditor`; skills chips; resume delete/duplicate
- **Search / filter / calculation**: dashboard search + template filter + sort; skill suggestions filter; resume strength score out of 100 (`utils/resumeScore.js`)
- **Responsive**: CSS grid/flex, breakpoints at 900px and 560px, print stylesheet

## Structure
```
src/
  App.jsx            route switch + state
  pages/             Dashboard, Builder, Preview
  components/        Navbar, Field, PersonalForm, EntryEditor, SkillsEditor, ScoreCard, ResumePreview
  hooks/             useLocalStorage, useHashRoute
  utils/             validators, resumeScore, sampleData
```

## Push to GitHub
```bash
git init
git add .
git commit -m "ResumeCraft: online resume builder"
git branch -M main
git remote add origin https://github.com/<your-username>/resumecraft.git
git push -u origin main
```
