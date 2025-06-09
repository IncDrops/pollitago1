# .env file (in your project's root directory)

# --- Firebase Configuration (Accessible in your frontend/browser-side code) ---
# Parcel needs these prefixed with PARCEL_PUBLIC_ to expose them to the browser-side code
PARCEL_PUBLIC_FIREBASE_API_KEY=AIzaSyBbygIbTA-KUOo4n8uMGEDj4LsAoD3JV-c
PARCEL_PUBLIC_FIREBASE_AUTH_DOMAIN=pollitago-web-app.firebaseapp.com
PARCEL_PUBLIC_FIREBASE_PROJECT_ID=pollitago-web-app
PARCEL_PUBLIC_FIREBASE_STORAGE_BUCKET=pollitago-web-app.firebasestorage.app
PARCEL_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=690089067831
PARCEL_PUBLIC_FIREBASE_APP_ID=1:690089067831:web:e11838229a48a4e1ad46b2
PARCEL_PUBLIC_FIREBASE_MEASUREMENT_ID=G-QDJ2CEFD0L

# --- Stripe Publishable Key (Accessible in your frontend/browser-side code) ---
# This key is designed to be public and is safe to include in your frontend code.
PARCEL_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RWVjaGaxRthZIaCpxs1rBLSgJcaqcoIXvdmZyQGaQkT0wl4HaBlR78nQ3yu7UcK23jA4OfvbY7oifoISWwivdCd002DnxwvIQ
PARCEL_PUBLIC_GOOGLE_API_KEY=AIzaSyAq-3R6HGRxqlR9luuSaDsxs2fA3kw6YiY

# --- Stripe Secret Key (THIS MUST ONLY BE USED ON THE SERVER/BACKEND - NO "PARCEL_PUBLIC_" HERE!) ---
# This key MUST NEVER be directly accessible in your frontend code.
# It's loaded by your backend server (e.g., Node.js, Vercel Serverless Function)
STRIPE_SECRET_KEY=sk_test_51RWVjaGaxRthZIaC36qnF2flLsteDv7pfRsDtkk9f2olgFPuhkk5IWLD4j0sc8lIDwSnfx1XTsIVldrvrzyD1c7kco00LGyWRKV4