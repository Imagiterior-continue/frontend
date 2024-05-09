import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'
import List from './pages/List'
import Design from './pages/Design'
import NoMatch from './pages/NoMatch'
import NoLogin from './pages/NoLogin'
import { getAdditionalUserInfo, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider, db } from './hooks/firebase'
import { doc, setDoc } from 'firebase/firestore/lite'
import { theme } from './style/theme'

function App (): JSX.Element {
  // ログイン
  const handleSignIn: any = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider)
      const roomNum = 3
      const additionalUserInfo = getAdditionalUserInfo(result)

      localStorage.setItem('uid', result.user.uid)
      localStorage.setItem('displayName', result.user.displayName ?? '')
      localStorage.setItem('photoURL', result.user.photoURL ?? '')

      if (additionalUserInfo !== null) {
        if (additionalUserInfo.isNewUser) {
          // 新規ユーザーの場合、初期レイアウト情報を保存
          for (let i = 0; i < roomNum; i++) {
            await setDoc(doc(db, result.user.uid, `room_id_${i + 1}`), {
              furnitureList: [],
              roomName: `部屋${i + 1}`
            })
          }
        }

        window.location.href = '/list'
      } else {
        console.error('additionalUserInfo.isNewUserのnullエラー')
      }
    } catch (error) {
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
      window.location.href = '/'
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return (
    <div className='App' style={{ width: '100%', height: '100%' }}>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Login handleSignIn={handleSignIn}/>} />
          <Route path='/list' element={<List handleSignout={handleSignOut}/>} />
          <Route path='/design/:room_id' element={<Design handleSignout={handleSignOut}/>} />
          <Route path='/nologin' element={<NoLogin/>}/>
          <Route path='*' element={<NoMatch/>} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App
