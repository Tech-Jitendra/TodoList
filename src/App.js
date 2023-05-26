import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Pages/Home';
import { RootStoreProvider, setupRootStore } from "./models";
import { NativeBaseProvider, theme } from 'native-base';
const config = {};

function App() {

  const [rootStore, setRootStore] = useState(undefined);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);

  return (
    <>
      <RootStoreProvider value={rootStore}>
        <NativeBaseProvider theme={theme} config={config}>
          <Home />
        </NativeBaseProvider>
      </RootStoreProvider>
    </>
  );
}
export default App;
