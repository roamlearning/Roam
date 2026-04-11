# Roam Learning Website

## Setup Instructions

### 1. Push to GitHub

```bash
# Clone your repo
git clone https://github.com/roamlearning/Roam.git
cd Roam

# Copy all these files into the repo folder
# Then push:
git add .
git commit -m "Initial website commit"
git push origin main
```

### 2. Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** → Select the `roamlearning/Roam` repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**

### 3. Add Environment Variables (in Netlify)

Go to Site Settings → Environment Variables:
- `NETLIFY_AUTH_TOKEN` = Your Netlify personal access token

### 4. Connect Custom Domain

1. In Netlify, go to **Domain Management**
2. Click **Add custom domain**
3. Enter: `roamlearning.org`
4. Follow DNS instructions provided by Netlify

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```
