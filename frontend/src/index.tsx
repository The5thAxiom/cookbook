import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// strict mode will run [some](https://stackoverflow.com/questions/60305074/react-strictmode-setstate-function-in-useeffect-is-run-multiple-times-when-effe) stuff
// twice!, for debugging (checking the idempotency of some stuff, idk)
// that is why the recipes are fetched twice
root.render(
    <App />
    //   <React.StrictMode>
    //   </React.StrictMode>
);

