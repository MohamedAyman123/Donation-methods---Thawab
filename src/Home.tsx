import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Copy, Check, MessageCircle, Phone, Facebook } from 'lucide-react';
import { usePixel } from './hooks/usePixel';
import { PAYMENT_CONFIG } from './config/paymentDetails';

export default function Home() {
  const { trackCustom } = usePixel();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCases, setSelectedCases] = useState<Record<string, string>>({});

  const handleCaseChange = (campaignId: string, caseUrl: string) => {
    setSelectedCases(prev => ({ ...prev, [campaignId]: caseUrl }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      trackCustom('Lead', {
  payment_method: id,
});

if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead', {
    payment_method: id,
  });
}
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleDonateClick = (campaign: string) => {
  trackCustom('InitiateCheckout', {
    content_name: campaign,
    content_category: 'donation',
    value: 1,
    currency: 'EGP'
  });

  // Facebook Pixel direct tracking
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: campaign,
      content_category: 'donation',
      value: 1,
      currency: 'EGP'
    });
  }
};

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col font-cairo text-[#1a1a1a] leading-relaxed">
      {/* Top bar */}
      <div className="bg-[#085041] py-2.5 text-center">
        <p className="text-[#9FE1CB] text-[13px] font-tajawal">
          <strong className="text-white">لا تؤجل الخير!</strong> — تبرع الآن، واترك مهمة التوصيل على ثواب
        </p>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8e5] py-12 text-center">
        <div className="max-w-[860px] mx-auto px-5">
          <img src="/logo.png" alt="شعار مؤسسة ثواب" className="w-[160px] mx-auto mb-5" />
          <h1 className="text-[clamp(22px,5vw,32px)] font-black text-[#085041] mb-1.5">مؤسسة ثواب للتنمية</h1>
          <p className="text-[15px] text-[#5a5a5a] max-w-[480px] mx-auto mb-5">تبرعك يصنع فرقاً حقيقياً في حياة من يحتاجون — اختر المجال الذي يلامس قلبك</p>
          <span className="inline-block bg-[#1D9E75] text-white text-[13px] font-semibold px-5 py-1.5 rounded-full">
            تبرع الآن، واترك مهمة التوصيل على ثواب
          </span>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[860px] mx-auto px-5 py-8 w-full">
        
        {/* Kashier Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="text-lg font-bold text-[#1a1a1a]">تبرع عبر كاشير</h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56]">دفع إلكتروني آمن</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {PAYMENT_CONFIG.kashierCampaigns.map((camp, idx) => (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#e2e8e5] rounded-[18px] p-5 hover:border-[#1D9E75] hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-2xl" style={{ background: camp.id === 'quran' ? '#E1F5EE' : camp.id === 'eid' ? '#FAEEDA' : camp.id === 'family' ? '#EEEDFE' : camp.id === 'nursery' ? '#E6F1FB' : '#EAF3DE' }}>
                  {camp.id === 'quran' ? '📖' : camp.id === 'eid' ? '🥩' : camp.id === 'family' ? '👨‍👩‍👧‍👦' : camp.id === 'nursery' ? '👶' : '🏠'}
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a] mb-1.5 leading-tight">{camp.title}</h3>
                <p className="text-[13px] text-[#5a5a5a] leading-relaxed mb-3.5 flex-grow">{camp.description}</p>

                {/* Conditionally render dropdown for cases */}
                {camp.cases && (
                  <div className="mb-3">
                    <label className="text-[11px] text-[#888] mb-1 block">اختر الحالة</label>
                    <select
                      className="w-full bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-2 py-1.5 font-tajawal text-[13px] font-bold text-[#0F6E56] outline-none focus:border-[#1D9E75]"
                      value={selectedCases[camp.id] || camp.url}
                      onChange={(e) => handleCaseChange(camp.id, e.target.value)}
                    >
                      <option value={camp.url}>كل الحالات</option>
                      {camp.cases.map((c, i) => (
                        <option key={i} value={c.url}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Conditionally render Instapay info for Nursery */}
                {camp.instapay && (
                  <div className="mb-3">
                    <div className="text-[11px] text-[#888] mb-1">حساب إنستاباي</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-2 py-1 font-tajawal text-[12px] font-bold text-[#0F6E56] tracking-[0.5px] flex-grow text-center">
                        {camp.instapay}
                      </span>
                      <button
                        onClick={() => handleCopy(camp.instapay as string, `camp_instapay_${camp.id}`)}
                        className={`inline-flex items-center justify-center p-1.5 border border-[#e2e8e5] rounded-md transition-all ${copiedId === `camp_instapay_${camp.id}` ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                        title="نسخ الرقم"
                      >
                        {copiedId === `camp_instapay_${camp.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                <a
                  href={selectedCases[camp.id] || camp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDonateClick(camp.id)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 bg-[#1D9E75] hover:bg-[#0F6E56] text-white rounded-lg text-[13px] font-bold transition-colors w-full no-underline"
                >
                  تبرع الآن
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <hr className="border-t border-[#e2e8e5] my-8" />

        {/* Other Payment Methods */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="text-lg font-bold text-[#1a1a1a]">طرق تبرع أخرى</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Fawry */}
            <div className="bg-white border border-[#e2e8e5] rounded-[18px] p-5 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-[#ffd300] rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/icons/fawry.jpg" alt="فوري" className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a]">فوري</h3>
              </div>
              <p className="text-[12px] text-[#5a5a5a] mb-2.5 line-height-[1.5]">من أي منفذ فوري أو تطبيق فوري</p>
              <div className="text-[11px] text-[#888] mb-1">الكود المباشر</div>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[13px] font-bold text-[#0F6E56] tracking-[0.5px]">
                  {PAYMENT_CONFIG.fawry.code}
                </span>
                <button
                  onClick={() => handleCopy(PAYMENT_CONFIG.fawry.code, 'fawry')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'fawry' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                >
                  {copiedId === 'fawry' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedId === 'fawry' ? 'تم النسخ' : 'نسخ'}
                </button>
              </div>
            </div>

            {/* Vodafone Cash */}
            <div className="bg-white border border-[#e2e8e5] rounded-[18px] p-5 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-[#FAECE7] rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/icons/vodafone.png" alt="ڤودافون كاش" className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a]">ڤودافون كاش</h3>
              </div>
              <p className="text-[12px] text-[#5a5a5a] mb-2.5 leading-[1.5]">من تطبيق "أنا فودافون" أو اتصل بالكود</p>
              <div className="text-[11px] text-[#888] mb-1">كود الاتصال</div>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[13px] font-bold text-[#0F6E56] tracking-[0.5px]">
                  {PAYMENT_CONFIG.vodafoneCash.dialCode}
                </span>
                <button
                  onClick={() => handleCopy(PAYMENT_CONFIG.vodafoneCash.dialCode, 'vodafone')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'vodafone' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                >
                  {copiedId === 'vodafone' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedId === 'vodafone' ? 'تم النسخ' : 'نسخ'}
                </button>
              </div>
            </div>

            {/* InstaPay */}
            <div className="bg-white border border-[#e2e8e5] rounded-[18px] p-5 flex flex-col sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/icons/instapay.png" alt="إنستاباي" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a]">إنستاباي</h3>
              </div>
              <p className="text-[12px] text-[#5a5a5a] mb-3 leading-[1.5]">تحويل فوري من أي بنك مصري</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-[#888] mb-1">رقم الحساب الأول</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[13px] font-bold text-[#0F6E56] tracking-[0.5px] flex-grow text-center">
                      {PAYMENT_CONFIG.instapay.accounts[0].number}
                    </span>
                    <button
                      onClick={() => handleCopy(PAYMENT_CONFIG.instapay.accounts[0].number, 'instapay1')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'instapay1' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                    >
                      {copiedId === 'instapay1' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedId === 'instapay1' ? 'تم' : 'نسخ'}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#888] mb-1">رقم الحساب الثاني</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[13px] font-bold text-[#0F6E56] tracking-[0.5px] flex-grow text-center">
                      {PAYMENT_CONFIG.instapay.accounts[1].number}
                    </span>
                    <button
                      onClick={() => handleCopy(PAYMENT_CONFIG.instapay.accounts[1].number, 'instapay2')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'instapay2' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                    >
                      {copiedId === 'instapay2' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedId === 'instapay2' ? 'تم' : 'نسخ'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QNB */}
            <div className="bg-white border border-[#e2e8e5] rounded-[18px] p-5 flex flex-col sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-[#EEEDFE] rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/icons/qnb.jpg" alt="QNB" className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a]">بنك قطر الوطني (QNB)</h3>
              </div>
              <p className="text-[12px] text-[#5a5a5a] mb-3 leading-[1.5]">تحويل بنكي مباشر — جنيه أو دولار</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="text-[11px] text-[#888] mb-1">جنيه مصري</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[11px] font-bold text-[#0F6E56] tracking-[0.5px] flex-grow text-center">
                      {PAYMENT_CONFIG.qnb.egpAccount}
                    </span>
                    <button
                      onClick={() => handleCopy(PAYMENT_CONFIG.qnb.egpAccount, 'qnb_egp')}
                      className={`inline-flex items-center gap-1 px-2 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'qnb_egp' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                    >
                      {copiedId === 'qnb_egp' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[11px] text-[#888] mb-1">دولار أمريكي</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#F0FAF6] border border-[#C5E8DC] rounded-md px-3 py-1 font-tajawal text-[11px] font-bold text-[#0F6E56] tracking-[0.5px] flex-grow text-center">
                      {PAYMENT_CONFIG.qnb.usdAccount}
                    </span>
                    <button
                      onClick={() => handleCopy(PAYMENT_CONFIG.qnb.usdAccount, 'qnb_usd')}
                      className={`inline-flex items-center gap-1 px-2 py-1 border border-[#e2e8e5] rounded-md text-[11px] transition-all ${copiedId === 'qnb_usd' ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]' : 'bg-transparent text-[#5a5a5a] hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#9FE1CB]'}`}
                    >
                      {copiedId === 'qnb_usd' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-[#e2e8e5] my-8" />

        {/* Contact Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="text-xl font-bold text-[#1a1a1a]">تواصل معنا</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/201222203985"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e2e8e5] rounded-[18px] p-4 hover:border-[#1D9E75] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center no-underline"
            >
              <div className="w-12 h-12 bg-[#E1F5EE] rounded-full flex items-center justify-center text-[#1D9E75] mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1a1a1a] mb-1">واتساب</h3>
              <p className="text-[13px] text-[#5a5a5a] dir-ltr">0122 220 3985</p>
            </a>

            {/* Phone */}
            <a
              href="tel:01119640476"
              className="bg-white border border-[#e2e8e5] rounded-[18px] p-4 hover:border-[#1D9E75] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center no-underline"
            >
              <div className="w-12 h-12 bg-[#E1F5EE] rounded-full flex items-center justify-center text-[#1D9E75] mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1a1a1a] mb-1">اتصال</h3>
              <p className="text-[13px] text-[#5a5a5a] dir-ltr">0111 964 0476</p>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/Thawab.foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e2e8e5] rounded-[18px] p-4 hover:border-[#1D9E75] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center text-center no-underline"
            >
              <div className="w-12 h-12 bg-[#E6F1FB] rounded-full flex items-center justify-center text-[#1877F2] mb-3">
                <Facebook className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1a1a1a] mb-1">فيسبوك</h3>
              <p className="text-[13px] text-[#5a5a5a]">Thawab.foundation</p>
            </a>
          </div>
        </section>
      </main>

      {/* Trust Strip */}
      <div className="bg-[#085041] py-5 text-center px-5">
        <p className="text-[#9FE1CB] text-[13px]">
          🔒 جميع المدفوعات الإلكترونية <strong className="text-white">مؤمّنة بتشفير SSL</strong> عبر بوابة كاشير المعتمدة
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-[#04342C] py-6 text-center">
        <div className="max-w-[860px] mx-auto px-5">
          <p className="text-[#5DCAA5] text-[12px] leading-relaxed">
            <strong className="text-white block mb-1">مؤسسة ثواب للتنمية</strong>
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
