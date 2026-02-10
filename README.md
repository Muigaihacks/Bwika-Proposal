# Bwika Proposal 💕

A “Will you be my Valentine?” page you can send as a link over email. She opens the link, sees your message and photos, and when she clicks **Yes** she gets a fun confetti + hearts animation.

## What you need to do

### 1. Add your photos

- Put your photos in **`public/photos/`**.
- Name them `photo1.jpg`, `photo2.jpg`, `photo3.jpg` (or edit `src/App.tsx` and change the `PHOTOS` array to match your filenames).
- You can use more or fewer than 3 — add or remove entries in the array and the grid adjusts.

### 2. Run it locally (optional)

```bash
npm install
npm run dev
```

Open **http://localhost:5173** to preview.

### 3. Deploy so you get a link to email

**Option A – Vercel (recommended)**

1. Push this repo to GitHub (it’s already at [Muigaihacks/Bwika-Proposal](https://github.com/Muigaihacks/Bwika-Proposal)).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import **Bwika-Proposal**.
3. Leave settings as default → **Deploy**.
4. Your link will be like: **`https://bwika-proposal.vercel.app`** (or a custom name you set).

**Option B – Netlify**

1. Push to GitHub, then at [netlify.com](https://netlify.com): **Add new site** → **Import from Git** → choose **Bwika-Proposal**.
2. Build command: `npm run build`  
   Publish directory: `dist`
3. Deploy. You’ll get a link like **`https://something.netlify.app`**.

### 4. Send the link by email

- From your email, write a short message and paste the deployment link (e.g. the Vercel or Netlify URL).
- When she opens the link on her phone or laptop, she’ll see the page and the **Yes** button — and the animation when she clicks it.

---

Built with React, Vite, and [canvas-confetti](https://www.npmjs.com/package/canvas-confetti).
