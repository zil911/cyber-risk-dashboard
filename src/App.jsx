import { createContext, useContext, useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "cyberRiskDashboard.risks";
const PROJECT_ASSESSMENTS_STORAGE_KEY = "cyberRiskDashboard.projectAssessments";
const LANGUAGE_STORAGE_KEY = "cyberRiskDashboard.language";
const LanguageContext = createContext({
  language: "ar",
  t: (value) => value,
  toggleLanguage: () => {},
});

const EN_TRANSLATIONS = {
  "غير محدد": "Not specified",
  "غير محددة": "Not specified",
  "خطر غير مسمى": "Unnamed risk",
  "مشروع غير مسمى": "Unnamed project",
  "منخفض جداً": "Very Low",
  "منخفض": "Low",
  "متوسط": "Medium",
  "مرتفع": "High",
  "كارثي": "Catastrophic",
  "عالي": "High",
  "حرج": "Critical",
  "نادر جداً": "Very Rare",
  "نادر": "Rare",
  "غير مرجح": "Unlikely",
  "مرجح": "Likely",
  "شبه مؤكد": "Almost Certain",
  "مفتوح": "Open",
  "تحت المعالجة": "In Progress",
  "مقبول": "Accepted",
  "مغلق": "Closed",
  "قبول الخطر": "Accept Risk",
  "تقليل الخطر": "Mitigate Risk",
  "نقل الخطر": "Transfer Risk",
  "تجنب الخطر": "Avoid Risk",
  "خطة أخرى": "Other Plan",
  "تطبيق ويب": "Web Application",
  "تطبيق جوال": "Mobile Application",
  "نظام داخلي": "Internal System",
  "خدمة سحابية": "Cloud Service",
  "تكامل API": "API Integration",
  "أخرى": "Other",
  "نعم": "Yes",
  "لا": "No",
  "مقبول مع متابعة": "Accepted with Monitoring",
  "مقبول بشرط تنفيذ ضوابط أمنية": "Accepted Subject to Security Controls",
  "غير مقبول حاليًا ويحتاج معالجة قبل البدء": "Not Currently Accepted; Treatment Is Required Before Start",
  "تفعيل المصادقة متعددة العوامل MFA": "Enable Multi-Factor Authentication (MFA)",
  "تشفير البيانات وتقييد الصلاحيات": "Encrypt Data and Restrict Access",
  "مراجعة أمان التكاملات وواجهات API": "Review Integration and API Security",
  "تقييم مخاطر المورد الخارجي": "Assess Third-Party Vendor Risk",
  "تنفيذ فحص أمني قبل الإطلاق": "Perform a Security Assessment Before Launch",
  "تأثير غير مؤثر أو محدود جداً على الجهة.": "No material impact or only a very limited impact on the organization.",
  "تأثير طفيف على الجهة ويمكن التعامل معه بسهولة.": "Minor impact that can be handled easily.",
  "تأثير ملموس على الجهة ويحتاج متابعة.": "Noticeable impact that requires monitoring.",
  "تأثير كبير على الجهة ويحتاج معالجة عاجلة.": "Major impact that requires urgent treatment.",
  "تأثير كبير جداً لا يمكن تحمله أو قد يمتد للمستوى الوطني.": "Severe, intolerable impact that may extend to the national level.",
  "حدوثه مستبعد جداً وقد يحدث في ظروف استثنائية.": "Highly unlikely and may occur only in exceptional circumstances.",
  "قد يحدث لكن بشكل قليل جداً.": "May occur, but only very rarely.",
  "قد يحدث أحياناً لكنه ليس متوقعاً بشكل كبير.": "May occur occasionally, but is not strongly expected.",
  "من المتوقع حدوثه في بعض الحالات.": "Expected to occur in some cases.",
  "من المتوقع حدوثه بشكل متكرر أو في معظم الحالات.": "Expected to occur frequently or in most cases.",
  "لوحة التحكم": "Dashboard",
  "إضافة خطر": "Add Risk",
  "تقييم مشروع جديد": "New Project Assessment",
  "حوكمة وإدارة المخاطر": "Governance and Risk Management",
  "الأمن السيبراني": "Cybersecurity",
  "التنقل الرئيسي": "Main navigation",
  "بيانات الخطر": "Risk Information",
  "اسم الخطر": "Risk Name",
  "النظام / الأصل": "System / Asset",
  "الوصف": "Description",
  "تقييم الخطر": "Risk Assessment",
  "الاحتمالية": "Likelihood",
  "أثر السرية": "Confidentiality Impact",
  "أثر السلامة": "Integrity Impact",
  "أثر التوفر": "Availability Impact",
  "الأثر المختار": "Selected Impact",
  "درجة الخطر": "Risk Score",
  "مستوى الخطر": "Risk Level",
  "المعالجة والمتابعة": "Treatment and Follow-up",
  "مالك الخطر": "Risk Owner",
  "خطة المعالجة": "Treatment Plan",
  "حالة الخطر": "Risk Status",
  "خطة المعالجة المخصصة": "Custom Treatment Plan",
  "إضافة الخطر": "Add Risk",
  "اختر الاحتمالية": "Select likelihood",
  "اختر مستوى الأثر": "Select impact level",
  "اختر خطة المعالجة": "Select treatment plan",
  "اكتب خطة المعالجة المخصصة": "Enter the custom treatment plan",
  "اختر القيمة بناءً على جدول الاحتمالية": "Select a value using the likelihood guide",
  "اختر القيمة بناءً على جدول أثر السرية": "Select a value using the confidentiality impact guide",
  "اختر القيمة بناءً على جدول أثر السلامة": "Select a value using the integrity impact guide",
  "اختر القيمة بناءً على جدول أثر التوفر": "Select a value using the availability impact guide",
  "مثال: عدم تفعيل المصادقة متعددة العوامل للحسابات الحساسة": "Example: MFA is not enabled for privileged accounts",
  "مثال: منصة إدارة الهوية": "Example: Identity management platform",
  "اكتب وصفاً مختصراً لسيناريو الخطر وأثره على العمل.": "Enter a brief description of the risk scenario and its business impact.",
  "مثال: إدارة تقنية المعلومات": "Example: Information Technology Department",
  "دورة إدارة المخاطر": "Risk Management Lifecycle",
  "منهجية عمل فريق الحوكمة والمخاطر من التسجيل إلى المتابعة.": "The GRC team's process from risk identification through treatment monitoring.",
  "تحديد الخطر": "Identify the Risk",
  "توثيق الخطر والأصل أو النظام المتأثر.": "Document the risk and the affected asset or system.",
  "تقييم الاحتمالية والأثر": "Assess Likelihood and Impact",
  "تقدير الاحتمالية وأثر السرية والسلامة والتوفر.": "Assess likelihood and the confidentiality, integrity, and availability impacts.",
  "تصنيف مستوى الخطر": "Classify the Risk Level",
  "حساب الدرجة وتحديد المستوى المناسب.": "Calculate the score and determine the appropriate level.",
  "متابعة المعالجة": "Monitor Treatment",
  "تحديد الخطة ومتابعة الحالة حتى الإغلاق.": "Define the treatment plan and track status through closure.",
  "توزيع المخاطر": "Risk Distribution",
  "حسب مستوى الخطورة": "By risk level",
  "مخاطر": "risks",
  "أعلى المخاطر": "Top Risks",
  "المخاطر التي يجب أن يبدأ فريق إدارة المخاطر بمتابعتها أولاً": "Risks the Risk Management team should prioritize first",
  "لم تتم إضافة أي مخاطر بعد.": "No risks have been added yet.",
  "الحالة": "Status",
  "سجل المخاطر": "Risk Register",
  "مرتبة من أعلى درجة خطر إلى أدنى درجة": "Sorted from highest to lowest risk score",
  "بحث سريع": "Quick Search",
  "ابحث باسم الخطر أو النظام أو مالك الخطر": "Search by risk name, system, or risk owner",
  "تصفية سجل المخاطر": "Filter the risk register",
  "الكل": "All",
  "النظام / الأصل غير محدد": "System / Asset not specified",
  "لا يوجد وصف مسجل.": "No description is available.",
  "طريقة الحساب": "Calculation Method",
  "درجة الخطر = الاحتمالية × الأثر المختار": "Risk Score = Likelihood × Selected Impact",
  "عرض التفاصيل": "Show Details",
  "إخفاء التفاصيل": "Hide Details",
  "تعديل": "Edit",
  "حفظ التعديلات": "Save Changes",
  "تعديل الخطر": "Edit Risk",
  "تعديل تقييم المشروع": "Edit Project Assessment",
  "إدارة السجلات": "Record Management",
  "اختر نوع السجلات التي تريد متابعتها وإدارتها.": "Choose the records you want to monitor and manage.",
  "المخاطر": "Risks",
  "تفاصيل تقييم المشروع": "Project Assessment Details",
  "هل يحتوي على بيانات حساسة": "Contains Sensitive Data",
  "هل يوجد ربط مع أنظمة أخرى": "Integrates with Other Systems",
  "هل يوجد طرف ثالث": "Has a Third Party",
  "هل يحتاج تسجيل دخول": "Requires Login",
  "هل سيتم نشره على الإنترنت": "Published on the Internet",
  "حذف": "Delete",
  "إلغاء": "Cancel",
  "لا توجد مخاطر مسجلة حتى الآن": "No risks have been registered yet.",
  "لا توجد نتائج مطابقة للبحث أو الفلتر الحالي.": "No results match the current search and filter.",
  "ملخص التقييم الحالي": "Current Assessment Summary",
  "دليل التقييم": "Assessment Guide",
  "استخدم هذا الدليل لاختيار الاحتمالية وأثر السرية والسلامة والتوفر بشكل صحيح.": "Use this guide to select likelihood and confidentiality, integrity, and availability impacts correctly.",
  "السرية": "Confidentiality",
  "السلامة": "Integrity",
  "التوفر": "Availability",
  "مستويات الأثر CIA": "CIA Impact Levels",
  "اختر أثر السرية والسلامة والتوفر حسب أعلى تأثير متوقع على الجهة.": "Select each CIA impact based on the highest expected effect on the organization.",
  "محدد": "Selected",
  "يتم اختيار أعلى قيمة من أثر السرية والسلامة والتوفر كأثر مختار.": "The highest confidentiality, integrity, or availability impact becomes the selected impact.",
  "مستويات الاحتمالية": "Likelihood Levels",
  "حدد مدى توقع حدوث الخطر بناءً على السياق والثغرات والضوابط الحالية.": "Estimate how likely the risk is based on context, vulnerabilities, and existing controls.",
  "لا توجد متطلبات أمنية إضافية.": "No additional security requirements.",
  "تقييمات المشاريع": "Project Assessments",
  "متابعة قرارات فريق الحوكمة والمخاطر قبل بدء المشاريع.": "Track GRC decisions before projects begin.",
  "إجمالي تقييمات المشاريع": "Total Project Assessments",
  "المشاريع المقبولة": "Accepted Projects",
  "المشاريع المقبولة بشرط": "Conditionally Accepted Projects",
  "المشاريع غير المقبولة حاليًا": "Currently Rejected Projects",
  "أحدث تقييمات المشاريع": "Latest Project Assessments",
  "لا توجد تقييمات مشاريع محفوظة حتى الآن.": "No project assessments have been saved yet.",
  "مالك المشروع غير محدد": "Project owner not specified",
  "بيانات تقييم المشروع": "Project Assessment Information",
  "يستخدم فريق المخاطر هذه البيانات لتحديد متطلبات الأمن قبل بدء المشروع.": "The Risk team uses this information to define security requirements before the project starts.",
  "معلومات المشروع الأساسية": "Basic Project Information",
  "اسم المشروع": "Project Name",
  "مالك المشروع": "Project Owner",
  "نوع المشروع": "Project Type",
  "وصف المشروع": "Project Description",
  "مثال: بوابة الخدمات الطلابية": "Example: Student Services Portal",
  "مثال: عمادة تقنية المعلومات": "Example: Information Technology Department",
  "اكتب وصفًا موجزًا لطبيعة المشروع، نطاقه، والبيانات أو الأنظمة التي سيتعامل معها.": "Briefly describe the project, its scope, and the data or systems it will handle.",
  "أسئلة الأمن السيبراني": "Cybersecurity Questions",
  "هل يحتوي المشروع على بيانات حساسة؟": "Does the project contain sensitive data?",
  "مستوى حساسية البيانات": "Data Sensitivity Level",
  "هل يوجد ربط مع أنظمة أخرى؟": "Does the project integrate with other systems?",
  "هل يوجد طرف ثالث / مورد خارجي؟": "Is there a third party or external vendor?",
  "هل يحتاج المشروع إلى تسجيل دخول؟": "Does the project require user login?",
  "هل سيتم نشر المشروع على الإنترنت؟": "Will the project be published on the internet?",
  "اختر الإجابة": "Select an answer",
  "اختر المستوى": "Select a level",
  "تقييم الخطر قبل بدء المشروع": "Pre-Project Risk Assessment",
  "احتمالية المشروع": "Project Likelihood",
  "أثر سرية المشروع": "Project Confidentiality Impact",
  "أثر سلامة المشروع": "Project Integrity Impact",
  "أثر توفر المشروع": "Project Availability Impact",
  "المتطلبات الأمنية المقترحة": "Suggested Security Requirements",
  "تتغير تلقائيًا بناءً على إجابات المشروع.": "Updated automatically based on the project answers.",
  "ستظهر المتطلبات الأمنية المقترحة بعد تعبئة بيانات المشروع.": "Suggested security requirements will appear after filling the project information.",
  "عرض جميع المتطلبات": "Show All Requirements",
  "عرض أقل": "Show Less",
  "اسم المتطلب": "Requirement Name",
  "سبب التوصية": "Reason",
  "الأولوية": "Priority",
  "عالية": "High",
  "متوسطة": "Medium",
  "منخفضة": "Low",
  "متطلب مقترح": "suggested requirement",
  "متطلبات مقترحة": "suggested requirements",
  "عرض المتطلبات": "Show Requirements",
  "إخفاء المتطلبات": "Hide Requirements",
  "المتطلبات التلقائية": "Automatic Requirements",
  "المتطلبات الإضافية": "Additional Requirements",
  "لا توجد متطلبات إضافية مسجلة.": "No additional requirements are recorded.",
  "متطلب محفوظ من تقييم سابق.": "A requirement saved from an earlier assessment.",
  "متطلب أمني": "Security Requirement",
  "لحماية الحسابات من الوصول غير المصرح.": "Protect accounts from unauthorized access.",
  "تطبيق سياسة كلمات مرور قوية": "Enforce a Strong Password Policy",
  "لتقليل مخاطر اختراق الحسابات.": "Reduce the risk of account compromise.",
  "إدارة الجلسات بشكل آمن": "Secure Session Management",
  "لحماية جلسات المستخدمين من السرقة أو سوء الاستخدام.": "Protect user sessions from theft or misuse.",
  "تشفير البيانات الحساسة": "Encrypt Sensitive Data",
  "لحماية البيانات في حال الوصول غير المصرح.": "Protect data in case of unauthorized access.",
  "تطبيق مبدأ أقل صلاحية": "Apply the Principle of Least Privilege",
  "لضمان وصول المستخدمين للبيانات التي يحتاجونها فقط.": "Ensure users access only the data they need.",
  "منع ظهور البيانات الحساسة في الأخطاء أو السجلات": "Prevent Sensitive Data in Errors and Logs",
  "لتجنب كشف معلومات حساسة بالخطأ.": "Avoid accidental exposure of sensitive information.",
  "تصنيف البيانات وتحديد ضوابط الحماية": "Classify Data and Define Protection Controls",
  "لأن البيانات عالية الحساسية تحتاج ضوابط أقوى.": "Highly sensitive data requires stronger controls.",
  "تفعيل سجل تدقيق Audit Log": "Enable an Audit Log",
  "لتتبع عمليات الوصول والتعديل.": "Track access and modification activities.",
  "مراجعة الصلاحيات بشكل دوري": "Review Access Rights Regularly",
  "لتقليل مخاطر الصلاحيات الزائدة.": "Reduce excessive privilege risks.",
  "مراجعة أمان واجهات API والتكاملات": "Review API and Integration Security",
  "لأن التكاملات قد تكون نقطة دخول للهجمات.": "Integrations can become an attack entry point.",
  "حماية مفاتيح API و Tokens": "Protect API Keys and Tokens",
  "لمنع استخدام التكاملات من جهات غير مصرح لها.": "Prevent unauthorized use of integrations.",
  "التحقق من المدخلات والمخرجات": "Validate Inputs and Outputs",
  "لتقليل مخاطر Injection أو البيانات غير الصحيحة.": "Reduce injection and invalid data risks.",
  "لأن المورد قد يكون لديه وصول للبيانات أو الأنظمة.": "The vendor may have access to data or systems.",
  "تحديد صلاحيات المورد ومراقبة وصوله": "Limit and Monitor Vendor Access",
  "لتقليل مخاطر الوصول غير المصرح.": "Reduce unauthorized access risks.",
  "توقيع اتفاقية سرية وحماية بيانات": "Sign Confidentiality and Data Protection Agreements",
  "لضمان التزام المورد بحماية المعلومات.": "Ensure the vendor is committed to protecting information.",
  "لأن الأنظمة المنشورة على الإنترنت أكثر عرضة للهجمات.": "Internet-facing systems are more exposed to attacks.",
  "استخدام HTTPS/TLS": "Use HTTPS/TLS",
  "لحماية البيانات أثناء انتقالها.": "Protect data while it is in transit.",
  "الحماية من OWASP Top 10": "Protect Against the OWASP Top 10",
  "لتقليل أشهر ثغرات تطبيقات الويب.": "Reduce common web application vulnerabilities.",
  "تفعيل WAF إذا كان مناسبًا": "Enable a WAF When Appropriate",
  "لإضافة طبقة حماية أمام التطبيق.": "Add a protective layer in front of the application.",
  "تطبيق معايير البرمجة الآمنة": "Apply Secure Coding Standards",
  "لتقليل ثغرات مثل XSS و Injection.": "Reduce vulnerabilities such as XSS and injection.",
  "فحص الثغرات الأمنية للتطبيق": "Perform Application Vulnerability Scanning",
  "لاكتشاف الثغرات قبل الإطلاق.": "Discover vulnerabilities before launch.",
  "حماية تخزين البيانات داخل الجهاز": "Protect On-Device Data Storage",
  "لتقليل مخاطر استخراج البيانات من جهاز المستخدم.": "Reduce the risk of extracting data from user devices.",
  "مراجعة أمان الاتصال بين التطبيق والخادم": "Review Application-to-Server Communication Security",
  "لأن تطبيقات الجوال تعتمد غالبًا على APIs.": "Mobile applications often depend on APIs.",
  "مراجعة إعدادات الأمان السحابية": "Review Cloud Security Configuration",
  "لأن الإعدادات الخاطئة قد تكشف البيانات.": "Misconfiguration may expose data.",
  "تفعيل مراقبة السجلات والتنبيهات السحابية": "Enable Cloud Logging and Alerts",
  "لاكتشاف الأنشطة غير الطبيعية.": "Detect unusual activity.",
  "توثيق وحماية واجهات API": "Document and Protect APIs",
  "لضمان استخدام التكاملات من جهات موثوقة فقط.": "Ensure integrations are used only by trusted parties.",
  "تطبيق Rate Limiting": "Apply Rate Limiting",
  "لتقليل إساءة الاستخدام أو الهجمات الآلية.": "Reduce abuse and automated attacks.",
  "مراجعة أمنية من فريق الأمن السيبراني قبل البدء": "Cybersecurity Team Review Before Start",
  "لأن مستوى الخطر عالي أو حرج.": "The risk level is High or Critical.",
  "إعداد خطة معالجة للمخاطر قبل الإطلاق": "Prepare a Risk Treatment Plan Before Launch",
  "لتقليل الخطر قبل تشغيل المشروع.": "Reduce risk before the project goes live.",
  "متابعة الضوابط الأمنية الأساسية": "Monitor Baseline Security Controls",
  "لضمان عدم ارتفاع مستوى الخطر لاحقًا.": "Ensure the risk level does not increase later.",
  "متطلبات أمنية إضافية": "Additional Security Requirements",
  "اكتب أي متطلبات إضافية يحتاجها المشروع قبل البدء.": "Enter any additional requirements the project must meet before starting.",
  "حفظ التقييم": "Save Assessment",
  "سجل تقييمات المشاريع": "Project Assessment Register",
  "تقييمات مرتبة من الأحدث إلى الأقدم.": "Assessments sorted from newest to oldest.",
  "القرار": "Decision",
  "المتطلبات الأمنية المطلوبة": "Required Security Controls",
  "لوحة إدارة مخاطر الأمن السيبراني": "Cybersecurity Risk Management Dashboard",
  "تقرير إداري لفريق الحوكمة والمخاطر لمتابعة التصنيف وخطط المعالجة وحالة المخاطر.": "A management view for the GRC team to track risk classifications, treatment plans, and status.",
  "إجمالي المخاطر": "Total Risks",
  "المخاطر الحرجة": "Critical Risks",
  "المخاطر العالية": "High Risks",
  "المخاطر المتوسطة": "Medium Risks",
  "المخاطر المنخفضة": "Low Risks",
  "تسجيل خطر جديد": "Register a New Risk",
  "أدخل بيانات الخطر وسيتم حساب الأثر المختار والدرجة والمستوى مباشرة.": "Enter the risk information to calculate the selected impact, score, and level instantly.",
  "تقييم مخاطر مشروع قبل البدء": "Assess Project Risk Before Start",
  "صفحة لفريق الحوكمة والمخاطر لتحديد قرار المخاطر والمتطلبات الأمنية قبل إطلاق المشروع.": "A GRC workspace for defining the risk decision and security requirements before project launch.",
  "يرجى اختيار الاحتمالية وأثر السرية والسلامة والتوفر قبل إضافة الخطر.": "Select likelihood and all CIA impact values before adding the risk.",
  "يرجى كتابة خطة المعالجة المخصصة.": "Enter the custom treatment plan.",
  "يرجى تعبئة جميع الحقول المطلوبة قبل حفظ التقييم": "Complete all required fields before saving the assessment.",
  "تأكيد حذف الخطر": "Confirm Risk Deletion",
  "هل أنت متأكد من حذف هذا الخطر؟ لا يمكن التراجع عن هذا الإجراء.": "Are you sure you want to delete this risk? This action cannot be undone.",
  "الخطر المحدد": "Selected Risk",
  "تأكيد حذف تقييم المشروع": "Confirm Project Assessment Deletion",
  "هل أنت متأكد من حذف تقييم هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.": "Are you sure you want to delete this project assessment? This action cannot be undone.",
  "المشروع المحدد": "Selected Project",
};

function translate(language, value) {
  if (language !== "en" || value === null || value === undefined) return value;
  return EN_TRANSLATIONS[value] || value;
}

function useI18n() {
  return useContext(LanguageContext);
}
const IMPACT_LEVELS = [
  { value: 1, label: "منخفض جداً", description: "تأثير غير مؤثر أو محدود جداً على الجهة." },
  { value: 2, label: "منخفض", description: "تأثير طفيف على الجهة ويمكن التعامل معه بسهولة." },
  { value: 3, label: "متوسط", description: "تأثير ملموس على الجهة ويحتاج متابعة." },
  { value: 4, label: "مرتفع", description: "تأثير كبير على الجهة ويحتاج معالجة عاجلة." },
  { value: 5, label: "كارثي", description: "تأثير كبير جداً لا يمكن تحمله أو قد يمتد للمستوى الوطني." },
];
const LIKELIHOOD_LEVELS = [
  { value: 1, label: "نادر جداً", description: "حدوثه مستبعد جداً وقد يحدث في ظروف استثنائية." },
  { value: 2, label: "نادر", description: "قد يحدث لكن بشكل قليل جداً." },
  { value: 3, label: "غير مرجح", description: "قد يحدث أحياناً لكنه ليس متوقعاً بشكل كبير." },
  { value: 4, label: "مرجح", description: "من المتوقع حدوثه في بعض الحالات." },
  { value: 5, label: "شبه مؤكد", description: "من المتوقع حدوثه بشكل متكرر أو في معظم الحالات." },
];
const STATUS_OPTIONS = ["مفتوح", "تحت المعالجة", "مقبول", "مغلق"];
const CUSTOM_TREATMENT_OPTION = "خطة أخرى";
const TREATMENT_OPTIONS = ["قبول الخطر", "تقليل الخطر", "نقل الخطر", "تجنب الخطر", CUSTOM_TREATMENT_OPTION];
const RISK_LEVEL_FILTERS = ["الكل", "حرج", "عالي", "متوسط", "منخفض"];
const PROJECT_TYPES = ["تطبيق ويب", "تطبيق جوال", "نظام داخلي", "خدمة سحابية", "تكامل API", "أخرى"];
const YES_NO_OPTIONS = ["نعم", "لا"];
const DATA_SENSITIVITY_OPTIONS = ["منخفض", "متوسط", "عالي"];
const PROJECT_REQUIRED_SELECT_FIELDS = [
  "containsSensitiveData",
  "dataSensitivity",
  "connectsSystems",
  "thirdParty",
  "requiresLogin",
  "internetPublished",
  "likelihood",
  "confidentiality",
  "integrity",
  "availability",
];
const RISK_SCALE_FIELDS = ["likelihood", "confidentiality", "integrity", "availability"];
const RECOMMENDATION_PRIORITY_ORDER = {
  "عالية": 0,
  "متوسطة": 1,
  "منخفضة": 2,
};
const INCOMPLETE_PROJECT_CALCULATION = {
  selectedImpact: "--",
  score: "--",
  level: "غير محدد",
  levelClass: "crm-unknown",
};

const emptyForm = {
  name: "",
  systemAsset: "",
  description: "",
  likelihood: "",
  confidentiality: "",
  integrity: "",
  availability: "",
  owner: "",
  treatmentPlan: "",
  customTreatmentPlan: "",
  status: "مفتوح",
};

const emptyProjectAssessmentForm = {
  projectName: "",
  projectOwner: "",
  projectType: PROJECT_TYPES[0],
  description: "",
  containsSensitiveData: "",
  dataSensitivity: "",
  connectsSystems: "",
  thirdParty: "",
  requiresLogin: "",
  internetPublished: "",
  likelihood: "",
  confidentiality: "",
  integrity: "",
  availability: "",
  customRequirements: "",
};

const dashboardLevels = [
  { level: "حرج", cardLabel: "المخاطر الحرجة", icon: "!", tone: "crm-critical-card" },
  { level: "عالي", cardLabel: "المخاطر العالية", icon: "^", tone: "crm-high-card" },
  { level: "متوسط", cardLabel: "المخاطر المتوسطة", icon: "=", tone: "crm-medium-card" },
  { level: "منخفض", cardLabel: "المخاطر المنخفضة", icon: "-", tone: "crm-low-card" },
];

const riskLifecycleSteps = [
  {
    number: "1",
    title: "تحديد الخطر",
    description: "توثيق الخطر والأصل أو النظام المتأثر.",
  },
  {
    number: "2",
    title: "تقييم الاحتمالية والأثر",
    description: "تقدير الاحتمالية وأثر السرية والسلامة والتوفر.",
  },
  {
    number: "3",
    title: "تصنيف مستوى الخطر",
    description: "حساب الدرجة وتحديد المستوى المناسب.",
  },
  {
    number: "4",
    title: "متابعة المعالجة",
    description: "تحديد الخطة ومتابعة الحالة حتى الإغلاق.",
  },
];

function toScaleValue(value, fallback = 1) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return fallback;
  }

  return Math.min(5, Math.max(1, numericValue));
}

function calculateRisk(risk) {
  const likelihood = toScaleValue(risk.likelihood);
  const confidentiality = toScaleValue(risk.confidentiality);
  const integrity = toScaleValue(risk.integrity);
  const availability = toScaleValue(risk.availability);
  const selectedImpact = Math.max(confidentiality, integrity, availability);
  const score = likelihood * selectedImpact;

  if (score <= 5) {
    return { selectedImpact, score, level: "منخفض", levelClass: "crm-low" };
  }

  if (score <= 10) {
    return { selectedImpact, score, level: "متوسط", levelClass: "crm-medium" };
  }

  if (score <= 15) {
    return { selectedImpact, score, level: "عالي", levelClass: "crm-high" };
  }

  return { selectedImpact, score, level: "حرج", levelClass: "crm-critical" };
}

function getScaleLabel(options, value) {
  if (value === "" || value === "--" || value === null || value === undefined) {
    return "";
  }

  const numericValue = Number(value);
  return options.find((option) => option.value === numericValue)?.label || "";
}

function getImpactLabel(value) {
  return getScaleLabel(IMPACT_LEVELS, value);
}

function getLikelihoodLabel(value) {
  return getScaleLabel(LIKELIHOOD_LEVELS, value);
}

function formatScaleValue(value, labelGetter, t = (text) => text) {
  if (value === "" || value === "--" || value === null || value === undefined) {
    return "--";
  }

  const label = labelGetter(value);
  return label ? `${value} (${t(label)})` : String(value);
}

function isReferenceSelected(value, selectedValue) {
  return selectedValue !== "" && selectedValue !== "--" && Number(selectedValue) === value;
}

function normalizeRisk(risk) {
  const calculated = calculateRisk(risk);

  return {
    id: risk.id || crypto.randomUUID(),
    name: risk.name || "خطر غير مسمى",
    systemAsset: risk.systemAsset || "",
    description: risk.description || "",
    likelihood: toScaleValue(risk.likelihood),
    confidentiality: toScaleValue(risk.confidentiality),
    integrity: toScaleValue(risk.integrity),
    availability: toScaleValue(risk.availability),
    owner: risk.owner || "",
    treatmentPlan: risk.treatmentPlan || "",
    status: STATUS_OPTIONS.includes(risk.status) ? risk.status : "مفتوح",
    ...calculated,
  };
}

function getProjectDecision(score) {
  if (score <= 5) return "مقبول";
  if (score <= 10) return "مقبول مع متابعة";
  if (score <= 15) return "مقبول بشرط تنفيذ ضوابط أمنية";
  return "غير مقبول حاليًا ويحتاج معالجة قبل البدء";
}

function getDecisionClass(decision) {
  if (decision === "غير محدد") return "crm-decision-unknown";
  if (decision === "مقبول") return "crm-decision-accepted";
  if (decision === "مقبول مع متابعة") return "crm-decision-followup";
  if (decision === "مقبول بشرط تنفيذ ضوابط أمنية") return "crm-decision-conditional";
  return "crm-decision-rejected";
}

function isAssessmentCalculationReady(assessment) {
  return RISK_SCALE_FIELDS.every(
    (field) => assessment[field] !== "" && assessment[field] !== null && assessment[field] !== undefined,
  );
}

function isProjectRiskCalculationReady(project) {
  return isAssessmentCalculationReady(project);
}

function areRequiredProjectSelectsComplete(project) {
  return PROJECT_REQUIRED_SELECT_FIELDS.every(
    (field) => project[field] !== "" && project[field] !== null && project[field] !== undefined,
  );
}

function createRecommendation(id, name, reason, priority) {
  return { id, name, reason, priority };
}

function getProjectRecommendations(project) {
  const recommendations = new Map();
  const add = (recommendation) => {
    if (!recommendations.has(recommendation.name)) {
      recommendations.set(recommendation.name, {
        ...recommendation,
        order: recommendations.size,
      });
    }
  };
  const hasProjectContext = Boolean(
    project.projectName?.trim() ||
      project.projectOwner?.trim() ||
      project.description?.trim() ||
      project.containsSensitiveData ||
      project.dataSensitivity ||
      project.connectsSystems ||
      project.thirdParty ||
      project.requiresLogin ||
      project.internetPublished ||
      RISK_SCALE_FIELDS.some((field) => project[field] !== ""),
  );

  if (!hasProjectContext) return [];

  if (project.requiresLogin === "نعم") {
    add(createRecommendation("mfa", "تفعيل المصادقة متعددة العوامل MFA", "لحماية الحسابات من الوصول غير المصرح.", "عالية"));
    add(createRecommendation("password-policy", "تطبيق سياسة كلمات مرور قوية", "لتقليل مخاطر اختراق الحسابات.", "متوسطة"));
    add(createRecommendation("session-management", "إدارة الجلسات بشكل آمن", "لحماية جلسات المستخدمين من السرقة أو سوء الاستخدام.", "متوسطة"));
  }

  if (project.containsSensitiveData === "نعم") {
    add(createRecommendation("sensitive-encryption", "تشفير البيانات الحساسة", "لحماية البيانات في حال الوصول غير المصرح.", "عالية"));
    add(createRecommendation("least-privilege", "تطبيق مبدأ أقل صلاحية", "لضمان وصول المستخدمين للبيانات التي يحتاجونها فقط.", "عالية"));
    add(createRecommendation("safe-errors-logs", "منع ظهور البيانات الحساسة في الأخطاء أو السجلات", "لتجنب كشف معلومات حساسة بالخطأ.", "متوسطة"));
  }

  if (project.dataSensitivity === "عالي") {
    add(createRecommendation("data-classification", "تصنيف البيانات وتحديد ضوابط الحماية", "لأن البيانات عالية الحساسية تحتاج ضوابط أقوى.", "عالية"));
    add(createRecommendation("audit-log", "تفعيل سجل تدقيق Audit Log", "لتتبع عمليات الوصول والتعديل.", "عالية"));
    add(createRecommendation("access-review", "مراجعة الصلاحيات بشكل دوري", "لتقليل مخاطر الصلاحيات الزائدة.", "متوسطة"));
  }

  if (project.connectsSystems === "نعم") {
    add(createRecommendation("integration-security", "مراجعة أمان واجهات API والتكاملات", "لأن التكاملات قد تكون نقطة دخول للهجمات.", "عالية"));
    add(createRecommendation("api-secrets", "حماية مفاتيح API و Tokens", "لمنع استخدام التكاملات من جهات غير مصرح لها.", "عالية"));
    add(createRecommendation("input-output-validation", "التحقق من المدخلات والمخرجات", "لتقليل مخاطر Injection أو البيانات غير الصحيحة.", "متوسطة"));
  }

  if (project.thirdParty === "نعم") {
    add(createRecommendation("vendor-risk", "تقييم مخاطر المورد الخارجي", "لأن المورد قد يكون لديه وصول للبيانات أو الأنظمة.", "عالية"));
    add(createRecommendation("vendor-access", "تحديد صلاحيات المورد ومراقبة وصوله", "لتقليل مخاطر الوصول غير المصرح.", "عالية"));
    add(createRecommendation("vendor-agreement", "توقيع اتفاقية سرية وحماية بيانات", "لضمان التزام المورد بحماية المعلومات.", "متوسطة"));
  }

  if (project.internetPublished === "نعم") {
    add(createRecommendation("pre-launch-security-test", "تنفيذ فحص أمني قبل الإطلاق", "لأن الأنظمة المنشورة على الإنترنت أكثر عرضة للهجمات.", "عالية"));
    add(createRecommendation("https-tls", "استخدام HTTPS/TLS", "لحماية البيانات أثناء انتقالها.", "عالية"));
    add(createRecommendation("owasp-top-10", "الحماية من OWASP Top 10", "لتقليل أشهر ثغرات تطبيقات الويب.", "عالية"));
    add(createRecommendation("waf", "تفعيل WAF إذا كان مناسبًا", "لإضافة طبقة حماية أمام التطبيق.", "متوسطة"));
  }

  if (project.projectType === "تطبيق ويب") {
    add(createRecommendation("secure-coding", "تطبيق معايير البرمجة الآمنة", "لتقليل ثغرات مثل XSS و Injection.", "عالية"));
    add(createRecommendation("application-scan", "فحص الثغرات الأمنية للتطبيق", "لاكتشاف الثغرات قبل الإطلاق.", "عالية"));
  }

  if (project.projectType === "تطبيق جوال") {
    add(createRecommendation("mobile-storage", "حماية تخزين البيانات داخل الجهاز", "لتقليل مخاطر استخراج البيانات من جهاز المستخدم.", "عالية"));
    add(createRecommendation("mobile-server-security", "مراجعة أمان الاتصال بين التطبيق والخادم", "لأن تطبيقات الجوال تعتمد غالبًا على APIs.", "عالية"));
  }

  if (project.projectType === "خدمة سحابية") {
    add(createRecommendation("cloud-configuration", "مراجعة إعدادات الأمان السحابية", "لأن الإعدادات الخاطئة قد تكشف البيانات.", "عالية"));
    add(createRecommendation("cloud-monitoring", "تفعيل مراقبة السجلات والتنبيهات السحابية", "لاكتشاف الأنشطة غير الطبيعية.", "متوسطة"));
  }

  if (project.projectType === "تكامل API") {
    add(createRecommendation("api-protection", "توثيق وحماية واجهات API", "لضمان استخدام التكاملات من جهات موثوقة فقط.", "عالية"));
    add(createRecommendation("rate-limiting", "تطبيق Rate Limiting", "لتقليل إساءة الاستخدام أو الهجمات الآلية.", "متوسطة"));
  }

  if (isProjectRiskCalculationReady(project)) {
    const { score } = calculateRisk(project);

    if (score >= 11) {
      add(createRecommendation("cybersecurity-review", "مراجعة أمنية من فريق الأمن السيبراني قبل البدء", "لأن مستوى الخطر عالي أو حرج.", "عالية"));
      add(createRecommendation("pre-launch-treatment", "إعداد خطة معالجة للمخاطر قبل الإطلاق", "لتقليل الخطر قبل تشغيل المشروع.", "عالية"));
    } else {
      add(createRecommendation("baseline-controls", "متابعة الضوابط الأمنية الأساسية", "لضمان عدم ارتفاع مستوى الخطر لاحقًا.", "منخفضة"));
    }
  }

  return [...recommendations.values()]
    .sort(
      (first, second) =>
        RECOMMENDATION_PRIORITY_ORDER[first.priority] -
          RECOMMENDATION_PRIORITY_ORDER[second.priority] ||
        first.order - second.order,
    )
    .map(({ order, ...recommendation }) => recommendation);
}

function normalizeSavedRecommendation(recommendation, index) {
  if (typeof recommendation === "string") {
    return createRecommendation(
      `legacy-${index}-${recommendation}`,
      recommendation,
      "متطلب محفوظ من تقييم سابق.",
      "متوسطة",
    );
  }

  return createRecommendation(
    recommendation.id || `saved-${index}-${recommendation.name}`,
    recommendation.name || "متطلب أمني",
    recommendation.reason || "متطلب محفوظ من تقييم سابق.",
    RECOMMENDATION_PRIORITY_ORDER[recommendation.priority] !== undefined
      ? recommendation.priority
      : "متوسطة",
  );
}

function normalizeProjectAssessment(project) {
  const calculated = calculateRisk(project);
  const customRequirements = project.customRequirements || "";
  const savedSuggestedRequirements = Array.isArray(project.suggestedRequirements)
    ? project.suggestedRequirements
    : Array.isArray(project.requirements)
      ? project.requirements.filter((requirement) => requirement !== customRequirements.trim())
      : getProjectRecommendations(project);
  const suggestedRequirements = savedSuggestedRequirements.map(normalizeSavedRecommendation);
  const requirements = [
    ...suggestedRequirements.map((requirement) => requirement.name),
    customRequirements.trim(),
  ].filter(Boolean);

  return {
    id: project.id || crypto.randomUUID(),
    createdAt: project.createdAt || new Date().toISOString(),
    projectName: project.projectName || "مشروع غير مسمى",
    projectOwner: project.projectOwner || "",
    projectType: PROJECT_TYPES.includes(project.projectType) ? project.projectType : PROJECT_TYPES[0],
    description: project.description || "",
    containsSensitiveData: YES_NO_OPTIONS.includes(project.containsSensitiveData)
      ? project.containsSensitiveData
      : "لا",
    dataSensitivity: DATA_SENSITIVITY_OPTIONS.includes(project.dataSensitivity)
      ? project.dataSensitivity
      : "متوسط",
    connectsSystems: YES_NO_OPTIONS.includes(project.connectsSystems) ? project.connectsSystems : "لا",
    thirdParty: YES_NO_OPTIONS.includes(project.thirdParty) ? project.thirdParty : "لا",
    requiresLogin: YES_NO_OPTIONS.includes(project.requiresLogin) ? project.requiresLogin : "لا",
    internetPublished: YES_NO_OPTIONS.includes(project.internetPublished) ? project.internetPublished : "لا",
    likelihood: toScaleValue(project.likelihood),
    confidentiality: toScaleValue(project.confidentiality),
    integrity: toScaleValue(project.integrity),
    availability: toScaleValue(project.availability),
    customRequirements,
    suggestedRequirements,
    requirements,
    decision: project.decision || getProjectDecision(calculated.score),
    ...calculated,
  };
}

function loadRisks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).map(normalizeRisk) : [];
  } catch {
    return [];
  }
}

function loadProjectAssessments() {
  try {
    const stored = localStorage.getItem(PROJECT_ASSESSMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored).map(normalizeProjectAssessment) : [];
  } catch {
    return [];
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

function riskToFormValues(risk) {
  const hasCustomTreatment =
    risk.treatmentPlan &&
    !TREATMENT_OPTIONS.filter((option) => option !== CUSTOM_TREATMENT_OPTION).includes(
      risk.treatmentPlan,
    );

  return {
    name: risk.name,
    systemAsset: risk.systemAsset,
    description: risk.description,
    likelihood: risk.likelihood,
    confidentiality: risk.confidentiality,
    integrity: risk.integrity,
    availability: risk.availability,
    owner: risk.owner,
    treatmentPlan: hasCustomTreatment ? CUSTOM_TREATMENT_OPTION : risk.treatmentPlan,
    customTreatmentPlan: hasCustomTreatment ? risk.treatmentPlan : "",
    status: risk.status,
  };
}

function projectToFormValues(project) {
  return {
    projectName: project.projectName,
    projectOwner: project.projectOwner,
    projectType: project.projectType,
    description: project.description,
    containsSensitiveData: project.containsSensitiveData,
    dataSensitivity: project.dataSensitivity,
    connectsSystems: project.connectsSystems,
    thirdParty: project.thirdParty,
    requiresLogin: project.requiresLogin,
    internetPublished: project.internetPublished,
    likelihood: project.likelihood,
    confidentiality: project.confidentiality,
    integrity: project.integrity,
    availability: project.availability,
    customRequirements: project.customRequirements || "",
  };
}

function MetricCard({ label, value, icon, tone = "" }) {
  return (
    <article className={`crm-metric ${tone}`}>
      <div className="crm-metric-top">
        <span>{label}</span>
        <em aria-hidden="true">{icon}</em>
      </div>
      <strong>{value}</strong>
    </article>
  );
}

function LevelBadge({ level, levelClass }) {
  const { t } = useI18n();
  return <span className={`crm-level ${levelClass}`}>{t(level)}</span>;
}

function AssessmentCurrentSummary({ selectedValues, liveCalculation }) {
  const { t } = useI18n();
  const summaryRows = [
    { key: "likelihood", label: t("الاحتمالية"), value: formatScaleValue(selectedValues.likelihood, getLikelihoodLabel, t) },
    { key: "confidentiality", label: t("أثر السرية"), value: formatScaleValue(selectedValues.confidentiality, getImpactLabel, t) },
    { key: "integrity", label: t("أثر السلامة"), value: formatScaleValue(selectedValues.integrity, getImpactLabel, t) },
    { key: "availability", label: t("أثر التوفر"), value: formatScaleValue(selectedValues.availability, getImpactLabel, t) },
    { key: "selectedImpact", label: t("الأثر المختار"), value: formatScaleValue(liveCalculation.selectedImpact, getImpactLabel, t) },
    { key: "score", label: t("درجة الخطر"), value: liveCalculation.score },
  ];

  return (
    <aside className="crm-current-summary" aria-label={t("ملخص التقييم الحالي")}>
      <h3>{t("ملخص التقييم الحالي")}</h3>
      <div className="crm-current-summary-list">
        {summaryRows.map((row) => (
          <div className={row.key === "score" ? "crm-current-summary-score" : ""} key={row.key}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
        <div className="crm-current-summary-level">
          <span>{t("مستوى الخطر")}</span>
          <LevelBadge level={liveCalculation.level} levelClass={liveCalculation.levelClass} />
        </div>
      </div>
    </aside>
  );
}

function AssessmentReferenceGuide({ selectedValues, liveCalculation }) {
  const { language, t } = useI18n();
  const ciaDimensions = [
    { key: "confidentiality", label: t("السرية") },
    { key: "integrity", label: t("السلامة") },
    { key: "availability", label: t("التوفر") },
  ];

  return (
    <section className="crm-reference-guide" aria-label={t("دليل التقييم")}>
      <div className="crm-section-heading">
        <div>
          <h2>{t("دليل التقييم")}</h2>
          <span>{t("استخدم هذا الدليل لاختيار الاحتمالية وأثر السرية والسلامة والتوفر بشكل صحيح.")}</span>
        </div>
      </div>

      <div className="crm-guide-cards">
        <article className="crm-guide-card">
          <div className="crm-guide-card-header">
            <span aria-hidden="true">CIA</span>
            <div>
              <h3>{t("مستويات الأثر CIA")}</h3>
              <p>{t("اختر أثر السرية والسلامة والتوفر حسب أعلى تأثير متوقع على الجهة.")}</p>
            </div>
          </div>

          <div className="crm-scale-card-grid">
            {IMPACT_LEVELS.map((level) => {
              const selectedDimensions = ciaDimensions.filter((dimension) =>
                isReferenceSelected(level.value, selectedValues?.[dimension.key]),
              );
              const isSelected = selectedDimensions.length > 0;

              return (
                <article
                  className={`crm-scale-card crm-scale-tone-${level.value} ${isSelected ? "crm-scale-card-selected" : ""}`}
                  key={level.value}
                >
                  {isSelected && <span className="crm-selected-label">{t("محدد")}</span>}
                  <span className="crm-scale-number">{level.value}</span>
                  <strong>{t(level.label)}</strong>
                  <p>{t(level.description)}</p>
                  {isSelected && (
                    <div className="crm-selected-dimensions">
                      {selectedDimensions.map((dimension) => (
                        <em key={dimension.key}>{dimension.label}</em>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <p className="crm-guide-note">
            {t("يتم اختيار أعلى قيمة من أثر السرية والسلامة والتوفر كأثر مختار.")}
          </p>
        </article>

        <article className="crm-guide-card">
          <div className="crm-guide-card-header">
            <span aria-hidden="true">{language === "ar" ? "؟" : "?"}</span>
            <div>
              <h3>{t("مستويات الاحتمالية")}</h3>
              <p>{t("حدد مدى توقع حدوث الخطر بناءً على السياق والثغرات والضوابط الحالية.")}</p>
            </div>
          </div>

          <div className="crm-scale-card-grid">
            {LIKELIHOOD_LEVELS.map((level) => {
              const isSelected = isReferenceSelected(level.value, selectedValues?.likelihood);

              return (
                <article
                  className={`crm-scale-card crm-scale-tone-${level.value} ${isSelected ? "crm-scale-card-selected" : ""}`}
                  key={level.value}
                >
                  {isSelected && <span className="crm-selected-label">{t("محدد")}</span>}
                  <span className="crm-scale-number">{level.value}</span>
                  <strong>{t(level.label)}</strong>
                  <p>{t(level.description)}</p>
                </article>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

function getLevelCounts(risks) {
  return dashboardLevels.reduce((counts, item) => {
    counts[item.level] = risks.filter((risk) => risk.level === item.level).length;
    return counts;
  }, {});
}

function TopNavigation({ currentPage, onNavigate }) {
  const { language, t, toggleLanguage } = useI18n();
  const links = [
    { id: "dashboard", label: t("لوحة التحكم") },
    { id: "add", label: t("إضافة خطر") },
    { id: "project", label: t("تقييم مشروع جديد") },
  ];

  return (
    <header className="crm-topbar">
      <div className="crm-brand">
        <span>{t("حوكمة وإدارة المخاطر")}</span>
        <strong>{t("الأمن السيبراني")}</strong>
      </div>

      <div className="crm-topbar-actions">
        <nav className="crm-tabs" aria-label={t("التنقل الرئيسي")}>
          {links.map((link) => (
            <button
              key={link.id}
              className={currentPage === link.id ? "active" : ""}
              type="button"
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="crm-language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        >
          <span aria-hidden="true">{language === "ar" ? "EN" : "AR"}</span>
          {language === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </header>
  );
}

function RiskForm({
  form,
  liveCalculation,
  onUpdateField,
  onSubmit,
  submitLabel = "إضافة الخطر",
}) {
  const { t } = useI18n();
  const showCustomTreatmentPlan = form.treatmentPlan === CUSTOM_TREATMENT_OPTION;

  return (
    <form className="crm-panel crm-form" onSubmit={onSubmit}>
      <div className="crm-section-heading">
        <h2>{t("بيانات الخطر")}</h2>
        <LevelBadge level={liveCalculation.level} levelClass={liveCalculation.levelClass} />
      </div>

      <label>
        <span>{t("اسم الخطر")}</span>
        <input
          aria-label={t("اسم الخطر")}
          value={form.name}
          onChange={(event) => onUpdateField("name", event.target.value)}
          placeholder={t("مثال: عدم تفعيل المصادقة متعددة العوامل للحسابات الحساسة")}
          required
        />
      </label>

      <label>
        <span>{t("النظام / الأصل")}</span>
        <input
          aria-label={t("النظام / الأصل")}
          value={form.systemAsset}
          onChange={(event) => onUpdateField("systemAsset", event.target.value)}
          placeholder={t("مثال: منصة إدارة الهوية")}
          required
        />
      </label>

      <label>
        <span>{t("الوصف")}</span>
        <textarea
          aria-label={t("الوصف")}
          value={form.description}
          onChange={(event) => onUpdateField("description", event.target.value)}
          placeholder={t("اكتب وصفاً مختصراً لسيناريو الخطر وأثره على العمل.")}
          required
        />
      </label>

      <div className="crm-form-section-title">{t("تقييم الخطر")}</div>

      <div className="crm-form-row">
        <label>
          <span>{t("الاحتمالية")}</span>
          <select
            aria-label={t("الاحتمالية")}
            value={form.likelihood}
            onChange={(event) => onUpdateField("likelihood", event.target.value)}
            required
          >
            <option value="" disabled>
              {t("اختر الاحتمالية")}
            </option>
            {LIKELIHOOD_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول الاحتمالية")}</small>
        </label>

        <label>
          <span>{t("أثر السرية")}</span>
          <select
            aria-label={t("أثر السرية")}
            value={form.confidentiality}
            onChange={(event) => onUpdateField("confidentiality", event.target.value)}
            required
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر السرية")}</small>
        </label>

        <label>
          <span>{t("أثر السلامة")}</span>
          <select
            aria-label={t("أثر السلامة")}
            value={form.integrity}
            onChange={(event) => onUpdateField("integrity", event.target.value)}
            required
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر السلامة")}</small>
        </label>

        <label>
          <span>{t("أثر التوفر")}</span>
          <select
            aria-label={t("أثر التوفر")}
            value={form.availability}
            onChange={(event) => onUpdateField("availability", event.target.value)}
            required
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر التوفر")}</small>
        </label>
      </div>

      <div className="crm-form-section-title">{t("المعالجة والمتابعة")}</div>

      <div className="crm-form-row crm-form-row-secondary">
        <label>
          <span>{t("مالك الخطر")}</span>
          <input
            aria-label={t("مالك الخطر")}
            value={form.owner}
            onChange={(event) => onUpdateField("owner", event.target.value)}
            placeholder={t("مثال: إدارة تقنية المعلومات")}
          />
        </label>

        <label>
          <span>{t("خطة المعالجة")}</span>
          <select
            aria-label={t("خطة المعالجة")}
            value={form.treatmentPlan}
            onChange={(event) => onUpdateField("treatmentPlan", event.target.value)}
          >
            <option value="">{t("اختر خطة المعالجة")}</option>
            {TREATMENT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("حالة الخطر")}</span>
          <select
            aria-label={t("حالة الخطر")}
            value={form.status}
            onChange={(event) => onUpdateField("status", event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {showCustomTreatmentPlan && (
        <label className="crm-custom-treatment">
          <span>{t("خطة المعالجة المخصصة")}</span>
          <textarea
            aria-label={t("خطة المعالجة المخصصة")}
            value={form.customTreatmentPlan}
            onChange={(event) => onUpdateField("customTreatmentPlan", event.target.value)}
            placeholder={t("اكتب خطة المعالجة المخصصة")}
            required
          />
        </label>
      )}

      <button className="crm-submit-button" type="submit">
        {t(submitLabel)}
      </button>
    </form>
  );
}

function RiskLifecycle() {
  const { t } = useI18n();
  return (
    <section className="crm-lifecycle">
      <div className="crm-section-heading">
        <div>
          <h2>{t("دورة إدارة المخاطر")}</h2>
          <span>{t("منهجية عمل فريق الحوكمة والمخاطر من التسجيل إلى المتابعة.")}</span>
        </div>
      </div>

      <div className="crm-lifecycle-grid">
        {riskLifecycleSteps.map((step) => (
          <article className="crm-lifecycle-card" key={step.number}>
            <span>{step.number}</span>
            <div>
              <strong>{t(step.title)}</strong>
              <p>{t(step.description)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RiskDistribution({ levelCounts, totalRisks }) {
  const { t, language } = useI18n();
  return (
    <section className="crm-panel crm-distribution-panel">
      <div className="crm-section-heading">
        <h2>{t("توزيع المخاطر")}</h2>
        <span>{t("حسب مستوى الخطورة")}</span>
      </div>

      <div className="crm-distribution-list">
        {dashboardLevels.map((item) => {
          const count = levelCounts[item.level] || 0;
          const percentage = totalRisks === 0 ? 0 : Math.round((count / totalRisks) * 100);

          return (
            <article className="crm-distribution-row" key={item.level}>
              <div className="crm-distribution-info">
                <strong>{t(item.level)}</strong>
                <span>
                  {count} {language === "ar" ? "مخاطر" : count === 1 ? "risk" : "risks"} - {percentage}%
                </span>
              </div>
              <div className="crm-progress-track" aria-label={`${t(item.level)}: ${percentage}%`}>
                <div
                  className={`crm-progress-fill ${item.tone}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TopRisks({ topRisks }) {
  const { t } = useI18n();
  return (
    <section className="crm-panel crm-top-panel">
      <div className="crm-section-heading">
        <h2>{t("أعلى المخاطر")}</h2>
        <span>{t("المخاطر التي يجب أن يبدأ فريق إدارة المخاطر بمتابعتها أولاً")}</span>
      </div>

      <div className="crm-top-list">
        {topRisks.length === 0 ? (
          <p className="crm-empty">{t("لم تتم إضافة أي مخاطر بعد.")}</p>
        ) : (
          topRisks.map((risk) => (
            <article className="crm-top-risk" key={risk.id}>
              <div className="crm-top-risk-content">
                <strong>{risk.name}</strong>
                <span>{risk.systemAsset}</span>
                <small>
                  {t("مالك الخطر")}: {risk.owner || t("غير محدد")} - {t("الحالة")}: {t(risk.status)}
                </small>
              </div>
              <div className="crm-top-risk-meta">
                <span>{t("درجة الخطر")}</span>
                <strong>{risk.score}</strong>
                <LevelBadge level={risk.level} levelClass={risk.levelClass} />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function RiskTable({ sortedRisks, onDeleteRisk, onEditRisk }) {
  const { t } = useI18n();
  const [expandedRiskIds, setExpandedRiskIds] = useState([]);
  const [activeLevelFilter, setActiveLevelFilter] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleRisks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return sortedRisks.filter((risk) => {
      const matchesLevel = activeLevelFilter === "الكل" || risk.level === activeLevelFilter;
      const matchesSearch =
        normalizedSearch === "" ||
        risk.name.toLowerCase().includes(normalizedSearch) ||
        risk.systemAsset.toLowerCase().includes(normalizedSearch) ||
        (risk.owner || "").toLowerCase().includes(normalizedSearch);

      return matchesLevel && matchesSearch;
    });
  }, [activeLevelFilter, searchTerm, sortedRisks]);

  const toggleRiskDetails = (riskId) => {
    setExpandedRiskIds((current) =>
      current.includes(riskId)
        ? current.filter((id) => id !== riskId)
        : [...current, riskId],
    );
  };

  return (
    <section className="crm-panel crm-risk-table-panel">
      <div className="crm-section-heading">
        <h2>{t("سجل المخاطر")}</h2>
        <span>{t("مرتبة من أعلى درجة خطر إلى أدنى درجة")}</span>
      </div>

      <div className="crm-register-tools">
        <label className="crm-register-search">
          <span>{t("بحث سريع")}</span>
          <input
            aria-label={t("ابحث باسم الخطر أو النظام أو مالك الخطر")}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t("ابحث باسم الخطر أو النظام أو مالك الخطر")}
          />
        </label>

        <div className="crm-register-filters" aria-label={t("تصفية سجل المخاطر")}>
          {RISK_LEVEL_FILTERS.map((level) => (
            <button
              key={level}
              className={activeLevelFilter === level ? "active" : ""}
              type="button"
              aria-pressed={activeLevelFilter === level}
              onClick={() => setActiveLevelFilter(level)}
            >
              {t(level)}
            </button>
          ))}
        </div>
      </div>

      <div className="crm-risk-cards">
        {visibleRisks.map((risk) => {
          const isExpanded = expandedRiskIds.includes(risk.id);
          const riskTone = `crm-risk-card-${risk.levelClass.replace("crm-", "")}`;

          return (
            <article className={`crm-risk-card ${riskTone}`} key={risk.id}>
              <div className="crm-risk-card-header">
                <div className="crm-risk-card-title">
                  <strong>{risk.name}</strong>
                  <span>{risk.systemAsset || t("النظام / الأصل غير محدد")}</span>
                </div>

                <div className="crm-risk-level-score">
                  <LevelBadge level={risk.level} levelClass={risk.levelClass} />
                </div>
              </div>

              <div className="crm-risk-quick-items">
                <div>
                  <span>{t("الحالة")}</span>
                  <strong>{t(risk.status)}</strong>
                </div>
                <div>
                  <span>{t("مالك الخطر")}</span>
                  <strong>{risk.owner || t("غير محدد")}</strong>
                </div>
                <div>
                  <span>{t("خطة المعالجة")}</span>
                  <strong>{risk.treatmentPlan ? t(risk.treatmentPlan) : t("غير محددة")}</strong>
                </div>
              </div>

              {isExpanded && (
                <div className="crm-risk-card-details">
                  <div className="crm-risk-description">
                    <span>{t("الوصف")}</span>
                    <p>{risk.description || t("لا يوجد وصف مسجل.")}</p>
                  </div>

                  <div className="crm-risk-detail-grid">
                    <div>
                      <span>{t("الاحتمالية")}</span>
                      <strong>{risk.likelihood}</strong>
                    </div>
                    <div>
                      <span>{t("أثر السرية")}</span>
                      <strong>{risk.confidentiality}</strong>
                    </div>
                    <div>
                      <span>{t("أثر السلامة")}</span>
                      <strong>{risk.integrity}</strong>
                    </div>
                    <div>
                      <span>{t("أثر التوفر")}</span>
                      <strong>{risk.availability}</strong>
                    </div>
                    <div>
                      <span>{t("الأثر المختار")}</span>
                      <strong>{risk.selectedImpact}</strong>
                    </div>
                    <div>
                      <span>{t("درجة الخطر")}</span>
                      <strong>{risk.score}</strong>
                    </div>
                  </div>

                  <div className="crm-calculation-note">
                    <span>{t("طريقة الحساب")}</span>
                    <strong>{t("درجة الخطر = الاحتمالية × الأثر المختار")}</strong>
                    <p>
                      {risk.score} = {risk.likelihood} × {risk.selectedImpact}
                    </p>
                  </div>
                </div>
              )}

              <div className="crm-risk-card-actions">
                <button
                  className="crm-details-button"
                  type="button"
                  onClick={() => toggleRiskDetails(risk.id)}
                >
                  {isExpanded ? t("إخفاء التفاصيل") : t("عرض التفاصيل")}
                </button>

                <button
                  className="crm-edit-button"
                  type="button"
                  onClick={() => onEditRisk(risk.id)}
                >
                  {t("تعديل")}
                </button>

                <button
                  className="crm-delete-button"
                  type="button"
                  onClick={() => onDeleteRisk(risk.id)}
                >
                  {t("حذف")}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {sortedRisks.length === 0 && <p className="crm-empty">{t("لا توجد مخاطر مسجلة حتى الآن")}</p>}
      {sortedRisks.length > 0 && visibleRisks.length === 0 && (
        <p className="crm-empty">{t("لا توجد نتائج مطابقة للبحث أو الفلتر الحالي.")}</p>
      )}
    </section>
  );
}

function DecisionBadge({ decision }) {
  const { t } = useI18n();
  return <span className={`crm-decision ${getDecisionClass(decision)}`}>{t(decision)}</span>;
}

function DeleteConfirmationDialog({ request, onCancel, onConfirm }) {
  const { t } = useI18n();
  useEffect(() => {
    if (!request) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [request, onCancel]);

  if (!request) return null;
  const isRisk = request.type === "risk";
  const title = isRisk ? t("تأكيد حذف الخطر") : t("تأكيد حذف تقييم المشروع");
  const message = isRisk
    ? t("هل أنت متأكد من حذف هذا الخطر؟ لا يمكن التراجع عن هذا الإجراء.")
    : t("هل أنت متأكد من حذف تقييم هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.");
  const itemLabel = isRisk ? t("الخطر المحدد") : t("المشروع المحدد");

  return (
    <div
      className="crm-confirm-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        className="crm-confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="crm-confirm-icon" aria-hidden="true">!</div>
        <div className="crm-confirm-content">
          <h2>{title}</h2>
          <p>{message}</p>
          <div className="crm-confirm-target">
            <span>{itemLabel}</span>
            <strong>{request.itemName}</strong>
          </div>
        </div>
        <div className="crm-confirm-actions">
          <button className="crm-cancel-button" type="button" onClick={onCancel} autoFocus>
            {t("إلغاء")}
          </button>
          <button className="crm-confirm-delete-button" type="button" onClick={onConfirm}>
            {t("حذف")}
          </button>
        </div>
      </section>
    </div>
  );
}

function EditModal({ title, onCancel, children }) {
  const { t } = useI18n();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className="crm-edit-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section className="crm-edit-modal" role="dialog" aria-modal="true" aria-label={t(title)}>
        <header className="crm-edit-modal-header">
          <h2>{t(title)}</h2>
          <button type="button" onClick={onCancel} aria-label={t("إلغاء")}>
            ×
          </button>
        </header>
        <div className="crm-edit-modal-body">{children}</div>
      </section>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const { t } = useI18n();
  const priorityClass = {
    "عالية": "crm-priority-high",
    "متوسطة": "crm-priority-medium",
    "منخفضة": "crm-priority-low",
  }[priority];

  return (
    <span className={`crm-priority-badge ${priorityClass}`}>
      {t(priority)}
    </span>
  );
}

function RequirementGroups({ recommendations }) {
  const { t } = useI18n();
  const priorities = ["عالية", "متوسطة", "منخفضة"];

  return (
    <div className="crm-recommendation-groups">
      {priorities.map((priority) => {
        const priorityRecommendations = recommendations.filter(
          (recommendation) => recommendation.priority === priority,
        );

        if (priorityRecommendations.length === 0) return null;

        return (
          <section className="crm-recommendation-group" key={priority}>
            <div className="crm-recommendation-group-heading">
              <PriorityBadge priority={priority} />
              <span>{priorityRecommendations.length}</span>
            </div>
            <div className="crm-recommendation-list">
              {priorityRecommendations.map((recommendation) => (
                <article className="crm-recommendation-card" key={recommendation.id}>
                  <div className="crm-recommendation-card-header">
                    <div>
                      <span>{t("اسم المتطلب")}</span>
                      <strong>{t(recommendation.name)}</strong>
                    </div>
                    <PriorityBadge priority={recommendation.priority} />
                  </div>
                  <p>
                    <span>{t("سبب التوصية")}</span>
                    {t(recommendation.reason)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SuggestedSecurityRequirements({ recommendations }) {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const visibleRecommendations = showAll ? recommendations : recommendations.slice(0, 5);

  return (
    <section className="crm-recommendations-box" aria-label={t("المتطلبات الأمنية المقترحة")}>
      <div className="crm-section-heading">
        <div>
          <h2>{t("المتطلبات الأمنية المقترحة")}</h2>
          <span>{t("تتغير تلقائيًا بناءً على إجابات المشروع.")}</span>
        </div>
        {recommendations.length > 0 && (
          <strong className="crm-recommendation-count">{recommendations.length}</strong>
        )}
      </div>

      {recommendations.length === 0 ? (
        <p className="crm-recommendation-empty">
          {t("ستظهر المتطلبات الأمنية المقترحة بعد تعبئة بيانات المشروع.")}
        </p>
      ) : (
        <>
          <RequirementGroups recommendations={visibleRecommendations} />
          {recommendations.length > 5 && (
            <button
              className="crm-recommendation-toggle"
              type="button"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? t("عرض أقل") : t("عرض جميع المتطلبات")}
            </button>
          )}
        </>
      )}
    </section>
  );
}

function SavedProjectRequirements({ project, expanded, onToggle, showToggle = true }) {
  const { language, t } = useI18n();
  const recommendations = project.suggestedRequirements || [];
  const recommendationCountLabel =
    recommendations.length === 1 ? t("متطلب مقترح") : t("متطلبات مقترحة");

  return (
    <div className="crm-project-requirements">
      <div className="crm-saved-requirements-summary">
        <div>
          <span>{t("المتطلبات الأمنية المطلوبة")}</span>
          <strong>
            {recommendations.length} {recommendationCountLabel}
            {project.customRequirements
              ? language === "ar"
                ? " + متطلبات إضافية"
                : " + Additional Requirements"
              : ""}
          </strong>
        </div>
        {showToggle && (
          <button className="crm-details-button" type="button" onClick={onToggle}>
            {expanded ? t("إخفاء المتطلبات") : t("عرض المتطلبات")}
          </button>
        )}
      </div>

      {expanded && (
        <div className="crm-saved-requirements-details">
          {recommendations.length > 0 && (
            <div>
              <h4>{t("المتطلبات التلقائية")}</h4>
              <RequirementGroups recommendations={recommendations} />
            </div>
          )}
          <div className="crm-custom-requirements-summary">
            <h4>{t("المتطلبات الإضافية")}</h4>
            <p>{project.customRequirements || t("لا توجد متطلبات إضافية مسجلة.")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDashboardSection({ projectAssessments = [] }) {
  const { t } = useI18n();
  const acceptedCount = projectAssessments.filter((project) =>
    ["مقبول", "مقبول مع متابعة"].includes(project.decision),
  ).length;
  const conditionalCount = projectAssessments.filter(
    (project) => project.decision === "مقبول بشرط تنفيذ ضوابط أمنية",
  ).length;
  const rejectedCount = projectAssessments.filter((project) =>
    project.decision.startsWith("غير مقبول"),
  ).length;
  const latestAssessments = projectAssessments.slice(0, 3);

  return (
    <section className="crm-panel crm-project-dashboard">
      <div className="crm-section-heading">
        <div>
          <h2>{t("تقييمات المشاريع")}</h2>
          <span>{t("متابعة قرارات فريق الحوكمة والمخاطر قبل بدء المشاريع.")}</span>
        </div>
      </div>

      <div className="crm-project-summary-grid">
        <article>
          <span>{t("إجمالي تقييمات المشاريع")}</span>
          <strong>{projectAssessments.length}</strong>
        </article>
        <article>
          <span>{t("المشاريع المقبولة")}</span>
          <strong>{acceptedCount}</strong>
        </article>
        <article>
          <span>{t("المشاريع المقبولة بشرط")}</span>
          <strong>{conditionalCount}</strong>
        </article>
        <article>
          <span>{t("المشاريع غير المقبولة حاليًا")}</span>
          <strong>{rejectedCount}</strong>
        </article>
      </div>

      <div className="crm-latest-projects">
        <h3>{t("أحدث تقييمات المشاريع")}</h3>
        {latestAssessments.length === 0 ? (
          <p className="crm-empty">{t("لا توجد تقييمات مشاريع محفوظة حتى الآن.")}</p>
        ) : (
          <div className="crm-latest-project-list">
            {latestAssessments.map((project) => (
              <article className="crm-latest-project-card" key={project.id}>
                <div>
                  <strong>{project.projectName}</strong>
                  <span>{project.projectOwner || t("مالك المشروع غير محدد")}</span>
                </div>
                <div>
                  <span>{t("درجة الخطر")}</span>
                  <strong>{project.score}</strong>
                </div>
                <DecisionBadge decision={project.decision} />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectAssessmentForm({
  form,
  liveCalculation,
  decision,
  recommendations,
  validationMessage,
  onUpdateField,
  onSubmit,
  submitLabel = "حفظ التقييم",
}) {
  const { t } = useI18n();
  return (
    <form className="crm-panel crm-form crm-project-form" onSubmit={onSubmit}>
      <div className="crm-section-heading">
        <div>
          <h2>{t("بيانات تقييم المشروع")}</h2>
          <span>{t("يستخدم فريق المخاطر هذه البيانات لتحديد متطلبات الأمن قبل بدء المشروع.")}</span>
        </div>
        <DecisionBadge decision={decision} />
      </div>

      {validationMessage && (
        <p className="crm-validation-message" role="alert">
          {t(validationMessage)}
        </p>
      )}

      <div className="crm-form-section-title">{t("معلومات المشروع الأساسية")}</div>

      <div className="crm-form-row crm-form-row-secondary">
        <label>
          <span>{t("اسم المشروع")}</span>
          <input
            aria-label={t("اسم المشروع")}
            value={form.projectName}
            onChange={(event) => onUpdateField("projectName", event.target.value)}
            placeholder={t("مثال: بوابة الخدمات الطلابية")}
            required
          />
        </label>

        <label>
          <span>{t("مالك المشروع")}</span>
          <input
            aria-label={t("مالك المشروع")}
            value={form.projectOwner}
            onChange={(event) => onUpdateField("projectOwner", event.target.value)}
            placeholder={t("مثال: عمادة تقنية المعلومات")}
            required
          />
        </label>

        <label>
          <span>{t("نوع المشروع")}</span>
          <select
            aria-label={t("نوع المشروع")}
            value={form.projectType}
            onChange={(event) => onUpdateField("projectType", event.target.value)}
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(type)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>{t("وصف المشروع")}</span>
        <textarea
          aria-label={t("وصف المشروع")}
          value={form.description}
          onChange={(event) => onUpdateField("description", event.target.value)}
          placeholder={t("اكتب وصفًا موجزًا لطبيعة المشروع، نطاقه، والبيانات أو الأنظمة التي سيتعامل معها.")}
          required
        />
      </label>

      <div className="crm-form-section-title">{t("أسئلة الأمن السيبراني")}</div>

      <div className="crm-project-question-grid">
        <label>
          <span>{t("هل يحتوي المشروع على بيانات حساسة؟")}</span>
          <select
            aria-label={t("هل يحتوي المشروع على بيانات حساسة؟")}
            value={form.containsSensitiveData}
            onChange={(event) => onUpdateField("containsSensitiveData", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الإجابة")}
            </option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("مستوى حساسية البيانات")}</span>
          <select
            aria-label={t("مستوى حساسية البيانات")}
            value={form.dataSensitivity}
            onChange={(event) => onUpdateField("dataSensitivity", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر المستوى")}
            </option>
            {DATA_SENSITIVITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("هل يوجد ربط مع أنظمة أخرى؟")}</span>
          <select
            aria-label={t("هل يوجد ربط مع أنظمة أخرى؟")}
            value={form.connectsSystems}
            onChange={(event) => onUpdateField("connectsSystems", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الإجابة")}
            </option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("هل يوجد طرف ثالث / مورد خارجي؟")}</span>
          <select
            aria-label={t("هل يوجد طرف ثالث / مورد خارجي؟")}
            value={form.thirdParty}
            onChange={(event) => onUpdateField("thirdParty", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الإجابة")}
            </option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("هل يحتاج المشروع إلى تسجيل دخول؟")}</span>
          <select
            aria-label={t("هل يحتاج المشروع إلى تسجيل دخول؟")}
            value={form.requiresLogin}
            onChange={(event) => onUpdateField("requiresLogin", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الإجابة")}
            </option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t("هل سيتم نشر المشروع على الإنترنت؟")}</span>
          <select
            aria-label={t("هل سيتم نشر المشروع على الإنترنت؟")}
            value={form.internetPublished}
            onChange={(event) => onUpdateField("internetPublished", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الإجابة")}
            </option>
            {YES_NO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="crm-form-section-title">{t("تقييم الخطر قبل بدء المشروع")}</div>

      <div className="crm-form-row">
        <label>
          <span>{t("الاحتمالية")}</span>
          <select
            aria-label={t("احتمالية المشروع")}
            value={form.likelihood}
            onChange={(event) => onUpdateField("likelihood", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر الاحتمالية")}
            </option>
            {LIKELIHOOD_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول الاحتمالية")}</small>
        </label>

        <label>
          <span>{t("أثر السرية")}</span>
          <select
            aria-label={t("أثر سرية المشروع")}
            value={form.confidentiality}
            onChange={(event) => onUpdateField("confidentiality", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر السرية")}</small>
        </label>

        <label>
          <span>{t("أثر السلامة")}</span>
          <select
            aria-label={t("أثر سلامة المشروع")}
            value={form.integrity}
            onChange={(event) => onUpdateField("integrity", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر السلامة")}</small>
        </label>

        <label>
          <span>{t("أثر التوفر")}</span>
          <select
            aria-label={t("أثر توفر المشروع")}
            value={form.availability}
            onChange={(event) => onUpdateField("availability", event.target.value)}
          >
            <option value="" disabled>
              {t("اختر مستوى الأثر")}
            </option>
            {IMPACT_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.value} - {t(level.label)}
              </option>
            ))}
          </select>
          <small className="crm-field-helper">{t("اختر القيمة بناءً على جدول أثر التوفر")}</small>
        </label>
      </div>

      <SuggestedSecurityRequirements recommendations={recommendations} />

      <label>
        <span>{t("متطلبات أمنية إضافية")}</span>
        <textarea
          aria-label={t("متطلبات أمنية إضافية")}
          value={form.customRequirements}
          onChange={(event) => onUpdateField("customRequirements", event.target.value)}
          placeholder={t("اكتب أي متطلبات إضافية يحتاجها المشروع قبل البدء.")}
        />
      </label>

      <button className="crm-submit-button" type="submit">
        {t(submitLabel)}
      </button>
    </form>
  );
}

function ProjectAssessmentsRegister({
  assessments,
  onDeleteAssessment,
  onEditAssessment,
}) {
  const { t } = useI18n();
  const [expandedAssessmentIds, setExpandedAssessmentIds] = useState([]);

  const toggleAssessmentDetails = (assessmentId) => {
    setExpandedAssessmentIds((current) =>
      current.includes(assessmentId)
        ? current.filter((id) => id !== assessmentId)
        : [...current, assessmentId],
    );
  };

  return (
    <section className="crm-panel crm-project-register">
      <div className="crm-section-heading">
        <div>
          <h2>{t("سجل تقييمات المشاريع")}</h2>
          <span>{t("تقييمات مرتبة من الأحدث إلى الأقدم.")}</span>
        </div>
      </div>

      {assessments.length === 0 ? (
        <p className="crm-empty">{t("لا توجد تقييمات مشاريع محفوظة حتى الآن.")}</p>
      ) : (
        <div className="crm-project-assessment-list">
          {assessments.map((project) => {
            const detailsExpanded = expandedAssessmentIds.includes(project.id);

            return (
              <article className="crm-project-assessment-card" key={project.id}>
                <div className="crm-project-card-header">
                  <div>
                    <strong>{project.projectName}</strong>
                    <span>{t(project.projectType)}</span>
                  </div>
                  <div className="crm-project-card-score">
                    <span>{t("درجة الخطر")}</span>
                    <strong>{project.score}</strong>
                    <LevelBadge level={project.level} levelClass={project.levelClass} />
                  </div>
                </div>

                <div className="crm-project-card-grid">
                  <div>
                    <span>{t("مالك المشروع")}</span>
                    <strong>{project.projectOwner || t("غير محدد")}</strong>
                  </div>
                  <div>
                    <span>{t("القرار")}</span>
                    <DecisionBadge decision={project.decision} />
                  </div>
                </div>

                {detailsExpanded && (
                  <div className="crm-project-details">
                    <div className="crm-risk-description">
                      <span>{t("وصف المشروع")}</span>
                      <p>{project.description || t("لا يوجد وصف مسجل.")}</p>
                    </div>

                    <div className="crm-project-detail-grid">
                      <div>
                        <span>{t("نوع المشروع")}</span>
                        <strong>{t(project.projectType)}</strong>
                      </div>
                      <div>
                        <span>{t("هل يحتوي على بيانات حساسة")}</span>
                        <strong>{t(project.containsSensitiveData)}</strong>
                      </div>
                      <div>
                        <span>{t("مستوى حساسية البيانات")}</span>
                        <strong>{t(project.dataSensitivity)}</strong>
                      </div>
                      <div>
                        <span>{t("هل يوجد ربط مع أنظمة أخرى")}</span>
                        <strong>{t(project.connectsSystems)}</strong>
                      </div>
                      <div>
                        <span>{t("هل يوجد طرف ثالث")}</span>
                        <strong>{t(project.thirdParty)}</strong>
                      </div>
                      <div>
                        <span>{t("هل يحتاج تسجيل دخول")}</span>
                        <strong>{t(project.requiresLogin)}</strong>
                      </div>
                      <div>
                        <span>{t("هل سيتم نشره على الإنترنت")}</span>
                        <strong>{t(project.internetPublished)}</strong>
                      </div>
                      <div>
                        <span>{t("الاحتمالية")}</span>
                        <strong>{project.likelihood}</strong>
                      </div>
                      <div>
                        <span>{t("أثر السرية")}</span>
                        <strong>{project.confidentiality}</strong>
                      </div>
                      <div>
                        <span>{t("أثر السلامة")}</span>
                        <strong>{project.integrity}</strong>
                      </div>
                      <div>
                        <span>{t("أثر التوفر")}</span>
                        <strong>{project.availability}</strong>
                      </div>
                      <div>
                        <span>{t("الأثر المختار")}</span>
                        <strong>{project.selectedImpact}</strong>
                      </div>
                      <div>
                        <span>{t("درجة الخطر")}</span>
                        <strong>{project.score}</strong>
                      </div>
                      <div>
                        <span>{t("مستوى الخطر")}</span>
                        <LevelBadge level={project.level} levelClass={project.levelClass} />
                      </div>
                      <div>
                        <span>{t("القرار")}</span>
                        <DecisionBadge decision={project.decision} />
                      </div>
                    </div>

                    <SavedProjectRequirements
                      project={project}
                      expanded
                      showToggle={false}
                    />
                  </div>
                )}

                <div className="crm-project-card-actions">
                  <button
                    className="crm-details-button"
                    type="button"
                    onClick={() => toggleAssessmentDetails(project.id)}
                  >
                    {detailsExpanded ? t("إخفاء التفاصيل") : t("عرض التفاصيل")}
                  </button>
                  <button
                    className="crm-edit-button"
                    type="button"
                    onClick={() => onEditAssessment(project.id)}
                  >
                    {t("تعديل")}
                  </button>
                  <button
                    className="crm-delete-button"
                    type="button"
                    onClick={() => onDeleteAssessment(project.id)}
                  >
                    {t("حذف")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function DashboardPage({
  risks,
  sortedRisks,
  topRisks,
  levelCounts,
  projectAssessments = [],
  onDeleteRisk,
  onEditRisk,
  onDeleteAssessment,
  onEditAssessment,
}) {
  const { t } = useI18n();
  const [managementView, setManagementView] = useState("risks");
  return (
    <div className="crm-page">
      <section className="crm-page-header">
        <div>
          <p>{t("لوحة التحكم")}</p>
          <h1>{t("لوحة إدارة مخاطر الأمن السيبراني")}</h1>
          <span>{t("تقرير إداري لفريق الحوكمة والمخاطر لمتابعة التصنيف وخطط المعالجة وحالة المخاطر.")}</span>
        </div>
      </section>

      <RiskLifecycle />

      <section className="crm-metrics">
        <MetricCard label={t("إجمالي المخاطر")} value={risks.length} icon="#" tone="crm-primary" />
        {dashboardLevels.map((item) => (
          <MetricCard
            key={item.level}
            label={t(item.cardLabel)}
            value={levelCounts[item.level] || 0}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </section>

      <section className="crm-dashboard-insights">
        <RiskDistribution levelCounts={levelCounts} totalRisks={risks.length} />
        <TopRisks topRisks={topRisks} />
      </section>

      <ProjectDashboardSection projectAssessments={projectAssessments} />

      <section className="crm-dashboard-management">
        <div className="crm-section-heading">
          <div>
            <h2>{t("إدارة السجلات")}</h2>
            <span>{t("اختر نوع السجلات التي تريد متابعتها وإدارتها.")}</span>
          </div>
        </div>
        <div className="crm-management-tabs" role="tablist">
          <button
            className={managementView === "risks" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={managementView === "risks"}
            onClick={() => setManagementView("risks")}
          >
            {t("المخاطر")}
          </button>
          <button
            className={managementView === "projects" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={managementView === "projects"}
            onClick={() => setManagementView("projects")}
          >
            {t("تقييمات المشاريع")}
          </button>
        </div>

        {managementView === "risks" ? (
          <RiskTable
            sortedRisks={sortedRisks}
            onDeleteRisk={onDeleteRisk}
            onEditRisk={onEditRisk}
          />
        ) : (
          <ProjectAssessmentsRegister
            assessments={projectAssessments}
            onDeleteAssessment={onDeleteAssessment}
            onEditAssessment={onEditAssessment}
          />
        )}
      </section>
    </div>
  );
}

function AddRiskPage({
  form,
  liveCalculation,
  onUpdateField,
  onSubmit,
}) {
  const { t } = useI18n();
  return (
    <div className="crm-page crm-add-page">
      <section className="crm-page-header">
        <div>
          <p>{t("إضافة خطر")}</p>
          <h1>{t("تسجيل خطر جديد")}</h1>
          <span>{t("أدخل بيانات الخطر وسيتم حساب الأثر المختار والدرجة والمستوى مباشرة.")}</span>
        </div>
      </section>

      <div className="crm-assessment-workspace">
        <AssessmentReferenceGuide
          liveCalculation={liveCalculation}
          selectedValues={form}
        />

        <AssessmentCurrentSummary
          liveCalculation={liveCalculation}
          selectedValues={form}
        />

        <RiskForm
          form={form}
          liveCalculation={liveCalculation}
          onUpdateField={onUpdateField}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function ProjectAssessmentPage({
  form,
  liveCalculation,
  decision,
  recommendations,
  validationMessage,
  onUpdateField,
  onSubmit,
}) {
  const { t } = useI18n();
  return (
    <div className="crm-page crm-project-page">
      <section className="crm-page-header">
        <div>
          <p>{t("تقييم مشروع جديد")}</p>
          <h1>{t("تقييم مخاطر مشروع قبل البدء")}</h1>
          <span>{t("صفحة لفريق الحوكمة والمخاطر لتحديد قرار المخاطر والمتطلبات الأمنية قبل إطلاق المشروع.")}</span>
        </div>
      </section>

      <div className="crm-assessment-workspace">
        <AssessmentReferenceGuide
          liveCalculation={liveCalculation}
          selectedValues={form}
        />

        <AssessmentCurrentSummary
          liveCalculation={liveCalculation}
          selectedValues={form}
        />

        <ProjectAssessmentForm
          form={form}
          liveCalculation={liveCalculation}
          decision={decision}
          recommendations={recommendations}
          validationMessage={validationMessage}
          onUpdateField={onUpdateField}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState(loadLanguage);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [risks, setRisks] = useState(loadRisks);
  const [form, setForm] = useState(emptyForm);
  const [projectAssessmentForm, setProjectAssessmentForm] = useState(emptyProjectAssessmentForm);
  const [projectAssessments, setProjectAssessments] = useState(loadProjectAssessments);
  const [projectValidationMessage, setProjectValidationMessage] = useState("");
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [editingRiskId, setEditingRiskId] = useState(null);
  const [editingRiskForm, setEditingRiskForm] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectForm, setEditingProjectForm] = useState(null);
  const [editingProjectValidationMessage, setEditingProjectValidationMessage] = useState("");
  const t = useMemo(() => (value) => translate(language, value), [language]);
  const languageContextValue = useMemo(
    () => ({
      language,
      t,
      toggleLanguage: () => setLanguage((current) => (current === "ar" ? "en" : "ar")),
    }),
    [language, t],
  );

  useEffect(() => {
    const direction = language === "ar" ? "rtl" : "ltr";
    document.title = t("لوحة إدارة مخاطر الأمن السيبراني");
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, t]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(risks));
  }, [risks]);

  useEffect(() => {
    localStorage.setItem(PROJECT_ASSESSMENTS_STORAGE_KEY, JSON.stringify(projectAssessments));
  }, [projectAssessments]);

  const sortedRisks = useMemo(
    () => [...risks].sort((first, second) => second.score - first.score),
    [risks],
  );

  const sortedProjectAssessments = useMemo(
    () =>
      [...projectAssessments].sort(
        (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
      ),
    [projectAssessments],
  );

  const topRisks = sortedRisks.slice(0, 3);
  const levelCounts = useMemo(() => getLevelCounts(risks), [risks]);

  const isRiskCalculationReady = isAssessmentCalculationReady(form);
  const liveCalculation = isRiskCalculationReady
    ? calculateRisk(form)
    : INCOMPLETE_PROJECT_CALCULATION;
  const isProjectCalculationReady = isProjectRiskCalculationReady(projectAssessmentForm);
  const projectLiveCalculation = isProjectCalculationReady
    ? calculateRisk(projectAssessmentForm)
    : INCOMPLETE_PROJECT_CALCULATION;
  const projectDecision = isProjectCalculationReady
    ? getProjectDecision(projectLiveCalculation.score)
    : "غير محدد";
  const projectRecommendations = getProjectRecommendations(projectAssessmentForm);
  const editingRiskCalculation =
    editingRiskForm && isAssessmentCalculationReady(editingRiskForm)
      ? calculateRisk(editingRiskForm)
      : INCOMPLETE_PROJECT_CALCULATION;
  const editingProjectCalculation =
    editingProjectForm && isProjectRiskCalculationReady(editingProjectForm)
      ? calculateRisk(editingProjectForm)
      : INCOMPLETE_PROJECT_CALCULATION;
  const editingProjectDecision =
    editingProjectForm && isProjectRiskCalculationReady(editingProjectForm)
      ? getProjectDecision(editingProjectCalculation.score)
      : "غير محدد";
  const editingProjectRecommendations = editingProjectForm
    ? getProjectRecommendations(editingProjectForm)
    : [];

  const updateRiskFormState = (setter, field, value) => {
    setter((current) => {
      const nextValue = RISK_SCALE_FIELDS.includes(field)
        ? Number(value)
        : value;
      const nextForm = {
        ...current,
        [field]: nextValue,
      };

      if (field === "treatmentPlan" && value !== CUSTOM_TREATMENT_OPTION) {
        nextForm.customTreatmentPlan = "";
      }

      return nextForm;
    });
  };

  const updateForm = (field, value) => {
    updateRiskFormState(setForm, field, value);
  };

  const updateEditingRiskForm = (field, value) => {
    updateRiskFormState(setEditingRiskForm, field, value);
  };

  const addRisk = (event) => {
    event.preventDefault();

    if (!isAssessmentCalculationReady(form)) {
      window.alert(t("يرجى اختيار الاحتمالية وأثر السرية والسلامة والتوفر قبل إضافة الخطر."));
      return;
    }

    const resolvedTreatmentPlan =
      form.treatmentPlan === CUSTOM_TREATMENT_OPTION
        ? form.customTreatmentPlan.trim()
        : form.treatmentPlan;

    if (form.treatmentPlan === CUSTOM_TREATMENT_OPTION && !resolvedTreatmentPlan) {
      window.alert(t("يرجى كتابة خطة المعالجة المخصصة."));
      return;
    }

    setRisks((current) => [
      normalizeRisk({
        ...form,
        treatmentPlan: resolvedTreatmentPlan,
        customTreatmentPlan: "",
        id: crypto.randomUUID(),
      }),
      ...current,
    ]);
    setForm(emptyForm);
    setCurrentPage("dashboard");
  };

  const updateProjectFormState = (setter, field, value) => {
    setter((current) => ({
      ...current,
      [field]: RISK_SCALE_FIELDS.includes(field)
        ? Number(value)
        : value,
    }));
  };

  const updateProjectAssessmentForm = (field, value) => {
    setProjectValidationMessage("");
    updateProjectFormState(setProjectAssessmentForm, field, value);
  };

  const updateEditingProjectForm = (field, value) => {
    setEditingProjectValidationMessage("");
    updateProjectFormState(setEditingProjectForm, field, value);
  };

  const saveProjectAssessment = (event) => {
    event.preventDefault();

    if (!areRequiredProjectSelectsComplete(projectAssessmentForm)) {
      setProjectValidationMessage("يرجى تعبئة جميع الحقول المطلوبة قبل حفظ التقييم");
      return;
    }

    const customRequirements = projectAssessmentForm.customRequirements.trim();
    const requirements = [
      ...projectRecommendations.map((recommendation) => recommendation.name),
      customRequirements,
    ].filter(Boolean);

    setProjectAssessments((current) => [
      normalizeProjectAssessment({
        ...projectAssessmentForm,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        customRequirements,
        suggestedRequirements: projectRecommendations,
        requirements,
        decision: projectDecision,
      }),
      ...current,
    ]);
    setProjectAssessmentForm(emptyProjectAssessmentForm);
    setProjectValidationMessage("");
    setCurrentPage("dashboard");
  };

  const startRiskEditing = (riskId) => {
    const risk = risks.find((item) => item.id === riskId);
    if (!risk) return;

    setEditingRiskId(riskId);
    setEditingRiskForm(riskToFormValues(risk));
  };

  const closeRiskEditing = () => {
    setEditingRiskId(null);
    setEditingRiskForm(null);
  };

  const saveEditedRisk = (event) => {
    event.preventDefault();
    if (!editingRiskForm || !editingRiskId) return;

    if (!isAssessmentCalculationReady(editingRiskForm)) {
      window.alert(t("يرجى اختيار الاحتمالية وأثر السرية والسلامة والتوفر قبل إضافة الخطر."));
      return;
    }

    const resolvedTreatmentPlan =
      editingRiskForm.treatmentPlan === CUSTOM_TREATMENT_OPTION
        ? editingRiskForm.customTreatmentPlan.trim()
        : editingRiskForm.treatmentPlan;

    if (
      editingRiskForm.treatmentPlan === CUSTOM_TREATMENT_OPTION &&
      !resolvedTreatmentPlan
    ) {
      window.alert(t("يرجى كتابة خطة المعالجة المخصصة."));
      return;
    }

    setRisks((current) =>
      current.map((risk) =>
        risk.id === editingRiskId
          ? normalizeRisk({
              ...editingRiskForm,
              id: editingRiskId,
              treatmentPlan: resolvedTreatmentPlan,
              customTreatmentPlan: "",
            })
          : risk,
      ),
    );
    closeRiskEditing();
  };

  const startProjectEditing = (assessmentId) => {
    const assessment = projectAssessments.find((item) => item.id === assessmentId);
    if (!assessment) return;

    setEditingProjectId(assessmentId);
    setEditingProjectForm(projectToFormValues(assessment));
    setEditingProjectValidationMessage("");
  };

  const closeProjectEditing = () => {
    setEditingProjectId(null);
    setEditingProjectForm(null);
    setEditingProjectValidationMessage("");
  };

  const saveEditedProjectAssessment = (event) => {
    event.preventDefault();
    if (!editingProjectForm || !editingProjectId) return;

    if (!areRequiredProjectSelectsComplete(editingProjectForm)) {
      setEditingProjectValidationMessage(
        "يرجى تعبئة جميع الحقول المطلوبة قبل حفظ التقييم",
      );
      return;
    }

    const existingAssessment = projectAssessments.find(
      (assessment) => assessment.id === editingProjectId,
    );
    if (!existingAssessment) return;

    const customRequirements = editingProjectForm.customRequirements.trim();
    const requirements = [
      ...editingProjectRecommendations.map((recommendation) => recommendation.name),
      customRequirements,
    ].filter(Boolean);

    setProjectAssessments((current) =>
      current.map((assessment) =>
        assessment.id === editingProjectId
          ? normalizeProjectAssessment({
              ...editingProjectForm,
              id: editingProjectId,
              createdAt: existingAssessment.createdAt,
              customRequirements,
              suggestedRequirements: editingProjectRecommendations,
              requirements,
              decision: editingProjectDecision,
            })
          : assessment,
      ),
    );
    closeProjectEditing();
  };

  const requestRiskDeletion = (riskId) => {
    const risk = risks.find((item) => item.id === riskId);
    if (!risk) return;

    setDeleteRequest({
      type: "risk",
      id: riskId,
      itemName: risk.name,
    });
  };

  const requestProjectAssessmentDeletion = (assessmentId) => {
    const assessment = projectAssessments.find((item) => item.id === assessmentId);
    if (!assessment) return;

    setDeleteRequest({
      type: "projectAssessment",
      id: assessmentId,
      itemName: assessment.projectName,
    });
  };

  const confirmDeletion = () => {
    if (!deleteRequest) return;

    if (deleteRequest.type === "risk") {
      setRisks((current) => current.filter((risk) => risk.id !== deleteRequest.id));
    } else {
      setProjectAssessments((current) =>
        current.filter((project) => project.id !== deleteRequest.id),
      );
    }

    setDeleteRequest(null);
  };

  const renderCurrentPage = () => {
    if (currentPage === "add") {
      return (
        <AddRiskPage
          form={form}
          liveCalculation={liveCalculation}
          onUpdateField={updateForm}
          onSubmit={addRisk}
        />
      );
    }

    if (currentPage === "project") {
      return (
        <ProjectAssessmentPage
          form={projectAssessmentForm}
          liveCalculation={projectLiveCalculation}
          decision={projectDecision}
          recommendations={projectRecommendations}
          validationMessage={projectValidationMessage}
          onUpdateField={updateProjectAssessmentForm}
          onSubmit={saveProjectAssessment}
        />
      );
    }

    return (
      <DashboardPage
        risks={risks}
        sortedRisks={sortedRisks}
        topRisks={topRisks}
        levelCounts={levelCounts}
        projectAssessments={sortedProjectAssessments}
        onDeleteRisk={requestRiskDeletion}
        onEditRisk={startRiskEditing}
        onDeleteAssessment={requestProjectAssessmentDeletion}
        onEditAssessment={startProjectEditing}
      />
    );
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <main className="crm-dashboard" dir={language === "ar" ? "rtl" : "ltr"}>
        <TopNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderCurrentPage()}
        <DeleteConfirmationDialog
          request={deleteRequest}
          onCancel={() => setDeleteRequest(null)}
          onConfirm={confirmDeletion}
        />
        {editingRiskForm && (
          <EditModal title="تعديل الخطر" onCancel={closeRiskEditing}>
            <div className="crm-edit-modal-layout">
              <AssessmentCurrentSummary
                liveCalculation={editingRiskCalculation}
                selectedValues={editingRiskForm}
              />
              <RiskForm
                form={editingRiskForm}
                liveCalculation={editingRiskCalculation}
                onUpdateField={updateEditingRiskForm}
                onSubmit={saveEditedRisk}
                submitLabel="حفظ التعديلات"
              />
            </div>
          </EditModal>
        )}
        {editingProjectForm && (
          <EditModal title="تعديل تقييم المشروع" onCancel={closeProjectEditing}>
            <div className="crm-edit-modal-layout">
              <AssessmentCurrentSummary
                liveCalculation={editingProjectCalculation}
                selectedValues={editingProjectForm}
              />
              <ProjectAssessmentForm
                form={editingProjectForm}
                liveCalculation={editingProjectCalculation}
                decision={editingProjectDecision}
                recommendations={editingProjectRecommendations}
                validationMessage={editingProjectValidationMessage}
                onUpdateField={updateEditingProjectForm}
                onSubmit={saveEditedProjectAssessment}
                submitLabel="حفظ التعديلات"
              />
            </div>
          </EditModal>
        )}
      </main>
    </LanguageContext.Provider>
  );
}
