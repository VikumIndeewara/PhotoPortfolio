import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import GalleryPage from './pages/Gallery';


function App() {
  return (
    <Router>
      <Routes>

        {/* Layout wrapper */}
        <Route element={<Layout />}>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Galleries */}
          <Route path="/editorial" element={<GalleryPage category="Editorial Photography" />} />
          <Route path="/fashion" element={<GalleryPage category="Commercial Photography" />} />
          <Route path="/portrait" element={<GalleryPage category="Portrait Photography" />} />
          <Route path="/architecture" element={<GalleryPage category="Event Coverage" />} />
          <Route path="/documentary" element={<GalleryPage category="Documentary Photography" />} />
          <Route path="/wedding" element={<GalleryPage category="Art & Conceptual" />} />

          {/* 404 */}
          <Route path="*" element={<div>404 Page Not Found</div>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
