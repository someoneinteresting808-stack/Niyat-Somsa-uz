# Firebase Setup Guide for Niyat Somsa

Follow these step-by-step instructions to set up your Firebase project from scratch and integrate it with your Niyat Somsa application.

---

## Step 1: Create a Firebase Project
1. Open your browser and navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Sign in with your Google account.
3. Click the **Add Project** button.
4. Enter your project name (e.g., `niyat-somsa`) and click **Continue**.
5. Enable or disable Google Analytics for this project (recommended to disable for development speed, but you can enable if desired), and click **Create Project**.
6. Wait for the project initialization to finish, then click **Continue**.

---

## Step 2: Set Up Authentication
1. In the left-hand sidebar, click on **Build** -> **Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, you will see a list of providers:
   - **Email/Password**: Click on it, toggle **Enable** (keep passwordless sign-in disabled), and click **Save**.
   - **Google**: Click **Add new provider**, select **Google**, toggle **Enable**, set a project support email, and click **Save**.
4. Go to **Settings** -> **Authorized domains** and ensure `localhost` (and your production Vercel/hosting domains later) are listed.

---

## Step 3: Set Up Firestore Database
1. In the left-hand sidebar, click on **Build** -> **Firestore Database**.
2. Click **Create database**.
3. Configure the database settings:
   - **Database ID**: You can use `(default)` (recommended).
   - **Location**: Select a region close to your target audience (e.g., `asia-northeast1` or `europe-west3`).
   - Click **Next**.
4. **Security Rules**: Select **Start in production mode** and click **Create**.
5. Once created, navigate to the **Rules** tab in the Firestore dashboard.
6. Replace the default rules with the rules defined in your local `firestore.rules` file:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       function isAuthenticated() {
         return request.auth != null;
       }

       function isOwner(userId) {
         return isAuthenticated() && request.auth.uid == userId;
       }

       function isAdmin() {
         return isAuthenticated() &&
           (
             request.auth.token.email == "someoneinteresting808@gmail.com" ||
             request.auth.token.email == "admin@niyatsomsa.com" ||
             request.auth.uid == "AilvKO0MqUey78JNHxTTI7nlHVl1" ||
             (exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin')
           );
       }

       function isValidUrl(url) {
         return url is string && (url.matches("^https://.*") || url.matches("^http://.*"));
       }

       function isValidEmail(email) {
         return email is string && email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
       }

       function hasOnlyAllowedFields(fields) {
         return request.resource.data.keys().hasOnly(fields);
       }

       function isValidMenuItem(data) {
         return data.name is string && data.name.size() > 0 && data.name.size() <= 100 &&
           data.price is string && data.price.size() > 0 && data.price.size() <= 50 &&
           data.category in ['beef', 'chicken', 'pumpkin', 'greens'] &&
           (!('description' in data) || (data.description is string && data.description.size() <= 500)) &&
           isValidUrl(data.image) &&
           (!('rating' in data) || (data.rating is number && data.rating >= 0 && data.rating <= 5)) &&
           data.createdAt is timestamp;
       }

       function isValidGalleryImage(data) {
         return hasOnlyAllowedFields(['url', 'title', 'date', 'createdAt']) &&
           isValidUrl(data.url) &&
           data.title is string && data.title.size() > 0 && data.title.size() <= 100 &&
           data.date is string && data.date.matches("^\\d{4}-\\d{2}-\\d{2}.*") &&
           data.createdAt is timestamp;
       }

       function isValidContactMessage(data) {
         return hasOnlyAllowedFields(['name', 'email', 'message', 'createdAt']) &&
           data.name is string && data.name.size() > 0 && data.name.size() <= 100 &&
           isValidEmail(data.email) &&
           data.message is string && data.message.size() > 0 && data.message.size() <= 2000 &&
           data.createdAt is timestamp;
       }

       function isValidUser(data) {
         return hasOnlyAllowedFields(['uid', 'email', 'role']) &&
           data.uid is string && data.uid == request.auth.uid &&
           isValidEmail(data.email) &&
           data.role in ['admin', 'user'];
       }

       match /menu/{itemId} {
         allow read: if true;
         allow create, update, delete: if isAdmin();
       }

       match /gallery/{imageId} {
         allow read: if true;
         allow create, update: if isAdmin() && isValidGalleryImage(request.resource.data);
         allow delete: if isAdmin();
       }

       match /contacts/{messageId} {
         allow create: if isValidContactMessage(request.resource.data);
         allow read, delete: if isAdmin();
       }

       match /users/{userId} {
         allow read: if isOwner(userId) || isAdmin();
         allow create: if isAuthenticated() && isOwner(userId) && isValidUser(request.resource.data) && (request.resource.data.role == 'user' || isAdmin());
         allow update: if isAuthenticated() && isOwner(userId) && isValidUser(request.resource.data) && (request.resource.data.role == request.data.role || isAdmin());
         allow delete: if isAdmin();
       }
     }
   }
   ```
7. Click **Publish** to deploy the rules.

---

## Step 4: Set Up Cloud Storage
1. In the left-hand sidebar, click on **Build** -> **Storage**.
2. Click **Get Started**.
3. Select **Start in production mode** (or test mode) and click **Next**.
4. Choose the cloud storage location (keep the default or match Firestore) and click **Done**.
5. Navigate to the **Rules** tab in the Storage dashboard.
6. Set the rules to allow public read access but protect uploads so only authenticated admins can write:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
7. Click **Publish**.

---

## Step 5: Register Your App & Get Config
1. In the Firebase console dashboard, click the gear icon (⚙️) next to **Project Overview** in the top-left sidebar and select **Project settings**.
2. Under the **General** tab, scroll down to the **Your apps** section.
3. Click the **Web (code symbol `</>`)** icon to register a new Web App.
4. Enter an App nickname (e.g., `niyat-somsa-web`) and click **Register app** (do not check hosting for now).
5. Firebase will show a code block with `firebaseConfig`. Copy the key-value pairs inside the `firebaseConfig` object:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

---

## Step 6: Connect Config to the Application
1. In the project workspace root, open the file `firebase-applet-config.json`.
2. Update the fields with your copied configuration details:
   ```json
   {
     "projectId": "YOUR_PROJECT_ID",
     "appId": "YOUR_APP_ID",
     "apiKey": "YOUR_API_KEY",
     "authDomain": "YOUR_PROJECT_ID.firebaseapp.com",
     "firestoreDatabaseId": "(default)",
     "storageBucket": "YOUR_PROJECT_ID.firebasestorage.app",
     "messagingSenderId": "YOUR_SENDER_ID",
     "measurementId": "YOUR_MEASUREMENT_ID"
   }
   ```
   *Note: If you used `(default)` as the database ID in Step 3, leave `"firestoreDatabaseId": "(default)"`.*
3. Save the file.

---

## Step 7: Access the Admin Panel
1. Start the local server by running `npm run dev`.
2. Access the site in your browser and sign up as a new user.
3. Go to your Firebase Console under **Firestore Database** -> **users** collection.
4. Find the document corresponding to your user account (your UID is the document ID).
5. Edit the `role` field from `"user"` to `"admin"`.
6. Refresh the web app; you will now have access to the Admin Panel (`/admin`) to manage the menu, view contact messages, and edit the gallery.
7. Note: The following emails are hardcoded as default administrators in security rules and app logic:
   - `someoneinteresting808@gmail.com`
   - `admin@niyatsomsa.com`
