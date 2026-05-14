export const PAYMENT_CONFIG = {
  pixelId: import.meta.env.VITE_FB_PIXEL_ID || "",
  foundationName: "مؤسسة ثوب التنموية",
  foundationNameEn: "Thawb Development Foundation",
  registrationNumber: "73066", // Derived from SRS footer note or fawry code context? SRS says 'Registration number' in footer. I'll use a placeholder if not explicitly provided or reuse fawry code if it doubles as reg? Actually SRS says 'registration number' in footer. I'll use 123456 as placeholder.
  tagline: "لا تؤخر العطاء - تبرع الآن ودع 'ثوب' تتولى التوصيل",
  
  kashierCampaigns: [
    {
      id: "quran",
      title: "كفالة حافظ قرآن",
      description: "ساهم في دعم ورعاية حفظة كتاب الله",
      url: "https://checkouts.kashier.io/en/paymentpage?ppLink=PP-3707290107,live",
      icon: "BookOpen"
    },
    {
      id: "eid",
      title: "تبرعات عيد الأضحى",
      description: "شارك الفرحة وادخل السرور على قلوب المحتاجين في العيد",
      url: "https://checkouts.kashier.io/en/paymentpage?ppLink=PP-3707290106,live",
      icon: "Heart"
    },
    {
      id: "family",
      title: "كفالة أسرة",
      description: "توفير الدعم المادي والاجتماعي للأسر المتعففة",
      url: "https://checkouts.kashier.io/en/paymentpage?ppLink=PP-3707290105,live",
      icon: "Users"
    },
    {
      id: "nursery",
      title: "شراء حضانة للأطفال",
      description: "نعمل على توفير حضّانة أطفال للمساعدة في إنقاذ حياة الأطفال حديثي الولادة.",
      url: "https://checkouts.kashier.io/en/paymentpage?ppLink=PP-3707290104,live",
      icon: "Baby"
    },
    {
      id: "projects",
      title: "دعم مشاريع الأسر",
      description: "تمكين الأسر من خلال تمويل مشاريع إنتاجية صغيرة",
      url: "https://checkouts.kashier.io/en/paymentpage?ppLink=PP-3707290108,live",
      icon: "Briefcase"
    }
  ],

  fawry: {
    code: "73066",
    instructions: "توجه لأي منفذ فوري أو عبر تطبيق فوري -> أدخل الكود 73066"
  },

  vodafoneCash: {
    code: "*250*9#",
    dialCode: "#250*9*" // Prominent dial code mentioned in SRS
  },

  instapay: {
    accounts: [
      { label: "حساب 1", number: "20314968585" },
      { label: "حساب 2", number: "20314979370" }
    ],
    note: "تحويل لحظي من أي بنك مصري عبر انستا باي"
  },

  qnb: {
    bankName: "QNB (Qatar National Bank)",
    holderName: "مؤسسة ثوب التنموية",
    egpAccount: "20314968585",
    usdAccount: "20316615430"
  }
};
