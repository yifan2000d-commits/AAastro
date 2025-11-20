import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, 
  Star, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  BookOpen, 
  Sparkles,
  Heart,
  Briefcase,
  GraduationCap,
  Activity,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  Clock,
  Copy,
  Calendar,
  Share2,
  Bookmark,
  ThumbsUp,
  Link as LinkIcon
} from 'lucide-react';

// --- 工具函数：兼容性复制到剪贴板 ---
// (这是唯一的声明)
const copyToClipboard = (text) => {
  // 创建一个临时的 textarea 元素
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 确保它不可见且不会导致滚动
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    // 执行复制命令
    document.execCommand('copy');
  } catch (err) {
    console.error('无法复制内容', err);
  }
  
  // 清理临时元素
  document.body.removeChild(textArea);
};

// --- 数据部分 (深度扩充至长文模式) ---

const episodes = [
  {
    id: 1,
    title: "什么是 D9 (Navamsa) 盘？灵魂的归宿与下半生的剧本",
    subtitle: "D9盘不仅仅是婚姻盘，它是你果实成熟后的样子，是你35岁后的真实剧本。",
    category: "核心技法",
    readTime: "18 min",
    publishDate: "2024-03-15",
    color: "bg-indigo-50",
    stats: { likes: 1240, saves: 856, shares: 432 },
    content: [
      { type: "paragraph", text: "在印度占星（Vedic Astrology）的宏大体系中，D1 本命盘（Rashi Chart）是一棵树的根基，决定了你与生俱来的物理环境、身体素质和基本命运结构。然而，随着时间的推移，树木会开花结果，这个果实就是 D9 九分盘（Navamsa）所代表的含义。很多占星师会告诉你，没有 D9 盘的确认，D1 盘的结论是不完整的。" },
      { type: "heading", text: "为什么 D9 如此重要？" },
      { type: "paragraph", text: "许多初学者认为 D9 仅仅是用来还要看“婚姻”的。这虽然没错，但大大低估了它的价值。D9 代表了你灵魂深处的真实力量（Strength）和潜能。随着年龄的增长，特别是过了 30-35 岁之后，D1 盘的影响力虽然依旧存在，但你会越来越活成 D9 盘的样子。" },
      { type: "paragraph", text: "例如，一个人的 D1 盘太阳落陷（比如在天秤座），可能早年缺乏自信，父缘较浅，或者在确立自我身份时感到困难。但如果他的 D9 盘太阳庙旺（在白羊座）或位于本宫（狮子座），这就构成了所谓的 'Neecha Bhanga'（陷落取消）甚至是一种提升。这意味着经过岁月的洗礼和个人的努力，他会逐渐生长出强大的内在权威和自信。这就是所谓的“大器晚成”。相反，如果 D1 很好但 D9 极差，世俗的成就可能无法转化为内心的满足，或者成功难以持久。" },
      { type: "heading", text: "D9 中的命主星 (Lagna Lord)" },
      { type: "paragraph", text: "D9 的命主星是你灵魂方向的舵手。观察它落在 D9 的哪个宫位至关重要。如果 D9 命主星落在 D9 的第 9 宫（Dharma Bhava），这意味着你的人生下半场将强烈地被精神追求、高等智慧和长途旅行所驱动。如果落在第 10 宫，则事业和社会地位将成为你灵魂表达的主要舞台。" },
      { type: "heading", text: "D9 与婚姻业力" },
      { type: "paragraph", text: "Navamsa 确实是解读婚姻质量的最重要分盘。D1 的第七宫展示了你会被什么样的人吸引，以及通过这一世的婚姻你需要学习什么（往往是表象）。而 D9 的第七宫和 D9 的命主星，则揭示了你最终会和什么样的人长期生活，以及婚后的真实感受。" },
      { type: "paragraph", text: "重点关注 D9 中的金星（Venus）状态。对于男性和女性来说，金星都是婚恋的重要指标。如果金星在 D9 中受到土星或火星的严重刑克，或者落入 6/8/12 凶宫，即便 D1 盘婚姻宫看起来不错，婚后的亲密感也可能遭遇挑战，比如冷漠、争吵或分离。这是灵魂层面带来的功课，需要通过更有意识的经营来化解。" },
      { type: "heading", text: "Pushkar Navamsa：特殊的祝福点" },
      { type: "paragraph", text: "在深入解读 D9 时，还有一个高阶技巧叫 Pushkar Navamsa。如果你的行星落入了特定的度数区间（比如火象星座的第 7 个 navamsa，土象星座的第 3 个 navamsa 等），这颗行星就被认为是受到了特殊的滋养。无论它在 D1 中看起来多么糟糕，只要落入 Pushkar Navamsa，它最终都会为你带来好运和解脱。检查你的星盘，看看是否有行星落在这个位置，那就是你命运中的“救赎之地”。" }
    ]
  },
  {
    id: 2,
    title: "土星回归 (Saturn Return)：30岁的成人礼与业力清算",
    subtitle: "每一次压力都是宇宙在帮你剔除不属于你的东西，重塑你的生命结构。",
    category: "流年运势",
    readTime: "20 min",
    publishDate: "2024-02-20",
    color: "bg-violet-50",
    stats: { likes: 2103, saves: 1540, shares: 890 },
    content: [
      { type: "paragraph", text: "你是否在 28 岁到 30 岁之间感到过前所未有的迷茫、压力，甚至是生活的崩塌？工作极其不顺，长期关系突然破裂，或者感到身体能量的急剧下降。不要惊慌，你可能正在经历人生中最重要的星象事件之一——土星回归（Saturn Return）。这是每个人都要经历的成人礼，无人能免。" },
      { type: "heading", text: "宇宙的严师：Shani Dev" },
      { type: "paragraph", text: "土星绕黄道一周大约需要 29.5 年。当你长到这个岁数时，流年的土星回到了你出生时土星所在的同一个星座和度数。这标志着“童年”和“试错期”的正式结束，真正的成年生活开始了。在印度神话中，土星（Shani）是业力的管理者，也是最严厉的老师。他不像木星那样通过给予来教导，而是通过“拿走”和“限制”来教导。" },
      { type: "paragraph", text: "在土星回归期间，那些建立在虚假基础上的东西会被无情地摧毁。如果你从事一份工作只是为了父母的面子，土星会让你在那份工作中痛苦不堪直到辞职；如果你维持一段关系只是因为害怕孤独，土星会制造事件让关系破裂。这听起来很残酷，但这是一个“必要的修剪”过程。就像修剪果树一样，只有剪掉枯枝，才能长出新芽。" },
      { type: "heading", text: "不同宫位的土星回归" },
      { type: "paragraph", text: "土星回归的影响取决于它发生在你本命盘的哪个宫位。如果发生在第 10 宫（事业宫），这将是职业生涯的巨大转折点，你可能会承担前所未有的重任，或者彻底转行。如果发生在第 7 宫（伴侣宫），婚姻关系将面临最严峻的考验，要么通过考验变得坚不可摧，要么分道扬镳。如果发生在第 4 宫（家庭宫），可能涉及到房产问题、母亲的健康或居住地的变动。" },
      { type: "heading", text: "第二次与第三次回归" },
      { type: "paragraph", text: "大多数人会经历两到三次土星回归。第一次在 29 岁左右，主题是“确立社会身份”。第二次在 59 岁左右，主题是“转向精神与传承”，这是退休和进入人生下一阶段的时刻，许多人在此时开始思考精神遗产。第三次在 88 岁左右，那是关于“智慧与解脱”的最终篇章。每一次回归都是生命螺旋上升的契机。" },
      { type: "heading", text: "如何应对土星回归？" },
      { type: "paragraph", text: "1. **臣服与接受**：不要试图抵抗变化。土星带来的每一个挑战，都是为了让你看清现实。任何逃避都会导致痛苦的加剧。\n2. **承担责任**：这是土星最喜欢的品质。停止责怪原生家庭、社会环境或运气，开始为自己的人生负全责。\n3. **建立结构**：利用这段时间重新规划职业生涯，建立更健康的作息和纪律。土星奖赏那些勤奋、自律和务实的人。" }
    ]
  },
  {
    id: 3,
    title: "月亮星座：你的情绪安全感与前世记忆",
    subtitle: "在印占中，月亮比太阳更重要。它决定了你如何感知这个世界，以及你的心智模式。",
    category: "基础入门",
    readTime: "15 min",
    publishDate: "2024-01-10",
    color: "bg-purple-50",
    stats: { likes: 980, saves: 620, shares: 210 },
    content: [
      { type: "paragraph", text: "在西方占星中，大家习惯问“你的星座是什么？”，通常指的是太阳星座。但在印度占星（Vedic Astrology）中，最重要的那颗星其实是月亮（Chandra）。太阳代表灵魂（Atman），是永恒不变的火花；而月亮代表 'Manas'——即我们的心智、感知模式、情绪反应机制以及我们如何与这个物质世界互动。" },
      { type: "heading", text: "月亮与前世记忆 (Samskaras)" },
      { type: "paragraph", text: "月亮不仅仅是当下的情绪，它还携带了大量的前世记忆（Samskaras）。你为什么天生害怕某些东西？为什么对某些技能无师自通？为什么在亲密关系中有特定的依恋模式？这些往往都写在月亮落入的星座和星宿（Nakshatra）里。月亮是你过去世经验的总和，是你灵魂带来的“心理行李”。" },
      { type: "heading", text: "月亮与母亲" },
      { type: "paragraph", text: "在星盘中，月亮也是母亲的自然征象星（Karaka）。月亮的状态直接反映了盘主与母亲的关系，以及盘主在婴幼儿时期得到的滋养质量。一个受克的月亮（比如与土星、火星、Rahu 同宫）可能意味着母亲在盘主童年时期情绪不稳定、缺席或过度控制。这种早期的互动模式会内化为盘主成年后的自我安抚能力。" },
      { type: "heading", text: "月亮受损的表现与疗愈" },
      { type: "paragraph", text: "如果月亮落入陷落星座（天蝎座），或者处于甘达点（Gandanta，水火交界度数），盘主往往内心充满深层的焦虑和恐惧，很难感受到简单的快乐。即便外在物质条件很优越，内心依然觉得匮乏，像一个填不满的黑洞。这种配置的人通常有很强的直觉和心理洞察力，但也容易受困于情绪风暴。" },
      { type: "paragraph", text: "疗愈月亮是改善命运最直接的方式。最有效的方法包括：\n1. **冥想与呼吸法**：直接平复 Manas 的波动。\n2. **接触水元素**：多去海边、湖边散步，或者保持充足的饮水。\n3. **向母亲表达敬意**：改善与母亲的关系，或者向神圣母亲（如 Parvati, Guanyin）祈祷。\n4. **佩戴珍珠**：这需要非常谨慎，必须在专业占星师建议下进行，因为如果月亮是凶宫主，佩戴珍珠可能会放大负面情绪。" }
    ]
  },
  {
    id: 4,
    title: "南北交点 (Rahu & Ketu)：欲望与解脱的拉锯战",
    subtitle: "业力之轴：Rahu是你今生的执着与野心，Ketu是你前世的精通与厌离。",
    category: "业力占星",
    readTime: "16 min",
    publishDate: "2023-12-05",
    color: "bg-fuchsia-50",
    stats: { likes: 1560, saves: 1100, shares: 560 },
    content: [
      { type: "paragraph", text: "Rahu（北交点）和 Ketu（南交点）并非实体行星，而是月亮轨道与黄道平面的交点。它们是“影子行星”（Chaya Graha），虽然没有实体，却能像日食月食一样遮蔽光芒，影响深远。这一对轴线展示了我们灵魂进化的主要动力：从哪里来（Ketu），往哪里去（Rahu）。" },
      { type: "heading", text: "Rahu：无法填满的黑洞" },
      { type: "paragraph", text: "Rahu 代表了我们今生尚未体验足够、因此极度渴望的领域。它是一股向外的、物质的、扩张的、甚至带有强迫性的能量。Rahu 打破传统，渴望创新，它不满足于现状。Rahu 所在的宫位，通常是我们会投入大量精力去探索、去征服的地方，也是我们容易感到永远“不够”的地方。" },
      { type: "paragraph", text: "例如，Rahu 在第 10 宫的人，往往对事业成功有极强的野心，渴望社会地位和认可，不达目的誓不罢休，甚至可能为此牺牲家庭生活。Rahu 在第 7 宫的人，则可能对伴侣关系有执念，容易被异国、异族或非传统的伴侣吸引。" },
      { type: "heading", text: "Ketu：无头隐士的智慧" },
      { type: "paragraph", text: "相对的，Ketu 代表了我们前世已经精通、今生本能地想要“解离”或“放弃”的领域。Ketu 是一股向内的、收缩的、灵性的能量。Ketu 所在的宫位，你往往拥有与生俱来的才华，但你可能对这些才华并不在意，甚至觉得是个负担。Ketu 是通往灵性觉醒的狭窄通道，它通过“剥夺”让你明白物质的虚幻。" },
      { type: "paragraph", text: "例如，Ketu 在第 2 宫（财帛宫）的人，前世可能非常富有或执着于积蓄，今生对金钱的态度可能比较淡漠，或者即便有钱也觉得钱不能带来安全感。Ketu 在第 4 宫的人，可能早年与原生家庭有疏离感，这促使他们去寻找内心的家园而非物理的房子。" },
      { type: "heading", text: "Rahu-Ketu 轴线的整合" },
      { type: "paragraph", text: "人生的目标不是抛弃 Ketu 奔向 Rahu，也不是退回 Ketu 逃避 Rahu，而是整合这对能量。我们需要利用 Ketu 的天赋（作为基础），去勇敢地探索 Rahu 的领域（作为成长方向），同时保持觉知，不要被 Rahu 的幻象（Maya）完全吞噬。这就是平衡之道。" }
    ]
  },
  {
    id: 5,
    title: "威施得利大运 (Vimshottari Dasha)：命运的时钟",
    subtitle: "为什么同样的本命盘，在不同年份会有截然不同的遭遇？全看大运。",
    category: "预测技法",
    readTime: "18 min",
    publishDate: "2023-11-20",
    color: "bg-blue-50",
    stats: { likes: 880, saves: 450, shares: 120 },
    content: [
      { type: "paragraph", text: "印度占星最精准、最令人惊叹的预测工具莫过于 Dasha 系统，其中最常用的是 Vimshottari Dasha（120年大运系统）。它基于月亮所在的星宿，将人的一生划分为不同行星主宰的时期，总计120年。这就像是一个宇宙时钟，精准地开启和关闭我们生命中的不同篇章。" },
      { type: "heading", text: "你正活在谁的剧本里？" },
      { type: "paragraph", text: "当你进入某个行星的大运（Mahadasha）时，这颗行星在你的本命盘中代表的领域就会被激活。这就好比你的人生舞台换了导演。例如，当你进入金星大运（为期20年），你会发现生活的主题突然变成了爱情、舒适、艺术享受和人际关系。如果你的金星状态好，这将是一段享受人生的时光，充满浪漫和财富；如果金星受损，则可能陷入复杂的情感纠葛或财务放纵。" },
      { type: "paragraph", text: "紧接着可能是太阳大运（6年），画风突变，关注点转移到自我实现、权威、父亲和事业名望上。你会变得更加独立，甚至有些自我中心。这就是为什么有些人“判若两人”，其实是换了大运。" },
      { type: "heading", text: "Antardasha：大运中的小运" },
      { type: "paragraph", text: "大运下面还有小运（Antardasha）。比如在木星大运中的土星小运（Jupiter-Saturn period），这是一个经典的“扩张与限制”并存的时期。木星想让你飞得更高，土星拉住你的脚让你务实。这种能量的摩擦往往带来巨大的职业成就，但也伴随着压力。解读大运必须结合小运来看，才能精准定位当下的能量流。" },
      { type: "heading", text: "Dasha Sandhi：大运交接的动荡期" },
      { type: "paragraph", text: "在大运交接的前后半年到一年（Dasha Sandhi），通常是人生极其动荡和混乱的时期。旧的能量模式正在瓦解，新的模式尚未建立。这段时间最适合韬光养晦，复盘过去，而不是盲目开启重大项目。了解这一点，能帮你平稳度过人生的“换挡期”。" }
    ]
  },
  {
    id: 6,
    title: "木星过运 (Jupiter Transit)：宇宙的礼物与扩张",
    subtitle: "木星每年换座一次，它去哪里，哪里就有机会和好运。",
    category: "流年运势",
    readTime: "12 min",
    publishDate: "2023-10-15",
    color: "bg-amber-50",
    stats: { likes: 1340, saves: 920, shares: 410 },
    content: [
      { type: "paragraph", text: "木星（Guru）是最大的吉星，代表智慧、财富、扩张、高等教育和神圣的恩典。每年木星会移动到一个新的星座，这通常标志着我们生活中某个领域的“机会之窗”打开了。追踪流年木星的位置，是利用宇宙能量顺势而为的最佳方式。" },
      { type: "heading", text: "木星带来的加持" },
      { type: "paragraph", text: "当流年木星经过你的本命月亮或本命命主星时，通常是人生中最顺遂的时期之一（Gajakesari Yoga 的流年版）。你会感到乐观、自信，并且容易遇到贵人相助。对于单身人士来说，木星触动第 7 宫或第 7 宫主时，往往是确立严肃关系或结婚的最佳时机，因为它带来了法律和神圣的认可。" },
      { type: "paragraph", text: "木星经过第 5 宫时，利于生育子女、创意项目或投机获利；经过第 9 宫时，利于长途旅行、深造或出版。木星的触碰就像点石成金，能激活那个宫位的吉利面向。" },
      { type: "heading", text: "木星的阴影面" },
      { type: "paragraph", text: "但要注意，木星的扩张也是双刃剑。如果它触发了负面宫位（如第 6, 8, 12 宫）或本命盘中的凶星，也可能代表问题的“扩大化”。例如，木星经过第 6 宫可能带来工作量的剧增（虽然可能是升职），或者体重的增加（身体的扩张）、债务的增加（财务漏洞的扩张）。盲目乐观是木星过运时最大的陷阱，务必保持理性。" }
    ]
  },
  {
    id: 7,
    title: "行星逆行 (Retrograde)：前世未完的功课",
    subtitle: "水逆并不可怕，逆行其实是行星离地球最近、能量最强的时候。",
    category: "进阶知识",
    readTime: "14 min",
    publishDate: "2023-09-01",
    color: "bg-teal-50",
    stats: { likes: 760, saves: 340, shares: 150 },
    content: [
      { type: "paragraph", text: "在大众占星中，“水逆”几乎成了倒霉的代名词。但在严谨的印度占星中，逆行（Vakra）有着更深层的含义。物理上，逆行是行星运行到离地球最近的时刻，因此在印占中，逆行被视为行星能量的极度增强（Chesta Bala）。一颗逆行的行星，就像一个在人群中逆行的人，虽然行动迟缓、反复，但极其引人注目且有力。" },
      { type: "heading", text: "逆行的业力含义" },
      { type: "paragraph", text: "凡是本命盘中有逆行行星，都代表着那个领域有“未完成的业力”（Karma）。你可能会在相关领域反复遭遇同样的问题，直到你学会了那一课。逆行行星的能量是向内的、反思的、非传统的。" },
      { type: "paragraph", text: "例如，水星逆行的人，可能早年表达能力受阻，或者极其内向，但这反而促使他们向内思考，发展出独特的思维逻辑，最终成为深刻的思想家或作家。火星逆行的人，可能在表达愤怒和行动力上有困难，倾向于压抑怒火直到爆发，他们需要学习如何健康地释放攻击性。" },
      { type: "heading", text: "特别是土星逆行" },
      { type: "paragraph", text: "土星逆行是一个非常普遍但也非常沉重的配置。土星逆行的人往往对自己极其严苛，内心深处有一种挥之不去的责任感或负罪感，仿佛觉得自己“不够好”或“做得不够”。他们是典型的工作狂，难以放松。对于土星逆行的人来说，今生最大的功课不是更加努力，而是学会“放过自己”，明白自己的价值不由外在成就决定。" }
    ]
  },
  {
    id: 8,
    title: "27 星宿 (Nakshatras)：比星座更精准的灵魂密码",
    subtitle: "黄道十二宫只是背景，27星宿才是真正的演员。",
    category: "核心技法",
    readTime: "22 min",
    publishDate: "2023-08-10",
    color: "bg-sky-50",
    stats: { likes: 1890, saves: 1450, shares: 670 },
    content: [
      { type: "paragraph", text: "如果你只用 12 星座看盘，那你只触及了印度占星的皮毛。印占的精髓在于 Nakshatra 系统。古印度圣贤观察到月亮每天经过的背景星空是不同的，于是将黄道 360 度划分为 27 份，每份 13 度 20 分，这就是 27 星宿。每一颗星宿都有自己的守护神、象征物、特定的能量频率和神话故事。" },
      { type: "heading", text: "识别你的核心星宿" },
      { type: "paragraph", text: "你的月亮落入的星宿，决定了你的基本性格底色、思维模式和情感需求。例如，同样是白羊座，落入 Aswini（娄宿，由 Ketu 守护）的人像马一样奔放、治愈力强、行动迅速但缺乏耐性；而落入 Bharani（胃宿，由金星守护）的人则像子宫一样，承载着创造、性与死亡的沉重议题，更具艺术性、占有欲和极端性。" },
      { type: "paragraph", text: "除了月亮星宿，你的命主星宿和太阳星宿也至关重要。比如太阳在 Ardra（参宿）的人，人生往往伴随着风暴和泪水，但通过破坏旧秩序能带来革新；而太阳在 Chitra（角宿）的人，则是天生的建筑师和设计师，极具魅力和创造力。" },
      { type: "heading", text: "星宿匹配与合盘" },
      { type: "paragraph", text: "通过星宿，我们可以精准地判断两个人的兼容性（Kutas匹配法）。这比单纯看太阳星座合不合要准确得多。比如某些星宿之间存在本能的敌对关系（Yoni Kuta，基于动物原型的匹配），比如“猫”型星宿和“鼠”型星宿的人在一起，即使其他配置再好，潜意识里也容易互相攻击或消耗。了解星宿，就是了解灵魂的出厂设置。" }
    ]
  },
  {
    id: 9,
    title: "行星燃烧 (Combustion)：被太阳灼伤的痛与升华",
    subtitle: "当行星太靠近太阳时，它的物理表现会受损，但精神能量可能升华。",
    category: "进阶知识",
    readTime: "10 min",
    publishDate: "2023-07-22",
    color: "bg-rose-50",
    stats: { likes: 540, saves: 230, shares: 80 },
    content: [
      { type: "paragraph", text: "在星盘中，当一颗行星（除了 Rahu/Ketu）在经度上非常接近太阳时（通常在 6-8 度以内，具体视行星而定），它被称为“燃烧”或“被灼伤”（Asta）。太阳是国王，光芒太强，当臣子靠得太近时，身影就会被光芒吞没，变得不可见。" },
      { type: "heading", text: "燃烧的具体影响" },
      { type: "paragraph", text: "在世俗和物质层面，燃烧通常带来挫折和无力感。这颗行星所代表的人事物容易受到损害。比如金星燃烧，可能代表婚恋关系中容易被伴侣压制，或者容易在感情中失去自我，也可能表现为生殖系统的炎症。水星燃烧可能会导致神经系统的敏感，或者在表达观点时容易被权威人士（太阳）噤声，或者思维过于主观。" },
      { type: "heading", text: "燃烧的灵性转化" },
      { type: "paragraph", text: "然而，印占的辩证法在于：在灵性层面，燃烧意味着这颗行星被太阳（代表纯粹的灵魂/神性）净化了。它不再追求世俗的虚荣，而是服务于更高的灵魂目标。很多伟大的灵性导师、艺术家都有行星燃烧的配置。例如，燃烧的水星可能赋予一个人极其深刻、直达本质的洞察力，因为他的思维不再被世俗的杂音干扰。关键在于，你是否能超越小我的挫败感，拥抱太阳的高频能量。" }
    ]
  },
  {
    id: 10,
    title: "三方四正 (Kendra & Trikona)：盘中的支柱与福德",
    subtitle: "如何一眼判断一张星盘的强弱？先看这几个关键宫位。",
    category: "基础入门",
    readTime: "12 min",
    publishDate: "2023-06-30",
    color: "bg-emerald-50",
    stats: { likes: 1120, saves: 890, shares: 405 },
    content: [
      { type: "paragraph", text: "在一张本命盘中，有两组宫位至关重要。它们决定了盘主的人生格局、抗风险能力和福报厚度。这就是四正宫（Kendras）和三方宫（Trikonas）。" },
      { type: "heading", text: "四正宫 (Kendras)：人生的骨架" },
      { type: "paragraph", text: "第 1、4、7、10 宫被称为四正宫。它们代表了 Vishnu（维护之神）的能量，是人生的支柱：\n- **第 1 宫**：自己、身体、性格。\n- **第 4 宫**：内心安全感、家庭、房产。\n- **第 7 宫**：伴侣、商业合作、公共关系。\n- **第 10 宫**：事业、社会地位、业力场。\n吉星落入这些宫位能增强人生的稳定性。如果这些宫位被凶星占据，人生往往充满斗争和动荡，但也可能带来巨大的成就（因为凶星在四正宫有行动力）。" },
      { type: "heading", text: "三方宫 (Trikonas)：人生的血肉" },
      { type: "paragraph", text: "第 1、5、9 宫被称为三方宫（第 1 宫既是四正也是三方，因此是最吉祥的宫位）。它们代表了 Lakshmi（财富女神）的祝福：\n- **第 5 宫**：创造力、子女、前世功德（Purva Punya）、智力。\n- **第 9 宫**：高等智慧、导师（Guru）、运气、父亲、长途旅行。\n如果你的 5 宫或 9 宫有强力吉星（如木星、金星），通常意味着你前世积累了很好的善业，今生做事容易事半功倍，关键时刻总有贵人相助。三方宫是纯粹的吉利，凶星落入这里往往也会变得温和。" },
      { type: "heading", text: "Kendra-Trikona Raj Yoga" },
      { type: "paragraph", text: "当四正宫的主星和三方宫的主星产生关联（比如互容、同宫、互相相位）时，就形成了最强大的 Raja Yoga（皇室格局）。这代表了行动（Vishnu）与运气（Lakshmi）的完美结合，通常会带来巨大的成功和名望。" }
    ]
  }
];

// ... existing servicesData (保持不变) ...
const servicesData = [
  {
    id: 1,
    title: "感情婚姻分析单项",
    price: "¥ 498",
    icon: <Heart className="text-rose-400" size={24} />,
    desc: "深度解析婚恋业力。包含正缘特质、恋爱婚姻顺利度及结婚时间预测。",
    features: [
      "正缘特质 (是否适合你)",
      "恋爱 & 婚姻顺利度分析",
      "容易踩的坑与注意问题",
      "桃花点、结婚时间预测",
      "D1本命 + D9感情盘深度解析"
    ],
    popular: true,
    color: "border-rose-100 bg-rose-50/50"
  },
  {
    id: 2,
    title: "事业全面分析单项",
    price: "¥ 398",
    icon: <Briefcase className="text-blue-400" size={24} />,
    desc: "深度解析事业财富。包含契合的主业方向、发展趋势及财运周期。",
    features: [
      "契合的主业发展方向",
      "事业瓶颈与解决措施",
      "赚钱、存钱能力分析",
      "财运周期与未来增长点",
      "涉及 AK/AMK 及 D10 事业盘"
    ],
    popular: false,
    color: "border-blue-100 bg-blue-50/50"
  },
  {
    id: 3,
    title: "学业发展分析单项",
    price: "¥ 358",
    icon: <GraduationCap className="text-emerald-400" size={24} />,
    desc: "深度解析学业潜能。包含性格特点、专业选择建议及考运分析。",
    features: [
      "学业方面性格特点与维力",
      "需要注意的问题和建议",
      "专业选择方向建议",
      "未来周期学业运势",
      "D1 + D24 学业分盘解析"
    ],
    popular: false,
    color: "border-emerald-100 bg-emerald-50/50"
  },
  {
    id: 4,
    title: "身心健康分析单项",
    price: "¥ 298",
    icon: <Activity className="text-orange-400" size={24} />,
    desc: "深度解析健康状态。关注身体健康状态、心理模式及保养建议。",
    features: [
      "整体身体健康状态",
      "心理 & 行为模式分析",
      "需注意保养的健康问题",
      "D1 + D30 健康宫位情况",
      "未来短期身体状况预测"
    ],
    popular: false,
    color: "border-orange-100 bg-orange-50/50"
  }
];

// --- 组件部分 ---

// StarField 组件 (保持不变)
const StarField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const createStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 3000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1.5, alpha: Math.random(), speed: Math.random() * 0.05 + 0.01, twinkleSpeed: Math.random() * 0.02 + 0.005 });
      }
    };
    const draw = () => {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed; if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed = -star.twinkleSpeed;
        star.y -= star.speed; if (star.y < 0) { star.y = canvas.height; star.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`; ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', () => { resizeCanvas(); createStars(); });
    resizeCanvas(); createStars(); draw();
    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

// BookingModal 组件
const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const wechatId = "aa_astro";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in fade-in zoom-in duration-300 text-center overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-violet-100 to-white z-0"></div>
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10">
          <X size={20} className="text-slate-500" />
        </button>

        <div className="relative z-10">
          {/* 头像部分 */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-white shadow-lg">
             <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarush&backgroundColor=c0aede" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-1">Aarush印占师 🔮</h3>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6">中国香港 中西区</p>

          {/* 二维码区域 */}
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 mb-6 shadow-inner mx-auto max-w-[240px]">
            <img 
              src="/qrcode.jpg" 
              alt="WeChat QR Code" 
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="mt-3 flex items-center justify-center">
               <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white mr-2">
                 <MessageCircle size={18} fill="white" />
               </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between mb-6">
            <div className="text-left">
              <div className="text-xs text-slate-400">WeChat ID</div>
              <div className="font-mono font-bold text-slate-700">{wechatId}</div>
            </div>
            <button 
              onClick={() => {
                copyToClipboard(wechatId); // 使用新的复制函数
                alert("微信号已复制！");
              }}
              className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 transition-all"
            >
              <Copy size={18} />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-0">
            扫一扫上面的二维码图案，加我为朋友。<br/>
            请备注“星盘咨询”。
          </p>
        </div>
      </div>
    </div>
  );
};

// 互动数据栏组件
const ActionStats = ({ stats, articleId }) => {
  const [likes, setLikes] = useState(stats.likes);
  const [saves, setSaves] = useState(stats.saves);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setSaves(prev => isSaved ? prev - 1 : prev + 1);
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // 生成模拟链接
    const link = `https://www.aarush-astrology.top/`;
    copyToClipboard(link); // 使用新的复制函数
    alert(`文章链接已复制到剪贴板：\n${link}`);
  };

  return (
    <div className="flex items-center gap-6 py-6 border-y border-slate-100 my-8">
      <button 
        onClick={handleLike}
        className={`flex items-center gap-2 text-sm font-medium transition-all ${isLiked ? 'text-rose-500 scale-105' : 'text-slate-500 hover:text-rose-500'}`}
      >
        <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
        <span>{likes}</span>
      </button>
      
      <button 
        onClick={handleSave}
        className={`flex items-center gap-2 text-sm font-medium transition-all ${isSaved ? 'text-violet-600 scale-105' : 'text-slate-500 hover:text-violet-600'}`}
      >
        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
        <span>{saves}</span>
      </button>
      
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors ml-auto"
      >
        <Share2 size={20} />
        <span className="hidden sm:inline">转发</span>
        <span className="sm:hidden">{stats.shares}</span>
      </button>
    </div>
  );
};


// ArticlePage 组件
const ArticlePage = ({ article, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-bottom-10 duration-500">
      <div className="h-1.5 bg-slate-100 w-full fixed top-0 z-[60]">
         <div className="h-full bg-violet-600 w-1/3"></div> 
      </div>

      <div className="relative bg-slate-900 text-white py-20 md:py-32 px-6 overflow-hidden">
        <StarField /> 
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        
        <div className="relative z-20 max-w-3xl mx-auto text-center">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest hover:-translate-x-1 transform duration-200">
            <ArrowLeft size={16} /> 返回文章列表
          </button>
          
          <div className="flex justify-center gap-4 mb-6 text-xs font-bold tracking-widest uppercase">
             <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-200">{article.category}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-6">{article.title}</h1>
          <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-8">{article.subtitle}</p>

          <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2"><Clock size={16} /><span>{article.readTime} 阅读</span></div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <div className="flex items-center gap-2"><Calendar size={16} /><span>{article.publishDate}</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 顶部互动数据栏 */}
        <ActionStats stats={article.stats} articleId={article.id} />

        <article className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8 prose-a:text-violet-600 hover:prose-a:text-violet-500">
          {/* 首字母下沉效果模拟 */}
          <div className="first-letter:text-7xl first-letter:font-serif first-letter:text-violet-900 first-letter:mr-3 first-letter:float-left">
             {/* 仅作为样式容器 */}
          </div>

          {article.content.map((block, index) => {
            if (block.type === 'heading') return <h2 key={index} className="mt-16 mb-8 text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-violet-500 pl-6 py-1">{block.text}</h2>;
            return <p key={index} className="mb-6 text-justify text-lg leading-loose">{block.text}</p>;
          })}
          
          {/* 底部互动数据栏 */}
          <ActionStats stats={article.stats} articleId={article.id} />

          <div className="bg-violet-50 p-10 rounded-3xl border border-violet-100 text-center mt-12">
            <Sparkles className="w-10 h-10 text-violet-500 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-slate-800 mb-4">喜欢这篇文章吗？</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">每一张星盘都是独一无二的剧本。预约一次深度的个人星盘解读，探索属于你的命运蓝图。</p>
            
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 justify-center">
               <button className="bg-violet-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center gap-2">
                 <MessageCircle size={18} /> 预约咨询
               </button>
               <div className="text-sm text-slate-500">
                 或添加微信 <span className="font-bold text-slate-700">aa_astro</span>
               </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

// App 主组件 (保持结构不变)
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReadArticle = (article) => { setCurrentArticle(article); };
  const handleBackToHome = () => { setCurrentArticle(null); };
  const handleOpenBooking = () => { setIsBookingOpen(true); };

  const Navigation = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled && !currentArticle ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer font-serif" onClick={() => { setActiveTab('home'); setCurrentArticle(null); }}>
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-400 rounded-full flex items-center justify-center text-white shadow-lg"><Moon size={18} fill="currentColor" /></div>
          <span className={`text-xl font-bold tracking-wide ${currentArticle ? 'text-white/90' : (scrolled || activeTab !== 'home' ? 'text-slate-800' : 'text-white')}`}>AA ASTRO</span>
        </div>
        {!currentArticle && (
          <>
            <div className={`hidden md:flex gap-8 text-sm font-medium tracking-wider ${scrolled || activeTab !== 'home' ? 'text-slate-600' : 'text-white/90'}`}>
              {['Home', 'Episodes', 'Services', 'Contact'].map((item) => (
                <button key={item} onClick={() => setActiveTab(item.toLowerCase())} className="hover:text-violet-500 transition-colors uppercase text-xs tracking-widest">{item}</button>
              ))}
            </div>
            <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu className={scrolled || activeTab !== 'home' ? 'text-slate-800' : 'text-white'} />}
            </button>
          </>
        )}
        {currentArticle && <button onClick={handleBackToHome} className="md:hidden text-white/90"><X /></button>}
      </div>
      {isMenuOpen && !currentArticle && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5">
          {['Home', 'Episodes', 'Services', 'Contact'].map((item) => (
            <button key={item} onClick={() => { setActiveTab(item.toLowerCase()); setIsMenuOpen(false); }} className="text-left text-lg font-serif text-slate-800">{item}</button>
          ))}
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
      <StarField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/30 to-[#0f172a] z-0 pointer-events-none"></div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md text-violet-200 text-xs tracking-widest uppercase mb-8 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-1000"><Sparkles size={14} />Vedic Astrology & Conscious Living</div>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight drop-shadow-2xl animate-in fade-in zoom-in duration-1000 delay-150">解读星图中的<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-100 to-indigo-200 italic">灵魂蓝图</span></h1>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">我们不只是预测未来，而是通过古老的印度占星智慧，<br className="hidden md:block"/>帮助你理清当下的混乱，找到属于你的人生节奏。</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <button onClick={() => setActiveTab('services')} className="px-8 py-4 bg-white text-slate-900 rounded-full font-medium hover:bg-violet-50 transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">预约咨询 <ArrowRight size={18} /></button>
          <button onClick={() => setActiveTab('episodes')} className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium hover:bg-white/10 hover:border-white/60 transition-all backdrop-blur-sm">探索知识库</button>
        </div>
      </div>
    </div>
  );

  const Episodes = () => (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">星际科普</h2>
          <p className="text-slate-500 max-w-xl mx-auto">深入浅出的印度占星知识库，从基础概念到进阶技法，带你读懂星星的语言。</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {episodes.map((episode) => (
            <div key={episode.id} onClick={() => handleReadArticle(episode)} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 cursor-pointer relative overflow-hidden hover:-translate-y-1">
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${episode.color}`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold tracking-widest text-violet-600 uppercase bg-violet-50 px-3 py-1 rounded-full">{episode.category}</span>
                  <span className="text-slate-400 text-sm flex items-center gap-1"><BookOpen size={14} /> {episode.readTime}</span>
                </div>
                <h3 className="text-2xl font-serif text-slate-800 mb-3 group-hover:text-violet-700 transition-colors">{episode.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">{episode.subtitle}</p>
                {/* 增加显示互动数据摘要 */}
                <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                   <span className="flex items-center gap-1"><ThumbsUp size={12}/> {episode.stats.likes}</span>
                   <span className="flex items-center gap-1"><Bookmark size={12}/> {episode.stats.saves}</span>
                </div>
                <div className="flex items-center text-violet-600 font-medium text-sm group-hover:translate-x-2 transition-transform">阅读全文 <ArrowRight size={16} className="ml-1" /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
           <button onClick={() => setActiveTab('episodes')} className="px-6 py-3 border border-slate-300 rounded-full text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm tracking-wide">查看更多历史文章</button>
        </div>
      </div>
    </div>
  );

  const Services = () => (
    <div className="pt-32 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">咨询服务</h2>
          <p className="text-slate-500 max-w-xl mx-auto">针对不同的人生领域，提供深度的单项解析报告。<br />文字报告 + 语音答疑，助你清晰看见未来路径。</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {servicesData.map((service) => (
            <div key={service.id} className={`relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${service.color} ${service.popular ? 'border-violet-200 ring-1 ring-violet-100' : 'border-slate-100'}`}>
              {service.popular && <div className="absolute top-0 right-0 bg-rose-500 text-white px-4 py-1 rounded-bl-xl rounded-tr-3xl text-xs font-bold tracking-widest uppercase shadow-sm">热门推荐</div>}
              <div className="flex items-start justify-between mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-slate-700">{service.icon}</div>
                <div className="text-3xl font-serif text-slate-800">{service.price}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">{service.title}</h3>
              <p className="text-sm leading-relaxed mb-6 text-slate-600 min-h-[40px]">{service.desc}</p>
              <div className="bg-white/60 rounded-xl p-5 mb-8 backdrop-blur-sm">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="min-w-4 mt-0.5"><Star size={14} className="text-violet-400" fill="currentColor" /></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleOpenBooking} className="w-full py-4 rounded-xl font-medium transition-all bg-white border border-slate-200 text-slate-700 hover:bg-violet-600 hover:text-white hover:border-violet-600 shadow-sm hover:shadow-lg">预约咨询</button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
           <p className="text-slate-400 text-sm mb-4">需要全盘综合解析或流年大运？</p>
           <button onClick={handleOpenBooking} className="text-violet-600 font-medium border-b border-violet-200 hover:border-violet-600 transition-all">查看更多高阶服务</button>
        </div>
      </div>
    </div>
  );

  const Contact = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const handleSubscribe = (e) => { e.preventDefault(); if (!email) return; setStatus('loading'); setTimeout(() => { setStatus('success'); setEmail(''); }, 1500); };
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
          {status === 'success' ? (
             <div className="py-12 animate-in fade-in zoom-in duration-500">
               <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={32} /></div>
               <h2 className="text-2xl font-serif text-slate-800 mb-2">订阅成功！</h2>
               <p className="text-slate-500">感谢订阅，请留意你的收件箱。</p>
               <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-violet-600 font-medium hover:text-violet-800">返回</button>
             </div>
          ) : (
            <>
              <Mail size={48} className="mx-auto text-violet-500 mb-6" />
              <h2 className="text-3xl font-serif text-slate-800 mb-4">订阅我们的周刊</h2>
              <p className="text-slate-500 mb-8">每周一发送，包含本周星象预警、转运建议以及最新的印占科普文章。<br/>无垃圾邮件，随时可退订。</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-12">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-violet-500 transition-colors" />
                <button type="submit" disabled={status === 'loading'} className="px-8 py-4 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]">{status === 'loading' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '订阅'}</button>
              </form>
              <div className="border-t border-slate-100 pt-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">或者直接联系我们</h3>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2 text-slate-600 group cursor-pointer" onClick={handleOpenBooking}>
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"><MessageCircle size={24} /></div>
                    <span className="text-sm font-medium text-slate-700">微信: aa_astro</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-serif text-slate-200"><Moon size={16} fill="currentColor" /><span className="font-bold tracking-wide">AA ASTRO</span></div>
        <div className="text-sm">© 2024 AA Astro. All rights reserved.</div>
        <div className="flex gap-6 text-sm"><a href="#" className="hover:text-white transition-colors">隐私政策</a><a href="#" className="hover:text-white transition-colors">服务条款</a></div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-violet-200">
      <Navigation />
      
      {/* 全局预约弹窗 */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <main>
        {currentArticle ? (
          <ArticlePage article={currentArticle} onBack={handleBackToHome} />
        ) : (
          <>
            {activeTab === 'home' && <><Hero /><Episodes /><Services /><Contact /></>}
            {activeTab === 'episodes' && <Episodes />}
            {activeTab === 'services' && <Services />}
            {activeTab === 'contact' && <Contact />}
          </>
        )}
      </main>

      {!currentArticle && <Footer />}
    </div>
  );
};

export default App;
