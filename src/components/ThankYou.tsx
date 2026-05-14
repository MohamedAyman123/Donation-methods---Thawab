import { useEffect } from 'react';
import { CheckCircle, Share2, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { usePixel } from '../hooks/usePixel';
import { PAYMENT_CONFIG } from '../config/paymentDetails';

export default function ThankYou() {
  const { trackStandard } = usePixel();

  useEffect(() => {
    trackStandard('Donate');
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
      >
        <CheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>

      <h1 className="text-3xl font-bold text-slate-900 mb-4">شكراً لعطائك!</h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        تم استلام تبرعك بنجاح. مساهمتك ستحدث فرقاً حقيقياً في حياة من يحتاجونها.
      </p>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 rounded-xl transition-all hover:bg-brand-primary/90"
        >
          <Home className="w-5 h-5" />
          <span>العودة للرئيسية</span>
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl transition-all hover:bg-slate-200"
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة مع الأصدقاء</span>
        </button>
      </div>

      <div className="mt-12 text-slate-400 text-sm">
        {PAYMENT_CONFIG.foundationName}
      </div>
    </div>
  );
}
