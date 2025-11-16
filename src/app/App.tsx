import type { JSX } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ContactPage } from '../pages/ContactPage';
import { DraftsPage } from '../pages/DraftsPage';
import { FormPage } from '../pages/FormPage';
import { HomePage } from '../pages/HomePage';
import { ReviewPage } from '../pages/ReviewPage';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<FormPage />} path="/forms" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<DraftsPage />} path="/drafts" />
        <Route element={<ReviewPage />} path="/review" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
