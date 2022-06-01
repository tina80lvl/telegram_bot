const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const COMMANDS = [
  {
    command: "program",
    description: "Show conference program",
  },
  {
    command: "map",
    description: "Show map of premises",
  },
  {
    command: "speakers",
    description: "List of speakers",
  },
  {
    command: "partners",
    description: "List of partners",
  },
  {
    command: "ask",
    description: "FAQ",
  },
  {
    command: "now",
    description: "Current events",
  },
  {
    command: "add",
    description: "Add",
  },
  // {
  //   command: "networking",
  //   description: "Хочу нетворкать",
  // },
  {
    command: "help",
    description: "Show help/main menu",
  },
];

module.exports = COMMANDS;

const getHelp = () => {
  let helpText = `*Here's how I can help:*\n`;
  helpText += COMMANDS.map((command) => `*/${command.command}* ${command.description}`).join(`\n`);
  return helpText;
};

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands(COMMANDS);

bot.start((ctx) =>
  ctx.replyWithMarkdown(
    `Hi👋 \n\n\
I'm a chatbot *Barcelona IT Conf* and I'm here to help you spend time on \
conferences with benefit and pleasure.\n\n\
I will help you keep track of the schedule, find out information about speakers and partners,\
receive notifications from the organizers and ask them questions. \n\n\
Use the convenient menu to quickly find the information you need👇\n\n` + getHelp()
  )
);
//А также вы можете перейти в [чат](https://t.me/+m6OxObbnALxlYTBi) участников и принять участие в нетворке.\n\n\

bot.help((ctx) =>
  ctx.reply(
    `Hi, ${ctx.message.from.username}.\nHere's how I can help:\n\n/program - conference program\n/stop - stop\n/help - Show help/main menu`
  )
);
bot.command("help", (ctx) => {
  return ctx.replyWithMarkdown(getHelp());
});

bot.command("map", (ctx) => {
  ctx.replyWithPhoto("d5du5oueb289g7p96md2.apigw.yandexcloud.net/map_rect");
  ctx.replyWithPhoto("d5du5oueb289g7p96md2.apigw.yandexcloud.net/map_cov");
  ctx.replyWithPhoto("d5du5oueb289g7p96md2.apigw.yandexcloud.net/map_359");
});

bot.command("ask", (ctx) => {
  ctx.replyWithMarkdown(
    "Нам часто задают эти вопросы, отвечаем!\n\n\
⚡️*Почему мне нужно посетить конференцию?*\n\
Конференции - это неотъемлемая часть комьюнити в IT сфере. На IT Conf \
International Women’s Day вы сможете послушать выступления топовых спикеров, \
принять участие в воркшопах и мастер-классах, завести полезные знакомства и \
зарядиться крутой атмосферой. А кто-то сможет найти единомышленников для дальнейшего \
сотрудничества и совместных проектов 🙏🏻\n\n\
⚡️*Для кого эта конференция?*\n\
Для всех, кто только начинает погружаться в IT-сферу или уже построил в ней \
карьеру и хочет узнать для себя что-то новое и полезное, пообщаться с \
единомышленниками и просто круто провести время 😎\n\n\
⚡️*А участие для всех бесплатное?*\n\
Да, участие совершенно бесплатно для всех.\n\n\
⚡️*Обязательно ли регистрация на воркшопы и мастер-классы?*\n\
Поскольку места на некоторые активности ограничены, мы просим вас заранее \
зарегистрироваться на мастер-классы и воркшопы, которые вам интересны☝🏻\n\n\
⚡️*Как насчет нетворкинга? Смогу ли я пообщаться с интересными людьми?*\n\
На IT Conf IWD создан максимум условий для комфортного общения. Задавайте свои вопросы участникам и спикерам - на конференции все открыты для диалога. \
Вы сможете завести новые деловые связи или просто дружеские знакомства всего за два дня🙌🏻\n\n\
⚡️*Где состоится конференция?* \n\
15 апреля мероприятие пройдет в очном формате по адресу: Университет ИТМО, \
Кронверкский проспект, 49. Будь внимателен, вход осуществляется со стороны \
Сытнинской улицы 📍\n\n\
⚡️*Если я не смогу прийти очно в первый день конференции, смогу ли я подключиться \
онлайн во второй?*\n\
Да! Вы можете участвовать в конференции в любой из дней, но лучше посетить оба, \
чтобы ничего не пропустить 😇 \n\n\
⚡️ *А кофе-брейк будет?* \n\
Будет, и даже два. Сытный перекус, вкусный кофе и отличное время, чтобы поделиться \
впечатлениями с единомышленниками, тебе обеспечены 👌🏻 \n\n\
⚡️ *Я не из ИТМО. Как мне пройти на территорию университета и какие документы для \
этого нужны?* \n\
Достаточно просто зарегистрироваться по ссылке и в день конференции подойти к \
стойке регистрации на входе. Не забудь взять с собой документы, удостоверяющие \
личность ❗️\n\n\
🙋‍♀️🙋 Не нашел подходящего ответа? *Задай свой вопрос нам! @itconf_itmo*"
  );
});

bot.action("back", (ctx) => {
  ctx.reply("Выберите формат отображения:", {
    reply_markup: {
      inline_keyboard: program_display_type_keyboard,
    },
  });
});
const date = new Date();
const a = [
  {
    date: 23,
    startConference: "10:00",
    finishConference: "12:00",
    content: "Front-end development",
  },
  {
    date: 24,
    startConference: "12:00",
    finishConference: "14:00",
    content: "Back-end development",
  },
  {
    date: 25,
    startConference: "14:00",
    finishConference: "16:00",
    content: "soft-skills",
  },
];

const aaa = (dta) => {
  return dta.filter((el) => {
    if (el.date === date.getDate()) {
      return el.date;
    }
  });
  // dta.filter((el) => {
  //   return el.date === date.getDate;
  //   // ctx.replyWithMarkdown(`${el.startConference} \n\ ${el.content}`);
  // });
};
bot.command("now", (ctx) => {
  const ab = aaa(a);
  ctx.replyWithMarkdown(
    ab.map((el) => {
      return `${el.startConference} ${el.content}`;
    })
  );
});

const partners_array = [
  {
    group: "Mission",
    name: "ETHBarcelona",
    type: "Main",
    title: "Explore Blockchain Technology can help build a sustainable world full of Human Potential.",
    subtitle: "Learn from the best in the crypto scene, and put those networking skills to use.",
    description:
      "ETHBarcelona brings together 4000 makers, developers, and blockchain enthusiasts for a three-day conference to focus on education, innovation, art, and creating positive social impact.",
    url: "https://ethbarcelona.com/",
  },
  {
    group: "Launch Partners",
    name: "DoinGud",
    type: "NFT Platform",
    title: "DoinGud is an NFT ecosystem focused on inspiring creativity and positive social impact.",
    subtitle:
      "We pride ourselves on accessibility and sustainability, providing next-gen Web3 tools to empower our community to create, curate, collaborate, and connect with one another in the digital space.",
    description:
      "We are inviting creators from around the world to be featured in our next exhibitions. We aim to empower our community of creators, curators, and collectors to use their passion to create meaningful change in the world around them — and have fun doing it!",
    url: "https://doingud.com/",
  },
  {
    group: "Launch Partners",
    name: "FLOC",
    type: "NFT Creative Agency",
    title:
      "FLOC is the first to provide design strategy leadership and design services via NFT drops to crypto start-ups.",
    subtitle:
      "FLOC is a professional freelancers decentralised collective teaming up to deliver the design boost needed for crypto start-ups.",
    description:
      "FLOC is a professional freelancers decentralised collective teaming up to deliver the design boost needed for crypto start-ups.",
    url: "https://wearefloc.com/",
  },
  {
    group: "Launch Partners",
    name: "Polis Paral·lela Barcelona",
    type: "",
    title: "Join a tribe in Barcelona that cares about freedom, social good, decentralization.",
    subtitle: "We believe technology should free humanity, not enslave it. ",
    description: "",
    url: "https://twitter.com/PolisParallela",
  },
  {
    group: "Launch Partners",
    name: "Shrine House",
    type: "Decentralized record label and artist tooling platform.",
    title: "The world's first decentralized community governed record label.",
    subtitle: "We use decentralized lending markets to reimagine the concept of a record deal.",
    description: "We democratize power to all token holders by giving them ownership by operating as a DAO.",
    url: "https://shrine.house/",
  },
  {
    group: "Launch Partners",
    name: "Giant Cookie",
    type: "Creativity driven experiential agency",
    title: "Giant Cookie Creating new/ true/ meaningful content",
    subtitle: "We find the most authentic voice and unifying theme to build a story and connect with an audience.",
    description:
      "We are a network of creators, producers, thinkers, planners, designers, artists, makers, doers, with creative and production teams and partners all over Europe, Latin America and Asia.",
    url: "https://www.wildcookie.eu/",
  },
  {
    group: "Media Partners",
    name: "Be[in]crypto",
    type: "Media platform",
    title: "ETHBarcelona: la primera conferencia sobre Ethereum en España",
    subtitle:
      "¡Estamos más que emocionados de invitarte a ETHBarcelona, la primera conferencia de Ethereum que tendrá lugar en España, Barcelona, ​​del 6 al 8 de julio!",
    description:
      "ETHBarcelona tendrá lugar del 6 al 8 de julio en el emblemático Centro de Convenciones Internacionales de Barcelona – CCIB. Este evento será la primera conferencia sobre Ethereum que se celebre en España y está llamada a convertirse en un evento mundial por el enfoque que tiene sobre el impacto social y Web3.",
    url: "https://es.beincrypto.com/ethbarcelona-la-primera-conferencia-sobre-ethereum-en-espana/",
  },
  {
    group: "Media Partners",
    name: "Eclectic Method",
    type: "Video Remix & Musical Animations NFTs",
    title: "Video samples combined with music.",
    subtitle:
      "I am Jonny Wilson (Eclectic Method) and I make remix videos or video music. I make music using video samples combined with my own music. ",
    description: "",
    url: "https://www.eclecticmethod.net/",
  },
  {
    group: "Media Partners",
    name: "DeFi Prime",
    type: "Finance Media platform",
    title: "DeFi and Open Finance",
    subtitle:
      "We want to shed some light on how DeFi products build and how the ecosystem evolves over time. Our blog features interviews with DeFi projects, analytics, and important news.",
    description:
      "Decentralized Finance (DeFi) is the movement that leverages decentralized networks to transform old financial products into trustless and transparent protocols that run without intermediaries. We are the largest and oldest media outlet, focused solely on DeFi and Open Finance space. ",
    url: "https://defiprime.com/",
  },
  // {
  //   group: 'Mission',
  //   name: '',
  //   type: '',
  //   title: '',
  //   subtitle: '',
  //   description: '',
  //   url: ''
  // },
];

bot.command("partners", (ctx) => {
  partners_array.map((e) => {
    ctx.replyWithMarkdown(
      `*${e.name}*\n\
${e.title}\
${!e.description ? e.subtitle : e.description}\n\
${e.url}`
    );
  });
});

// Конфиг клавиатуры
const speakers_by_track_keyboard = [
  [
    {
      text: "⚙️Backend", // текст на кнопке
      callback_data: "speakers_by_track_backend", // данные для обработчика событий
    },
    {
      text: "🖥Frontend",
      callback_data: "speakers_by_track_frontend",
    },
    {
      text: "🤖ML",
      callback_data: "speakers_by_track_ml",
    },
  ],
  [
    {
      text: "📱Mobile",
      callback_data: "speakers_by_track_mobile",
    },
    {
      text: "🤝Soft Skills",
      callback_data: "speakers_by_track_soft",
    },
  ],
  [
    {
      text: "🚀Startup",
      callback_data: "speakers_by_track_startup",
    },
    {
      text: "💼Career",
      callback_data: "speakers_by_track_career",
    },
  ],
];
bot.command("speakers", (ctx) => {
  ctx.reply("Выберите трек:", {
    reply_markup: {
      inline_keyboard: speakers_by_track_keyboard,
    },
  });
});

bot.action("speakers_by_track_backend", (ctx) => {
  ctx.replyWithMarkdown(
    "*⚙️Backend*\n\n\
🔹*Маргарита Андриасян*\n\
Ведущий разработчик мобильного приложения Simple Home, ЛИИС. Более 2 лет пишу на \
React Native. \n\
Работаю над мобильным приложением по управлению умным домом. В свободное время \
изучаю Kotlin, немецкий и занимаюсь йогой.\n\
[https://www.linkedin.com/in/margarita-andriasyan-a18401126](Linkedin) \n\n\
🔹*Полина Овсянникова*\n\
Аспирант, Университет Аалто\n\
Моя движущая сила – любопытство к миру и своим возможностям в нём. Учусь в \
Университете Аалто и пишу диссертацию о том, \
как сделать разработку атомных реакторов user-friendly. Нежно люблю вертикальные \
фермы.\n[https://twitter.com/shakeanapple_](Twitter) \n\n\
🔹*Владимир Максимук*\n\
Разработчик биллинга, Selectel.\n\
Начинал как fullstack-разработчик и системный программист, потом погрузился в \
мир кровавого out source-а как backend developer. Сейчас тружусь на благо \
биллинга Selectel. Весь мой путь меня \
преследовал Python и Golang.\n\n\
🔹*Алексей Лубенец*\n\
Старший разработчик, Yota\n\
В IT c 2016 года. C 2019 занимаю позицию Java разработчика в отделе управления \
продуктами Yota. Переход в разработку был моим лучшим решением. До этого \
занимался эксплуатацией и внедрением различных IT систем.\n\n\
🔹*Сергей Владимиров*  \n\
Ведущий разработчик, Яндекс \n\
В IT более 25 лет. От backend-а до frontend-а на самых разных языках и платформах. \
Также преподаю курс по криптографии и защите информации."
  );
});

bot.action("speakers_by_track_frontend", (ctx) => {
  ctx.replyWithMarkdown(
    "*🖥Frontend*\n\n\
🔹*Лена Райан*\n\
Frontend-разработчица, X5 Group\n\
Делаю фронтенд, выступаю с докладами, пытаюсь совместить кучу проектов и не выгореть. Борюсь за вёрстку кнопок кнопками. \
Амбассадор Women Techmakers. Помогаю с проведением Woman Developer Academy. Люблю обнимашки.\n\
@metalwebdev\n\n\
🔹*Валерия Курмак*\n\
Руководитель направления Инклюзия в Яндексе\n\
Член Strategic Leader in Accessibility Initiative в IAAP, автор гайдлайна по цифровой доступности Сбербанка, автор \
образовательного курса по цифровой доступности (accessibilityunity.com), веду телеграмм-канал об инклюзивном дизайне  «Не исключение».\n\
@neiskluchenie"
  );
});

bot.action("speakers_by_track_ml", (ctx) => {
  ctx.replyWithMarkdown(
    "*🤖ML*\n\n\
🔹*Ксения Бурая*\n\
Аспирантка ИТМО, ML Engineer Yandex.Maps\n\
Учусь в ИТМО и пишу диссертацию о том, как сделать генерацию макияжа на фото. А ещё придумываю, как улучшать качество извлечения \
полезной информации из отзывов в Яндекс.Картах.\n\n\
🔹*Дмитрий Перец*\n\
Архитектор машинного обучения, Yota\n\
За семилетний опыт работы успел поучаствовать в различных проектах: от научных \
исследований по работе мозга до масштабного проекта по цифровой трансформации \
«Газпром Нефть». А ещё я преподаю в СПбПУ им. Петра Великого."
  );
});

bot.action("speakers_by_track_mobile", (ctx) => {
  ctx.replyWithMarkdown(
    "*📱Mobile*\n\n\
🔹*Екатерина Батеева*\n\
iOS разработчик, Авито\n\
В IT я работаю уже 10 лет. Раньше запускала курсы по тестированию и разработке и была лектором, а сейчас занимаюсь обучением как \
начинающих, так и опытных разработчиков. Фокусируюсь на IT-менторстве.\n\n\
🔹*Алиса Цветкова*\n\
Основательница школы программирования для девушек ITGIRLS\n\
18 лет в IT, ex-senior frontend в Opera, сейчас развиваю свой стартап. Топлю за женщин в разработке – основала школу программирования \
для девушек ITGIRLS. Веду канал о программировании человеческим языком.\n\
@aliceitgirl\n\n\
🔹 *​​Редникина Дарья*  \n\
iOS-разработчик, Яндекс Маркет  \n\
Работаю над iOS-приложением Яндекс Маркет уже год. Занимаюсь улучшением качества \
кода, имею большой опыт в написании UI-тестов. А в свободное время учу немецкий и пью кофе."
  );
});

bot.action("speakers_by_track_soft", (ctx) => {
  ctx.replyWithMarkdown(
    "*🤝Soft Skills*\n\n\
🔹*Анастасия Заречнева*\n\
QA engineer, Semrush\n\
Я соорганизаторка сообщества QA sisters, комьюнити лидер Women in tech Russia в Питере, член программного комитета Podlodka QA Crew. \
Люблю оптимизировать мир и с интересом погружаюсь в процессы и технологии.\n\n\
🔹*Ксения Черепенина*\n\
Начальник центра подбора, адаптации и оценки персонала, Nexign\n\
В сфере рекрутинга уже 10 лет. Долгое время работала в подборе персонала крупного частного банка, а в 2017 пришла в Nexign, где отвечаю \
за подбор, адаптацию и оценку персонала.\n\n\
🔹*Марина Казанцева*\n\
Управляющий партнер, тренинговое агентство K&D Training\n\
Мое призвание – менять себя и мир вокруг, сохраняя при этом баланс и радость. Для того, чтобы это реализовать, я управляю тренинговым \
агентством K&D Training, преподаю soft skills в ИТМО и создаю игры в мастерской игр ИГЛУ.\n\n\
🔹*Елизавета Некрасова*\n\
Хореограф, Университет ИТМО\n\
По первому образованию я — математик, по второму — хореограф. Смотрю на мир через призму красоты и движения, стараясь сохранять пытливость \
естественнонаучного мышления.\n\n\
🔹*Антонина Пучковская *\n\
Кандидат культурологии, руководитель М-платформы Искусства и науки, Университет ИТМО\n\
Руковожу Международным центром Цифровых гуманитарных исследований Университета ИТМО, где вместе с коллегами креативим проекты и магистерскую \
программу на стыке гуманитарных и компьютерных наук.\n\n\
🔹*Виктория Раксина*\n\
Ведущий менеджер по продуктовому маркетингу, Selectel\n\
Я тимлид команды продуктового маркетинга в Selectel. Работаю со сложными техническими и инфраструктурными продуктами, а также занимаюсь их \
продвижением и продажей.\n\n\
🔹*Юлия Коблова*\n\
QA Director, Банк «Санкт-Петербург»\n\
В душе я «инженер-испытатель» в мире цифровых продуктов. В жизни – развиваю цифровой Банк «Санкт-Петербург», создаю успешные QA команды, \
влияю на качество наших сервисов и обеспечиваю их надежность."
  );
});

bot.action("speakers_by_track_startup", (ctx) => {
  // ctx.replyWithMarkdown('reply');
  ctx.replyWithMarkdown(
    "*🚀Startup*\n\n\
🔹*Александр Головатый*\n\
CEO, founder, WeGoTrip\n\
Свой первый бизнес я начал в 17 лет. Являюсь основателем WeGoTrip — маркетплейса \
аудиоэкскурсий с билетами в музеи. Имею опыт работы в сфере туризма и продаж \
более 5 лет.\n\n\
🔹*Татьяна Антипова*\n\
Проектный менеджер, АО «Технопарк Санкт-Петербурга», Бизнес-инкубатор Ингрия\n\
Я выпускница ИТМО, работаю с проектами на ранних стадиях, люблю стартапы и \
котиков. Проконсультирую по заявкам в Сколково и помогу в проработке продуктовых \
и инвестиционных презентаций.\n\n\
🔹*Юлия Корес*\n\
Предприниматель, CEO в Sovmestno\n\
Занимаюсь предпринимательством в IT уже 4 года, запустила 7 проектов. Сейчас \
работаю над социальными проектами в сфере EdTech и HRTech. Также являюсь автором \
системы управления жизнью как проектом. Написала книгу «Дизайн жизни».\n\n\
🔹*Мария Плоткина*\n\
CEO, Geek Teachers\n\
Создала стартап Geek Teachers, входящий в список HundrED, и запустила социальное \
движение Сменка. С командой проводим образовательные фестивали, ремонтируем \
школы и снимаем об этом шоу. В 2020 выиграла премию _Young Female Entrepreneur_. \n[@geek_teachers](Telegram)"
  );
});

bot.action("speakers_by_track_career", (ctx) => {
  ctx.replyWithMarkdown(
    "*💼Career*\n\n\
🔹*Наталья Исаева* \n\
Vice President в международном банке \n\
Работала руководителем проектов и IT-консультантом в компаниях из Fortune 500. \
Победила в конкурсе Лидеры России 2020 и сейчас возглавляю направление Developer \
Relations в международном банке.\n\n\
🔹*Олег Мохов* \n\
Руководитель разработки подразделения HR-технологий, Яндекс \n\
В своём рассказе я постараюсь развеять мифы относительно однотипности \
собеседований, огромного количества секций по алгоритмам, сложности задач \
и многие другие.\n\n\
🔹*Арина Буздалова* \n\
Старший научный сотрудник, Университет ИТМО \n\
Я провожу исследования в области эволюционных вычислений и являюсь автором \
более 30 научных публикаций, индексируемых в Scopus. Состою в программных \
комитетах различных международных конференций.\n\n\
🔹*Дарья Яковлева* \n\
Co-founder, MetaLabs \n\
Ушла из VK, чтобы сделать стартап. Я хотела создать бренд одежды, но в итоге \
получился криптостартап. Вместе с командой мы разработали и продали NFT-коллекцию \
на блокчейне Algorand, а сейчас работаем над DEX-платформой.\n\n\
🔹*Наталья Глазкина* \n\
Software engineer, Google \n\
Я работаю в компании Google и живу в Лондоне чуть более двух лет. Моя команда \
занимается производительностью Google app - приложения, установленного практически \
на каждом Android смартфоне."
  );
});

// Конфиг клавиатуры
const program_display_type_keyboard = [
  [
    {
      text: "📊По треку", // текст на кнопке
      callback_data: "by_track", // данные для обработчика событий
    },
    {
      text: "📅По дате",
      callback_data: "by_date",
    },
  ],
];
bot.command("program", (ctx) => {
  ctx.reply("Выберите формат отображения:", {
    reply_markup: {
      inline_keyboard: program_display_type_keyboard,
    },
  });
});

// Конфиг клавиатуры
const program_by_track_keyboard = [
  [
    {
      text: "⚙️Backend", // текст на кнопке
      callback_data: "program_by_track_backend", // данные для обработчика событий
    },
    {
      text: "🖥Frontend",
      callback_data: "program_by_track_frontend",
    },
    {
      text: "🤖ML",
      callback_data: "program_by_track_ml",
    },
  ],
  [
    {
      text: "📱Mobile",
      callback_data: "program_by_track_mobile",
    },
    {
      text: "🤝Soft Skills",
      callback_data: "program_by_track_soft",
    },
  ],
  [
    {
      text: "🚀Startup",
      callback_data: "program_by_track_startup",
    },
    {
      text: "💼Career",
      callback_data: "program_by_track_career",
    },
  ],
  [
    {
      text: "↩️Вернуться к выбору",
      callback_data: "program_by_track_back",
    },
  ],
];
bot.action("by_track", (ctx) => {
  ctx.reply("Выберите трек:", {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: program_by_track_keyboard,
    },
  });
});

const events_program = {
  backend: [
    {
      date: "25",
      mounth: "Май",
      time: "12:20",
      eventsTitle: 'Сессия "Умный дом, как это работает?"',
      speaker: "Маргарита Андриасян, ЛИИС",
      room: "Конференц зал коворкинга",
    },
    {
      date: "25",
      mounth: "Май",
      time: "14:00",
      eventsTitle: 'Дискуссия "Битва языков"',
      speaker: "Владимир Максимук, Selectel и Сергей Владимиров, Яндекс",
      room: "Амфитеатр ректорского холла",
    },
    {
      date: "25",
      mounth: "Май",
      time: "14:50",
      eventsTitle: 'Сессия "Как стать middle разработчиком?"',
      speaker: "Алексей Лубенец, Yota",
      room: "VR-зона коворкинга",
    },
    {
      date: "26",
      mounth: "Май",
      time: "13:00",
      eventsTitle: 'Сессия "Программируем железо без С или жизнь в промышленной автоматике"',
      speaker: "Полина Овсянникова, Университет Аалто",
      room: "Online",
    },
  ],
};

bot.action("program_by_track_backend", (ctx) => {
  return (
    "backend" &&
    events_program.backend.map((e) => {
      ctx.replyWithMarkdown(
        `${e.date}-${e.mounth}:
  🔹${e.time} ${e.eventsTitle}
  🗣${e.speaker}
  📍${e.room}`
      );
    })
  );
});
bot.action("program_by_track_frontend", (ctx) => {
  ctx.replyWithMarkdown(
    "*🖥Frontend*\n\n\
*15 апреля:* \n\
🔹*12:20* Сессия “Vue + A11y = ?” \n\
🗣Лена Райан, X5 Group \n\
📍Амфитеатр ректорского холла \n\n\
*16 апреля:* \n\
🔹*11:30* Сессия “Интерфейс доступный для каждого” \n\
🗣Валерия Курмак, Яндекс \n\
📍Online "
  );
});
bot.action("program_by_track_ml", (ctx) => {
  ctx.replyWithMarkdown(
    '*🤖ML*\n\n\
*15 апреля:* \n\
🔹*11:30* Сессия "Цифровой макияж" \n\
🗣Ксения Бурая, Яндекс Карты \n\
📍Конференц зал коворкинга \n\n\
🔹*15:40* Сессия «Опасности "слепого" применения продвинутой аналитики» \n\
🗣Дмитрий Перец, Yota \n\
📍VR-зона коворкинга '
  );
});
bot.action("program_by_track_mobile", (ctx) => {
  ctx.replyWithMarkdown(
    '*📱Mobile*\n\n\
*15 апреля:* \n\
🔹*15:40* Сессия "Актуальные средства разработки под IOS” \n\
🗣Екатерина Батеева, Авито \n\
📍Амфитеатр ректорского холла \n\n\
*16 апреля:* \n\
🔹*11:00* Сессия "Flutter - перспективы и возможности" \n\
🗣Алиса Цветкова, школа программирования для девушек ITGIRLS \n\
📍Online \n\n\
🔹*13:40* Сессия “Эволюция UI-тестов в iOS-приложении Яндекс Маркета” \n\
🗣Дарья Редникина, iOS-разработчик, Яндекс Маркет \n\
📍Online'
  );
});
bot.action("program_by_track_soft", (ctx) => {
  ctx.replyWithMarkdown(
    '*🤝Soft Skills*\n\n\
*15 апреля:* \n\
🔹*11:30* Сессия "Нетворкинг в IT" \n\
🗣Анастасия Заречнева, Semrush \n\
📍Амфитеатр ректорского холла \n\n\
🔹*13:15* Мастер-класс «Диалог с телом» \n\
🗣Елизавета Некрасова, Университет ИТМО \n\
📍Аудитория 359 \n\n\
🔹*14:00* Мастер-класс «Диалог с телом» \n\
🗣Елизавета Некрасова, Университет ИТМО \n\
📍Аудитория 359 \n\n\
🔹*14:50* Дискуссия “Лидерство” \n\
🗣Светлана Маркова, Neoflex и Ксения Черепенина Nexign \n\
📍Амфитеатр ректорского холла \n\n\
🔹*14:50* Мастер-класс Work-Life balance (длительность 90 минут) \n\
🗣Марина Казанцева, тренинговое агентство K&D Training \n\
📍Конференц зал коворкинга. \n\n\
🔹*16:50* Дискуссия “Is IT just for coders?” \n\
🗣Юлия Коблова Банк «Санкт-Петербург», Антонина Пучковская Университет ИТМО, \
Виктория Раксина, Selectel \n\
📍Амфитеатр ректорского холла \n\n\
*16 апреля:* \n\
🔹*11:00* Интервью \n\
🗣Андрей Бреслав, сооснователь психотерапевтической платформы Alter \n\
📍Online \n\n\
🔹*12:30* Интервью \n\
🗣Наталья Исаева, Vice President в международном банке \n\
📍Online\n\n\
🔹*13:10* Интервью \n\
🗣Григорий Ткаченко,  Engineering Manager, Snapchat \n\
📍Online'
  );
});
bot.action("program_by_track_startup", (ctx) => {
  ctx.replyWithMarkdown(
    '*🚀Startup*\n\n\
*15 апреля:* \n\
🔹*16:50* Дискуссия “Какая идея нужна рынку” \n\
🗣Татьяна Антипова, Бизнес-инкубатор Ингрия, Юлия Корес, Sovmestno и Мария Плоткина, Geek Teachers \n\
📍Конференц зал коворкинга \n\n\
*16 апреля:*\n\
🔹*11:50* Сессия "От идеи до международного бизнеса — личный опыт предпринимателя" \n\
🗣Александр Головатый, WeGoTrip \n\
📍Online'
  );
});
bot.action("program_by_track_career", (ctx) => {
  ctx.replyWithMarkdown(
    '*💼Career*\n\n\
🔹*11:30* Скрининг резюме \n\
🗣HR-специалисты, Яндекс \n\
📍Аудитория 359 \n\n\
🔹*12:00 - 14:30* HR-секция: \n\
🗣*Яндекс* \n\
Карьерные консультации HR-специалистов по вопросам подбора вакансий и стажировок, \
прохождения всех этапов собеседования и возможной траектории развития в Яндексе.\n\
🗣*Банк «Санкт-Петербург»*\n\
Разбор твоего резюме, актуальная информация о стажировках и вакансиях компании, \
а также все самое интересное из мира банковского IT.\n\
🗣*PwC* \n\
Ответы на все интересующие тебя вопросы о компаниии, трудоустройстве и развитии, \
крутая викторина с подарками и даже возможность оставить свое резюме.\n\
🗣*Neoflex* \n\
Нетворк с представителями компании и ответы на твои самые волнующие вопросы о \
карьере и трудоустройстве.\n\
🗣*Nexign*\n\
Возможность проверить свои знания в онлайн-викторине и получить крутой мерч \
компании за лучший результат.\n\
🗣*Yota*\n\
Профессиональный разбор твоего резюме, тестирование знаний и подробная информация \
о внутренних активностях компании.\n\
📍Холл коворкинга\n\n\
🔹*14:00* Сессия "Как попасть в Яндекс?" \n\
🗣Олег Мохов, Яндекс \n\
📍Конференц зал коворкинга  \n\n\
*16 апреля:*\n\
🔹*12:20* Дискуссия “Карьерные пути. Куда пойти в IT?” \n\
🗣Арина Буздалова, старший научный сотрудник, Университет ИТМО, Дарья Яковлева, \
Co-founder, MetaLabs, Наталья Глазкина, Software Engineer Google \n\
📍Online'
  );
});
bot.action("program_by_track_back", (ctx) => {
  ctx.reply("Выберите формат отображения:", {
    reply_markup: {
      inline_keyboard: program_display_type_keyboard,
    },
  });
});

// Конфиг клавиатуры
const program_by_day_keyboard = [
  [
    {
      text: "15 апреля | ИТМО", // текст на кнопке
      callback_data: "program_by_day_15", // данные для обработчика событий
    },
    {
      text: "16 апреля | Online",
      callback_data: "program_by_day_16",
    },
  ],
  [
    {
      text: "↩️Вернуться к выбору",
      callback_data: "program_by_day_back",
    },
  ],
];

bot.action("by_date", (ctx) => {
  ctx.reply("Выберите день:", {
    reply_markup: {
      inline_keyboard: program_by_day_keyboard,
    },
  });
});

const program_by_day_15_places_keyboard = [
  [
    {
      text: "Амфитеатр", // текст на кнопке
      callback_data: "by_day_15_amf", // данные для обработчика событий
    },
    {
      text: "VR-зона",
      callback_data: "by_day_15_vr",
    },
  ],
  [
    {
      text: "Конференц зал",
      callback_data: "by_day_15_conf",
    },
    {
      text: "Аудитория 359",
      callback_data: "by_day_15_359",
    },
  ],
  [
    {
      text: "↩️Вернуться к выбору дня",
      callback_data: "program_by_day_15_back",
    },
  ],
];

bot.action("program_by_day_15", (ctx) => {
  ctx.reply("Выберите площадку:", {
    reply_markup: {
      inline_keyboard: program_by_day_15_places_keyboard,
    },
  });
});

bot.action("by_day_15_amf", (ctx) => {
  ctx.replyWithMarkdown(
    '*Амфитеатр*\n\n\
📎11:30 Сессия *Soft Skills* "Нетворкинг в IT"  \n\
🗣Анастасия Заречнева, Semrush \n\n\
📎12:20 Сессия *Frontend*  “Vue + A11y = ?” \n\
🗣Лена Райан, X5 Group \n\n\
☕️13:00 - 14:00 *Кофе-брейк* \n\n\
📎14:00 Дискуссия *Backend* "Битва языков" \n\
🗣Владимир Максимук,  Selectel,  _ список участников уточняется _ \n\n\
📎14:50 Дискуссия *Soft Skills* “Лидерство” \n\
🗣Светлана Маркова, Neoflex и Ксения Черепенина, Nexign \n\n\
📎15:40 Сессия *Mobile* "Актуальные средства разработки под IOS” \n\
🗣Екатерина Батеева, Авито \n\n\
☕️16:20 - 16:50 *Кофе-брейк* \n\n\
📎16:50 Дискуссия *Soft Skills* “Is IT just for coders?” \n\
🗣Юлия Коблова, Банк «Санкт-Петербург», Виктория Раксина, Selectel и Антонина \
Пучковская, Университет ИТМО'
  );
});
bot.action("by_day_15_vr", (ctx) => {
  ctx.replyWithMarkdown(
    '*VR-зона*\n\n\
📎12:00 – 14:30 *HR-секция* \n\
🗣Консультации представителей компаний и студенческие клубы \n\n\
☕️13:00 - 14:00 *Кофе-брейк* \n\n\
📎14:50 Сессия *Backend* "Как стать middle разработчиком?" \n\
🗣Алексей Лубенец, Yota \n\n\
📎15:40 Сессия *ML* «Опасности "слепого" применения продвинутой аналитики» \n\
🗣Дмитрий Перец, Yota \n\n\
☕️16:20 - 16:50 *Кофе-брейк*'
  );
});
bot.action("by_day_15_conf", (ctx) => {
  ctx.replyWithMarkdown(
    '*Конференц зал*\n\n\
📎11:30 Сессия *ML* "Цифровой макияж" \n\
🗣Ксения Бурая, Яндекс Карты \n\n\
📎12:20 Сессия *Backend* "Умный дом, как это работает?" \n\
🗣Маргарита Андриасян, ЛИИС \n\n\
☕️13:00 - 14:00 *Кофе-брейк* \n\n\
📎14:00 Сессия *Career* "Как попасть в Яндекс?" \n\
🗣Олег Мохов, Яндекс \n\n\
📎14:50 - 16:20 Мастер-класс *Soft Skills* Work-Life balance \n\
🗣Марина Казанцева, тренинговое агентство K&D Training. Длительность 90 минут \n\n\
☕️16:20 - 16:50 *Кофе-брейк* \n\n\
📎17:50 Дискуссия *Startup* “Какая идея нужна рынку” \n\
🗣Татьяна Антипова, Бизнес-инкубатор Ингрия, Юлия Корес, Sovmestno и Мария Плоткина, Geek Teachers'
  );
});
bot.action("by_day_15_359", (ctx) => {
  ctx.replyWithMarkdown(
    "*Аудитория 359*\n\n\
🔹*11:30* Скрининг резюме \n\
🗣HR-специалисты, Яндекс \n\n\
🔹*13:15* Мастер-класс «Диалог с телом» \n\
🗣Елизавета Некрасова, Университет ИТМО \n\n\
🔹*14:00* Мастер-класс «Диалог с телом» \n\
🗣Елизавета Некрасова, Университет ИТМО"
  );
});
bot.action("program_by_day_15_back", (ctx) => {
  ctx.reply("Выберите день:", {
    reply_markup: {
      inline_keyboard: program_by_day_keyboard,
    },
  });
});

bot.action("program_by_day_16", (ctx) => {
  ctx.replyWithMarkdown(
    '*Зал 1: * \n\
📎11:00 Интервью \n\
🗣Андрей Бреслав, сооснователь психотерапевтической платформы Alter \n\n\
📎11:30 Сессия Frontend “Интерфейс доступный для каждого” \n\
🗣Валерия Курмак Руководитель направления Инклюзия в Яндексе \n\n\
📎12:20 Дискуссия Career “Карьерные пути. Куда пойти в IT?” \n\
🗣Арина Буздалова, старший научный сотрудник, Университет ИТМО, Дарья Яковлева, \
Co-founder, MetaLabs, Наталья Глазкина, Software Engineer, Google \n\n\
📎13:10  Интервью \n\
🗣Григорий Ткаченко, Engineering Manager, Snapchat\n\n\
📎13:40 Болталка "Влияние цифровых технологий на репрезентацию научных решений в медицине" \n\
🗣Дарья Мартынова, Университет ИТМО и клуб "Устойчивого развития" \n\n\
*Зал 2: * \n\
📎11:00 Сессия Mobile "Flutter - перспективы и возможности" \n\
🗣Алиса Цветкова, школа программирования для девушек ITGIRLS \n\n \
📎11:50 Сессия Startup "От идеи до международного бизнеса — личный опыт предпринимателя" \n\
🗣Александр Головатый, основатель WeGoTrip \n\n\
📎12:30 Интервью \n\
🗣Наталья Исаева, Vice President в международном банке \n\n\
📎13:00 Сессия Backend "Программируем железо без С или жизнь в промышленной автоматике" \n\
🗣Полина Овсянникова,  Университет Аалто \n\n\
📎13:40 Сессия Mobile “Эволюция UI-тестов в iOS-приложении Яндекс Маркета” \n\
🗣Дарья Редникина, iOS-разработчик, Яндекс Маркет'
  );
});
bot.action("program_by_day_back", (ctx) => {
  ctx.reply("Выберите формат отображения:", {
    reply_markup: {
      inline_keyboard: program_display_type_keyboard,
    },
  });
});



const add_program = [
  [
    {
      text: "Speaker", // текст на кнопке
      callback_data: "add_speaker", // данные для обработчика событий
    },
    {
      text: "Program",
      callback_data: "add_program",
    },
    {
      text: "Partner",
      callback_data: "add_partner",
    },
  ],
  // [
  //   {
  //     text: "↩️Вернуться к выбору",
  //     callback_data: "program_by_day_back",
  //   },
  // ],
];

bot.command("add", (ctx) => {
  ctx.reply("What do you want to add:", {
    reply_markup: {
      inline_keyboard: add_program,
    },
  });
});

bot.action("add_speaker", (ctx) => {
  ctx.replyWithHTML(`<b>Send the full name of the speaker</b>
<i>example: /addspeakerfullname Алексей Лубенец</i>`)
});

bot.action("add_program", (ctx) => {
  ctx.replyWithHTML(`<b>Send the name of the program</b>
<i>example: /addnameoftheprogram Битва языков</i>`)
});

// Add partner  ------------------------------

let newPartner = {
  // group: "",
  name: "",
  // type: "",
  title: "",
  subtitle: "",
  description: "",
  url: "",
};

bot.action("add_partner", (ctx) => {
  try {
    ctx.replyWithHTML(`<b>Enter partner name *: </b>
Example: <i>/addpartnername "Launch Partners"</i>`);
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnername", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addpartnergroup "Giant Cookie"</i>`);
    } else {
      newPartner = {
        // group: `${message[1]}`,
        name: `${message[1]}`,
        // type: `${newPartner.type}`,
        title: `${newPartner.title}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter title *:</b>
Example: <i>/addpartnertitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnertitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
      Example: <i>/addpartnertitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    } else {
      newPartner = {
        // group: `${message[1]}`,
        name: `${newPartner.name}`,
        // type: `${newPartner.type}`,
        title: `${message[1]}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
      };
      console.log(newPartner);
      ctx.replyWithHTML(`✅Success!
<b>Enter subtitle:</b>
Example: <i>/addpartnersubtitle "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnersubtitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      console.log(message.length);
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addpartnersubtitle "We believe technology should free humanity, not enslave it. "</i>`);
      return false;
    } else {
      newPartner = {
        // group: `${message[1]}`,
        name: `${newPartner.name}`,
        // type: `${newPartner.type}`,
        title: `${newPartner.title}`,
        subtitle: `${message[1]}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
      };
      console.log(message);
      ctx.replyWithHTML(`✅Success!
<b>Enter discription:</b>
Example: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnerdiscription", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
      return false;
    }
    if (!newPartner.description && message.length <= 1) {
      ctx.replyWithHTML(`❌Your subtitle is empty although fill in the description.
Exapmle: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
    } else {
      newPartner = {
        // group: `${message[1]}`,
        name: `${newPartner.name}`,
        // type: `${newPartner.type}`,
        title: `${newPartner.title}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${message[1]}`,
        url: `${newPartner.url}`,
      };
      console.log(message);
      ctx.replyWithHTML(`✅Success!
<b>Enter url:</b>
Example: <i>/addpartnerurl "https://telegram.org/"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnerurl", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addpartnerurl "https://telegram.org/"</i>`);
      return false;
    }
    newPartner = {
      // group: `${message[1]}`,
      name: `${newPartner.name}`,
      // type: `${newPartner.type}`,
      title: `${newPartner.title}`,
      subtitle: `${newPartner.subtitle}`,
      description: `${newPartner.description}`,
      url: `${message[1]}`,
    };
    console.log(message);
    ctx.replyWithHTML(`✅Success!
    
<b>Check the data:</b>

<b>name</b>: <i>${newPartner.name}</i>

<b>title</b>: <i>${newPartner.title}</i>

<b>subtitle</b>: <i>${newPartner.subtitle}</i>

<b>description</b>: <i>${newPartner.description}</i>

<b>url</b>: <i>${message[1]}</i>
`);
  } catch (error) {
    console.error(error);
  }
});
// -------------------------------------------------------

bot.launch();

module.exports.handler = async function (event, context) {
  const message = JSON.parse(event.body);
  await bot.handleUpdate(message);
  return {
    statusCode: 200,
    body: "",
  };
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
