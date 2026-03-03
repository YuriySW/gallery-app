import {Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {useAuth} from './hooks/useAuth';
import Header from './components/Header/Header';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';
import PhotoDetail from './components/PhotoDetail/PhotoDetail';
import AuthCallback from './components/Auth/AuthCallback';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function AppContent() {
  useAuth();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<PhotoGrid />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/auth" element={<AuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
