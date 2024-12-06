import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { RecoilRoot } from 'recoil'
import MySelf from './pages/MySelf'

function App() {

    return (
        <div className="overflow-hidden">
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/blogs" element={<Blog />} />
                        <Route path="/myself" element={<MySelf />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>

        </div>
    )
}

export default App