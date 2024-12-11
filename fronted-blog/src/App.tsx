import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { RecoilRoot } from 'recoil'
import MySelf from './pages/MyBlog'
import ProtectedRoute from './components/Blogs/ProtectedRoute'
import SingleBlog from './pages/SingleBlog'
import Create from './pages/Create'
import { Navigate } from 'react-router-dom'
import Erro404 from './pages/Error404'
import Update from './pages/Update'

function App() {

    return (
        <div className="overflow-x-hidden">
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/blogs" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
                        <Route path="/myself" element={<ProtectedRoute><MySelf /></ProtectedRoute> } />
                        <Route path='/blog/:id' element={<SingleBlog />} />
                        <Route path='/create' element={<ProtectedRoute><Create /></ProtectedRoute>} />
                        <Route path='/update/:id' element={<ProtectedRoute><Update /></ProtectedRoute>} />
                        <Route path='/error' element={<Erro404 />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>

        </div>
    )
}

function Home() {
    return <Navigate to='/blogs' />
}

export default App