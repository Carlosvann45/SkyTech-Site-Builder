import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sites from './components/pages/Sites';
import Templates from './components/pages/Template';
import MainLayout from './outlets/MainLayout';
import Components from './components/pages/Components';
import Export from './components/pages/Export';
import ProjectForm from './components/pages/ProjectForm';
import Pages from './components/pages/Pages';
import PageForm from './components/pages/PageForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout />}>
          <Route path="websites" element={<Sites />} />
          <Route path="websites/folder_form" element={<ProjectForm />} />
          <Route path="websites/pages" element={<Pages />} />
          <Route path="websites/page_form" element={<PageForm />} />
          <Route path="templates" element={<Templates />} />
          <Route path="components" element={<Components />} />
          <Route path="export" element={<Export />} />
          <Route path="*" element={<Navigate to="/websites" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
