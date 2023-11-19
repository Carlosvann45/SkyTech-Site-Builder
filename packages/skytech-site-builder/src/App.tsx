import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Sites from "./components/pages/Sites";
import Templates from "./components/pages/Templates";
import MainLayout from "./outlets/MainLayout";
import EditorLayout from "./outlets/EditorLayout";
import Components from "./components/pages/Components";
import Export from "./components/pages/Export";
import ProjectForm from "./components/forms/ProjectForm";
import Pages from "./components/pages/Pages";
import PageForm from "./components/forms/PageForm";
import Editor from "./components/pages/Editor";
import TemplateForm from "./components/forms/TemplateForm";

/**
 * @name App
 * @description handlses routing all pages to show correct page on app load
 * @returns Component
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="editor" element={<EditorLayout />}>
          <Route path="page" element={<Editor />} />
          <Route path="template" element={<Editor />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="*" element={<MainLayout />}>
          <Route path="websites/folder_form" element={<ProjectForm />} />
          <Route path="websites/pages" element={<Pages />} />
          <Route path="websites/page_form/" element={<PageForm />} />
          <Route path="websites/templates" element={<Templates />} />
          <Route path="websites/template_form" element={<TemplateForm />} />
          <Route path="websites/components" element={<Components />} />
          <Route path="websites/export" element={<Export />} />
          <Route path="*" element={<Sites />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
