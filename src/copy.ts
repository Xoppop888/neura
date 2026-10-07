export type Lang = 'en' | 'ru' | 'zh';
// TODO: replace with your real contacts
export const CONTACT = { email: 'hello@neura.studio', telegram: 'https://t.me/neura_studio', telegramLabel: '@neura_studio' };
export const BINHAI_URL = 'https://binhaiauto.ru/';
type Copy = {
  nav: string[]; title: string[]; lead: string; cta: string; more: string; marquee: string[];
  workTitle: string; workIntro: string; real: string; concept: string; open: string;
  binhai: [string, string]; orbit: [string, string]; atlas: [string, string];
  statement: string; facts: [string, string][];
  processTitle: string; steps: [string, string][];
  contactTitle: string[]; contactBody: string; name: string; how: string; msg: string; send: string; sent: string;
  footer: string; seoTitle: string; seoDesc: string;
};
export const T: Record<Lang, Copy> = {
  en: {
    nav: ['Work', 'Studio', 'Process', 'Contact'],
    title: ['Digital products', 'with a point', 'of view.'],
    lead: 'We design and build identities, websites and intelligent systems for companies that want to be remembered.',
    cta: 'Start a conversation', more: 'See our work',
    marquee: ['Digital identities', 'Product websites', 'Intelligent interfaces', 'Automation', 'AI agents'],
    workTitle: 'Selected work', workIntro: 'A short selection. Each project is built around one clear idea.',
    real: 'Live project', concept: 'Concept', open: 'Open the site',
    binhai: ['BINHAI AUTO', 'Cars from China, delivered across Russia. You see the real car, a clear price and every step of the deal.'],
    orbit: ['ORBIT', 'A product experience composed around clarity, rhythm and trust.'],
    atlas: ['ATLAS', 'A shared language for the knowledge already inside a business.'],
    statement: 'We bring strategy, design and code into one process. AI lets us explore further and move faster. Taste decides what stays.',
    facts: [['Design first', 'Every build starts from the interface, never from a template.'], ['AI-assisted', 'Faster exploration, with human judgment on every decision.'], ['Independent', 'A small team and a direct conversation from day one.']],
    processTitle: 'How we work',
    steps: [['Listen', 'We learn your product, your market and what makes you different.'], ['Design', 'Identity and interface take shape in a few focused rounds.'], ['Build', 'Fast, accessible code with motion that supports the story.'], ['Launch', 'We ship, measure and keep refining after release.']],
    contactTitle: ['Have a product', 'in mind?'], contactBody: 'Tell us what you are building. You will get a point of view back, not a sales script.',
    name: 'Your name', how: 'Email or Telegram', msg: 'A few words about the project', send: 'Send message', sent: 'Your email app is opening with the message ready to send.',
    footer: 'Independent digital studio', seoTitle: 'NEURA — AI-first digital studio', seoDesc: 'NEURA designs identities, websites and intelligent systems for ambitious companies.'
  },
  ru: {
    nav: ['Работы', 'Студия', 'Процесс', 'Контакты'],
    title: ['Цифровые продукты', 'с собственным', 'характером.'],
    lead: 'Мы создаём айдентику, сайты и интеллектуальные системы для компаний, которые хотят запомниться.',
    cta: 'Начать разговор', more: 'Смотреть работы',
    marquee: ['Айдентика', 'Продуктовые сайты', 'Интеллектуальные интерфейсы', 'Автоматизация', 'AI-агенты'],
    workTitle: 'Избранные работы', workIntro: 'Короткая подборка. Каждый проект построен вокруг одной ясной идеи.',
    real: 'Действующий проект', concept: 'Концепт', open: 'Открыть сайт',
    binhai: ['BINHAI AUTO', 'Автомобили из Китая с доставкой по России. Вы видите реальную машину, понятную стоимость и весь путь сделки.'],
    orbit: ['ORBIT', 'Продуктовый опыт, построенный вокруг ясности, ритма и доверия.'],
    atlas: ['ATLAS', 'Общий язык для знаний, которые уже есть внутри бизнеса.'],
    statement: 'Мы соединяем стратегию, дизайн и код в одном процессе. AI помогает исследовать дальше и двигаться быстрее. Вкус решает, что останется.',
    facts: [['Сначала дизайн', 'Каждый проект начинается с интерфейса, а не с шаблона.'], ['С помощью AI', 'Быстрее исследуем, а решения принимает человек.'], ['Независимые', 'Небольшая команда и прямой разговор с первого дня.']],
    processTitle: 'Как мы работаем',
    steps: [['Слушаем', 'Разбираемся в вашем продукте, рынке и в том, чем вы отличаетесь.'], ['Проектируем', 'Айдентика и интерфейс складываются за несколько точных итераций.'], ['Собираем', 'Быстрый, доступный код и анимация, которая поддерживает историю.'], ['Запускаем', 'Выпускаем, измеряем и продолжаем улучшать после релиза.']],
    contactTitle: ['Есть продукт', 'на примете?'], contactBody: 'Расскажите, что вы создаёте. В ответ вы получите точку зрения, а не скрипт продаж.',
    name: 'Ваше имя', how: 'Email или Telegram', msg: 'Несколько слов о проекте', send: 'Отправить сообщение', sent: 'Откроется почтовое приложение с готовым письмом.',
    footer: 'Независимая digital-студия', seoTitle: 'NEURA — независимая digital-студия', seoDesc: 'NEURA создаёт айдентику, сайты и интеллектуальные системы для амбициозных компаний.'
  },
  zh: {
    nav: ['作品', '工作室', '流程', '联系'],
    title: ['有态度的', '数字产品。'],
    lead: '我们为希望被记住的企业，打造品牌形象、网站与智能系统。',
    cta: '开始对话', more: '查看作品',
    marquee: ['品牌形象', '产品官网', '智能交互', '自动化', 'AI 智能体'],
    workTitle: '精选作品', workIntro: '少而精。每个项目都围绕一个清晰的想法展开。',
    real: '上线项目', concept: '概念方案', open: '访问网站',
    binhai: ['BINHAI AUTO', '中国汽车，配送至俄罗斯全境。看得到实车，价格透明，交易全程清晰。'],
    orbit: ['ORBIT', '围绕清晰、节奏与信任构建的产品体验。'],
    atlas: ['ATLAS', '让企业内部已有的知识，拥有共同的语言。'],
    statement: '我们将策略、设计与代码融为一个流程。AI 让我们走得更远、更快，而品味决定最终留下什么。',
    facts: [['设计先行', '每个项目都从界面出发，而不是从模板出发。'], ['AI 辅助', '探索更快，每个决定仍由人来把关。'], ['独立工作室', '小团队，从第一天起直接沟通。']],
    processTitle: '合作流程',
    steps: [['倾听', '了解你的产品、市场，以及你与众不同之处。'], ['设计', '经过几轮聚焦的打磨，品牌与界面逐渐成形。'], ['开发', '快速、易用的代码，动效服务于叙事。'], ['上线', '发布、监测，并在上线后持续优化。']],
    contactTitle: ['有一个产品', '想法吗？'], contactBody: '告诉我们你正在创造什么。我们回应的是判断，而不是销售话术。',
    name: '你的姓名', how: '邮箱或 Telegram', msg: '简单介绍一下你的项目', send: '发送消息', sent: '正在打开邮件应用，内容已为你填好。',
    footer: '独立数字工作室', seoTitle: 'NEURA — 独立数字工作室', seoDesc: 'NEURA 为有远见的企业打造品牌形象、网站与智能系统。'
  }
};
