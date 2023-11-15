import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet";

/**
 * @name PageLayout
 * @description
 * @returns PageLayout Page
 */
const EditorLayout = () => {
    const [webComponentScripts, setWebComponentScripts] = useState({ js: '' });

    useEffect(() => {
      window.fileOperations.getWebComponentFiles().then((files: any) => {
        setWebComponentScripts(files);
      })
    }, [])

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
}

export default EditorLayout;