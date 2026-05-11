# Firebase Setup – Admin Panel & Dynamic Content

Admin panel aur dynamic content ke liye Firebase configure karna zaroori hai.

---

## Step 1: Firebase project banao

1. [Firebase Console](https://console.firebase.google.com) kholo.
2. **Add project** (ya existing project choose karo).
3. Project name daalo → Continue → Google Analytics optional → Create project.

---

## Step 2: Web app add karo

1. Project ke andar **Project overview** (gear icon) → **Project settings**.
2. **Your apps** section mein **</>** (Web) icon pe click karo.
3. **App nickname** daalo (e.g. "RaQuadrant Web") → **Register app**.
4. **Firebase SDK** snippet dikhega. Wahan se **config** object copy karo. Example:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

---

## Step 3: `.env.local` banao

Project root (jahan `package.json` hai) mein **`.env.local`** file banao.

**Mac/Linux (terminal):**
```bash
cd /Users/faiyazmujtaba/Downloads/raquadrant-main
cp .env.local.example .env.local
```

Phir `.env.local` kholo aur Firebase config ki values paste karo:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
```

Har line ke `=` ke baad apne project ki **actual values** daalo (sirf example mat chhodna).

---

## Step 4: Authentication enable karo

1. Firebase Console → **Build** → **Authentication** → **Get started**.
2. **Sign-in method** tab → **Email/Password** → Enable karo → **Save**.
3. **Users** tab → **Add user** → apna admin email + password daalo (yehi se login karoge).

---

## Step 5: Firestore Database banao

1. **Build** → **Firestore Database** → **Create database**.
2. **Start in test mode** (development ke liye) ya production rules choose karo → Next → region choose karo → **Enable**.
3. Production ke liye `firestore.rules` file deploy karo (project mein di hui hai).

---

## Step 6: Dev server restart karo

`.env.local` change karne ke baad server **restart** zaroori hai:

```bash
# Terminal mein Ctrl+C se stop karo, phir:
npm run dev
```

Phir browser mein **http://localhost:3000/admin** kholo → Login page pe **Firebase not configured** hat jana chahiye aur email/password se login ho jana chahiye.

---

## Step 7: Storage (images) + rules deploy karo

Admin panel se image upload ke liye **Storage enable** hona chahiye aur **`storage.rules`** Firebase par publish honi chahiye.

### 7a — Storage “Get started”

1. Firebase Console → **Build** → **Storage** → **Get started** (agar pehle nahi kiya).
2. Default bucket / region choose karo.

### 7b — Rules kahan se update hoti hain (important)

**Vercel / Netlify / koi bhi host sirf Next.js app deploy karta hai.**  
Firebase **Storage rules** alag jagah rehti hain — inhe **Firebase** par hi publish karna padta hai:

**Option A — Terminal (recommended)**  
Project root se (jahan `firebase.json` hai):

```bash
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only storage
```

**Option B — Firebase Console**  
1. [Firebase Console](https://console.firebase.google.com) → apna project → **Build** → **Storage** → **Rules** tab.  
2. Repo ki file **`storage.rules`** ka poora content copy karke yahan paste karo → **Publish**.

Agar rules publish nahi kiye to production (Vercel) par bhi error aayega: *Storage rejected this upload (rules)*.

Firestore rules ke liye:

```bash
firebase deploy --only firestore:rules
```

---

## Step 8: Vercel par deploy (env + Auth domain)

1. **Vercel** → project → **Settings** → **Environment Variables**  
   Wahi 6 values daalo jo `.env.local` mein hain (`NEXT_PUBLIC_FIREBASE_*`).  
   **Wahi Firebase project** hona chahiye jahan tumne Storage + rules setup kiye hon.

2. **Authorized domains** (login ke liye zaroori):  
   Firebase Console → **Authentication** → **Settings** → **Authorized domains**  
   Yahan add karo:
   - `localhost` (dev ke liye pehle se hota hai)
   - **`your-app.vercel.app`** (Vercel preview/production URL)
   - Agar custom domain use karte ho to wo bhi

3. Env change ke baad Vercel par **Redeploy** karo taaki nayi values build mein aayein.

4. **Rules future mein:** har baar `storage.rules` / `firestore.rules` change karne ke baad dubara **`firebase deploy --only storage`** (ya Console se Publish) chalao. Optional: GitHub Actions se automate karne ke liye repo secret **`FIREBASE_TOKEN`** (`firebase login:ci` se) banao aur workflow mein `firebase deploy --only storage,firestore:rules` chalao (GitHub token ko **`workflow`** scope chahiye agar `.github/workflows/` commit karna ho).

---

## Checklist

- [ ] Firebase project bana liya
- [ ] Web app add karke config copy ki
- [ ] `.env.local` bana kar 6 env vars daal diye (koi value khali na ho)
- [ ] Authentication → Email/Password enable kiya
- [ ] Authentication → Users se ek admin user add kiya
- [ ] Firestore Database create kiya
- [ ] Storage enable + `firebase deploy --only storage` (ya Console → Rules paste)
- [ ] Vercel par 6 env vars + Auth mein `*.vercel.app` authorized domain
- [ ] `npm run dev` restart kiya
- [ ] `/admin` pe login try kiya

Agar ab bhi "Firebase not configured" aaye to check karo:
- `.env.local` **project root** mein hai (package.json ke saath).
- Variable names bilkul same hain: `NEXT_PUBLIC_FIREBASE_API_KEY` (typo na ho).
- Values ke beech **extra space** ya quotes nahi (sirf value, no `"`).
- Server restart kiya hai.
