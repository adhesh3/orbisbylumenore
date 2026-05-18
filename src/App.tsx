import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './app/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Family } from './pages/Family';
import { Banks } from './pages/Banks';
import { Investments } from './pages/Investments';
import { Income } from './pages/Income';
import { Expenses } from './pages/Expenses';
import { Assets } from './pages/Assets';
import { Loans } from './pages/Loans';
import { Education } from './pages/Education';
import { Insurance } from './pages/Insurance';
import { Reminders } from './pages/Reminders';
import { NetWorth } from './pages/NetWorth';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Setup } from './pages/Setup';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="/family" element={<Family />} />
          <Route path="/net-worth" element={<NetWorth />} />
          <Route path="/banks" element={<Banks />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/education" element={<Education />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
