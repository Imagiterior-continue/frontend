// 必要なSDKから必要な機能をインポート
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// WebアプリのFirebase構成
// Firebase JS SDK v7.20.0 以降の場合、measurementId はオプションです
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// Firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig)

// 認証オブジェクトの準備
const auth = getAuth(firebaseApp)

// Google認証プロバイダの準備
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }