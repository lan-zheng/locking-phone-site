(() => {
  "use strict";

  const config = window.LockingPhoneSiteConfig || {};
  const page = document.body.dataset.page;
  const supportedPages = new Set(["terms", "membership", "renewal"]);
  if (!supportedPages.has(page)) return;

  const languages = {
    en: { label: "English", locale: "en-US", dir: "ltr" },
    "zh-Hans": { label: "简体中文", locale: "zh-CN", dir: "ltr" },
    "zh-Hant": { label: "繁體中文", locale: "zh-TW", dir: "ltr" },
    es: { label: "Español", locale: "es-ES", dir: "ltr" },
    ja: { label: "日本語", locale: "ja-JP", dir: "ltr" },
    ko: { label: "한국어", locale: "ko-KR", dir: "ltr" },
    fr: { label: "Français", locale: "fr-FR", dir: "ltr" },
    de: { label: "Deutsch", locale: "de-DE", dir: "ltr" },
    "pt-BR": { label: "Português", locale: "pt-BR", dir: "ltr" },
    ar: { label: "العربية", locale: "ar", dir: "rtl" }
  };

  const commonByLanguage = {
    en: { privacy: "Privacy", terms: "Terms", membership: "Membership", renewal: "Auto-renewal", support: "Support", toc: "On this page", updated: "Last updated", related: "Related documents" },
    "zh-Hans": { privacy: "隐私政策", terms: "用户协议", membership: "会员服务协议", renewal: "自动续费服务协议", support: "支持", toc: "本页内容", updated: "最后更新", related: "相关文件" },
    "zh-Hant": { privacy: "隱私政策", terms: "使用者協議", membership: "會員服務協議", renewal: "自動續費服務協議", support: "支援", toc: "本頁內容", updated: "最後更新", related: "相關文件" },
    es: { privacy: "Privacidad", terms: "Términos", membership: "Servicio Pro", renewal: "Renovación automática", support: "Soporte", toc: "En esta página", updated: "Última actualización", related: "Documentos relacionados" },
    ja: { privacy: "プライバシー", terms: "利用規約", membership: "会員サービス", renewal: "自動更新", support: "サポート", toc: "このページ", updated: "最終更新", related: "関連文書" },
    ko: { privacy: "개인정보", terms: "이용 약관", membership: "회원 서비스", renewal: "자동 갱신", support: "지원", toc: "페이지 내용", updated: "최종 업데이트", related: "관련 문서" },
    fr: { privacy: "Confidentialité", terms: "Conditions", membership: "Service Pro", renewal: "Renouvellement", support: "Assistance", toc: "Sur cette page", updated: "Dernière mise à jour", related: "Documents associés" },
    de: { privacy: "Datenschutz", terms: "Bedingungen", membership: "Pro-Service", renewal: "Automatische Verlängerung", support: "Support", toc: "Auf dieser Seite", updated: "Zuletzt aktualisiert", related: "Zugehörige Dokumente" },
    "pt-BR": { privacy: "Privacidade", terms: "Termos", membership: "Serviço Pro", renewal: "Renovação automática", support: "Suporte", toc: "Nesta página", updated: "Última atualização", related: "Documentos relacionados" },
    ar: { privacy: "الخصوصية", terms: "شروط الاستخدام", membership: "خدمة Pro", renewal: "التجديد التلقائي", support: "الدعم", toc: "في هذه الصفحة", updated: "آخر تحديث", related: "مستندات ذات صلة" }
  };

  const englishPages = {
    terms: {
      title: "Terms of Use",
      lead: "Rules for using Locking Phone.",
      intro: "These Terms govern your use of Locking Phone, provided by Wuhan Lixing Zhumeng Network Technology Co., Ltd. By downloading, accessing, or using the app, you agree to these Terms and the Apple terms that apply to your download and purchase.",
      sections: [
        ["service", "The service", "Locking Phone is a digital wellbeing utility. It lets you create a one-time or recurring schedule that uses Apple Screen Time technologies to restrict distracting third-party apps and websites, then restore access at the selected time. Availability of Phone, Messages, Alarm, and other essentials follows your iOS Always Allowed settings."],
        ["active-lock", "Active lock periods", "Review the start and restore times before enabling a plan. Once an active lock begins, Locking Phone intentionally provides no temporary bypass, plan shutoff, or schedule editing inside the app. You may edit or disable a recurring plan only while no lock is active; saved changes apply to the next scheduled period."],
        ["license", "License and Apple terms", "Your use of the app is licensed, not sold. Unless a custom license is shown on the App Store product page, Apple’s Standard End User License Agreement applies to the app license. These Terms supplement that agreement for the Locking Phone service and paid features; the Apple agreement controls if there is a conflict about the app license."],
        ["responsibility", "Your responsibilities", "You are responsible for choosing safe times, configuring iOS Always Allowed settings, keeping access to essential and emergency functions, and using the app in accordance with law. Do not attempt to misuse, reverse engineer, interfere with, or redistribute the app except where applicable law expressly permits it."],
        ["purchases", "Purchases", "Paid access is offered through Apple In-App Purchase as monthly or yearly auto-renewable subscriptions and a one-time lifetime purchase. The App Store purchase sheet shows the current localized price and billing period before you confirm. Apple processes payment, cancellation, restoration, and refund requests."],
        ["health", "No medical service", "Locking Phone is not a medical device and does not diagnose, prevent, monitor, or treat insomnia, thyroid conditions, or any other health condition. Seek qualified medical advice for persistent sleep or health concerns."],
        ["availability", "Availability and limitations", "Apple permissions, iOS behavior, device settings, operating-system changes, outages, or misuse can affect scheduled restrictions. To the extent permitted by law, the app is provided without a guarantee that every lock will run without interruption or that it will meet a particular health or productivity outcome."],
        ["changes", "Changes and contact", "We may update these Terms when the service, law, or store rules change. Material changes will be published before or with the relevant app update. Questions may be sent to the support address below."],
        ["contact", "Contact", "Operator: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]
    },
    membership: {
      title: "Membership Service Agreement",
      lead: "What Locking Phone Pro includes.",
      intro: "This agreement explains Locking Phone Pro subscriptions and lifetime access. It supplements the Terms of Use and applies when you purchase a paid product through the App Store.",
      sections: [
        ["plans", "Available plans", "Locking Phone currently offers a monthly subscription, a yearly subscription, and a one-time lifetime purchase. Actual prices and currencies vary by App Store storefront and are displayed in Apple’s purchase sheet before confirmation. There is no seven-day auto-renewing free trial."],
        ["benefits", "Pro benefits", "After the complimentary first one-time night, Pro lets you continue creating one-time lock plans or enable a schedule that repeats every day. Pro also includes automatic weekly self-control reports, relationship insights from local records, personalized next-week actions, 7-, 21-, and 30-day challenges, guided routines, 30- and 90-day trends, and PDF or CSV export. Features depend on Apple Screen Time permission and supported iOS behavior."],
        ["activation", "Activation and restoration", "Apple activates access after a verified transaction. Use Restore Purchases with the same Apple Account when reinstalling the app or moving to another supported device. A subscription must remain active; lifetime access does not expire, subject to continued availability and compatibility of the app."],
        ["subscriptions", "Subscription membership", "Monthly and yearly membership renew automatically until canceled. Renewal and cancellation rules are explained in the Auto-Renewal Service Agreement. Canceling stops future renewals but normally leaves Pro active until the current paid period ends."],
        ["lifetime", "Lifetime purchase", "Lifetime is a non-consumable, one-time purchase and does not renew. “Lifetime” means access to the applicable paid features of this app for as long as Locking Phone remains offered and technically supported; it is not a promise that the app, Apple frameworks, or every feature will exist indefinitely."],
        ["refunds", "Billing and refunds", "Apple processes all purchases. We do not receive full payment-card details. For billing disputes, refunds, transaction history, or cancellation, use Apple’s purchase and subscription tools or contact Apple Support, subject to applicable consumer law."],
        ["changes", "Service changes", "We may maintain, improve, replace, or discontinue features when required by security, law, Apple policy, framework changes, or product development. We will not intentionally remove an active paid entitlement merely to force a duplicate purchase."],
        ["contact", "Contact", "Questions about Pro access can be sent to the support address below."]
      ]
    },
    renewal: {
      title: "Auto-Renewal Service Agreement",
      lead: "How subscriptions renew and how to cancel.",
      intro: "This agreement applies only to Locking Phone Pro monthly and yearly subscriptions purchased through Apple. The lifetime purchase is a one-time purchase and does not renew.",
      sections: [
        ["products", "Subscription products", "The monthly plan renews each month and the yearly plan renews each year. The product name, current localized price, billing period, and included access are shown in the app and Apple purchase sheet before you confirm."],
        ["renewal", "Automatic renewal", "Your subscription renews automatically through your Apple Account unless you cancel before the renewal deadline shown by Apple. Apple charges the payment method associated with your Apple Account according to its subscription billing terms."],
        ["cancel", "How to cancel", "On iPhone, open Settings, tap your name, tap Subscriptions, select Locking Phone, and choose Cancel Subscription. You can also use the Manage Subscription link in Locking Phone. To avoid the next charge, complete cancellation at least 24 hours before the current period ends."],
        ["after-cancel", "After cancellation", "Canceling prevents the next renewal. Unless Apple states otherwise, access continues until the end of the current paid period. Deleting Locking Phone does not cancel a subscription."],
        ["price", "Price changes", "Apple displays and communicates subscription price changes and requests consent where required. If you do not accept a required price change, Apple may cancel the subscription at the end of the current period."],
        ["restore", "Restore and device changes", "Use Restore Purchases while signed in with the same Apple Account. Subscription access is subject to Apple transaction verification, App Store availability, compatible devices, and the app remaining available."],
        ["refund", "Refunds and billing problems", "Apple handles payment processing and refund requests. Visit reportaproblem.apple.com or contact Apple Support for eligible refund requests. Your statutory consumer rights remain unaffected."],
        ["no-trial", "No auto-renewing trial", "The first complete night offered by Locking Phone is a local one-time app experience. It is not an App Store subscription trial, does not start billing, and does not require cancellation."],
        ["contact", "Contact", "Questions about the service can be sent to the support address below; account billing and refunds are handled by Apple."]
      ]
    }
  };

  const localizedPages = {
    "zh-Hans": {
      terms: ["用户协议", "使用 Locking Phone 的基本规则。", "本协议适用于武汉理性筑梦网络科技有限公司提供的 Locking Phone。下载、访问或使用 App，即表示你同意本协议及适用于下载和购买行为的 Apple 条款。", [
        ["service", "服务内容", "Locking Phone 是数字健康与自律工具，可设置单次或每日循环计划，使用 Apple 屏幕使用时间能力限制容易分心的第三方 App 和网站，并在指定时间恢复。电话、信息、闹钟等必要功能是否可用，取决于 iOS“始终允许”设置。"],
        ["active-lock", "锁定生效期间", "开启前请确认锁定与恢复时间。锁定生效后，App 内不提供临时放行、关闭计划或修改时间。每日循环计划只能在未处于锁定状态时修改或关闭；保存后的时间从下一次计划开始执行。"],
        ["license", "许可与 Apple 条款", "App 以许可方式提供而非出售。若 App Store 产品页未显示自定义许可协议，则 App 许可适用 Apple 标准最终用户许可协议。本协议补充说明 Locking Phone 服务及付费功能；涉及 App 许可的内容冲突时，以 Apple 协议为准。"],
        ["responsibility", "用户责任", "你应选择安全的计划时间，正确配置 iOS“始终允许”，确保必要及紧急功能可用，并依法使用 App。除法律明确允许外，不得滥用、干扰、反向工程或非法分发 App。"],
        ["purchases", "购买", "付费内容通过 Apple App 内购买提供，包括月度自动续费、年度自动续费和永久买断。确认购买前，Apple 购买页面会展示本地价格与周期。付款、取消、恢复购买和退款由 Apple 处理。"],
        ["health", "非医疗服务", "Locking Phone 不是医疗器械，不诊断、预防、监测或治疗失眠、甲状腺疾病或其他健康问题。持续存在睡眠或健康问题时，请咨询专业医务人员。"],
        ["availability", "可用性与限制", "Apple 权限、iOS 行为、设备设置、系统更新、服务异常或不当操作都可能影响计划执行。在法律允许范围内，我们不保证每次锁定绝对不中断，也不承诺特定健康或效率结果。"],
        ["changes", "协议变更", "服务、法律或应用商店规则变化时，我们可能更新本协议。重要变更会在相关版本发布前或同时公布。"],
        ["contact", "联系我们", "运营主体：武汉理性筑梦网络科技有限公司。"]
      ]],
      membership: ["会员服务协议", "Locking Phone Pro 提供的权益。", "本协议说明 Locking Phone Pro 订阅与永久买断服务，是《用户协议》的补充，并在你通过 App Store 购买付费产品时适用。", [
        ["plans", "可选方案", "目前提供月订阅、年订阅和一次性永久买断。实际价格与币种以用户所在 App Store 地区及 Apple 购买页面显示为准。本产品不提供“7天自动续费免费试用”。"],
        ["benefits", "Pro 权益", "首个免费单次夜晚结束后，Pro 用户可继续创建单次锁定或开启每日循环。Pro 还包含每周自律报告、本地记录关联分析、下周个性化建议、7/21/30 天挑战、引导模板、30/90 天趋势以及 PDF/CSV 导出。功能依赖 Apple 屏幕使用时间授权及受支持的 iOS 行为。"],
        ["activation", "开通与恢复", "Apple 验证交易后开通权益。重新安装或更换受支持设备时，请使用同一 Apple 账户点击“恢复购买”。订阅需保持有效；永久买断不设到期日，但仍受 App 持续提供和系统兼容性影响。"],
        ["subscriptions", "订阅会员", "月订阅与年订阅会自动续费，直至用户取消。续费与取消规则详见《自动续费服务协议》。取消后通常可使用至当前已付费周期结束。"],
        ["lifetime", "永久买断", "永久买断属于非消耗型一次购买，不会续费。“永久”指在 Locking Phone 继续提供且技术上受支持期间使用对应付费功能，不代表 App、Apple 框架或所有功能将永久存在。"],
        ["refunds", "计费与退款", "所有购买均由 Apple 处理，我们不会获得完整银行卡信息。账单争议、退款、交易记录或取消订阅请使用 Apple 的购买与订阅工具，并适用当地消费者保护法律。"],
        ["changes", "服务调整", "因安全、法律、Apple 政策、系统框架变化或产品迭代，我们可能维护、优化、替换或停止部分功能，但不会故意取消有效付费权益以迫使用户重复购买。"],
        ["contact", "联系我们", "Pro 权益问题可发送至下方支持邮箱。"]
      ]],
      renewal: ["自动续费服务协议", "了解订阅续费及取消方式。", "本协议仅适用于通过 Apple 购买的 Locking Phone Pro 月订阅和年订阅。永久买断为一次性购买，不会自动续费。", [
        ["products", "订阅产品", "月订阅按月续费，年订阅按年续费。确认购买前，App 与 Apple 购买页面会展示产品名称、当前本地价格、计费周期和所含权益。"],
        ["renewal", "自动续费", "除非你在 Apple 显示的续费截止时间前取消，否则订阅会通过 Apple 账户自动续费。Apple 将根据其订阅计费规则，从 Apple 账户绑定的付款方式扣款。"],
        ["cancel", "取消方式", "在 iPhone 打开“设置”→点击姓名→“订阅”→选择 Locking Phone→“取消订阅”；也可使用 App“我的”页面中的“管理订阅”。为避免下一次扣费，请至少在当前周期结束前24小时完成取消。"],
        ["after-cancel", "取消后的权益", "取消会阻止下一次续费。除非 Apple 另有说明，权益通常持续到当前已付费周期结束。删除 Locking Phone 不等于取消订阅。"],
        ["price", "价格调整", "Apple 会按其规则展示和通知价格变化，并在需要时征得同意。若未同意必须确认的价格变化，Apple 可能在当前周期结束后取消订阅。"],
        ["restore", "恢复与更换设备", "请使用同一 Apple 账户点击“恢复购买”。权益取决于 Apple 交易验证、App Store 可用性、设备兼容性及 App 持续提供。"],
        ["refund", "退款与账单问题", "付款和退款申请由 Apple 处理。符合条件时，可访问 reportaproblem.apple.com 或联系 Apple 支持。你的法定消费者权利不受影响。"],
        ["no-trial", "没有自动续费试用", "App 提供的第一个完整夜晚免费，是本地的一次性使用机会，不是 App Store 订阅试用，不会开始扣费，也无需取消。"],
        ["contact", "联系我们", "服务使用问题可发送至下方支持邮箱；Apple 账户账单和退款由 Apple 处理。"]
      ]]
    },
    "zh-Hant": {
      terms: ["使用者協議", "使用 Locking Phone 的基本規則。", "本協議適用於武漢理性築夢網絡科技有限公司提供的 Locking Phone。下載、存取或使用 App，即表示你同意本協議及適用於下載與購買行為的 Apple 條款。", [
        ["service", "服務內容", "Locking Phone 是數位健康與自律工具，可設定單次或每日循環計畫，使用 Apple 螢幕使用時間功能限制容易分心的第三方 App 與網站，並於指定時間恢復。電話、訊息、鬧鐘等必要功能是否可用，取決於 iOS「永遠允許」設定。"],
        ["active-lock", "鎖定生效期間", "開啟前請確認鎖定與恢復時間。鎖定生效後，App 內不提供暫時放行、關閉計畫或修改時間。每日循環只能在未鎖定時修改或關閉；儲存後從下一次計畫開始生效。"],
        ["license", "授權與 Apple 條款", "App 以授權方式提供而非出售。若 App Store 產品頁未顯示自訂授權協議，則適用 Apple 標準最終使用者授權協議。本協議補充 Locking Phone 服務與付費功能；涉及 App 授權的衝突以 Apple 協議為準。"],
        ["responsibility", "使用者責任", "你應選擇安全的時間、正確設定 iOS「永遠允許」、確保必要與緊急功能可用，並依法使用 App。除法律明確允許外，不得濫用、干擾、反向工程或非法散布 App。"],
        ["purchases", "購買", "付費內容透過 Apple App 內購買提供，包括月度自動續費、年度自動續費與永久買斷。確認前，Apple 購買頁會顯示本地價格與週期。付款、取消、恢復與退款由 Apple 處理。"],
        ["health", "非醫療服務", "Locking Phone 不是醫療器材，不診斷、預防、監測或治療失眠、甲狀腺疾病或其他健康問題。持續出現睡眠或健康問題時，請諮詢專業醫療人員。"],
        ["availability", "可用性與限制", "Apple 權限、iOS 行為、裝置設定、系統更新、服務異常或不當操作都可能影響計畫。在法律允許範圍內，我們不保證每次鎖定絕對不中斷，也不承諾特定健康或效率結果。"],
        ["changes", "協議變更", "服務、法律或商店規則變化時，我們可能更新本協議，重要變更會在相關版本發布前或同時公布。"],
        ["contact", "聯絡我們", "營運主體：武漢理性築夢網絡科技有限公司。"]
      ]],
      membership: ["會員服務協議", "Locking Phone Pro 提供的權益。", "本協議說明 Locking Phone Pro 訂閱與永久買斷服務，是《使用者協議》的補充，並在你透過 App Store 購買付費產品時適用。", [
        ["plans", "可選方案", "目前提供月訂閱、年訂閱及一次性永久買斷。實際價格與幣別以使用者所在 App Store 地區及 Apple 購買頁顯示為準。本產品不提供「7天自動續費免費試用」。"],
        ["benefits", "Pro 權益", "首個免費單次夜晚結束後，Pro 可繼續建立單次鎖定或開啟每日循環。Pro 還包含每週自律報告、本機記錄關聯分析、下週個人化建議、7/21/30 天挑戰、引導範本、30/90 天趨勢以及 PDF/CSV 匯出。功能依賴 Apple 螢幕使用時間授權與支援的 iOS 行為。"],
        ["activation", "開通與恢復", "Apple 驗證交易後開通權益。重新安裝或更換支援裝置時，請使用同一 Apple 帳戶點選「恢復購買」。訂閱需保持有效；永久買斷不設到期日，但仍受 App 持續提供與系統相容性影響。"],
        ["subscriptions", "訂閱會員", "月訂閱與年訂閱會自動續費，直至使用者取消。續費與取消規則詳見《自動續費服務協議》。取消後通常可使用至目前已付費週期結束。"],
        ["lifetime", "永久買斷", "永久買斷為非消耗型一次購買，不會續費。「永久」指 Locking Phone 持續提供且技術上受支援期間的對應付費功能，不代表 App、Apple 框架或所有功能永久存在。"],
        ["refunds", "計費與退款", "所有購買均由 Apple 處理，我們不會取得完整付款卡資料。帳單爭議、退款、交易紀錄或取消請使用 Apple 購買與訂閱工具，並適用當地消費者保護法律。"],
        ["changes", "服務調整", "因安全、法律、Apple 政策、系統框架變化或產品迭代，我們可能維護、優化、替換或停止部分功能，但不會故意取消有效付費權益以迫使重複購買。"],
        ["contact", "聯絡我們", "Pro 權益問題可寄送至下方支援信箱。"]
      ]],
      renewal: ["自動續費服務協議", "了解訂閱續費及取消方式。", "本協議僅適用於透過 Apple 購買的 Locking Phone Pro 月訂閱與年訂閱。永久買斷為一次性購買，不會自動續費。", [
        ["products", "訂閱產品", "月訂閱按月續費，年訂閱按年續費。確認前，App 與 Apple 購買頁會顯示產品名稱、本地價格、計費週期與權益。"],
        ["renewal", "自動續費", "除非你在 Apple 顯示的續費截止時間前取消，訂閱會透過 Apple 帳戶自動續費，並依 Apple 訂閱計費規則向綁定的付款方式收費。"],
        ["cancel", "取消方式", "在 iPhone 開啟「設定」→點選姓名→「訂閱」→Locking Phone→「取消訂閱」；也可使用 App「我的」中的「管理訂閱」。為避免下一次收費，請至少於目前週期結束前24小時完成取消。"],
        ["after-cancel", "取消後的權益", "取消會阻止下一次續費。除非 Apple 另有說明，權益通常持續至目前已付費週期結束。刪除 App 不等於取消訂閱。"],
        ["price", "價格調整", "Apple 會依規則展示和通知價格變化，並在需要時徵得同意。若未同意必須確認的變更，Apple 可能於目前週期結束後取消訂閱。"],
        ["restore", "恢復與更換裝置", "請以同一 Apple 帳戶使用「恢復購買」。權益取決於 Apple 交易驗證、App Store 可用性、裝置相容性及 App 持續提供。"],
        ["refund", "退款與帳單問題", "付款與退款由 Apple 處理。符合條件時可前往 reportaproblem.apple.com 或聯絡 Apple 支援，法定消費者權利不受影響。"],
        ["no-trial", "沒有自動續費試用", "第一個完整夜晚免費是 App 本機的一次性使用機會，不是 App Store 訂閱試用，不會開始收費，也不需取消。"],
        ["contact", "聯絡我們", "服務問題可寄送至下方支援信箱；Apple 帳戶帳單與退款由 Apple 處理。"]
      ]]
    }
  };

  const summaryTranslations = {
    es: {
      terms: ["Términos de uso", "Reglas para usar Locking Phone.", "Estos términos rigen el uso de Locking Phone, ofrecido por Wuhan Lixing Zhumeng Network Technology Co., Ltd.", [
        ["service", "El servicio", "Locking Phone crea bloqueos únicos o diarios mediante Tiempo de uso de Apple. Teléfono, Mensajes y Alarma dependen de Siempre permitido en iOS."], ["active-lock", "Bloqueo activo", "Durante un bloqueo activo no se puede desactivar ni cambiar el horario. Un plan diario puede modificarse fuera del periodo bloqueado; el cambio se aplica al siguiente ciclo."], ["license", "Licencia y Apple", "La app se licencia conforme al EULA estándar de Apple salvo que la ficha muestre otro acuerdo. Estos términos complementan ese EULA."], ["responsibility", "Responsabilidad", "Elige horarios seguros, conserva acceso a funciones esenciales y usa la app legalmente."], ["purchases", "Compras", "Los planes mensual, anual y de por vida se venden mediante Apple. Apple gestiona cobros, cancelaciones, restauraciones y reembolsos."], ["health", "No es un servicio médico", "La app no diagnostica ni trata el insomnio ni otras enfermedades."], ["availability", "Disponibilidad", "Los permisos, iOS, el dispositivo y las actualizaciones pueden afectar al bloqueo; no se garantiza un resultado médico o de productividad."], ["contact", "Contacto", "Operador: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["Acuerdo del servicio Pro", "Qué incluye Locking Phone Pro.", "Se aplica a las suscripciones y a la compra de por vida realizadas en App Store.", [
        ["plans", "Planes", "Hay suscripción mensual, anual y compra única de por vida. El precio real aparece antes de confirmar. No existe una prueba automática de siete días."], ["benefits", "Ventajas Pro", "Tras la primera noche gratuita, Pro incluye más bloqueos, repetición diaria, informes semanales, relaciones entre registros locales, acciones personalizadas, retos de 7/21/30 días, rutinas, tendencias de 30/90 días y exportación PDF/CSV."], ["activation", "Activación", "Apple activa y verifica el acceso. Restaura con la misma Cuenta de Apple."], ["subscriptions", "Suscripciones", "Se renuevan hasta que se cancelan; consulta el acuerdo de renovación automática."], ["lifetime", "De por vida", "Es una compra única sin renovación, disponible mientras la app siga ofreciéndose y siendo compatible."], ["refunds", "Cobros y reembolsos", "Apple procesa pagos y solicitudes de reembolso."], ["contact", "Contacto", "Escribe al correo de soporte para consultar el acceso Pro."]
      ]],
      renewal: ["Acuerdo de renovación automática", "Cómo se renueva y cancela la suscripción.", "Se aplica a los planes mensual y anual; la compra de por vida no se renueva.", [
        ["products", "Productos", "El plan mensual se renueva cada mes y el anual cada año; precio y periodo aparecen antes de confirmar."], ["renewal", "Renovación", "La Cuenta de Apple renueva y cobra automáticamente salvo cancelación dentro del plazo indicado por Apple."], ["cancel", "Cancelar", "Ajustes > tu nombre > Suscripciones > Locking Phone > Cancelar. Cancela al menos 24 horas antes del final del periodo."], ["after-cancel", "Después", "El acceso suele continuar hasta terminar el periodo pagado. Borrar la app no cancela la suscripción."], ["price", "Cambios de precio", "Apple comunica los cambios y solicita consentimiento cuando corresponde."], ["restore", "Restaurar", "Usa la misma Cuenta de Apple y Restaurar compras."], ["refund", "Reembolsos", "Apple gestiona pagos y reembolsos en reportaproblem.apple.com."], ["no-trial", "Sin prueba renovable", "La primera noche gratis es local, no inicia una suscripción ni un cobro."], ["contact", "Contacto", "Soporte atiende el servicio; Apple atiende cobros y reembolsos."]
      ]]
    },
    ja: {
      terms: ["利用規約", "Locking Phoneを利用するための規則。", "本規約はWuhan Lixing Zhumeng Network Technology Co., Ltd.が提供するLocking Phoneに適用されます。", [
        ["service", "サービス", "Appleのスクリーンタイムを使い、1回または毎日のロック予定を実行します。電話、メッセージ、アラームはiOSの常に許可に従います。"], ["active-lock", "ロック中", "ロック中は停止や時刻変更ができません。毎日の予定はロック時間外に変更でき、次回から反映されます。"], ["license", "ライセンス", "別の表示がない限りApple標準EULAが適用され、本規約がサービスと有料機能を補足します。"], ["responsibility", "利用者の責任", "安全な時刻を選び、必要な機能を常に許可し、法律に従って利用してください。"], ["purchases", "購入", "月額・年額・買い切りはAppleのアプリ内課金で提供され、請求、解約、復元、返金はAppleが処理します。"], ["health", "医療サービスではありません", "不眠症やその他の病気を診断・治療するものではありません。"], ["availability", "利用可能性", "権限、iOS、端末設定や更新により動作が影響を受ける場合があります。"], ["contact", "連絡先", "運営者: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["会員サービス規約", "Locking Phone Proの内容。", "App Storeで購入するサブスクリプションと買い切りに適用されます。", [
        ["plans", "プラン", "月額、年額、買い切りがあります。実際の価格は購入前に表示され、7日間の自動更新トライアルはありません。"], ["benefits", "Pro特典", "無料の1夜後もロックと毎日の繰り返しを利用できます。週次レポート、端末内データの関連分析、次週のアクション、7/21/30日チャレンジ、ルーチン、30/90日トレンド、PDF/CSV出力も含みます。"], ["activation", "有効化と復元", "Appleが購入を確認します。同じApple Accountで購入を復元してください。"], ["subscriptions", "サブスクリプション", "解約するまで自動更新されます。詳細は自動更新規約をご覧ください。"], ["lifetime", "買い切り", "更新のない1回購入で、アプリが提供・対応される間の利用権です。"], ["refunds", "請求と返金", "支払いと返金はAppleが処理します。"], ["contact", "連絡先", "Proについてはサポートへご連絡ください。"]
      ]],
      renewal: ["自動更新サービス規約", "更新と解約の方法。", "月額・年額プランに適用され、買い切りは更新されません。", [
        ["products", "対象商品", "月額は毎月、年額は毎年更新され、価格と期間は購入前に表示されます。"], ["renewal", "自動更新", "Appleが示す期限までに解約しない限りApple Accountで自動更新・請求されます。"], ["cancel", "解約", "設定 > 名前 > サブスクリプション > Locking Phoneから解約します。終了24時間以上前に手続きしてください。"], ["after-cancel", "解約後", "通常は支払済み期間の終了まで利用できます。アプリ削除だけでは解約されません。"], ["price", "価格変更", "Appleが通知し、必要に応じて同意を求めます。"], ["restore", "復元", "同じApple Accountで購入を復元します。"], ["refund", "返金", "Appleまたはreportaproblem.apple.comで手続きします。"], ["no-trial", "自動更新トライアルなし", "最初の無料1夜はサブスクリプションを開始せず、請求もありません。"], ["contact", "連絡先", "サービスは当社サポート、請求と返金はAppleへお問い合わせください。"]
      ]]
    },
    ko: {
      terms: ["이용 약관", "Locking Phone 사용 규칙.", "본 약관은 Wuhan Lixing Zhumeng Network Technology Co., Ltd.가 제공하는 Locking Phone에 적용됩니다.", [
        ["service", "서비스", "Apple 스크린 타임을 이용해 일회성 또는 매일 잠금 일정을 실행합니다. 전화, 메시지, 알람은 iOS 항상 허용 설정을 따릅니다."], ["active-lock", "잠금 중", "잠금이 활성화되면 끄거나 시간을 바꿀 수 없습니다. 매일 일정은 잠금 외 시간에 수정하며 다음 주기부터 적용됩니다."], ["license", "라이선스", "별도 표시가 없으면 Apple 표준 EULA가 적용되며 본 약관은 서비스와 유료 기능을 보완합니다."], ["responsibility", "사용자 책임", "안전한 시간을 선택하고 필수 기능을 허용하며 합법적으로 사용해야 합니다."], ["purchases", "구매", "월간, 연간, 평생 구매는 Apple 인앱 결제로 제공되며 결제, 취소, 복원, 환불은 Apple이 처리합니다."], ["health", "의료 서비스 아님", "불면증이나 질환을 진단하거나 치료하지 않습니다."], ["availability", "가용성", "권한, iOS, 기기 설정과 업데이트가 일정 실행에 영향을 줄 수 있습니다."], ["contact", "문의", "운영자: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["회원 서비스 약관", "Locking Phone Pro 혜택.", "App Store에서 구입한 구독과 평생 이용권에 적용됩니다.", [
        ["plans", "상품", "월간, 연간, 일회성 평생 이용권이 있습니다. 실제 가격은 결제 전에 표시되며 7일 자동 갱신 무료 체험은 없습니다."], ["benefits", "Pro 혜택", "무료 첫날 이후의 잠금과 매일 반복, 주간 보고서, 기기 내 기록 관계 분석, 다음 주 제안, 7/21/30일 챌린지, 루틴, 30/90일 추세, PDF/CSV 내보내기가 포함됩니다."], ["activation", "활성화와 복원", "Apple이 거래를 확인합니다. 같은 Apple Account로 구매를 복원하세요."], ["subscriptions", "구독", "취소할 때까지 자동 갱신됩니다. 자동 갱신 약관을 확인하세요."], ["lifetime", "평생 이용권", "갱신 없는 일회성 구매이며 앱이 제공되고 지원되는 동안 적용됩니다."], ["refunds", "결제와 환불", "결제와 환불은 Apple이 처리합니다."], ["contact", "문의", "Pro 권한은 지원 이메일로 문의하세요."]
      ]],
      renewal: ["자동 갱신 서비스 약관", "갱신 및 취소 방법.", "월간·연간 구독에 적용되며 평생 이용권은 갱신되지 않습니다.", [
        ["products", "구독 상품", "월간은 매월, 연간은 매년 갱신되며 가격과 기간은 결제 전에 표시됩니다."], ["renewal", "자동 갱신", "Apple이 안내한 기한 전에 취소하지 않으면 Apple Account로 자동 갱신되고 결제됩니다."], ["cancel", "취소", "설정 > 이름 > 구독 > Locking Phone에서 취소하세요. 종료 최소 24시간 전에 완료해야 합니다."], ["after-cancel", "취소 후", "일반적으로 결제 기간 종료까지 이용할 수 있습니다. 앱 삭제는 구독 취소가 아닙니다."], ["price", "가격 변경", "Apple이 가격 변경을 알리고 필요한 경우 동의를 받습니다."], ["restore", "복원", "같은 Apple Account로 구매 복원을 사용하세요."], ["refund", "환불", "Apple 또는 reportaproblem.apple.com에서 처리합니다."], ["no-trial", "자동 갱신 체험 없음", "첫 무료 1회는 구독이나 결제를 시작하지 않습니다."], ["contact", "문의", "서비스는 지원 이메일, 결제와 환불은 Apple에 문의하세요."]
      ]]
    },
    fr: {
      terms: ["Conditions d’utilisation", "Règles d’utilisation de Locking Phone.", "Ces conditions régissent Locking Phone, fourni par Wuhan Lixing Zhumeng Network Technology Co., Ltd.", [
        ["service", "Service", "L’app exécute un verrouillage unique ou quotidien avec Temps d’écran d’Apple. Téléphone, Messages et Alarme suivent Toujours autorisées."], ["active-lock", "Verrouillage actif", "Pendant un verrouillage, arrêt et modification sont indisponibles. Un programme quotidien se modifie hors verrouillage et le changement s’applique au cycle suivant."], ["license", "Licence", "Sauf indication contraire, le CLUF standard d’Apple s’applique; ces conditions le complètent pour le service."], ["responsibility", "Responsabilité", "Choisissez des heures sûres, conservez les fonctions essentielles et utilisez l’app légalement."], ["purchases", "Achats", "Les offres mensuelle, annuelle et à vie utilisent l’achat intégré Apple. Apple traite paiement, annulation, restauration et remboursement."], ["health", "Pas un service médical", "L’app ne diagnostique ni ne traite l’insomnie ou une maladie."], ["availability", "Disponibilité", "Autorisations, iOS, réglages et mises à jour peuvent affecter le verrouillage."], ["contact", "Contact", "Opérateur : Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["Contrat du service Pro", "Ce que comprend Locking Phone Pro.", "Il s’applique aux abonnements et à l’achat à vie sur l’App Store.", [
        ["plans", "Formules", "Mensuelle, annuelle et achat unique à vie. Le prix réel apparaît avant confirmation. Aucun essai de 7 jours à renouvellement automatique."], ["benefits", "Avantages Pro", "Après la première nuit gratuite, profitez des verrouillages, de la répétition quotidienne, des rapports hebdomadaires, des relations entre données locales, des actions personnalisées, des défis 7/21/30 jours, des routines, des tendances 30/90 jours et des exports PDF/CSV."], ["activation", "Activation", "Apple vérifie l’achat. Restaurez avec le même compte Apple."], ["subscriptions", "Abonnements", "Ils se renouvellent jusqu’à annulation; voir le contrat de renouvellement."], ["lifetime", "Achat à vie", "Achat unique sans renouvellement, valable tant que l’app reste proposée et prise en charge."], ["refunds", "Paiement et remboursement", "Apple traite les paiements et remboursements."], ["contact", "Contact", "Contactez l’assistance pour l’accès Pro."]
      ]],
      renewal: ["Contrat de renouvellement automatique", "Renouvellement et annulation.", "Il s’applique aux abonnements mensuel et annuel; l’achat à vie ne se renouvelle pas.", [
        ["products", "Produits", "Le mensuel se renouvelle chaque mois, l’annuel chaque année; prix et durée sont affichés avant achat."], ["renewal", "Renouvellement", "Apple renouvelle et facture sauf annulation avant l’échéance indiquée."], ["cancel", "Annuler", "Réglages > votre nom > Abonnements > Locking Phone. Annulez au moins 24 h avant la fin."], ["after-cancel", "Après annulation", "L’accès continue généralement jusqu’à la fin de la période payée. Supprimer l’app n’annule pas."], ["price", "Prix", "Apple communique les changements et demande un accord si nécessaire."], ["restore", "Restaurer", "Utilisez le même compte Apple et Restaurer les achats."], ["refund", "Remboursement", "Apple gère les demandes via reportaproblem.apple.com."], ["no-trial", "Aucun essai renouvelable", "La première nuit gratuite ne démarre ni abonnement ni facturation."], ["contact", "Contact", "Notre support traite le service; Apple traite facturation et remboursements."]
      ]]
    },
    de: {
      terms: ["Nutzungsbedingungen", "Regeln für Locking Phone.", "Diese Bedingungen gelten für Locking Phone von Wuhan Lixing Zhumeng Network Technology Co., Ltd.", [
        ["service", "Dienst", "Die App führt einmalige oder tägliche Sperren mit Apples Bildschirmzeit aus. Telefon, Nachrichten und Wecker folgen Immer erlauben."], ["active-lock", "Aktive Sperre", "Während einer Sperre sind Ausschalten und Zeitänderung nicht möglich. Tägliche Pläne lassen sich außerhalb der Sperre für den nächsten Zyklus ändern."], ["license", "Lizenz", "Soweit nichts anderes angezeigt wird, gilt Apples Standard-EULA; diese Bedingungen ergänzen sie für den Dienst."], ["responsibility", "Verantwortung", "Wähle sichere Zeiten, erhalte wichtige Funktionen und nutze die App rechtmäßig."], ["purchases", "Käufe", "Monat, Jahr und Lifetime werden über Apple In-App Purchase angeboten. Apple bearbeitet Zahlung, Kündigung, Wiederherstellung und Erstattung."], ["health", "Kein medizinischer Dienst", "Die App diagnostiziert oder behandelt keine Schlafstörung oder Krankheit."], ["availability", "Verfügbarkeit", "Berechtigungen, iOS, Einstellungen und Updates können die Sperre beeinflussen."], ["contact", "Kontakt", "Betreiber: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["Pro-Servicevereinbarung", "Leistungen von Locking Phone Pro.", "Sie gilt für Abos und Lifetime-Käufe im App Store.", [
        ["plans", "Pläne", "Monatlich, jährlich und einmaliger Lifetime-Kauf. Der echte Preis erscheint vor Bestätigung. Keine automatisch verlängernde 7-Tage-Testphase."], ["benefits", "Pro-Vorteile", "Nach der ersten Gratisnacht umfasst Pro weitere Sperren, tägliche Wiederholung, Wochenberichte, Zusammenhänge lokaler Daten, persönliche Aktionen, 7/21/30-Tage-Challenges, Routinen, 30/90-Tage-Trends und PDF/CSV-Export."], ["activation", "Aktivierung", "Apple verifiziert den Kauf. Mit demselben Apple Account wiederherstellen."], ["subscriptions", "Abos", "Verlängern sich bis zur Kündigung; siehe Auto-Verlängerungsvereinbarung."], ["lifetime", "Lifetime", "Einmalkauf ohne Verlängerung, solange die App angeboten und unterstützt wird."], ["refunds", "Zahlung", "Apple bearbeitet Zahlungen und Erstattungen."], ["contact", "Kontakt", "Pro-Fragen an den Support."]
      ]],
      renewal: ["Vereinbarung zur automatischen Verlängerung", "Verlängerung und Kündigung.", "Gilt für Monats- und Jahresabos; Lifetime verlängert sich nicht.", [
        ["products", "Produkte", "Monatlich verlängert sich jeden Monat, jährlich jedes Jahr; Preis und Zeitraum stehen vor dem Kauf."], ["renewal", "Verlängerung", "Apple verlängert und belastet automatisch, sofern nicht fristgerecht gekündigt wird."], ["cancel", "Kündigen", "Einstellungen > Name > Abonnements > Locking Phone. Mindestens 24 Stunden vor Ablauf kündigen."], ["after-cancel", "Danach", "Zugang bleibt meist bis Periodenende. App-Löschen kündigt nicht."], ["price", "Preisänderung", "Apple informiert und holt nötige Zustimmung ein."], ["restore", "Wiederherstellen", "Mit demselben Apple Account Käufe wiederherstellen."], ["refund", "Erstattung", "Apple bzw. reportaproblem.apple.com bearbeitet Erstattungen."], ["no-trial", "Kein Verlängerungstest", "Die erste Gratisnacht startet kein Abo und keine Abrechnung."], ["contact", "Kontakt", "Servicefragen an uns, Abrechnung und Erstattung an Apple."]
      ]]
    },
    "pt-BR": {
      terms: ["Termos de Uso", "Regras para usar o Locking Phone.", "Estes termos regem o Locking Phone, fornecido por Wuhan Lixing Zhumeng Network Technology Co., Ltd.", [
        ["service", "Serviço", "O app executa bloqueios únicos ou diários com o Tempo de Uso da Apple. Telefone, Mensagens e Alarme seguem Sempre Permitido."], ["active-lock", "Bloqueio ativo", "Durante o bloqueio não é possível desligar nem alterar horários. O plano diário pode ser editado fora do bloqueio e vale no próximo ciclo."], ["license", "Licença", "Salvo indicação diferente, aplica-se o EULA padrão da Apple; estes termos o complementam."], ["responsibility", "Responsabilidade", "Escolha horários seguros, mantenha funções essenciais e use o app legalmente."], ["purchases", "Compras", "Planos mensal, anual e vitalício usam compras no app da Apple. A Apple trata pagamentos, cancelamentos, restaurações e reembolsos."], ["health", "Não é serviço médico", "O app não diagnostica nem trata insônia ou doenças."], ["availability", "Disponibilidade", "Permissões, iOS, ajustes e atualizações podem afetar o bloqueio."], ["contact", "Contato", "Operadora: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["Contrato do serviço Pro", "O que o Locking Phone Pro inclui.", "Aplica-se às assinaturas e à compra vitalícia na App Store.", [
        ["plans", "Planos", "Mensal, anual e compra vitalícia única. O preço real aparece antes da confirmação. Não há teste de 7 dias com renovação automática."], ["benefits", "Benefícios Pro", "Após a primeira noite grátis, use novos bloqueios, repetição diária, relatórios semanais, relações entre dados locais, ações personalizadas, desafios de 7/21/30 dias, rotinas, tendências de 30/90 dias e exportação PDF/CSV."], ["activation", "Ativação", "A Apple verifica a compra. Restaure com a mesma Conta Apple."], ["subscriptions", "Assinaturas", "Renovam até o cancelamento; consulte o contrato de renovação."], ["lifetime", "Vitalício", "Compra única sem renovação, válida enquanto o app for oferecido e compatível."], ["refunds", "Pagamentos", "A Apple processa pagamentos e reembolsos."], ["contact", "Contato", "Fale com o suporte sobre acesso Pro."]
      ]],
      renewal: ["Contrato de renovação automática", "Como renovar e cancelar.", "Aplica-se aos planos mensal e anual; o vitalício não renova.", [
        ["products", "Produtos", "Mensal renova todo mês e anual todo ano; preço e período aparecem antes da compra."], ["renewal", "Renovação", "A Apple renova e cobra automaticamente salvo cancelamento no prazo informado."], ["cancel", "Cancelar", "Ajustes > seu nome > Assinaturas > Locking Phone. Cancele ao menos 24 horas antes do fim."], ["after-cancel", "Depois", "O acesso normalmente continua até o fim do período pago. Apagar o app não cancela."], ["price", "Preço", "A Apple comunica mudanças e pede consentimento quando necessário."], ["restore", "Restaurar", "Use a mesma Conta Apple e Restaurar Compras."], ["refund", "Reembolso", "A Apple trata solicitações em reportaproblem.apple.com."], ["no-trial", "Sem teste renovável", "A primeira noite grátis não inicia assinatura nem cobrança."], ["contact", "Contato", "Nosso suporte trata o serviço; Apple trata cobrança e reembolso."]
      ]]
    },
    ar: {
      terms: ["شروط الاستخدام", "قواعد استخدام Locking Phone.", "تحكم هذه الشروط استخدام Locking Phone المقدم من Wuhan Lixing Zhumeng Network Technology Co., Ltd.", [
        ["service", "الخدمة", "ينفذ التطبيق قفلًا لمرة واحدة أو يوميًا باستخدام مدة استخدام الجهاز من Apple. يخضع الهاتف والرسائل والمنبه لإعداد مسموح دائمًا."], ["active-lock", "أثناء القفل", "لا يمكن إيقاف الخطة أو تغيير الوقت أثناء القفل. يمكن تعديل الخطة اليومية خارج فترة القفل ويطبق التغيير في الدورة التالية."], ["license", "الترخيص", "تطبق اتفاقية Apple القياسية للمستخدم النهائي ما لم يظهر غير ذلك، وتكملها هذه الشروط للخدمة."], ["responsibility", "مسؤوليتك", "اختر أوقاتًا آمنة وأبقِ الوظائف الأساسية متاحة واستخدم التطبيق بصورة قانونية."], ["purchases", "المشتريات", "تتوفر الخطط الشهرية والسنوية ومدى الحياة عبر الشراء داخل التطبيق من Apple، وهي تدير الدفع والإلغاء والاستعادة والاسترداد."], ["health", "ليست خدمة طبية", "لا يشخص التطبيق الأرق أو الأمراض ولا يعالجها."], ["availability", "التوفر", "قد تؤثر الأذونات وiOS والإعدادات والتحديثات في تنفيذ القفل."], ["contact", "التواصل", "المشغل: Wuhan Lixing Zhumeng Network Technology Co., Ltd."]
      ]],
      membership: ["اتفاقية خدمة Pro", "ما تتضمنه Locking Phone Pro.", "تنطبق على الاشتراكات وشراء مدى الحياة عبر App Store.", [
        ["plans", "الخطط", "شهرية وسنوية وشراء واحد مدى الحياة. يظهر السعر الفعلي قبل التأكيد. لا توجد تجربة 7 أيام تتجدد تلقائيًا."], ["benefits", "مزايا Pro", "بعد الليلة المجانية الأولى تشمل Pro الأقفال والتكرار اليومي والتقارير الأسبوعية وتحليل البيانات المحلية والخطوات الشخصية وتحديات 7/21/30 يومًا والروتين واتجاهات 30/90 يومًا وتصدير PDF/CSV."], ["activation", "التفعيل", "تتحقق Apple من الشراء. استعد المشتريات باستخدام حساب Apple نفسه."], ["subscriptions", "الاشتراكات", "تتجدد حتى الإلغاء؛ راجع اتفاقية التجديد التلقائي."], ["lifetime", "مدى الحياة", "شراء واحد بلا تجديد ما دام التطبيق متاحًا ومدعومًا."], ["refunds", "الدفع والاسترداد", "تعالج Apple المدفوعات وطلبات الاسترداد."], ["contact", "التواصل", "تواصل مع الدعم بشأن وصول Pro."]
      ]],
      renewal: ["اتفاقية التجديد التلقائي", "كيفية التجديد والإلغاء.", "تنطبق على الاشتراك الشهري والسنوي؛ شراء مدى الحياة لا يتجدد.", [
        ["products", "المنتجات", "تتجدد الشهرية كل شهر والسنوية كل سنة؛ يظهر السعر والمدة قبل الشراء."], ["renewal", "التجديد", "تجدد Apple الاشتراك وتحصّل الرسوم تلقائيًا ما لم تلغه قبل الموعد الذي تعرضه."], ["cancel", "الإلغاء", "الإعدادات > اسمك > الاشتراكات > Locking Phone. ألغِ قبل نهاية الفترة بـ24 ساعة على الأقل."], ["after-cancel", "بعد الإلغاء", "يستمر الوصول عادة حتى نهاية الفترة المدفوعة. حذف التطبيق لا يلغي الاشتراك."], ["price", "تغيير السعر", "تخطر Apple بالتغييرات وتطلب الموافقة عند الحاجة."], ["restore", "الاستعادة", "استخدم حساب Apple نفسه وخيار استعادة المشتريات."], ["refund", "الاسترداد", "تعالج Apple الطلبات عبر reportaproblem.apple.com."], ["no-trial", "لا تجربة متجددة", "الليلة الأولى المجانية لا تبدأ اشتراكًا أو دفعًا."], ["contact", "التواصل", "الدعم يعالج الخدمة وApple تعالج الفوترة والاسترداد."]
      ]]
    }
  };

  const normalize = (entry) => ({ title: entry[0], lead: entry[1], intro: entry[2], sections: entry[3] });
  const pagesByLanguage = { en: englishPages };
  Object.entries(localizedPages).forEach(([code, pages]) => {
    pagesByLanguage[code] = Object.fromEntries(Object.entries(pages).map(([key, value]) => [key, normalize(value)]));
  });
  Object.entries(summaryTranslations).forEach(([code, pages]) => {
    pagesByLanguage[code] = Object.fromEntries(Object.entries(pages).map(([key, value]) => [key, normalize(value)]));
  });

  const aliases = { "zh-CN": "zh-Hans", "zh-SG": "zh-Hans", zh: "zh-Hans", "zh-TW": "zh-Hant", "zh-HK": "zh-Hant", "zh-MO": "zh-Hant", pt: "pt-BR", "pt-BR": "pt-BR" };
  function resolveLanguage() {
    const requested = new URLSearchParams(location.search).get("lang");
    if (requested && pagesByLanguage[requested]) return requested;
    const saved = localStorage.getItem("lockingPhoneLanguage");
    if (saved && pagesByLanguage[saved]) return saved;
    for (const candidate of navigator.languages || [navigator.language]) {
      if (aliases[candidate]) return aliases[candidate];
      const base = candidate.split("-")[0];
      if (pagesByLanguage[base]) return base;
    }
    return "en";
  }

  function localizedDate(code) {
    const date = new Date(`${config.legalDate || "2026-08-27"}T00:00:00Z`);
    return new Intl.DateTimeFormat(languages[code].locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
  }

  function contactMarkup() {
    const safeEmail = String(config.supportEmail || "support@logihope.com").replace(/[<>&"']/g, "");
    return `<div class="contact-box"><p><a href="mailto:${safeEmail}">${safeEmail}</a></p></div>`;
  }

  const targets = { privacy: "privacy.html", terms: "terms.html", membership: "membership.html", renewal: "auto-renewal.html", support: "support.html" };
  function renderRelated(code) {
    const common = commonByLanguage[code];
    const order = ["privacy", "terms", "membership", "renewal"];
    return `<section class="related-documents" aria-labelledby="related-title"><h2 id="related-title">${common.related}</h2><nav>${order.map((key) => `<a href="${targets[key]}?lang=${encodeURIComponent(code)}">${common[key]}</a>`).join("")}</nav></section>`;
  }

  function render(code) {
    const language = languages[code];
    const common = commonByLanguage[code];
    const content = pagesByLanguage[code][page];
    document.documentElement.lang = language.locale;
    document.documentElement.dir = language.dir;
    document.title = `${content.title} · Locking Phone`;
    document.querySelector(".brand").href = `index.html?lang=${encodeURIComponent(code)}`;

    document.querySelectorAll("[data-nav]").forEach((link) => {
      const key = link.dataset.nav;
      link.textContent = common[key];
      link.href = `${targets[key]}?lang=${encodeURIComponent(code)}`;
      if (key === page) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-footer-link]").forEach((link) => {
      const key = link.dataset.footerLink;
      link.textContent = common[key];
      link.href = `${targets[key]}?lang=${encodeURIComponent(code)}`;
    });

    document.getElementById("tocLabel").textContent = common.toc;
    document.getElementById("pageTitle").textContent = content.title;
    document.getElementById("pageLead").textContent = content.lead;
    document.getElementById("pageIntro").textContent = content.intro;
    document.getElementById("updatedAt").textContent = `${common.updated}: ${localizedDate(code)}`;
    document.getElementById("tocLinks").innerHTML = content.sections.map(([id, title]) => `<a href="#${id}">${title}</a>`).join("");
    document.getElementById("pageSections").innerHTML = content.sections.map(([id, title, body]) => `<section class="policy-section" id="${id}"><h2>${title}</h2><p>${body}</p>${id === "contact" ? contactMarkup() : ""}</section>`).join("");
    document.getElementById("relatedDocuments").innerHTML = renderRelated(code);
    document.getElementById("languageSelect").value = code;
  }

  const select = document.getElementById("languageSelect");
  select.innerHTML = Object.entries(languages).map(([code, meta]) => `<option value="${code}">${meta.label}</option>`).join("");
  select.addEventListener("change", (event) => {
    const code = event.target.value;
    localStorage.setItem("lockingPhoneLanguage", code);
    const url = new URL(location.href);
    url.searchParams.set("lang", code);
    history.replaceState(null, "", url);
    render(code);
  });
  document.getElementById("copyrightYear").textContent = new Date().getFullYear();
  render(resolveLanguage());
})();
