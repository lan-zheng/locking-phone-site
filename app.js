(() => {
  "use strict";

  const config = window.LockingPhoneSiteConfig || {};
  const page = document.body.dataset.page === "support" ? "support" : "privacy";

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

  const translations = {
    en: {
      common: { privacy: "Privacy", terms: "Terms", membership: "Membership", renewal: "Auto-renewal", support: "Support", toc: "On this page", updated: "Last updated" },
      privacy: {
        title: "Privacy Policy",
        lead: "Your sleep routine stays on your device.",
        intro: "Locking Phone is provided without user accounts, advertising, analytics SDKs, or a developer server. This policy explains the limited information processed locally by the app.",
        sections: [
          ["no-collection", "What we do not collect", "The current version does not send your name, contact details, device identifiers, location, browsing history, sleep records, morning check-ins, or app-use records to the developer. We do not sell data, track you across apps, or use your information for advertising."],
          ["local-data", "Data stored on your device", "To run your schedule and prepare the seven-night report, the app stores your lock and restore times, plan status, isolation events, blocked-opening attempts, and optional self-reported sleep time, wake count, and morning feeling. The app and its required iOS extensions share this information locally through an App Group."],
          ["apple-services", "Screen Time and Apple services", "After you grant permission, Locking Phone uses Apple Screen Time, Family Controls, Managed Settings, and Device Activity to restrict third-party apps and websites at your chosen times. Apple manages the authorization and Always Allowed settings. StoreKit and the App Store process subscriptions, lifetime purchases, and restorations; we do not receive your full payment-card details."],
          ["retention", "Retention and deletion", "Records remain on your device. Deleting the app will usually delete app-related local data, while device backups and system behavior are controlled by Apple. You may revoke Screen Time permission in iOS Settings, but doing so stops scheduled locking."],
          ["children", "Children", "Locking Phone is not designed to collect personal information from children. Family Controls authorization and family-related protections are managed by Apple and iOS."],
          ["medical", "Medical disclaimer", "Locking Phone is a digital wellbeing and self-control tool, not a medical device. It does not diagnose or treat insomnia, thyroid conditions, or any other medical condition. Seek advice from a qualified health professional for persistent sleep or health concerns."],
          ["changes", "Policy changes", "If a future version adds accounts, cloud sync, analytics, or other data processing, this policy and the App Store privacy disclosure will be updated before that feature is released."],
          ["contact", "Contact", "Questions about this policy or Locking Phone can be sent using the support contact below."]
        ]
      },
      support: {
        title: "Support",
        lead: "Help for a quieter night.",
        intro: "Locking Phone uses Apple Screen Time to run the schedule you choose. These answers cover the most common setup, locking, and purchase questions.",
        sections: [
          ["start", "How do I start a nightly lock?", "Allow Screen Time access, choose a lock time and morning restore time, then enable the nightly plan. Locking Phone registers the schedule with iOS so it can begin even when the app is not open."],
          ["allowed", "Why are Phone, Messages, or Alarm still available?", "Locking Phone restricts third-party apps and websites. Availability of Phone, Messages, Alarm, and other essential apps follows your iOS Always Allowed settings."],
          ["no-bypass", "Can I temporarily unlock during an active night?", "No. An active night has no temporary bypass inside Locking Phone. The restriction ends automatically at the restore time you selected."],
          ["not-starting", "Why did my schedule not start?", "Confirm Screen Time permission is approved, the nightly plan is enabled, and the start and restore times differ. After the first free completed night, an active subscription or lifetime purchase is required for future recurring nights."],
          ["purchase", "Purchases and restore", "Open the My tab to subscribe, buy lifetime access, manage a subscription, or restore purchases made with the same Apple Account. Billing and refunds are handled by Apple."],
          ["privacy", "Where are my records?", "Schedules, blocked-opening counts, and optional morning check-ins stay on your device. Locking Phone has no developer account system, advertising SDK, or analytics SDK."],
          ["contact", "Contact support", "If the answer above does not solve the problem, contact us and include your iOS version, Locking Phone version, and a short description. Do not include sensitive health or payment information."]
        ]
      }
    },
    "zh-Hans": {
      common: { privacy: "隐私政策", terms: "用户协议", membership: "会员服务协议", renewal: "自动续费服务协议", support: "支持", toc: "本页内容", updated: "最后更新" },
      privacy: {
        title: "隐私政策", lead: "你的睡眠习惯，只留在你的设备上。",
        intro: "Locking Phone 不建立用户账号，不接入广告或分析 SDK，也没有开发者服务器。本政策说明 App 在设备本地处理的有限信息。",
        sections: [
          ["no-collection", "我们不收集的数据", "当前版本不会把你的姓名、联系方式、设备标识符、位置、浏览记录、睡眠记录、早晨自评或 App 使用记录发送给开发者。我们不出售数据、不跨 App 跟踪，也不将信息用于广告。"],
          ["local-data", "设备上的本地数据", "为了执行计划并生成七晚报告，App 会在设备本地保存锁定和恢复时间、计划状态、夜晚执行记录、被拦截的打开次数，以及你主动填写的入睡时间估计、夜醒次数和早晨感受。App 与必要的 iOS 扩展通过 App Group 在设备本地共享这些信息。"],
          ["apple-services", "屏幕使用时间与 Apple 服务", "你授权后，Locking Phone 使用 Apple 的屏幕使用时间、Family Controls、Managed Settings 和 Device Activity，在设定时段限制第三方 App 和网站。授权和“始终允许”由 iOS 管理；订阅、永久买断和恢复购买由 StoreKit 与 App Store 处理，我们不会取得完整银行卡资料。"],
          ["retention", "保留与删除", "记录保存在设备上。删除 App 通常会删除相关本地数据，设备备份和系统行为由 Apple 控制。你可以在 iOS 设置中撤销屏幕使用时间权限，但夜间计划将停止执行。"],
          ["children", "儿童", "Locking Phone 不以收集儿童个人信息为目的。Family Controls 的授权与家庭相关保护由 Apple 和 iOS 管理。"],
          ["medical", "医疗免责声明", "Locking Phone 是数字健康与自律工具，不是医疗器械，也不诊断或治疗失眠、甲状腺疾病及其他疾病。如长期存在睡眠或健康问题，请咨询合格的医疗专业人员。"],
          ["changes", "政策更新", "如未来版本增加账号、云同步、分析或其他数据处理，我们会在功能发布前更新本政策和 App Store 隐私申报。"],
          ["contact", "联系", "有关本政策或 Locking Phone 的问题，可以通过下方支持方式联系我们。"]
        ]
      },
      support: {
        title: "支持", lead: "帮你安静度过夜晚。",
        intro: "Locking Phone 使用 Apple 屏幕使用时间执行你设定的计划。下面是设置、锁定和购买中最常见的问题。",
        sections: [
          ["start", "如何开始夜间锁机？", "允许屏幕使用时间权限，选择锁定时间和清晨恢复时间，然后启用夜间计划。Locking Phone 会向 iOS 注册计划，即使 App 没有打开也能按时开始。"],
          ["allowed", "为什么电话、短信或闹钟仍可使用？", "Locking Phone 限制第三方 App 和网站。电话、短信、闹钟及其他必要 App 是否可用，取决于你的 iOS“始终允许”设置。"],
          ["no-bypass", "锁定期间能临时解锁吗？", "不能。夜间锁定开始后，Locking Phone 内不提供临时放行；限制会在你设定的恢复时间自动结束。"],
          ["not-starting", "为什么计划没有启动？", "请确认屏幕使用时间权限已批准、夜间计划已启用，并且开始与恢复时间不同。第一个完整免费夜晚结束后，后续循环计划需要有效订阅或永久版。"],
          ["purchase", "购买与恢复购买", "在“我的”页面可以订阅、购买永久版、管理订阅或恢复同一 Apple 账户购买的项目。账单与退款由 Apple 处理。"],
          ["privacy", "我的记录保存在哪里？", "计划、拦截打开次数和可选的早晨记录都保存在设备本地。Locking Phone 没有开发者账号系统、广告 SDK 或分析 SDK。"],
          ["contact", "联系支持", "如果以上内容没有解决问题，请联系我们，并提供 iOS 版本、Locking Phone 版本和简短问题描述。请勿发送敏感健康信息或支付资料。"]
        ]
      }
    },
    "zh-Hant": {
      common: { privacy: "隱私政策", terms: "使用者協議", membership: "會員服務協議", renewal: "自動續費服務協議", support: "支援", toc: "本頁內容", updated: "最後更新" },
      privacy: {
        title: "隱私權政策", lead: "你的睡眠習慣，只留在你的裝置上。",
        intro: "Locking Phone 不建立使用者帳號、不接入廣告或分析 SDK，也沒有開發者伺服器。本政策說明 App 在裝置本機處理的有限資訊。",
        sections: [
          ["no-collection", "我們不收集的資料", "目前版本不會將姓名、聯絡方式、裝置識別碼、位置、瀏覽記錄、睡眠記錄、早晨自評或 App 使用記錄傳送給開發者。我們不出售資料、不跨 App 追蹤，也不將資訊用於廣告。"],
          ["local-data", "裝置上的本機資料", "為了執行計畫並產生七晚報告，App 會在裝置本機儲存鎖定與恢復時間、計畫狀態、夜晚執行記錄、被攔截的開啟次數，以及你主動填寫的入睡時間估計、夜醒次數與早晨感受。App 與必要的 iOS 延伸功能透過 App Group 在裝置上共用這些資訊。"],
          ["apple-services", "螢幕使用時間與 Apple 服務", "經你授權後，Locking Phone 使用 Apple 的螢幕使用時間、Family Controls、Managed Settings 與 Device Activity，在設定時段限制第三方 App 和網站。授權與「永遠允許」由 iOS 管理；購買則由 StoreKit 與 App Store 處理。"],
          ["retention", "保留與刪除", "記錄保留在裝置上。刪除 App 通常會刪除相關本機資料，裝置備份與系統行為由 Apple 控制。撤銷螢幕使用時間權限後，夜間計畫將停止。"],
          ["children", "兒童", "Locking Phone 不以收集兒童個人資訊為目的。Family Controls 的授權與家庭保護由 Apple 和 iOS 管理。"],
          ["medical", "醫療免責聲明", "Locking Phone 是數位健康與自律工具，不是醫療器材，也不診斷或治療失眠、甲狀腺疾病及其他疾病。持續的睡眠或健康問題請諮詢合格醫療專業人員。"],
          ["changes", "政策更新", "若未來增加帳號、雲端同步、分析或其他資料處理，我們會在功能發布前更新本政策與 App Store 隱私申報。"],
          ["contact", "聯絡", "有關本政策或 Locking Phone 的問題，可透過下方支援方式聯絡我們。"]
        ]
      },
      support: {
        title: "支援", lead: "協助你安靜度過夜晚。", intro: "Locking Phone 使用 Apple 螢幕使用時間執行你設定的計畫。以下是最常見的設定、鎖定與購買問題。",
        sections: [
          ["start", "如何開始夜間鎖機？", "允許螢幕使用時間權限，選擇鎖定與清晨恢復時間，再啟用夜間計畫。即使 App 未開啟，iOS 仍可按時開始。"],
          ["allowed", "為什麼電話、訊息或鬧鐘仍可使用？", "Locking Phone 限制第三方 App 和網站。必要 App 是否可用取決於 iOS「永遠允許」設定。"],
          ["no-bypass", "鎖定期間能暫時解鎖嗎？", "不能。夜間鎖定開始後不提供暫時放行，限制會在設定的恢復時間自動結束。"],
          ["not-starting", "為什麼計畫沒有啟動？", "確認權限已核准、計畫已啟用且開始與恢復時間不同。第一個免費夜晚後，後續循環計畫需要有效訂閱或永久版。"],
          ["purchase", "購買與恢復購買", "在「我的」頁面可訂閱、購買永久版、管理訂閱或恢復同一 Apple 帳號的購買。帳單與退款由 Apple 處理。"],
          ["privacy", "我的記錄在哪裡？", "計畫、攔截開啟次數與早晨記錄都保存在裝置本機，沒有開發者帳號、廣告或分析 SDK。"],
          ["contact", "聯絡支援", "請提供 iOS 版本、Locking Phone 版本與簡短問題描述，勿傳送敏感健康或付款資訊。"]
        ]
      }
    }
  };

  const localizedSummaries = {
    es: {
      common: { privacy: "Privacidad", terms: "Términos", membership: "Servicio Pro", renewal: "Renovación automática", support: "Soporte", toc: "En esta página", updated: "Última actualización" },
      privacy: ["Política de privacidad", "Tu rutina de sueño permanece en tu dispositivo.", "Locking Phone no utiliza cuentas, publicidad, SDK de análisis ni un servidor del desarrollador.", [
        ["no-collection", "Datos que no recopilamos", "No enviamos al desarrollador tus datos de contacto, identificadores, ubicación, historial, registros de sueño, controles matinales ni uso de apps. No vendemos datos ni realizamos seguimiento publicitario."],
        ["local-data", "Datos guardados en el dispositivo", "Los horarios, eventos de bloqueo, intentos bloqueados y registros matinales opcionales se guardan localmente y se comparten solo con las extensiones iOS necesarias mediante un App Group."],
        ["apple-services", "Tiempo de uso y servicios de Apple", "Con tu permiso, la app utiliza Tiempo de uso, Family Controls, Managed Settings y Device Activity. StoreKit y App Store procesan las compras; no recibimos los datos completos de tu tarjeta."],
        ["retention", "Conservación y eliminación", "Los registros permanecen en el dispositivo. Eliminar la app suele eliminar sus datos locales. Revocar el permiso detiene el bloqueo programado."],
        ["children", "Menores", "La app no está diseñada para recopilar información personal de menores. Apple gestiona las protecciones familiares."],
        ["medical", "Aviso médico", "Locking Phone es una herramienta de bienestar digital, no un dispositivo médico, y no diagnostica ni trata enfermedades."],
        ["changes", "Cambios", "Actualizaremos esta política antes de añadir cuentas, sincronización, análisis u otro tratamiento de datos."],
        ["contact", "Contacto", "Utiliza el contacto de soporte que aparece a continuación."]
      ]],
      support: ["Soporte", "Ayuda para una noche más tranquila.", "Respuestas sobre configuración, bloqueo y compras.", [
        ["start", "¿Cómo inicio el bloqueo nocturno?", "Autoriza Tiempo de uso, elige las horas y activa el plan nocturno."],
        ["allowed", "¿Por qué siguen disponibles Teléfono, Mensajes o Alarma?", "Su disponibilidad depende de Siempre permitido en iOS."],
        ["no-bypass", "¿Puedo desbloquear temporalmente?", "No. El bloqueo finaliza automáticamente a la hora elegida."],
        ["not-starting", "¿Por qué no comenzó el plan?", "Comprueba el permiso, el estado del plan, las horas y el acceso de pago después de la primera noche gratuita."],
        ["purchase", "Compras y restauración", "Usa la pestaña Mi cuenta para comprar, gestionar o restaurar con la misma cuenta de Apple."],
        ["privacy", "¿Dónde están mis registros?", "Permanecen en el dispositivo; no hay cuentas, publicidad ni análisis del desarrollador."],
        ["contact", "Contactar con soporte", "Incluye la versión de iOS, la versión de la app y una descripción breve."]
      ]]
    },
    ja: {
      common: { privacy: "プライバシー", terms: "利用規約", membership: "会員サービス", renewal: "自動更新", support: "サポート", toc: "このページ", updated: "最終更新" },
      privacy: ["プライバシーポリシー", "睡眠習慣の記録は端末内に残ります。", "Locking Phone にはアカウント、広告、開発者分析SDK、開発者サーバーはありません。", [
        ["no-collection", "収集しないデータ", "連絡先、識別子、位置情報、閲覧履歴、睡眠記録、朝の記録、アプリ使用記録を開発者へ送信しません。販売や広告追跡も行いません。"],
        ["local-data", "端末内のデータ", "スケジュール、実行記録、ブロックされた起動回数、任意の朝の記録は端末内に保存され、必要なiOS拡張機能とのみApp Groupで共有されます。"],
        ["apple-services", "スクリーンタイムとAppleサービス", "許可後、スクリーンタイム、Family Controls、Managed Settings、Device Activityを使用します。購入はStoreKitとApp Storeが処理します。"],
        ["retention", "保存と削除", "記録は端末内に残ります。通常、Appを削除するとローカルデータも削除されます。権限を取り消すと予定ロックは停止します。"],
        ["children", "子ども", "子どもの個人情報を収集する目的のAppではありません。家族向け保護はAppleが管理します。"],
        ["medical", "医療免責事項", "医療機器ではなく、病気の診断や治療を行いません。"],
        ["changes", "変更", "アカウント、クラウド同期、分析等を追加する前に本方針を更新します。"],
        ["contact", "お問い合わせ", "下記のサポート連絡先をご利用ください。"]
      ]],
      support: ["サポート", "静かな夜のためのヘルプ。", "設定、ロック、購入に関するよくある質問です。", [
        ["start", "夜間ロックを始めるには？", "スクリーンタイムを許可し、開始・復元時刻を選び、夜間プランを有効にします。"],
        ["allowed", "電話・メッセージ・アラームが使えるのはなぜ？", "利用可否はiOSの「常に許可」設定に従います。"],
        ["no-bypass", "一時解除できますか？", "できません。選択した復元時刻に自動で終了します。"],
        ["not-starting", "開始しない場合", "権限、プラン、時刻、無料1夜後の購入状態を確認してください。"],
        ["purchase", "購入と復元", "「マイ」タブで購入、管理、同じApple Accountからの復元ができます。"],
        ["privacy", "記録の保存場所", "記録は端末内に残り、開発者アカウント、広告、分析SDKはありません。"],
        ["contact", "サポートへ連絡", "iOSとAppのバージョン、問題の概要をお知らせください。"]
      ]]
    },
    ko: {
      common: { privacy: "개인정보", terms: "이용 약관", membership: "회원 서비스", renewal: "자동 갱신", support: "지원", toc: "페이지 내용", updated: "최종 업데이트" },
      privacy: ["개인정보 처리방침", "수면 기록은 기기에만 보관됩니다.", "Locking Phone은 계정, 광고, 개발자 분석 SDK 또는 개발자 서버를 사용하지 않습니다.", [
        ["no-collection", "수집하지 않는 데이터", "연락처, 식별자, 위치, 검색 기록, 수면 기록, 아침 기록 또는 앱 사용 기록을 개발자에게 보내지 않으며 판매하거나 광고 추적에 사용하지 않습니다."],
        ["local-data", "기기에 저장되는 데이터", "일정, 잠금 실행 기록, 차단된 열기 횟수와 선택적 아침 기록은 기기에 저장되며 필요한 iOS 확장과 App Group으로만 공유됩니다."],
        ["apple-services", "스크린 타임과 Apple 서비스", "허용 후 스크린 타임, Family Controls, Managed Settings 및 Device Activity를 사용합니다. 구매는 StoreKit과 App Store가 처리합니다."],
        ["retention", "보관 및 삭제", "기록은 기기에 남습니다. 앱을 삭제하면 일반적으로 로컬 데이터도 삭제되며 권한을 철회하면 예약 잠금이 중지됩니다."],
        ["children", "어린이", "어린이의 개인정보 수집을 목적으로 하지 않으며 가족 보호는 Apple이 관리합니다."],
        ["medical", "의료 면책", "의료기기가 아니며 질병을 진단하거나 치료하지 않습니다."],
        ["changes", "정책 변경", "계정, 클라우드 동기화, 분석 등을 추가하기 전에 정책을 업데이트합니다."],
        ["contact", "문의", "아래 지원 연락처를 이용해 주세요."]
      ]],
      support: ["지원", "더 조용한 밤을 위한 도움말.", "설정, 잠금 및 구매에 관한 자주 묻는 질문입니다.", [
        ["start", "야간 잠금을 시작하려면?", "스크린 타임을 허용하고 시작·복원 시간을 선택한 뒤 계획을 켭니다."],
        ["allowed", "전화, 메시지, 알람이 계속 작동하는 이유", "사용 가능 여부는 iOS 항상 허용 설정을 따릅니다."],
        ["no-bypass", "임시 해제가 가능한가요?", "불가능합니다. 선택한 복원 시간에 자동 종료됩니다."],
        ["not-starting", "계획이 시작되지 않아요", "권한, 계획 상태, 시간 및 무료 첫날 이후의 구매 상태를 확인하세요."],
        ["purchase", "구매 및 복원", "나의 탭에서 같은 Apple Account의 구매를 관리하거나 복원합니다."],
        ["privacy", "기록은 어디에 있나요?", "기기에만 저장되며 개발자 계정, 광고 또는 분석 SDK가 없습니다."],
        ["contact", "지원 문의", "iOS 버전, 앱 버전과 문제 설명을 보내 주세요."]
      ]]
    },
    fr: {
      common: { privacy: "Confidentialité", terms: "Conditions", membership: "Service Pro", renewal: "Renouvellement", support: "Assistance", toc: "Sur cette page", updated: "Dernière mise à jour" },
      privacy: ["Politique de confidentialité", "Votre routine de sommeil reste sur votre appareil.", "Locking Phone n’utilise ni compte, ni publicité, ni SDK d’analyse, ni serveur du développeur.", [
        ["no-collection", "Données non collectées", "Nous n’envoyons pas au développeur vos coordonnées, identifiants, position, historique, données de sommeil, bilans matinaux ou données d’usage. Aucun suivi publicitaire ni revente."],
        ["local-data", "Données sur l’appareil", "Les horaires, événements, tentatives bloquées et bilans facultatifs restent localement sur l’appareil et sont partagés uniquement avec les extensions iOS nécessaires via un App Group."],
        ["apple-services", "Temps d’écran et services Apple", "Après autorisation, l’app utilise Temps d’écran, Family Controls, Managed Settings et Device Activity. Les achats sont traités par StoreKit et l’App Store."],
        ["retention", "Conservation et suppression", "Les données restent sur l’appareil. La suppression de l’app efface généralement les données locales. Révoquer l’autorisation arrête les verrouillages programmés."],
        ["children", "Enfants", "L’app n’est pas conçue pour collecter les données personnelles des enfants. Apple gère les protections familiales."],
        ["medical", "Avertissement médical", "Ce n’est pas un dispositif médical et l’app ne diagnostique ni ne traite de maladie."],
        ["changes", "Mises à jour", "La politique sera mise à jour avant tout ajout de compte, synchronisation, analyse ou autre traitement."],
        ["contact", "Contact", "Utilisez le contact d’assistance ci-dessous."]
      ]],
      support: ["Assistance", "De l’aide pour une nuit plus calme.", "Réponses sur la configuration, le verrouillage et les achats.", [
        ["start", "Comment commencer ?", "Autorisez Temps d’écran, choisissez les horaires et activez le programme."],
        ["allowed", "Pourquoi Téléphone, Messages ou Alarme restent disponibles ?", "Leur disponibilité dépend de Toujours autorisées dans iOS."],
        ["no-bypass", "Déverrouillage temporaire ?", "Non. Le verrouillage se termine automatiquement à l’heure choisie."],
        ["not-starting", "Le programme ne démarre pas", "Vérifiez l’autorisation, le programme, les horaires et l’achat après la première nuit gratuite."],
        ["purchase", "Achats et restauration", "L’onglet Mon compte permet d’acheter, gérer ou restaurer avec le même compte Apple."],
        ["privacy", "Où sont mes données ?", "Elles restent sur l’appareil, sans compte développeur, publicité ou SDK d’analyse."],
        ["contact", "Contacter l’assistance", "Indiquez les versions d’iOS et de l’app avec une brève description."]
      ]]
    },
    de: {
      common: { privacy: "Datenschutz", terms: "Bedingungen", membership: "Pro-Service", renewal: "Automatische Verlängerung", support: "Support", toc: "Auf dieser Seite", updated: "Zuletzt aktualisiert" },
      privacy: ["Datenschutzerklärung", "Deine Schlafroutine bleibt auf deinem Gerät.", "Locking Phone verwendet keine Konten, Werbung, Entwickleranalyse-SDKs oder Entwicklerserver.", [
        ["no-collection", "Nicht erhobene Daten", "Kontaktdaten, Kennungen, Standort, Verlauf, Schlafdaten, Morgen-Check-ins und App-Nutzung werden nicht an den Entwickler gesendet, verkauft oder für Werbetracking genutzt."],
        ["local-data", "Lokale Daten", "Zeitpläne, Sperrereignisse, blockierte Öffnungsversuche und optionale Morgenangaben bleiben auf dem Gerät und werden nur über eine App Group mit nötigen iOS-Erweiterungen geteilt."],
        ["apple-services", "Bildschirmzeit und Apple-Dienste", "Nach deiner Erlaubnis nutzt die App Bildschirmzeit, Family Controls, Managed Settings und Device Activity. Käufe verarbeitet Apple über StoreKit und den App Store."],
        ["retention", "Speicherung und Löschung", "Daten bleiben auf dem Gerät. Das Löschen der App entfernt lokale Daten normalerweise. Ohne Berechtigung stoppt die geplante Sperre."],
        ["children", "Kinder", "Die App ist nicht zur Erhebung personenbezogener Daten von Kindern bestimmt. Apple verwaltet Familienschutzfunktionen."],
        ["medical", "Medizinischer Hinweis", "Die App ist kein Medizinprodukt und diagnostiziert oder behandelt keine Krankheiten."],
        ["changes", "Änderungen", "Vor Konten, Cloud-Sync, Analysen oder anderer Datenverarbeitung wird diese Erklärung aktualisiert."],
        ["contact", "Kontakt", "Nutze den unten angegebenen Supportkontakt."]
      ]],
      support: ["Support", "Hilfe für eine ruhigere Nacht.", "Antworten zu Einrichtung, Sperre und Käufen.", [
        ["start", "Wie starte ich die Nachtsperre?", "Bildschirmzeit erlauben, Zeiten wählen und den Nachtplan aktivieren."],
        ["allowed", "Warum bleiben Telefon, Nachrichten oder Wecker verfügbar?", "Das richtet sich nach den iOS-Einstellungen unter Immer erlauben."],
        ["no-bypass", "Vorübergehend entsperren?", "Nein. Die Sperre endet automatisch zur gewählten Zeit."],
        ["not-starting", "Plan startet nicht", "Prüfe Berechtigung, Plan, Zeiten und nach der Gratisnacht den Kaufstatus."],
        ["purchase", "Käufe wiederherstellen", "Im Bereich Mein Konto mit demselben Apple Account kaufen, verwalten oder wiederherstellen."],
        ["privacy", "Wo sind meine Daten?", "Sie bleiben auf dem Gerät; es gibt kein Entwicklerkonto, keine Werbung und keine Analyse-SDKs."],
        ["contact", "Support kontaktieren", "Nenne iOS-Version, App-Version und eine kurze Fehlerbeschreibung."]
      ]]
    },
    "pt-BR": {
      common: { privacy: "Privacidade", terms: "Termos", membership: "Serviço Pro", renewal: "Renovação automática", support: "Suporte", toc: "Nesta página", updated: "Última atualização" },
      privacy: ["Política de Privacidade", "Sua rotina de sono fica no seu dispositivo.", "O Locking Phone não usa contas, anúncios, SDKs de análise do desenvolvedor nem servidor próprio.", [
        ["no-collection", "Dados que não coletamos", "Não enviamos contatos, identificadores, localização, histórico, registros de sono, check-ins ou uso de apps ao desenvolvedor. Não vendemos dados nem fazemos rastreamento de anúncios."],
        ["local-data", "Dados no dispositivo", "Horários, eventos, tentativas bloqueadas e check-ins opcionais ficam no dispositivo e são compartilhados apenas com extensões iOS necessárias por um App Group."],
        ["apple-services", "Tempo de Uso e serviços Apple", "Com sua permissão, o app usa Tempo de Uso, Family Controls, Managed Settings e Device Activity. Compras são processadas pela Apple via StoreKit e App Store."],
        ["retention", "Retenção e exclusão", "Os registros ficam no dispositivo. Excluir o app geralmente remove os dados locais. Revogar a permissão interrompe o bloqueio programado."],
        ["children", "Crianças", "O app não foi criado para coletar dados pessoais de crianças. A Apple gerencia as proteções familiares."],
        ["medical", "Aviso médico", "O app não é dispositivo médico e não diagnostica nem trata doenças."],
        ["changes", "Alterações", "Atualizaremos a política antes de adicionar contas, nuvem, análises ou outro processamento."],
        ["contact", "Contato", "Use o contato de suporte abaixo."]
      ]],
      support: ["Suporte", "Ajuda para uma noite mais tranquila.", "Respostas sobre configuração, bloqueio e compras.", [
        ["start", "Como começar?", "Autorize o Tempo de Uso, escolha os horários e ative o plano noturno."],
        ["allowed", "Por que Telefone, Mensagens ou Alarme continuam?", "A disponibilidade segue os ajustes Sempre Permitido do iOS."],
        ["no-bypass", "Posso liberar temporariamente?", "Não. O bloqueio termina automaticamente no horário escolhido."],
        ["not-starting", "O plano não começou", "Verifique a permissão, o plano, os horários e a compra após a primeira noite grátis."],
        ["purchase", "Compras e restauração", "Na aba Minha Conta, compre, gerencie ou restaure com a mesma Conta Apple."],
        ["privacy", "Onde ficam meus registros?", "No dispositivo, sem conta do desenvolvedor, anúncios ou SDK de análise."],
        ["contact", "Falar com o suporte", "Inclua as versões do iOS e do app e uma descrição breve."]
      ]]
    },
    ar: {
      common: { privacy: "الخصوصية", terms: "شروط الاستخدام", membership: "خدمة Pro", renewal: "التجديد التلقائي", support: "الدعم", toc: "في هذه الصفحة", updated: "آخر تحديث" },
      privacy: ["سياسة الخصوصية", "يبقى روتين نومك على جهازك.", "لا يستخدم Locking Phone حسابات أو إعلانات أو أدوات تحليلات للمطور أو خادمًا للمطور.", [
        ["no-collection", "بيانات لا نجمعها", "لا نرسل معلومات الاتصال أو المعرّفات أو الموقع أو سجل التصفح أو سجلات النوم أو تسجيلات الصباح أو استخدام التطبيقات إلى المطور، ولا نبيع البيانات أو نتتبعك للإعلانات."],
        ["local-data", "البيانات على الجهاز", "تبقى الجداول وأحداث القفل ومحاولات الفتح المحظورة وتسجيلات الصباح الاختيارية على الجهاز، وتشارك فقط مع ملحقات iOS الضرورية عبر App Group."],
        ["apple-services", "مدة استخدام الجهاز وخدمات Apple", "بعد موافقتك يستخدم التطبيق Screen Time وFamily Controls وManaged Settings وDevice Activity. تعالج Apple عمليات الشراء عبر StoreKit وApp Store."],
        ["retention", "الاحتفاظ والحذف", "تبقى السجلات على الجهاز. يؤدي حذف التطبيق عادة إلى حذف بياناته المحلية، وسحب الإذن يوقف القفل المجدول."],
        ["children", "الأطفال", "لم يُصمم التطبيق لجمع معلومات شخصية من الأطفال، وتدير Apple وسائل حماية العائلة."],
        ["medical", "إخلاء مسؤولية طبي", "التطبيق ليس جهازًا طبيًا ولا يشخّص الأمراض أو يعالجها."],
        ["changes", "التغييرات", "سنحدّث السياسة قبل إضافة الحسابات أو المزامنة أو التحليلات أو أي معالجة أخرى."],
        ["contact", "التواصل", "استخدم وسيلة دعم العملاء أدناه."]
      ]],
      support: ["الدعم", "مساعدة من أجل ليلة أكثر هدوءًا.", "إجابات حول الإعداد والقفل وعمليات الشراء.", [
        ["start", "كيف أبدأ القفل الليلي؟", "اسمح بمدة استخدام الجهاز، واختر الوقتين، ثم فعّل الخطة الليلية."],
        ["allowed", "لماذا يبقى الهاتف والرسائل والمنبه متاحًا؟", "يعتمد ذلك على إعدادات مسموح دائمًا في iOS."],
        ["no-bypass", "هل يمكن الفتح مؤقتًا؟", "لا. ينتهي القفل تلقائيًا في وقت الاستعادة الذي اخترته."],
        ["not-starting", "لم تبدأ الخطة", "تحقق من الإذن والخطة والأوقات وحالة الشراء بعد الليلة المجانية الأولى."],
        ["purchase", "الشراء والاستعادة", "استخدم تبويب حسابي للشراء أو الإدارة أو الاستعادة باستخدام حساب Apple نفسه."],
        ["privacy", "أين سجلاتي؟", "تبقى على الجهاز، بلا حساب للمطور أو إعلانات أو أدوات تحليلات."],
        ["contact", "التواصل مع الدعم", "أرفق إصدار iOS وإصدار التطبيق ووصفًا موجزًا."]
      ]]
    }
  };

  Object.entries(localizedSummaries).forEach(([code, value]) => {
    const normalize = (entry) => ({ title: entry[0], lead: entry[1], intro: entry[2], sections: entry[3] });
    translations[code] = { common: value.common, privacy: normalize(value.privacy), support: normalize(value.support) };
  });

  const aliases = {
    "zh-CN": "zh-Hans", "zh-SG": "zh-Hans", zh: "zh-Hans",
    "zh-TW": "zh-Hant", "zh-HK": "zh-Hant", "zh-MO": "zh-Hant",
    "pt-BR": "pt-BR", pt: "pt-BR"
  };

  function resolveLanguage() {
    const requested = new URLSearchParams(location.search).get("lang");
    if (requested && translations[requested]) return requested;
    const saved = localStorage.getItem("lockingPhoneLanguage");
    if (saved && translations[saved]) return saved;
    for (const candidate of navigator.languages || [navigator.language]) {
      if (aliases[candidate]) return aliases[candidate];
      const base = candidate.split("-")[0];
      if (translations[base]) return base;
    }
    return "en";
  }

  function localizedDate(code) {
    const date = new Date(`${config.policyDate || "2026-08-26"}T00:00:00Z`);
    return new Intl.DateTimeFormat(languages[code].locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
  }

  function contactMarkup(code) {
    if (config.supportEmail) {
      const safeEmail = String(config.supportEmail).replace(/[<>&"']/g, "");
      return `<div class="contact-box"><p><a href="mailto:${safeEmail}">${safeEmail}</a></p></div>`;
    }
    const missing = {
      en: "Support contact will be added before publication.", "zh-Hans": "支持邮箱将在发布前填写。", "zh-Hant": "支援信箱將在發布前填寫。",
      es: "El contacto de soporte se añadirá antes de la publicación.", ja: "公開前にサポート連絡先を追加します。", ko: "게시 전에 지원 연락처가 추가됩니다.",
      fr: "Le contact d’assistance sera ajouté avant publication.", de: "Der Supportkontakt wird vor der Veröffentlichung ergänzt.", "pt-BR": "O contato de suporte será adicionado antes da publicação.", ar: "ستُضاف وسيلة التواصل مع الدعم قبل النشر."
    };
    return `<div class="contact-box"><p>${missing[code]}</p></div>`;
  }

  function render(code) {
    const language = languages[code];
    const copy = translations[code];
    const content = copy[page];
    document.documentElement.lang = language.locale;
    document.documentElement.dir = language.dir;
    document.title = `${content.title} · Locking Phone`;

    document.querySelectorAll('[data-nav]').forEach((link) => {
      const key = link.dataset.nav;
      link.textContent = copy.common[key];
      if (key === page) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      const target = { privacy: "privacy.html", terms: "terms.html", support: "support.html" }[key];
      link.href = `${target}?lang=${encodeURIComponent(code)}`;
    });

    document.querySelector(".brand").href = `index.html?lang=${encodeURIComponent(code)}`;

    const footerTargets = { privacy: "privacy.html", terms: "terms.html", membership: "membership.html", renewal: "auto-renewal.html", support: "support.html" };
    document.querySelectorAll('[data-footer-link]').forEach((link) => {
      const key = link.dataset.footerLink;
      link.textContent = copy.common[key];
      link.href = `${footerTargets[key]}?lang=${encodeURIComponent(code)}`;
    });

    document.getElementById("tocLabel").textContent = copy.common.toc;
    document.getElementById("pageTitle").textContent = content.title;
    document.getElementById("pageLead").textContent = content.lead;
    document.getElementById("pageIntro").textContent = content.intro;
    const updated = document.getElementById("updatedAt");
    if (updated) updated.textContent = `${copy.common.updated}: ${localizedDate(code)}`;

    document.getElementById("tocLinks").innerHTML = content.sections
      .map(([id, title]) => `<a href="#${id}">${title}</a>`).join("");

    document.getElementById("pageSections").innerHTML = content.sections
      .map(([id, title, body]) => {
        const extra = id === "contact" ? contactMarkup(code) : "";
        return `<section class="policy-section" id="${id}"><h2>${title}</h2><p>${body}</p>${extra}</section>`;
      }).join("");

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
