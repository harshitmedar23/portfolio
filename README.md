# Harshit Medar Portfolio

A responsive personal developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, tsParticles, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Before deploying, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Personalize

- Update the name, contact links, GitHub username, resume path, skills, project URLs, journey milestones, and achievement entries in `src/data/profile.ts`.
- Add a real resume as `public/resume.pdf`. The Resume controls activate automatically when that file exists.
- Add verified project case-study details to each project's `caseStudy` fields. Empty fields are kept out of the public dialog.
- The contact form uses a `mailto:` draft when an email address is configured; it does not send or store messages on a server.
- GitHub activity and repository links are not fabricated. Add actual profile/repository URLs in the profile data to expose them.

## Deploy

The app is configured for the standard Vercel Next.js deployment flow. Connect the repository and deploy with the default build command, `npm run build`.