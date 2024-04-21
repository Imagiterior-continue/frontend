import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'
import List from './pages/List'
import Design from './pages/Design'
import NoMatch from './pages/NoMatch'
import NoLogin from './pages/NoLogin'
import Sample from './pages/Sample'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from './hooks/firebase'

function App (): JSX.Element {
  // ログイン
  const handleSignIn: any = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider)

      // ログイン成功時の処理
      let userId: string = ''
      if (result.user.uid !== null) {
        userId = result.user.uid
      }
      localStorage.setItem('uid', userId)

      let displayName: string = ''
      if (result.user.displayName !== null) {
        displayName = result.user.displayName
      }
      localStorage.setItem('displayName', displayName)

      let photoURL: string = ''
      if (result.user.photoURL !== null) {
        photoURL = result.user.photoURL
      }
      localStorage.setItem('photoURL', photoURL)

      window.location.href = '/list'
    } catch (error) {
      // エラーハンドリング
      console.error('ログインエラー', error)
    }
  }

  // ログアウト
  const handleSignOut: any = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('displayName')
      localStorage.removeItem('uid')
      localStorage.removeItem('photoURL')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return (
    <div className='App'>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Login handleSignIn={handleSignIn}/>} />
          <Route path='/list' element={<List handleSignout={handleSignOut}/>} />
          <Route path='/design' element={<Design handleSignout={handleSignOut}/>} />
          <Route path='/nologin' element={<NoLogin/>}/>
          <Route path='*' element={<NoMatch/>} />
          <Route path='/sample' element={<Sample/>} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App
