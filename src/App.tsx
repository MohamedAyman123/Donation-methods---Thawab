/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ThankYou from './components/ThankYou';
import { PixelProvider } from './hooks/usePixel';
import { PAYMENT_CONFIG } from './config/paymentDetails';

export default function App() {
  return (
    <Router>
      <PixelProvider pixelId={PAYMENT_CONFIG.pixelId}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </PixelProvider>
    </Router>
  );
}
