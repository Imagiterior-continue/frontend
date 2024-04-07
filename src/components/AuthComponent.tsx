import React, { useState, useEffect } from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../hooks/firebase'

const AuthComponent: any = () => {
  const [user, setUser] = useState<any>(null) // ログイン状態

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser !== null) {
        // ログインしている場合
        setUser(authUser)
      } else {
        // ログアウトしている場合
        setUser(null)
      }
    })

    // アンマウント時に監視解除
    return () => {
      unsubscribe()
    }
  }, [])

  // ログイン
  const handleSignIn: any = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider)
      // ログイン成功時の処理
      console.log('ログイン成功', result.user)
    } catch (error) {
      // エラーハンドリング
      console.error('ログインエラー', error)
    }
  }

  // ログアウト
  const handleSignOut: any = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      {user !== null ? (
        <div>
          <p>ログインユーザー: {user.displayName}</p>
          <p>mail: {user.email}</p>
          <p>photo: {user.photoURL}</p>
          <button onClick={handleSignOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </div>
      )}
    </div>
  )
}

export default AuthComponent
