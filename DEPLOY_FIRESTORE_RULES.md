# Firestore Rules Deploy – "Missing or insufficient permissions" fix

Admin panel mein content edit karne ke liye Firestore **security rules** deploy karne zaroori hain.

---

## Option A: Firebase Console se (sabse simple)

1. **[Firebase Console](https://console.firebase.google.com)** kholo → apna project **raquadrant** select karo.
2. Left side se **Build** → **Firestore Database** pe jao.
3. Upar **Rules** tab pe click karo.
4. Jo abhi rules dikh rahe hain unhe **delete** karo aur niche wale **poora** block copy karke paste karo.
5. **Publish** pe click karo.

**Yeh rules paste karo:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /heroSlides/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /introPoints/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /testimonials/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /partners/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /featuredProjects/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /aboutStats/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /whatSetsUsApart/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /leadership/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /services/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /scopeOfWork/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /executionProcess/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /contactSubmissions/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
      allow update: if false;
    }
  }
}
```

---

## Option B: Firebase CLI se

1. **Firebase CLI** install karo (agar nahi hai):
   ```bash
   npm install -g firebase-tools
   ```
2. Login karo:
   ```bash
   firebase login
   ```
3. Project root mein (jahan `firebase.json` hai) run karo:
   ```bash
   firebase use raquadrant
   firebase deploy --only firestore:rules
   ```

---

Publish / deploy ke baad admin panel refresh karo – "Missing or insufficient permissions" hat jana chahiye.
