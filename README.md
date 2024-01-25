# What is this project
I want to design and create with purpose of helping people with learning new languages.
Currently in this repository there are resources to learn german, but it can be changed by removing files in './src/data/sentences' and './src/data/vocabulary'
and adding your own. One thing you need to remember is to use correct separator (default separator is =), separator can be changed in './src/lib/settings.ts'.
Currently there is only one endpoint '/vocabulary', it reads all files in './src/data/vocabulary', randomises order of items and then allows you to check your knowledge.

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
