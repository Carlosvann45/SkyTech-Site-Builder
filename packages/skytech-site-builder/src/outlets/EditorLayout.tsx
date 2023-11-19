import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

/**
 * @name EditorLayout
 * @description handles web component script tag and toast container across all editors
 * @returns Component
 */
const EditorLayout = () => {
  const [webComponentScripts, setWebComponentScripts] = useState({ js: "" });

  /**
   * Handles getting the web components scripts
   */
  useEffect(() => {
    window.fileOperations.getWebComponentFiles().then((files: any) => {
      setWebComponentScripts(files);
    });
  }, []);

  return (
    <>
      <Helmet>
        <script type="module">{webComponentScripts.js}</script>
      </Helmet>
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default EditorLayout;
