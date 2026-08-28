(()=>{
const K='landlord-os-language';
const DOC={
  en:{title:'Landlord OS Documentation · V4',intro:'Landlord OS is a calm operating system for small landlords managing roughly 1–10 rentals. This guide matches the current production version, including the read-only demo, activation flow and Intelligence tools.',s:[
    ['Choose how to enter','Open Explore live demo to browse the complete product with sample data and no sign-up. Demo mode is read-only. Customers use Customer sign in to open an activated private workspace.'],
    ['Create account & activate','Create an account, confirm the email, sign in, then enter the one-time Landlord OS activation code. A code binds to one account and provides lifetime access.'],
    ['Landlord Today','The Home screen surfaces the few items that deserve attention now: overdue rent, expiring leases, vacancies, open maintenance and missing receipt evidence.'],
    ['Portfolio health','Landlord OS calculates health signals from rent collection, vacancy, maintenance, service dates and cash flow so weak properties stand out quickly.'],
    ['Properties','Add each rental with rent, deposit, due day, address, unit details and a cover photo. Property cards show tenant context, payment status and performance.'],
    ['Property workspace','Open a property to see overview, tenant, payments, expenses and documents together. The workspace also includes the Property Health Passport, inspections and a chronological property timeline.'],
    ['Property Health Passport','Track important assets such as HVAC, boiler and appliances with brand, model, serial number, installation date, warranty end and next service date.'],
    ['Inspections','Create move-in, move-out or routine inspections and record date, rooms checked, condition score and issues found.'],
    ['Tenants & lease intelligence','Store tenant contact details and lease dates. Tenant Ledger brings lease context, payment history and security deposit status into one view.'],
    ['Rent center','Track paid, due, partial and overdue rent. Record full or partial payments, payment method and notes. Smart Rent Chase highlights balances that need follow-up.'],
    ['Security deposits','Track deposits separately from rent with amount, received date and held / partially refunded / refunded status.'],
    ['Vacancy clock','For vacant units, record the vacancy start date and turnover cost. Landlord OS estimates vacant days and lost rent.'],
    ['Financial center','Record expenses by property, category, vendor, amount and date. Attach receipt images or PDFs when available.'],
    ['Money buckets','Split collected rent conceptually into tax, maintenance, CapEx and profit reserves. Percentages are adjustable in Intelligence.'],
    ['Recurring costs','Track monthly, quarterly or annual obligations such as mortgage, HOA, insurance, utilities and subscriptions. These feed true profitability.'],
    ['Receipt inbox & expense rules','Receipt Inbox surfaces evidence that still needs review. Expense Rules remember how repeat vendors should be categorized and assigned.'],
    ['Maintenance triage','Create maintenance issues with priority, status, notes, cost and photos. Triage adds history and known-vendor context to help decide what to handle first.'],
    ['Vendor memory','Save trusted vendors with trade, phone, rating and previous cost so repeat repairs are easier to route.'],
    ['Documents','Store leases, IDs, insurance, inspection files and other documents in private Supabase Storage.'],
    ['Alerts','Alerts are generated from overdue rent, vacancy, upcoming lease expiry and long-open maintenance, with a direct action for each.'],
    ['Intelligence Hub','Use the Intelligence screen for Landlord Today, property health, money buckets, real profitability, What-if Simulator, Tax-ready Mode and rent planning.'],
    ['Real profitability','True net considers collected rent, recorded operating expenses and recurring costs so the number reflects operating reality rather than gross revenue.'],
    ['What-if Simulator','Model rent changes, vacancy months and one-off costs before committing to a decision. Saved scenarios show the estimated annual result.'],
    ['Rent increase planner','Save current rent, proposed rent and effective date for a property and see the estimated annual uplift.'],
    ['Tax-ready Mode','Export a tax-oriented CSV containing recorded income and expenses plus receipt-evidence status. Always confirm tax treatment with a qualified professional.'],
    ['Reports & backup','Use monthly summaries, rent roll and property performance. Export CSV reports and a JSON backup of the core portfolio.'],
    ['Cloud sync & privacy','Authenticated portfolios are stored in Supabase. Row Level Security isolates users, file uploads use a private bucket, and Intelligence data is stored in a separate RLS-protected user record.'],
    ['Read-only demo protection','The public demo uses an isolated sample dataset. Add, edit, delete, upload and payment-writing actions are blocked and demo data is not synced to customer accounts.'],
    ['Mobile experience','Mobile uses an app-style shell with bottom navigation, quick actions, search and bottom sheets. The same core portfolio and Intelligence information remain available on small screens.'],
    ['Languages','The interface selector supports 11 languages for core UI. Full documentation is maintained in English and Arabic; other language selections fall back to English documentation.']
  ]},
  ar:{title:'دليل Landlord OS · الإصدار V4',intro:'Landlord OS نظام هادئ لإدارة العقارات للملاك الصغار الذين يديرون تقريبًا من عقار إلى 10 عقارات. هذا الدليل مطابق لنسخة الإنتاج الحالية ويشمل الديمو للقراءة فقط ونظام التفعيل وأدوات Intelligence.',s:[
    ['طريقة الدخول','يمكن فتح Explore live demo لتجربة المنتج كاملًا ببيانات جاهزة ومن دون تسجيل. الديمو للقراءة فقط. العملاء يستخدمون Customer sign in للدخول إلى مساحة العمل المفعّلة الخاصة بهم.'],
    ['إنشاء الحساب والتفعيل','أنشئ حسابًا وأكد البريد ثم سجّل الدخول وأدخل Activation Code الخاص بـLandlord OS. الكود يستخدم لحساب واحد ويمنح وصولًا مدى الحياة.'],
    ['Landlord Today','تعرض الصفحة الرئيسية فقط الأشياء التي تحتاج تدخلًا الآن مثل الإيجار المتأخر والعقود القريبة من الانتهاء والوحدات الشاغرة والصيانة المفتوحة والإيصالات الناقصة.'],
    ['صحة المحفظة','يحسب Landlord OS مؤشرات صحة اعتمادًا على تحصيل الإيجار والشغور والصيانة ومواعيد الخدمة والتدفق النقدي حتى تظهر العقارات الأضعف بسرعة.'],
    ['العقارات','أضف كل عقار مع الإيجار والتأمين ويوم الاستحقاق والعنوان والتفاصيل والصورة. كروت العقارات تعرض المستأجر وحالة الدفع والأداء.'],
    ['مساحة العقار','عند فتح عقار ستجد الملخص والمستأجر والمدفوعات والمصروفات والمستندات بالإضافة إلى Property Health Passport والفحوصات والـTimeline.'],
    ['Property Health Passport','تابع الأصول المهمة مثل التكييف والسخان والأجهزة مع الماركة والموديل والسيريال وتاريخ التركيب ونهاية الضمان وموعد الخدمة القادم.'],
    ['الفحوصات','أنشئ فحص Move-in أو Move-out أو Routine وسجّل التاريخ والغرف التي تم فحصها ونسبة الحالة وعدد المشاكل.'],
    ['المستأجرون والعقود','احفظ بيانات التواصل وتواريخ العقد. Tenant Ledger يجمع سياق العقد وتاريخ المدفوعات وحالة التأمين في مكان واحد.'],
    ['مركز الإيجارات','تابع المدفوع والمستحق والجزئي والمتأخر وسجّل دفعات كاملة أو جزئية وطريقة الدفع والملاحظات. Smart Rent Chase يوضح الحالات التي تحتاج متابعة.'],
    ['التأمينات','تابع Security Deposit بشكل منفصل عن الإيجار مع القيمة وتاريخ الاستلام وحالة Held أو Partially refunded أو Refunded.'],
    ['Vacancy Clock','للوحدات الشاغرة سجّل تاريخ بداية الشغور وتكلفة التجهيز ويحسب النظام عدد الأيام الشاغرة والإيجار المفقود تقريبيًا.'],
    ['المركز المالي','سجّل المصروفات حسب العقار والتصنيف والمورد والقيمة والتاريخ وارفع صورة أو PDF للإيصال عند توفره.'],
    ['Money Buckets','قسّم الإيجار المحصل تخطيطيًا إلى Tax وMaintenance وCapEx وProfit ويمكن تعديل النسب من Intelligence.'],
    ['المصروفات المتكررة','تابع الالتزامات الشهرية أو الربع سنوية أو السنوية مثل Mortgage وHOA والتأمين والمرافق والاشتراكات وتدخل في حساب الربحية الحقيقية.'],
    ['Receipt Inbox وExpense Rules','Receipt Inbox يوضح المستندات التي تحتاج مراجعة وExpense Rules تحفظ طريقة تصنيف الموردين المتكررين وربطهم بالعقار.'],
    ['Maintenance Triage','أنشئ طلبات الصيانة مع الأولوية والحالة والملاحظات والتكلفة والصور. Triage يضيف تاريخ المشكلة وسياق الموردين للمساعدة في ترتيب الأولويات.'],
    ['Vendor Memory','احفظ الفنيين والموردين الموثوقين مع التخصص والهاتف والتقييم وآخر تكلفة لتسهيل الصيانة المتكررة.'],
    ['المستندات','احفظ العقود والهويات والتأمين والفحوصات والملفات الأخرى داخل Supabase Storage خاص.'],
    ['التنبيهات','تظهر التنبيهات من الإيجار المتأخر والشغور والعقود القريبة من الانتهاء والصيانة المفتوحة لفترة طويلة مع Action مباشر.'],
    ['Intelligence Hub','تجمع شاشة Intelligence: Landlord Today وProperty Health وMoney Buckets والربحية الحقيقية وWhat-if Simulator وTax-ready Mode وخطط زيادة الإيجار.'],
    ['الربحية الحقيقية','True Net يحسب الإيجار المحصل ناقص المصروفات التشغيلية المسجلة والمصروفات المتكررة بدل الاعتماد على الإيراد الإجمالي فقط.'],
    ['What-if Simulator','اختبر تأثير زيادة الإيجار أو شهور الشغور أو تكلفة مفاجئة قبل اتخاذ القرار واحفظ أكثر من سيناريو للمقارنة.'],
    ['Rent Increase Planner','احفظ الإيجار الحالي والمقترح وتاريخ التطبيق للعقار وشاهد الأثر السنوي المتوقع.'],
    ['Tax-ready Mode','صدّر CSV منظم للدخل والمصروفات وحالة وجود الإيصالات. المعالجة الضريبية النهائية يجب مراجعتها مع مختص.'],
    ['التقارير والنسخ الاحتياطي','استخدم الملخصات الشهرية وRent Roll وأداء العقارات وصدّر CSV وتقارير ونسخة JSON احتياطية للبيانات الأساسية.'],
    ['المزامنة والخصوصية','محافظ المستخدمين المسجلين محفوظة على Supabase ومعزولة باستخدام RLS والملفات في Bucket خاص وبيانات Intelligence محفوظة في سجل منفصل محمي بـRLS.'],
    ['حماية الديمو','الديمو العام يستخدم بيانات منفصلة جاهزة وكل عمليات Add وEdit وDelete وUpload وتسجيل المدفوعات مقفولة ولا يتم مزامنة بيانات الديمو مع حسابات العملاء.'],
    ['الموبايل','نسخة الموبايل تستخدم App-style shell مع Bottom Navigation وQuick Actions وSearch وBottom Sheets مع الحفاظ على نفس بيانات المحفظة وIntelligence.'],
    ['اللغات','الواجهة الأساسية تدعم 11 لغة. الدليل الكامل يتم صيانته بالإنجليزية والعربية، وباقي اللغات تعرض نسخة الدليل الإنجليزية.']
  ]}
};
function current(){return localStorage.getItem(K)==='ar'?'ar':'en'}
function open(){document.querySelector('.docs-overlay')?.remove();const d=DOC[current()],o=document.createElement('div');o.className='docs-overlay';o.innerHTML=`<div class="docs-shell"><div class="docs-top"><div><img src="./brand-icon.svg"><div><small>Landlord OS · Production guide</small><h1>${d.title}</h1></div></div><button id="closeDocsV4">×</button></div><p class="docs-intro">${d.intro}</p><div class="docs-grid">${d.s.map((x,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('')}</div></div>`;document.body.appendChild(o);o.querySelector('#closeDocsV4').onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()}}
function wire(){const b=document.getElementById('documentationNav');if(b&&!b.dataset.v4){b.dataset.v4='1';b.onclick=open;b.title='Production documentation V4'}}
new MutationObserver(()=>requestAnimationFrame(wire)).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',wire);setTimeout(wire,400);window.LANDLORD_DOCS_V4=open;
})();