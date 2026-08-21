(() => {
  "use strict";

  const STORAGE_KEY = "heshu-video-p0-prototype-v1";

  const roleMeta = {
    director: { label: "编导", user: "李斯仪" },
    editor: { label: "剪辑", user: "陈琳" },
    buyer: { label: "投手", user: "周嘉" },
    operator: { label: "运营", user: "许澄" }
  };

  const viewMeta = {
    workbench: { label: "我的工作台", kicker: "WORKBENCH" },
    shoots: { label: "拍摄任务", kicker: "SHOOT TASKS" },
    edits: { label: "剪辑任务", kicker: "EDIT TASKS" },
    finals: { label: "视频成片", kicker: "FINAL ASSETS" },
    materials: { label: "内容素材库", kicker: "CONTENT MATERIALS" },
    topics: { label: "选题脚本", kicker: "TOPICS & SCRIPTS" },
    raws: { label: "视频原片", kicker: "RAW ASSETS" }
  };

  const shootStatus = {
    DRAFT: { label: "草稿", tone: "neutral" },
    READY_TO_SHOOT: { label: "待拍摄", tone: "info" },
    SHOT: { label: "已拍摄待补录", tone: "warning" },
    MATERIAL_UPLOADING: { label: "原片上传中", tone: "accent" },
    READY_TO_ASSIGN: { label: "待分配剪辑", tone: "warning" },
    IN_EDITING: { label: "剪辑中", tone: "accent" },
    COMPLETED: { label: "已完成", tone: "success" },
    CANCELLED: { label: "已取消", tone: "error" }
  };

  const editStatus = {
    UNASSIGNED: { label: "待分配", tone: "warning" },
    TODO: { label: "待剪辑", tone: "info" },
    IN_PROGRESS: { label: "剪辑中", tone: "accent" },
    SUBMITTED: { label: "待审片", tone: "warning" },
    REVISION_REQUIRED: { label: "待修改", tone: "error" },
    APPROVED: { label: "审片通过", tone: "success" },
    REOPENED_FOR_AUDIT: { label: "卡审修改", tone: "error" },
    CLOSED: { label: "已结束", tone: "success" },
    CANCELLED: { label: "已取消", tone: "error" }
  };

  const platformStatus = {
    NOT_UPLOADED: { label: "未上传", tone: "neutral" },
    UPLOAD_PENDING: { label: "待上传", tone: "warning" },
    UPLOADING: { label: "上传中", tone: "accent" },
    UNDER_REVIEW: { label: "平台审核中", tone: "info" },
    APPROVED: { label: "审核通过", tone: "success" },
    REJECTED: { label: "审核不通过", tone: "error" },
    REUPLOAD_REQUIRED: { label: "待重新上传", tone: "warning" },
    INVALID: { label: "平台素材失效", tone: "error" }
  };

  const priorityMeta = {
    URGENT: { label: "紧急", tone: "error" },
    HIGH: { label: "高", tone: "warning" },
    NORMAL: { label: "普通", tone: "neutral" },
    LOW: { label: "低", tone: "info" }
  };

  const topicTypeMeta = {
    HOME: "主页脚本",
    PAID: "投流脚本"
  };

  const businessLineOptions = ["教育规划", "大场", "豆神双语"];

  const materialTypeMeta = {
    FINAL: { label: "成片", tone: "accent", icon: "film" },
    RAW: { label: "原片", tone: "info", icon: "folder" },
    SCRIPT: { label: "脚本", tone: "neutral", icon: "file" },
    HOOK: { label: "开头", tone: "warning", icon: "play" },
    TITLE: { label: "标题", tone: "success", icon: "file" },
    EXTERNAL: { label: "外部素材", tone: "neutral", icon: "layers" }
  };

  const materialStage = {
    TO_ORGANIZE: { label: "待整理", tone: "warning", step: 1 },
    READY: { label: "可复用", tone: "success", step: 2 },
    IN_USE: { label: "使用中", tone: "accent", step: 3 },
    RESTRICTED: { label: "受限", tone: "error", step: 4 },
    ARCHIVED: { label: "已归档", tone: "neutral", step: 5 }
  };

  const materialAvailability = {
    AVAILABLE: { label: "可复用", tone: "success" },
    RESTRICTED: { label: "限制使用", tone: "warning" },
    RETIRED: { label: "已停用", tone: "error" },
    ARCHIVED: { label: "已归档", tone: "neutral" }
  };

  const materialCompliance = {
    NOT_REVIEWED: { label: "未复核", tone: "neutral" },
    PASSED: { label: "合规通过", tone: "success" },
    RISKY: { label: "需注意", tone: "warning" },
    BLOCKED: { label: "不可投放", tone: "error" }
  };

  const materialPerformance = {
    UNTESTED: { label: "未测试", tone: "neutral" },
    LEARNING: { label: "测试中", tone: "info" },
    RISING: { label: "趋势上升", tone: "accent" },
    HIGH_POTENTIAL: { label: "高潜", tone: "success" },
    STABLE: { label: "稳定复用", tone: "success" },
    DECAYING: { label: "表现衰减", tone: "warning" }
  };

  const permissions = {
    createShoot: ["director"],
    uploadRaw: ["director", "editor"],
    assignEdit: ["director"],
    startEdit: ["editor"],
    submitEdit: ["editor"],
    reviewEdit: ["director"],
    publish: ["buyer", "operator"],
    audit: ["buyer", "operator"],
    reopenAudit: ["director", "buyer", "operator"],
    createTopic: ["director"],
    organizeMaterial: ["director", "buyer", "operator"],
    createCollection: ["director", "buyer", "operator"],
    createReedit: ["director", "buyer", "operator"],
    restrictMaterial: ["director", "operator"],
    registerExternalMaterial: ["director", "operator"]
  };

  const seedState = () => ({
    version: 2,
    currentRole: "director",
    currentView: "workbench",
    shoots: [
      {
        id: "ST-0729-01",
        name: "0729 拍摄任务｜幼儿园兴趣班天坑",
        topicId: "TP-250729-01",
        topic: "幼儿园兴趣班避坑",
        status: "IN_EDITING",
        director: "李斯仪",
        ip: "阿留老师",
        location: "深圳办公室",
        date: "2026-07-29",
        scenes: "办公桌正面、白板区",
        wardrobe: "浅灰衬衫",
        equipment: "A 机位 + 领夹麦",
        scriptCount: 3,
        rawCount: 5,
        note: "三条脚本同场拍摄；开头需要各保留一版停顿。",
        scripts: [
          { title: "兴趣班最容易踩的三个坑", opening: "兴趣班不是报得越多越好。", editNote: "前 3 秒保留问题句，字幕突出“三个坑”。" },
          { title: "家长最常见的跟风选择", opening: "别人家孩子报什么，不等于你家也该报。", editNote: "用两段原片交叉剪，节奏偏快。" },
          { title: "怎么判断孩子真的感兴趣", opening: "先别看孩子说喜不喜欢，看这三个行为。", editNote: "行为关键词分条展示。" }
        ]
      },
      {
        id: "ST-0819-02",
        name: "0819 拍摄任务｜留学家长常见决策误区",
        topicId: "TP-250819-02",
        topic: "留学决策误区",
        status: "READY_TO_ASSIGN",
        director: "李斯仪",
        ip: "阿留老师",
        location: "深圳直播间",
        date: "2026-08-19",
        scenes: "书架区",
        wardrobe: "深蓝针织",
        equipment: "双机位 + 提词器",
        scriptCount: 2,
        rawCount: 3,
        note: "需要优先剪出“只看排名”这一条。",
        scripts: [
          { title: "只看学校排名为什么会选错", opening: "排名不是没用，但它不能替你做决定。", editNote: "保留完整论证，控制 60 秒内。" },
          { title: "先选国家还是先选专业", opening: "这个顺序错了，后面每一步都会更贵。", editNote: "重点数字用字幕卡呈现。" }
        ]
      },
      {
        id: "ST-0820-03",
        name: "0820 拍摄任务｜暑期规划最后一个月",
        topicId: "TP-250820-03",
        topic: "暑期收尾规划",
        status: "READY_TO_SHOOT",
        director: "李斯仪",
        ip: "状元阿留",
        location: "待确认",
        date: "2026-08-22",
        scenes: "待确认",
        wardrobe: "待确认",
        equipment: "待确认",
        scriptCount: 1,
        rawCount: 0,
        note: "等待场地确认。",
        scripts: [
          { title: "开学前四周该做什么", opening: "最后四周，不要再塞新计划。", editNote: "按周拆分，节奏稳。" }
        ]
      }
    ],
    edits: [
      {
        id: "ED-0729-01",
        shootId: "ST-0729-01",
        title: "兴趣班最容易踩的三个坑",
        editor: "陈琳",
        priority: "HIGH",
        status: "SUBMITTED",
        due: "2026-08-20",
        selectedOpening: "兴趣班不是报得越多越好。",
        selectedTitle: "幼儿园兴趣班，家长最容易踩的 3 个坑",
        revision: 1,
        finalId: null,
        history: [
          { at: "2026-08-19 10:30", actor: "李斯仪", action: "分配剪辑任务", note: "优先处理，标题不要制造恐慌。" },
          { at: "2026-08-20 09:20", actor: "陈琳", action: "提交第 1 版", note: "已按脚本压缩到 54 秒。" }
        ]
      },
      {
        id: "ED-0729-02",
        shootId: "ST-0729-01",
        title: "家长最常见的跟风选择",
        editor: "王澈",
        priority: "NORMAL",
        status: "REVISION_REQUIRED",
        due: "2026-08-21",
        selectedOpening: "别人家孩子报什么，不等于你家也该报。",
        selectedTitle: "兴趣班别跟风，先看孩子这 2 个反应",
        revision: 1,
        finalId: null,
        history: [
          { at: "2026-08-19 11:10", actor: "李斯仪", action: "分配剪辑任务", note: "正常排期。" },
          { at: "2026-08-20 11:45", actor: "王澈", action: "提交第 1 版", note: "已完成初版。" },
          { at: "2026-08-20 14:10", actor: "李斯仪", action: "退回修改", note: "00:18–00:26 论点重复；结尾补一个明确判断。" }
        ]
      },
      {
        id: "ED-0819-01",
        shootId: "ST-0819-02",
        title: "只看学校排名为什么会选错",
        editor: "陈琳",
        priority: "URGENT",
        status: "TODO",
        due: "2026-08-20",
        selectedOpening: "",
        selectedTitle: "",
        revision: 0,
        finalId: null,
        history: [
          { at: "2026-08-20 08:45", actor: "李斯仪", action: "分配剪辑任务", note: "今天优先完成。" }
        ]
      },
      {
        id: "ED-0729-03",
        shootId: "ST-0729-01",
        title: "怎么判断孩子真的感兴趣",
        editor: "陈琳",
        priority: "NORMAL",
        status: "APPROVED",
        due: "2026-08-19",
        selectedOpening: "先别看孩子说喜不喜欢，看这三个行为。",
        selectedTitle: "孩子是不是真喜欢兴趣班，看这 3 个行为",
        revision: 2,
        finalId: "FN-0729-03",
        history: [
          { at: "2026-08-18 16:20", actor: "陈琳", action: "提交第 1 版", note: "初版 61 秒。" },
          { at: "2026-08-18 17:40", actor: "李斯仪", action: "退回修改", note: "开头压缩到 3 秒，删掉第二段重复句。" },
          { at: "2026-08-19 10:05", actor: "陈琳", action: "提交第 2 版", note: "已完成修改。" },
          { at: "2026-08-19 10:30", actor: "李斯仪", action: "审片通过", note: "进入成片中心。" }
        ]
      }
    ],
    finals: [
      {
        id: "FN-0729-03",
        editId: "ED-0729-03",
        shootId: "ST-0729-01",
        title: "孩子是不是真喜欢兴趣班，看这 3 个行为",
        fileName: "阿留老师_幼儿园兴趣班_真实兴趣判断_v2_0729.mp4",
        duration: "00:00:56",
        size: "186 MB",
        approvedAt: "2026-08-19 10:30",
        editor: "陈琳",
        rawIds: ["RW-0729-01", "RW-0729-02"],
        platforms: [
          { id: "PM-001", platform: "抖音", account: "阿留状元教育", materialId: "DY-DEMO-63591358485", url: "", status: "APPROVED", publishedAt: "2026-08-19 16:00", reason: "" },
          { id: "PM-002", platform: "小红书", account: "阿留家庭教育", materialId: "XHS-DEMO-42064447957", url: "", status: "REJECTED", publishedAt: "2026-08-19 16:15", reason: "标题承诺表达需调整，等待人工确认。" }
        ]
      },
      {
        id: "FN-0718-02",
        editId: "ED-0718-02",
        shootId: "ST-0718-01",
        title: "暑期计划做不下去，先删掉这三件事",
        fileName: "状元阿留_暑期规划_计划减法_v1_0718.mp4",
        duration: "00:01:08",
        size: "224 MB",
        approvedAt: "2026-08-18 15:20",
        editor: "王澈",
        rawIds: ["RW-0718-01"],
        platforms: []
      }
    ],
    topics: [
      { id: "TP-250729-01", title: "幼儿园兴趣班避坑", topicType: "HOME", businessLines: ["教育规划"], product: "家庭教育", ip: "阿留老师", owner: "李斯仪", scriptCount: 3, finalCount: 1, updatedAt: "2026-08-20 14:10" },
      { id: "TP-250819-02", title: "留学家长常见决策误区", topicType: "PAID", businessLines: ["教育规划", "大场"], product: "留学规划", ip: "阿留老师", owner: "李斯仪", scriptCount: 2, finalCount: 0, updatedAt: "2026-08-20 08:45" },
      { id: "TP-250820-03", title: "暑期收尾规划", topicType: "HOME", businessLines: ["教育规划"], product: "家庭教育", ip: "状元阿留", owner: "李斯仪", scriptCount: 1, finalCount: 0, updatedAt: "2026-08-20 09:00" },
      { id: "TP-250718-01", title: "暑期计划减法", topicType: "PAID", businessLines: ["教育规划", "豆神双语"], product: "家庭教育", ip: "状元阿留", owner: "李斯仪", scriptCount: 2, finalCount: 1, updatedAt: "2026-08-18 15:20" }
    ],
    raws: [
      { id: "RW-0729-01", shootId: "ST-0729-01", fileName: "0729_阿留老师_兴趣班_机位A_镜01.mp4", scene: "办公桌正面", camera: "A 机位", shot: "镜 01", size: "1.8 GB", duration: "00:08:12", usedBy: ["FN-0729-03"], uploadedAt: "2026-07-29 17:20" },
      { id: "RW-0729-02", shootId: "ST-0729-01", fileName: "0729_阿留老师_兴趣班_机位B_镜01.mp4", scene: "办公桌侧面", camera: "B 机位", shot: "镜 01", size: "1.3 GB", duration: "00:08:18", usedBy: ["FN-0729-03"], uploadedAt: "2026-07-29 17:24" },
      { id: "RW-0729-03", shootId: "ST-0729-01", fileName: "0729_阿留老师_兴趣班_机位A_镜02.mp4", scene: "白板区", camera: "A 机位", shot: "镜 02", size: "1.1 GB", duration: "00:05:48", usedBy: [], uploadedAt: "2026-07-29 17:31" },
      { id: "RW-0819-01", shootId: "ST-0819-02", fileName: "0819_阿留老师_留学排名_机位A_镜01.mp4", scene: "书架区", camera: "A 机位", shot: "镜 01", size: "2.2 GB", duration: "00:11:26", usedBy: [], uploadedAt: "2026-08-19 18:05" },
      { id: "RW-0819-02", shootId: "ST-0819-02", fileName: "0819_阿留老师_留学排名_机位B_镜01.mp4", scene: "书架区", camera: "B 机位", shot: "镜 01", size: "1.7 GB", duration: "00:11:31", usedBy: [], uploadedAt: "2026-08-19 18:08" },
      { id: "RW-0819-03", shootId: "ST-0819-02", fileName: "0819_阿留老师_留学国家专业_机位A_镜02.mp4", scene: "书架区", camera: "A 机位", shot: "镜 02", size: "1.9 GB", duration: "00:09:50", usedBy: [], uploadedAt: "2026-08-19 18:13" },
      { id: "RW-0718-01", shootId: "ST-0718-01", fileName: "0718_状元阿留_暑期规划_机位A_镜01.mp4", scene: "直播间", camera: "A 机位", shot: "镜 01", size: "1.6 GB", duration: "00:07:12", usedBy: ["FN-0718-02"], uploadedAt: "2026-07-18 16:40" }
    ],
    materials: [
      { id: "MAT-FINAL-FN-0729-03", sourceType: "FINAL", sourceId: "FN-0729-03", tags: ["家庭教育", "兴趣班", "行为判断"], stage: "IN_USE", availability: "AVAILABLE", compliance: "RISKY", performance: "STABLE", owner: "许澄", note: "抖音已通过；小红书标题表达需调整后再用。", updatedAt: "2026-08-20 15:10" },
      { id: "MAT-FINAL-FN-0718-02", sourceType: "FINAL", sourceId: "FN-0718-02", tags: ["家庭教育", "暑期规划", "计划管理"], stage: "READY", availability: "AVAILABLE", compliance: "PASSED", performance: "UNTESTED", owner: "许澄", note: "成片已入库，尚未登记平台使用。", updatedAt: "2026-08-20 11:20" },
      { id: "MAT-RAW-RW-0729-03", sourceType: "RAW", sourceId: "RW-0729-03", tags: ["白板", "正面表达", "未使用"], stage: "READY", availability: "AVAILABLE", compliance: "NOT_REVIEWED", performance: "UNTESTED", owner: "李斯仪", note: "白板段落尚未进入任何成片，可优先检索。", updatedAt: "2026-08-20 10:30" },
      { id: "MAT-HOOK-ST-0729-01-03", sourceType: "HOOK", sourceId: "ST-0729-01:2", tags: ["三秒开头", "行为判断", "家长焦虑"], stage: "IN_USE", availability: "AVAILABLE", compliance: "PASSED", performance: "HIGH_POTENTIAL", owner: "李斯仪", note: "已在通过成片中使用，可继续做同主题变体。", updatedAt: "2026-08-20 14:40" }
    ],
    collections: [
      { id: "COL-001", name: "兴趣班避坑复用包", description: "围绕兴趣班判断、跟风与避坑，供重剪和同主题续作直接取用。", owner: "李斯仪", materialIds: ["MAT-FINAL-FN-0729-03", "MAT-RAW-RW-0729-01", "MAT-RAW-RW-0729-02", "MAT-HOOK-ST-0729-01-03", "MAT-TITLE-ST-0729-01-03"], createdAt: "2026-08-20 10:00", updatedAt: "2026-08-20 15:10" },
      { id: "COL-002", name: "待重剪与卡审修正", description: "集中管理平台卡审、结构失效或需要替换标题开头的素材。", owner: "许澄", materialIds: ["MAT-FINAL-FN-0729-03", "MAT-TITLE-ST-0729-01-03"], createdAt: "2026-08-20 14:20", updatedAt: "2026-08-20 15:10" }
    ]
  });

  let state = loadState();
  ensureTopicSchema();
  ensureMaterialIndex();
  persist();
  const runtime = {
    filters: {
      shoots: "",
      edits: "",
      editStatus: "ALL",
      finals: "",
      topics: "",
      raws: "",
      materials: "",
      materialType: "ALL",
      materialStage: "ALL",
      materialAvailability: "ALL",
      materialCompliance: "ALL",
      materialCollection: "ALL",
      materialView: "cards"
    },
    dialogSubmit: null,
    activeDrawer: null,
    activeCommandIndex: 0,
    commandItems: [],
    upload: null
  };

  const el = {
    shell: document.querySelector("#appShell"),
    view: document.querySelector("#appView"),
    viewLabel: document.querySelector("#currentViewLabel"),
    role: document.querySelector("#roleSelect"),
    mobileMenu: document.querySelector("#mobileMenu"),
    mobileScrim: document.querySelector("#mobileScrim"),
    drawer: document.querySelector("#detailDrawer"),
    drawerScrim: document.querySelector("#drawerScrim"),
    drawerKicker: document.querySelector("#drawerKicker"),
    drawerTitle: document.querySelector("#drawerTitle"),
    drawerBody: document.querySelector("#drawerBody"),
    closeDrawer: document.querySelector("#closeDrawer"),
    dialog: document.querySelector("#appDialog"),
    dialogForm: document.querySelector("#dialogForm"),
    dialogKicker: document.querySelector("#dialogKicker"),
    dialogTitle: document.querySelector("#dialogTitle"),
    dialogBody: document.querySelector("#dialogBody"),
    dialogSubmit: document.querySelector("#dialogSubmit"),
    commandButton: document.querySelector("#commandButton"),
    commandDialog: document.querySelector("#commandDialog"),
    commandInput: document.querySelector("#commandInput"),
    commandResults: document.querySelector("#commandResults"),
    toastRegion: document.querySelector("#toastRegion"),
    announcer: document.querySelector("#statusAnnouncer"),
    resetDemo: document.querySelector("#resetDemo")
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.version) {
        const defaults = seedState();
        return {
          ...defaults,
          ...saved,
          version: 2,
          materials: Array.isArray(saved.materials) ? saved.materials : defaults.materials,
          collections: Array.isArray(saved.collections) ? saved.collections : defaults.collections
        };
      }
    } catch (error) {
      console.warn("演示数据读取失败，将使用初始数据。", error);
    }
    return seedState();
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function nowText() {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date()).replaceAll("/", "-");
  }

  function can(action) {
    return permissions[action]?.includes(state.currentRole) ?? false;
  }

  function statusBadge(code, map) {
    const meta = map[code] || { label: code, tone: "neutral" };
    return `<span class="status-badge" data-tone="${meta.tone}">${escapeHtml(meta.label)}</span>`;
  }

  function priorityBadge(code) {
    const meta = priorityMeta[code] || priorityMeta.NORMAL;
    return `<span class="priority-badge" data-tone="${meta.tone}">${escapeHtml(meta.label)}</span>`;
  }

  function icon(name) {
    return `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  }

  function demoBadge() {
    return `<span class="demo-badge">演示数据</span>`;
  }

  function findShoot(id) { return state.shoots.find((item) => item.id === id); }
  function findEdit(id) { return state.edits.find((item) => item.id === id); }
  function findFinal(id) { return state.finals.find((item) => item.id === id); }
  function findTopic(id) { return state.topics.find((item) => item.id === id); }
  function findRaw(id) { return state.raws.find((item) => item.id === id); }
  function findMaterial(id) { return state.materials.find((item) => item.id === id); }
  function findCollection(id) { return state.collections.find((item) => item.id === id); }

  function ensureTopicSchema() {
    state.topics.forEach((topic) => {
      if (!topic.topicType) topic.topicType = "HOME";
      if (!Array.isArray(topic.businessLines) || !topic.businessLines.length) topic.businessLines = ["教育规划"];
    });
  }

  function ensureMaterialIndex() {
    if (!Array.isArray(state.materials)) state.materials = [];
    if (!Array.isArray(state.collections)) state.collections = [];
    const existing = new Map(state.materials.map((item) => [item.id, item]));
    const generated = [];
    const add = (item) => {
      const saved = existing.get(item.id);
      generated.push(saved ? { ...item, ...saved, tags: Array.isArray(saved.tags) ? saved.tags : item.tags } : item);
    };

    state.finals.forEach((final) => {
      const shoot = findShoot(final.shootId);
      const hasRisk = final.platforms.some((row) => row.status === "REJECTED" || row.status === "REUPLOAD_REQUIRED");
      add({
        id: `MAT-FINAL-${final.id}`,
        sourceType: "FINAL",
        sourceId: final.id,
        tags: [shoot?.topic, shoot?.ip, "成片"].filter(Boolean),
        stage: final.platforms.length ? "IN_USE" : "READY",
        availability: "AVAILABLE",
        compliance: hasRisk ? "RISKY" : "PASSED",
        performance: "UNTESTED",
        owner: final.editor,
        note: hasRisk ? "存在平台卡审记录，复用前请核对标题和表达。" : "由审片通过自动进入内容素材索引。",
        updatedAt: final.approvedAt
      });
    });

    state.raws.forEach((raw) => {
      const shoot = findShoot(raw.shootId);
      add({
        id: `MAT-RAW-${raw.id}`,
        sourceType: "RAW",
        sourceId: raw.id,
        tags: [shoot?.topic, shoot?.ip, raw.scene, raw.camera].filter(Boolean),
        stage: raw.usedBy.length ? "IN_USE" : "READY",
        availability: "AVAILABLE",
        compliance: "NOT_REVIEWED",
        performance: "UNTESTED",
        owner: shoot?.director || "待认领",
        note: raw.usedBy.length ? `已被 ${raw.usedBy.length} 条成片引用。` : "尚未进入成片，可作为新剪辑来源。",
        updatedAt: raw.uploadedAt
      });
    });

    state.shoots.forEach((shoot) => {
      shoot.scripts.forEach((script, index) => {
        const suffix = `${shoot.id}-${String(index + 1).padStart(2, "0")}`;
        const relatedEdits = state.edits.filter((edit) => edit.shootId === shoot.id && edit.title === script.title);
        const isUsed = relatedEdits.length > 0;
        const common = {
          sourceId: `${shoot.id}:${index}`,
          tags: [shoot.topic, shoot.ip].filter(Boolean),
          stage: isUsed ? "IN_USE" : "READY",
          availability: "AVAILABLE",
          compliance: "NOT_REVIEWED",
          performance: "UNTESTED",
          owner: shoot.director,
          updatedAt: shoot.date
        };
        add({ ...common, id: `MAT-SCRIPT-${suffix}`, sourceType: "SCRIPT", tags: [...common.tags, "脚本"], note: script.editNote || "由拍摄任务脚本自动索引。" });
        add({ ...common, id: `MAT-HOOK-${suffix}`, sourceType: "HOOK", tags: [...common.tags, "开头"], note: "来自脚本开头，可用于同主题改写或重剪。" });
        add({ ...common, id: `MAT-TITLE-${suffix}`, sourceType: "TITLE", tags: [...common.tags, "标题"], note: "来自脚本标题，可与开头和成片组合复用。" });
      });
    });

    state.materials.filter((item) => item.sourceType === "EXTERNAL").forEach((item) => {
      if (!generated.some((row) => row.id === item.id)) generated.push(item);
    });
    state.materials = generated;
  }

  function materialDescriptor(material) {
    const base = { title: material.title || "未命名素材", summary: material.note || "", shoot: null, source: null, meta: [], content: "" };
    if (material.sourceType === "FINAL") {
      const final = findFinal(material.sourceId);
      const shoot = final ? findShoot(final.shootId) : null;
      return {
        ...base,
        title: final?.title || material.title || material.sourceId,
        summary: final?.fileName || material.note,
        shoot,
        source: final,
        meta: [final?.duration, final?.size, final?.editor].filter(Boolean),
        content: final?.fileName || ""
      };
    }
    if (material.sourceType === "RAW") {
      const raw = findRaw(material.sourceId);
      const shoot = raw ? findShoot(raw.shootId) : null;
      return {
        ...base,
        title: raw?.fileName || material.title || material.sourceId,
        summary: [raw?.scene, raw?.camera, raw?.shot].filter(Boolean).join(" · "),
        shoot,
        source: raw,
        meta: [raw?.duration, raw?.size].filter(Boolean),
        content: raw?.fileName || ""
      };
    }
    if (["SCRIPT", "HOOK", "TITLE"].includes(material.sourceType)) {
      const [shootId, indexValue] = material.sourceId.split(":");
      const shoot = findShoot(shootId);
      const script = shoot?.scripts[Number(indexValue)];
      const title = material.sourceType === "HOOK" ? script?.opening : script?.title;
      const summary = material.sourceType === "SCRIPT" ? script?.opening : material.sourceType === "TITLE" ? script?.opening : script?.title;
      return {
        ...base,
        title: title || material.title || material.sourceId,
        summary: summary || material.note,
        shoot,
        source: script,
        meta: [shoot?.topic, shoot?.ip].filter(Boolean),
        content: [script?.title, script?.opening, script?.editNote].filter(Boolean).join("\n")
      };
    }
    return {
      ...base,
      title: material.title || "外部素材",
      summary: material.sourceName || material.note || "人工登记的外部内容素材。",
      meta: [material.origin, material.owner].filter(Boolean),
      content: material.url || material.note || ""
    };
  }

  function materialCollections(materialId) {
    return state.collections.filter((collection) => collection.materialIds.includes(materialId));
  }

  function materialUsage(material) {
    if (material.sourceType === "FINAL") return findFinal(material.sourceId)?.platforms || [];
    if (material.sourceType === "RAW") {
      const raw = findRaw(material.sourceId);
      return (raw?.usedBy || []).map((id) => findFinal(id)).filter(Boolean);
    }
    if (["SCRIPT", "HOOK", "TITLE"].includes(material.sourceType)) {
      const [shootId, indexValue] = material.sourceId.split(":");
      const shoot = findShoot(shootId);
      const script = shoot?.scripts[Number(indexValue)];
      return state.edits.filter((edit) => edit.shootId === shootId && (!script || edit.title === script.title));
    }
    return [];
  }

  function pageHeader(title, description, actionHtml = "") {
    return `
      <header class="page-header">
        <div class="page-header__copy">
          <span class="mono-label">${viewMeta[state.currentView].kicker}</span>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(description)}</p>
        </div>
        <div class="page-actions">${demoBadge()}${actionHtml}</div>
      </header>`;
  }

  function button(label, action, id = "", options = {}) {
    const classes = ["button", options.primary ? "button--primary" : "button--quiet", options.text ? "button--text" : ""].filter(Boolean).join(" ");
    const disabled = options.disabled ? "disabled aria-disabled=\"true\"" : "";
    const title = options.title ? `title="${escapeHtml(options.title)}"` : "";
    const iconHtml = options.icon ? icon(options.icon) : "";
    return `<button class="${classes}" type="button" data-action="${action}" data-id="${escapeHtml(id)}" ${disabled} ${title}>${iconHtml}${escapeHtml(label)}</button>`;
  }

  function render() {
    if (!viewMeta[state.currentView]) state.currentView = "workbench";
    el.role.value = state.currentRole;
    el.viewLabel.textContent = viewMeta[state.currentView].label;
    document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
      const active = item.dataset.view === state.currentView;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    updateNavCounts();

    const renderer = {
      workbench: renderWorkbench,
      shoots: renderShoots,
      edits: renderEdits,
      finals: renderFinals,
      materials: renderMaterials,
      topics: renderTopics,
      raws: renderRaws
    }[state.currentView];
    el.view.innerHTML = renderer();
  }

  function updateNavCounts() {
    const shootCount = state.shoots.filter((item) => ["READY_TO_SHOOT", "SHOT", "MATERIAL_UPLOADING", "READY_TO_ASSIGN", "IN_EDITING"].includes(item.status)).length;
    const editCount = state.edits.filter((item) => ["TODO", "IN_PROGRESS", "SUBMITTED", "REVISION_REQUIRED", "REOPENED_FOR_AUDIT"].includes(item.status)).length;
    const finalCount = state.finals.filter((item) => overallFinalStatus(item).code !== "ALL_APPROVED").length;
    const materialCount = state.materials.filter((item) => ["TO_ORGANIZE", "RESTRICTED"].includes(item.stage)).length;
    [["shoots", shootCount], ["edits", editCount], ["finals", finalCount], ["materials", materialCount]].forEach(([name, count]) => {
      const countNode = document.querySelector(`[data-count="${name}"]`);
      countNode.textContent = count;
      countNode.hidden = count === 0;
    });
  }

  function taskQueueForRole() {
    if (state.currentRole === "director") {
      return [
        ...state.edits.filter((item) => item.status === "SUBMITTED").map((item) => ({ type: "edit", id: item.id, title: item.title, meta: `待审片 · ${item.editor}`, status: item.status, map: editStatus })),
        ...state.shoots.filter((item) => item.status === "READY_TO_ASSIGN").map((item) => ({ type: "shoot", id: item.id, title: item.name, meta: `待分配剪辑 · ${item.rawCount} 条原片`, status: item.status, map: shootStatus })),
        ...state.edits.filter((item) => item.status === "REVISION_REQUIRED").map((item) => ({ type: "edit", id: item.id, title: item.title, meta: `修改处理中 · ${item.editor}`, status: item.status, map: editStatus }))
      ];
    }
    if (state.currentRole === "editor") {
      return state.edits
        .filter((item) => item.editor === roleMeta.editor.user && ["TODO", "IN_PROGRESS", "REVISION_REQUIRED", "REOPENED_FOR_AUDIT"].includes(item.status))
        .map((item) => ({ type: "edit", id: item.id, title: item.title, meta: `${priorityMeta[item.priority].label}优先级 · 截止 ${item.due}`, status: item.status, map: editStatus }));
    }
    return state.finals
      .filter((item) => overallFinalStatus(item).code !== "ALL_APPROVED")
      .map((item) => ({ type: "final", id: item.id, title: item.title, meta: `${item.platforms.length} 条平台记录`, status: overallFinalStatus(item).code, map: overallStatusMap }));
  }

  const overallStatusMap = {
    NOT_PUBLISHED: { label: "待发布", tone: "warning" },
    ALL_APPROVED: { label: "全部通过", tone: "success" },
    PARTIAL: { label: "部分完成", tone: "info" },
    REJECTED: { label: "存在卡审", tone: "error" }
  };

  function overallFinalStatus(final) {
    const rows = final.platforms || [];
    if (!rows.length) return { code: "NOT_PUBLISHED", ...overallStatusMap.NOT_PUBLISHED };
    if (rows.some((item) => item.status === "REJECTED" || item.status === "REUPLOAD_REQUIRED")) return { code: "REJECTED", ...overallStatusMap.REJECTED };
    if (rows.every((item) => item.status === "APPROVED")) return { code: "ALL_APPROVED", ...overallStatusMap.ALL_APPROVED };
    return { code: "PARTIAL", ...overallStatusMap.PARTIAL };
  }

  function renderWorkbench() {
    const queue = taskQueueForRole();
    const submitted = state.edits.filter((item) => item.status === "SUBMITTED").length;
    const editing = state.edits.filter((item) => ["TODO", "IN_PROGRESS", "REVISION_REQUIRED", "REOPENED_FOR_AUDIT"].includes(item.status)).length;
    const publish = state.finals.filter((item) => overallFinalStatus(item).code === "NOT_PUBLISHED").length;
    const rejected = state.finals.reduce((count, item) => count + item.platforms.filter((row) => row.status === "REJECTED").length, 0);
    const secondaryMetric = state.currentRole === "director" ? { value: submitted, label: "待审片", note: "需要编导处理" }
      : state.currentRole === "editor" ? { value: editing, label: "进行中剪辑", note: "含待修改与卡审修改" }
      : { value: publish, label: "待发布成片", note: "尚无平台记录" };

    const roleDescription = {
      director: "集中处理拍摄补录、剪辑分配与审片。",
      editor: "从原片领取到成片提交，所有修改记录留在同一任务。",
      buyer: "登记成片发布、素材 ID 和各平台独立审核结果。",
      operator: "追踪待发布、平台卡审与内容资产上下游关系。"
    }[state.currentRole];

    return `
      <section class="page">
        ${pageHeader(`${roleMeta[state.currentRole].label}工作台`, roleDescription)}
        <section class="metric-board" aria-label="演示任务统计">
          <article class="metric is-primary">
            <span class="metric__label">我的待办</span>
            <strong class="metric__value">${queue.length}</strong>
            <span class="metric__note">按当前角色实时计算</span>
          </article>
          <article class="metric">
            <span class="metric__label">${secondaryMetric.label}</span>
            <strong class="metric__value">${secondaryMetric.value}</strong>
            <span class="metric__note">${secondaryMetric.note}</span>
          </article>
          <article class="metric">
            <span class="metric__label">卡审待处理</span>
            <strong class="metric__value">${rejected}</strong>
            <span class="metric__note">平台状态互不覆盖</span>
          </article>
        </section>

        <div class="dashboard-layout">
          <section class="queue-panel">
            <header class="queue-panel__header">
              <h2>优先处理</h2>
              <span class="mono-label">${queue.length} ITEMS</span>
            </header>
            ${queue.length ? `<ul class="queue-list">${queue.map(renderQueueItem).join("")}</ul>` : renderEmpty("当前角色没有待办", "切换角色或进入任务列表查看全部演示数据。", "workbench")}
          </section>
          <section class="panel">
            <header class="panel__header"><h2>生产闭环</h2><span class="mono-label">P0 FLOW</span></header>
            <div class="panel__body">
              <ol class="steps">
                ${step("01", "拍摄与脚本", "建立任务、脚本与实际拍摄信息。", "complete")}
                ${step("02", "原片与剪辑", "原片关联镜号，分配剪辑负责人。", "complete")}
                ${step("03", "提交与审片", "修订版、意见与通过记录留痕。", "current")}
                ${step("04", "发布与卡审", "每个平台、账户独立保存审核状态。", "")}
                ${step("05", "素材沉淀与复用", "成片、原片、脚本和开头进入统一索引。", "")}
              </ol>
            </div>
          </section>
        </div>
      </section>`;
  }

  function renderQueueItem(item) {
    const action = item.type === "shoot" ? "open-shoot" : item.type === "edit" ? "open-edit" : "open-final";
    return `<li class="queue-item">
      <div class="queue-item__top">
        <button class="task-link" type="button" data-action="${action}" data-id="${item.id}">${escapeHtml(item.title)}</button>
        ${statusBadge(item.status, item.map)}
      </div>
      <div class="queue-item__meta"><span>${escapeHtml(item.meta)}</span><span class="mono-value">${escapeHtml(item.id)}</span></div>
    </li>`;
  }

  function step(index, title, description, stateName) {
    return `<li class="${stateName ? `is-${stateName}` : ""}"><span class="step-index">${index}</span><div class="step-copy"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div></li>`;
  }

  function renderEmpty(title, description, type) {
    return `<div class="empty-state">${icon(type === "raw" ? "folder" : "file")}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`;
  }

  function renderShoots() {
    const query = runtime.filters.shoots.trim().toLowerCase();
    const rows = state.shoots.filter((item) => [item.id, item.name, item.topic, item.ip, item.director].join(" ").toLowerCase().includes(query));
    const createDisabled = !can("createShoot");
    return `<section class="page">
      ${pageHeader("拍摄任务", "按一次拍摄计划组织选题、脚本、拍摄信息、原片与后续剪辑分配。", button("新建拍摄任务", "create-shoot", "", { primary: !createDisabled, icon: "plus", disabled: createDisabled, title: createDisabled ? "当前角色没有新建拍摄任务权限" : "" }))}
      ${searchPanel("shoots", "搜索任务、选题、IP 或负责人", runtime.filters.shoots)}
      <section class="panel">
        <table class="spec-sheet">
          <thead><tr><th>拍摄任务</th><th>拍摄日期 / IP</th><th>脚本 / 原片</th><th>状态</th><th>负责人</th><th>操作</th></tr></thead>
          <tbody>
            ${rows.map((item) => `<tr>
              <td data-label="拍摄任务"><div class="cell-title">${escapeHtml(item.name)}</div><div class="cell-subtitle">${item.id} · ${escapeHtml(item.topic)}</div></td>
              <td data-label="拍摄日期 / IP"><div>${escapeHtml(item.date)}</div><div class="cell-subtitle">${escapeHtml(item.ip)}</div></td>
              <td data-label="脚本 / 原片"><span class="mono-value">${item.scriptCount} / ${item.rawCount}</span></td>
              <td data-label="状态">${statusBadge(item.status, shootStatus)}</td>
              <td data-label="负责人">${escapeHtml(item.director)}</td>
              <td data-label="操作"><div class="cell-actions"><button class="task-link" type="button" data-action="open-shoot" data-id="${item.id}">查看详情</button></div></td>
            </tr>`).join("") || `<tr><td colspan="6">${renderEmpty("没有匹配的拍摄任务", "调整关键词后再搜索。", "shoot")}</td></tr>`}
          </tbody>
        </table>
        <div class="pagination-hint"><span>共 ${rows.length} 条</span><span>本地演示列表</span></div>
      </section>
    </section>`;
  }

  function renderEdits() {
    const query = runtime.filters.edits.trim().toLowerCase();
    const status = runtime.filters.editStatus;
    const rows = state.edits.filter((item) => {
      const matchesQuery = [item.id, item.title, item.editor, item.shootId].join(" ").toLowerCase().includes(query);
      return matchesQuery && (status === "ALL" || item.status === status);
    });
    const statusTabs = [
      ["ALL", "全部"], ["TODO", "待剪辑"], ["IN_PROGRESS", "剪辑中"], ["SUBMITTED", "待审片"], ["REVISION_REQUIRED", "待修改"], ["APPROVED", "已通过"]
    ];
    return `<section class="page">
      ${pageHeader("剪辑任务", "分配负责人、优先级与截止时间；剪辑提交修订版，编导在线审片并留痕。")}
      <section class="filter-panel">
        <div class="filter-row">
          <div class="filter-field"><label for="filter-edits">关键词</label><input class="input-control" id="filter-edits" data-filter="edits" value="${escapeHtml(runtime.filters.edits)}" placeholder="任务、标题、剪辑负责人" /></div>
          <div class="segmented" aria-label="剪辑状态筛选">${statusTabs.map(([code, label]) => `<button type="button" class="${status === code ? "is-active" : ""}" data-action="filter-edit-status" data-status="${code}" aria-pressed="${status === code}">${label}</button>`).join("")}</div>
        </div>
      </section>
      <section class="panel">
        <table class="spec-sheet">
          <thead><tr><th>剪辑任务</th><th>负责人 / 截止</th><th>优先级</th><th>修订版</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>${rows.map((item) => `<tr>
            <td data-label="剪辑任务"><div class="cell-title">${escapeHtml(item.title)}</div><div class="cell-subtitle">${item.id} · 来源 ${item.shootId}</div></td>
            <td data-label="负责人 / 截止"><div>${escapeHtml(item.editor)}</div><div class="cell-subtitle">${escapeHtml(item.due)}</div></td>
            <td data-label="优先级">${priorityBadge(item.priority)}</td>
            <td data-label="修订版"><span class="mono-value">v${item.revision}</span></td>
            <td data-label="状态">${statusBadge(item.status, editStatus)}</td>
            <td data-label="操作"><button class="task-link" type="button" data-action="open-edit" data-id="${item.id}">处理任务</button></td>
          </tr>`).join("") || `<tr><td colspan="6">${renderEmpty("没有匹配的剪辑任务", "调整状态或关键词后再搜索。", "edit")}</td></tr>`}</tbody>
        </table>
        <div class="pagination-hint"><span>共 ${rows.length} 条</span><span>状态按任务独立维护</span></div>
      </section>
    </section>`;
  }

  function renderFinals() {
    const query = runtime.filters.finals.trim().toLowerCase();
    const rows = state.finals.filter((item) => [item.id, item.title, item.fileName, item.editor, ...item.platforms.map((row) => `${row.platform} ${row.account}`)].join(" ").toLowerCase().includes(query));
    return `<section class="page">
      ${pageHeader("视频成片", "审片通过后自动入库；从成片反查选题、拍摄、原片、修订和各平台发布记录。")}
      ${searchPanel("finals", "搜索标题、文件名、平台或账户", runtime.filters.finals)}
      <section class="panel">
        <table class="spec-sheet">
          <thead><tr><th>成片</th><th>时长 / 大小</th><th>剪辑</th><th>通过时间</th><th>发布状态</th><th>平台记录</th><th>操作</th></tr></thead>
          <tbody>${rows.map((item) => {
            const overall = overallFinalStatus(item);
            return `<tr>
              <td data-label="成片"><div class="cell-title">${escapeHtml(item.title)}</div><div class="cell-subtitle">${escapeHtml(item.fileName)}</div></td>
              <td data-label="时长 / 大小"><span class="mono-value">${item.duration} / ${item.size}</span></td>
              <td data-label="剪辑">${escapeHtml(item.editor)}</td>
              <td data-label="通过时间"><span class="mono-value">${escapeHtml(item.approvedAt)}</span></td>
              <td data-label="发布状态">${statusBadge(overall.code, overallStatusMap)}</td>
              <td data-label="平台记录"><span class="mono-value">${item.platforms.length}</span></td>
              <td data-label="操作"><button class="task-link" type="button" data-action="open-final" data-id="${item.id}">查看资产链路</button></td>
            </tr>`;
          }).join("") || `<tr><td colspan="7">${renderEmpty("没有匹配的成片", "调整关键词后再搜索。", "final")}</td></tr>`}</tbody>
        </table>
        <div class="pagination-hint"><span>共 ${rows.length} 条</span><span>平台审核状态互不覆盖</span></div>
      </section>
    </section>`;
  }

  function renderTopics() {
    const query = runtime.filters.topics.trim().toLowerCase();
    const rows = state.topics.filter((item) => [item.id, item.title, topicTypeMeta[item.topicType], ...(item.businessLines || []), item.owner].join(" ").toLowerCase().includes(query));
    const disabled = !can("createTopic");
    return `<section class="page">
      ${pageHeader("选题脚本", "基础选题库用于创建拍摄任务、复用历史脚本，并查看已经关联的成片。", button("新建选题", "create-topic", "", { primary: !disabled, icon: "plus", disabled, title: disabled ? "当前角色没有新建选题权限" : "" }))}
      ${searchPanel("topics", "搜索选题、脚本类型、业务线或负责人", runtime.filters.topics)}
      <section class="panel"><table class="spec-sheet">
        <thead><tr><th>选题</th><th>脚本类型</th><th>业务线</th><th>脚本数</th><th>关联成片</th><th>负责人</th><th>更新时间</th></tr></thead>
        <tbody>${rows.map((item) => `<tr>
          <td data-label="选题"><div class="cell-title">${escapeHtml(item.title)}</div><div class="cell-subtitle">${item.id}</div></td>
          <td data-label="脚本类型">${escapeHtml(topicTypeMeta[item.topicType] || item.topicType)}</td><td data-label="业务线"><div class="tag-list tag-list--compact">${item.businessLines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</div></td>
          <td data-label="脚本数"><span class="mono-value">${item.scriptCount}</span></td><td data-label="关联成片"><span class="mono-value">${item.finalCount}</span></td>
          <td data-label="负责人">${escapeHtml(item.owner)}</td><td data-label="更新时间"><span class="mono-value">${escapeHtml(item.updatedAt)}</span></td>
        </tr>`).join("")}</tbody>
      </table><div class="pagination-hint"><span>共 ${rows.length} 条</span><span>基础库 P0</span></div></section>
    </section>`;
  }

  function renderRaws() {
    const query = runtime.filters.raws.trim().toLowerCase();
    const rows = state.raws.filter((item) => {
      const shoot = findShoot(item.shootId);
      return [item.id, item.fileName, item.scene, item.camera, item.shot, shoot?.topic || "", shoot?.ip || ""].join(" ").toLowerCase().includes(query);
    });
    return `<section class="page">
      ${pageHeader("视频原片", "按产品、IP、选题、拍摄日期、镜号与成片反查原片；文件关系不依赖文件名解析。")}
      ${searchPanel("raws", "搜索文件名、场景、镜号、选题或 IP", runtime.filters.raws)}
      <section class="panel"><table class="spec-sheet">
        <thead><tr><th>原片文件</th><th>拍摄任务</th><th>场景 / 机位</th><th>镜号</th><th>时长 / 大小</th><th>成片引用</th><th>上传时间</th></tr></thead>
        <tbody>${rows.map((item) => `<tr>
          <td data-label="原片文件"><div class="cell-title">${escapeHtml(item.fileName)}</div><div class="cell-subtitle">${item.id}</div></td>
          <td data-label="拍摄任务"><button class="task-link" type="button" data-action="open-shoot" data-id="${item.shootId}">${escapeHtml(findShoot(item.shootId)?.topic || item.shootId)}</button></td>
          <td data-label="场景 / 机位"><div>${escapeHtml(item.scene)}</div><div class="cell-subtitle">${escapeHtml(item.camera)}</div></td>
          <td data-label="镜号">${escapeHtml(item.shot)}</td><td data-label="时长 / 大小"><span class="mono-value">${item.duration} / ${item.size}</span></td>
          <td data-label="成片引用"><span class="mono-value">${item.usedBy.length}</span></td><td data-label="上传时间"><span class="mono-value">${escapeHtml(item.uploadedAt)}</span></td>
        </tr>`).join("") || `<tr><td colspan="7">${renderEmpty("没有匹配的原片", "调整关键词后再搜索。", "raw")}</td></tr>`}</tbody>
      </table><div class="pagination-hint"><span>共 ${rows.length} 条</span><span>对象存储直传为生产前提</span></div></section>
    </section>`;
  }

  function renderMaterials() {
    ensureMaterialIndex();
    const query = runtime.filters.materials.trim().toLowerCase();
    const type = runtime.filters.materialType;
    const stage = runtime.filters.materialStage;
    const compliance = runtime.filters.materialCompliance;
    const collectionId = runtime.filters.materialCollection;
    const selectedCollection = collectionId === "ALL" ? null : findCollection(collectionId);
    const rows = state.materials.filter((material) => {
      const descriptor = materialDescriptor(material);
      const typeMatch = type === "ALL" || material.sourceType === type || (type === "TEXT" && ["SCRIPT", "HOOK", "TITLE"].includes(material.sourceType));
      const stageMatch = stage === "ALL" || material.stage === stage;
      const complianceMatch = compliance === "ALL" || material.compliance === compliance;
      const collectionMatch = !selectedCollection || selectedCollection.materialIds.includes(material.id);
      const queryMatch = [material.id, material.sourceId, descriptor.title, descriptor.summary, descriptor.content, material.owner, ...material.tags].join(" ").toLowerCase().includes(query);
      return typeMatch && stageMatch && complianceMatch && collectionMatch && queryMatch;
    });
    const typeTabs = [["ALL", "全部"], ["FINAL", "成片"], ["RAW", "原片"], ["TEXT", "脚本/标题/开头"], ["EXTERNAL", "外部素材"]];
    const stageCounts = Object.keys(materialStage).reduce((result, code) => ({ ...result, [code]: state.materials.filter((item) => item.stage === code).length }), {});
    const restrictedCount = state.materials.filter((item) => item.stage === "RESTRICTED" || item.compliance === "BLOCKED").length;
    const readyCount = state.materials.filter((item) => item.stage === "READY").length;
    const createDisabled = !can("createCollection");
    const externalDisabled = !can("registerExternalMaterial");
    return `<section class="page page--materials">
      ${pageHeader(
        "内容素材库",
        "统一索引现有成片、原片、脚本、标题与开头；围绕可复用性组织素材，并从任一素材继续创建生产任务。",
        `${button("登记外部素材", "register-external-material", "", { disabled: externalDisabled, title: externalDisabled ? "切换到编导或运营角色登记" : "" })}${button("新建集合", "create-collection", "", { primary: !createDisabled, icon: "plus", disabled: createDisabled, title: createDisabled ? "当前角色没有新建集合权限" : "" })}`
      )}

      <section class="material-summary" aria-label="素材库概况">
        <div><span class="mono-label">INDEXED</span><strong>${state.materials.length}</strong><small>条内容索引</small></div>
        <div><span class="mono-label">READY</span><strong>${readyCount}</strong><small>条可直接复用</small></div>
        <div><span class="mono-label">COLLECTIONS</span><strong>${state.collections.length}</strong><small>个业务集合</small></div>
        <div class="${restrictedCount ? "has-risk" : ""}"><span class="mono-label">ATTENTION</span><strong>${restrictedCount}</strong><small>条受限或不可投放</small></div>
      </section>

      <section class="material-flow-panel" aria-label="素材流转状态">
        <div class="section-title-row"><div><span class="mono-label">MATERIAL FLOW</span><h2>素材流转</h2></div><button class="task-link" type="button" data-action="filter-material-stage" data-stage="ALL">查看全部</button></div>
        <div class="material-stage-track">
          ${Object.entries(materialStage).map(([code, meta], index) => `<button type="button" class="material-stage ${stage === code ? "is-active" : ""}" data-action="filter-material-stage" data-stage="${code}" aria-pressed="${stage === code}">
            <span class="material-stage__index">${String(index + 1).padStart(2, "0")}</span>
            <span><strong>${meta.label}</strong><small>${stageCounts[code]} 条</small></span>
          </button>`).join("")}
        </div>
      </section>

      <section class="filter-panel material-filter-panel">
        <div class="filter-row">
          <div class="filter-field material-search-field"><label for="filter-materials">搜索素材</label><input class="input-control" id="filter-materials" data-filter="materials" value="${escapeHtml(runtime.filters.materials)}" placeholder="搜索标题、内容、标签、IP、文件名或素材 ID" /></div>
          <div class="filter-field material-select-field"><label for="material-compliance">合规状态</label><select class="select-control" id="material-compliance" data-material-filter="materialCompliance">
            <option value="ALL">全部合规状态</option>${Object.entries(materialCompliance).map(([code, meta]) => `<option value="${code}" ${compliance === code ? "selected" : ""}>${meta.label}</option>`).join("")}
          </select></div>
          <div class="view-switch" aria-label="视图切换">
            <button type="button" data-action="set-material-view" data-view-mode="cards" class="${runtime.filters.materialView === "cards" ? "is-active" : ""}" aria-pressed="${runtime.filters.materialView === "cards"}">卡片</button>
            <button type="button" data-action="set-material-view" data-view-mode="list" class="${runtime.filters.materialView === "list" ? "is-active" : ""}" aria-pressed="${runtime.filters.materialView === "list"}">列表</button>
          </div>
        </div>
        <div class="segmented material-type-tabs" aria-label="素材类型筛选">${typeTabs.map(([code, label]) => `<button type="button" class="${type === code ? "is-active" : ""}" data-action="filter-material-type" data-material-type="${code}" aria-pressed="${type === code}">${label}</button>`).join("")}</div>
      </section>

      <div class="material-library-layout">
        <aside class="collection-panel" aria-label="素材集合">
          <div class="collection-panel__header"><span class="mono-label">COLLECTIONS</span><strong>素材集合</strong></div>
          <button type="button" class="collection-filter ${collectionId === "ALL" ? "is-active" : ""}" data-action="filter-material-collection" data-collection="ALL"><span>全部素材</span><b>${state.materials.length}</b></button>
          ${state.collections.map((collection) => `<button type="button" class="collection-filter ${collectionId === collection.id ? "is-active" : ""}" data-action="filter-material-collection" data-collection="${collection.id}"><span>${escapeHtml(collection.name)}</span><b>${collection.materialIds.filter((id) => findMaterial(id)).length}</b><small>${escapeHtml(collection.description)}</small></button>`).join("")}
          <button type="button" class="collection-create" data-action="create-collection" ${createDisabled ? "disabled" : ""}>${icon("plus")}新建集合</button>
        </aside>
        <section class="material-results" aria-label="素材搜索结果">
          <div class="material-results__header"><div><strong>${selectedCollection ? escapeHtml(selectedCollection.name) : stage !== "ALL" ? materialStage[stage].label : "全部素材"}</strong><span>${rows.length} 条结果</span></div>${query || type !== "ALL" || stage !== "ALL" || compliance !== "ALL" || collectionId !== "ALL" ? `<button class="task-link" type="button" data-action="reset-material-filters">清空筛选</button>` : ""}</div>
          ${rows.length ? (runtime.filters.materialView === "cards" ? `<div class="material-grid">${rows.map(renderMaterialCard).join("")}</div>` : renderMaterialTable(rows)) : renderEmpty("没有符合条件的素材", "清空筛选，或登记一条外部素材继续组织。", "raw")}
        </section>
      </div>
    </section>`;
  }

  function renderMaterialCard(material) {
    const descriptor = materialDescriptor(material);
    const type = materialTypeMeta[material.sourceType] || materialTypeMeta.EXTERNAL;
    const usage = materialUsage(material);
    const collections = materialCollections(material.id);
    return `<article class="material-card">
      <div class="material-card__preview" data-material-type="${material.sourceType}">
        <span class="material-card__type">${icon(type.icon)}${escapeHtml(type.label)}</span>
        <span class="material-card__source">${escapeHtml(material.sourceId)}</span>
      </div>
      <div class="material-card__body">
        <div class="material-card__status">${statusBadge(material.stage, materialStage)}${statusBadge(material.compliance, materialCompliance)}</div>
        <button class="material-card__title" type="button" data-action="open-material" data-id="${material.id}">${escapeHtml(descriptor.title)}</button>
        <p>${escapeHtml(descriptor.summary || material.note)}</p>
        <div class="tag-list">${material.tags.slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <footer class="material-card__footer"><span>${usage.length} 次使用 · ${collections.length} 个集合</span><span class="mono-value">${escapeHtml(material.id.replace("MAT-", ""))}</span></footer>
    </article>`;
  }

  function renderMaterialTable(rows) {
    return `<section class="panel"><table class="spec-sheet material-table">
      <thead><tr><th>内容素材</th><th>类型</th><th>流转状态</th><th>合规</th><th>标签</th><th>使用 / 集合</th><th>操作</th></tr></thead>
      <tbody>${rows.map((material) => {
        const descriptor = materialDescriptor(material);
        return `<tr>
          <td data-label="内容素材"><div class="cell-title">${escapeHtml(descriptor.title)}</div><div class="cell-subtitle">${escapeHtml(material.id)} · ${escapeHtml(material.sourceId)}</div></td>
          <td data-label="类型">${statusBadge(material.sourceType, materialTypeMeta)}</td>
          <td data-label="流转状态">${statusBadge(material.stage, materialStage)}</td>
          <td data-label="合规">${statusBadge(material.compliance, materialCompliance)}</td>
          <td data-label="标签"><div class="tag-list tag-list--compact">${material.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></td>
          <td data-label="使用 / 集合"><span class="mono-value">${materialUsage(material).length} / ${materialCollections(material.id).length}</span></td>
          <td data-label="操作"><button class="task-link" type="button" data-action="open-material" data-id="${material.id}">查看与复用</button></td>
        </tr>`;
      }).join("")}</tbody>
    </table></section>`;
  }

  function searchPanel(type, placeholder, value) {
    return `<section class="filter-panel"><div class="filter-row"><div class="filter-field"><label for="filter-${type}">关键词</label><input class="input-control" id="filter-${type}" data-filter="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" /></div><button class="button button--quiet" type="button" data-action="clear-filter" data-filter="${type}">重置</button></div></section>`;
  }

  function openDrawer(kicker, title, body, ref) {
    runtime.activeDrawer = ref;
    el.drawerKicker.textContent = kicker;
    el.drawerTitle.textContent = title;
    el.drawerBody.innerHTML = body;
    el.drawer.classList.add("is-open");
    el.drawer.setAttribute("aria-hidden", "false");
    document.querySelector(".app-stage").setAttribute("inert", "");
    requestAnimationFrame(() => el.closeDrawer.focus());
  }

  function closeDrawer() {
    el.drawer.classList.remove("is-open");
    el.drawer.setAttribute("aria-hidden", "true");
    document.querySelector(".app-stage").removeAttribute("inert");
    runtime.activeDrawer = null;
  }

  function openShootDrawer(id) {
    const item = findShoot(id);
    if (!item) return;
    const stepState = shootStepState(item.status);
    const raws = state.raws.filter((raw) => raw.shootId === item.id);
    const edits = state.edits.filter((edit) => edit.shootId === item.id);
    const upload = runtime.upload?.shootId === id ? runtime.upload : null;
    const uploadDisabled = !can("uploadRaw");
    const assignDisabled = !can("assignEdit") || item.rawCount === 0;
    const body = `
      <div class="button-row">
        ${button("上传原片", "upload-raw", item.id, { primary: true, icon: "upload", disabled: uploadDisabled, title: uploadDisabled ? "当前角色没有上传原片权限" : "" })}
        ${button("分配剪辑", "assign-edit", item.id, { disabled: assignDisabled, title: assignDisabled ? "需要编导权限，且至少有一条原片" : "" })}
        ${button("打印拍摄文档", "print-shoot", item.id, { icon: "file" })}
      </div>
      ${upload ? renderUploadProgress(upload) : ""}
      <section>
        <div class="section-title-row"><h3>任务进度</h3>${statusBadge(item.status, shootStatus)}</div>
        <ol class="steps">
          ${step("01", "基本信息与选题", "任务、IP、拍摄日期与场地。", stepState[0])}
          ${step("02", "脚本与拍摄文档", `${item.scriptCount} 条脚本已关联。`, stepState[1])}
          ${step("03", "实际拍摄信息", `${item.scenes} · ${item.equipment}`, stepState[2])}
          ${step("04", "原片", `${item.rawCount} 条原片已登记。`, stepState[3])}
          ${step("05", "剪辑分配", `${edits.length} 个剪辑任务。`, stepState[4])}
        </ol>
      </section>
      <section>
        <h3>拍摄信息</h3>
        <dl class="definition-list">
          ${definition("任务编号", item.id)}${definition("选题", item.topic)}${definition("IP", item.ip)}${definition("拍摄日期", item.date)}
          ${definition("场地", item.location)}${definition("场景", item.scenes)}${definition("服装", item.wardrobe)}${definition("设备", item.equipment)}${definition("备注", item.note)}
        </dl>
      </section>
      <section>
        <div class="section-title-row"><h3>脚本</h3><span class="mono-label">${item.scripts.length} SCRIPTS</span></div>
        <ul class="compact-list">${item.scripts.map((script, index) => `<li><strong>${String(index + 1).padStart(2, "0")} · ${escapeHtml(script.title)}</strong><p>${escapeHtml(script.opening)}</p><p>剪辑须知：${escapeHtml(script.editNote)}</p></li>`).join("")}</ul>
      </section>
      <section>
        <div class="section-title-row"><h3>原片</h3><span class="mono-label">${raws.length} FILES</span></div>
        ${raws.length ? `<ul class="asset-list">${raws.map((raw) => `<li class="asset-item"><div class="asset-item__top"><strong>${escapeHtml(raw.fileName)}</strong><span class="mono-value">${raw.size}</span></div><p>${escapeHtml(raw.scene)} · ${escapeHtml(raw.camera)} · ${escapeHtml(raw.shot)}</p></li>`).join("")}</ul>` : renderEmpty("还没有原片", "拍摄完成后上传原片并登记镜号。", "raw")}
      </section>
      <section>
        <div class="section-title-row"><h3>剪辑任务</h3><span class="mono-label">${edits.length} TASKS</span></div>
        ${edits.length ? `<ul class="asset-list">${edits.map((edit) => `<li class="asset-item"><div class="asset-item__top"><button class="task-link" type="button" data-action="open-edit" data-id="${edit.id}">${escapeHtml(edit.title)}</button>${statusBadge(edit.status, editStatus)}</div><p>${escapeHtml(edit.editor)} · ${priorityMeta[edit.priority].label}优先级 · v${edit.revision}</p></li>`).join("")}</ul>` : renderEmpty("还没有剪辑任务", "至少上传一条原片后，由编导分配剪辑。", "edit")}
      </section>`;
    openDrawer("SHOOT TASK", item.name, body, { type: "shoot", id });
  }

  function shootStepState(status) {
    const order = ["DRAFT", "READY_TO_SHOOT", "SHOT", "MATERIAL_UPLOADING", "READY_TO_ASSIGN", "IN_EDITING", "COMPLETED"];
    const current = Math.max(0, order.indexOf(status));
    const thresholds = [0, 1, 2, 4, 5];
    return thresholds.map((threshold) => current > threshold ? "complete" : current === threshold ? "current" : "");
  }

  function renderUploadProgress(upload) {
    const ratio = Math.min(1, upload.progress / 100);
    return `<section class="upload-box" data-upload-progress="${upload.shootId}">
      <span class="upload-spinner" aria-hidden="true"></span>
      <strong>正在登记 ${upload.files.length} 条原片</strong>
      <p>原型模拟分片直传。生产环境应由浏览器直传对象存储，业务服务只登记文件关系。</p>
      <div class="progress-track" style="--progress:${ratio}" aria-label="上传进度 ${upload.progress}%"><div class="progress-bar"></div></div>
      <span class="mono-value" data-progress-label>${upload.progress}%</span>
    </section>`;
  }

  function definition(label, value) {
    return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "—")}</dd></div>`;
  }

  function openEditDrawer(id) {
    const item = findEdit(id);
    if (!item) return;
    const shoot = findShoot(item.shootId);
    const raws = state.raws.filter((raw) => raw.shootId === item.shootId);
    const canStart = can("startEdit") && ["TODO", "REVISION_REQUIRED", "REOPENED_FOR_AUDIT"].includes(item.status);
    const canSubmit = can("submitEdit") && ["IN_PROGRESS", "REVISION_REQUIRED", "REOPENED_FOR_AUDIT", "TODO"].includes(item.status);
    const canReview = can("reviewEdit") && item.status === "SUBMITTED";
    const body = `
      <div class="button-row">
        ${button("开始剪辑", "start-edit", item.id, { primary: canStart, disabled: !canStart, title: !canStart ? "仅负责人在待剪辑、待修改或卡审修改状态可开始" : "" })}
        ${button("提交审片", "submit-edit", item.id, { primary: canSubmit, icon: "upload", disabled: !canSubmit, title: !canSubmit ? "当前角色或任务状态不允许提交" : "" })}
        ${button("审片通过", "approve-edit", item.id, { primary: canReview, icon: "check", disabled: !canReview, title: !canReview ? "仅编导可处理待审片任务" : "" })}
        ${button("退回修改", "request-revision", item.id, { disabled: !canReview, title: !canReview ? "仅编导可处理待审片任务" : "" })}
      </div>
      <div class="preview-layout">
        <div class="preview-surface" aria-label="演示视频预览占位">
          <button type="button" data-action="preview-demo" aria-label="播放演示成片预览">${icon("play")}</button>
          <div class="preview-surface__meta"><span>演示预览 · v${item.revision}</span><span>${item.id}</span></div>
        </div>
        <div>
          <div class="section-title-row"><h3>任务信息</h3>${statusBadge(item.status, editStatus)}</div>
          <dl class="definition-list">
            ${definition("剪辑负责人", item.editor)}${definition("优先级", priorityMeta[item.priority].label)}${definition("截止时间", item.due)}
            ${definition("来源任务", shoot?.name || item.shootId)}${definition("来源素材", (item.sourceMaterialIds || []).join("、") || "常规脚本分配")}${definition("实际开头", item.selectedOpening || "尚未选择")}${definition("实际标题", item.selectedTitle || "尚未填写")}
          </dl>
        </div>
      </div>
      ${(item.sourceMaterialIds || []).length ? `<section><div class="section-title-row"><h3>复用来源</h3><span class="mono-label">TRACEABLE</span></div><ul class="asset-list">${item.sourceMaterialIds.map((materialId) => { const source = findMaterial(materialId); const descriptor = source ? materialDescriptor(source) : null; return `<li class="asset-item"><div class="asset-item__top"><button class="task-link" type="button" data-action="open-material" data-id="${materialId}">${escapeHtml(descriptor?.title || materialId)}</button><span class="mono-value">${escapeHtml(materialId)}</span></div><p>由内容素材库创建，审片通过后继续保留该来源关系。</p></li>`; }).join("")}</ul></section>` : ""}
      <section>
        <div class="section-title-row"><h3>可用原片</h3><span class="mono-label">${raws.length} FILES</span></div>
        <ul class="asset-list">${raws.map((raw) => `<li class="asset-item"><div class="asset-item__top"><strong>${escapeHtml(raw.fileName)}</strong><button class="button button--text" type="button" data-action="download-demo" data-id="${raw.id}">${icon("download")}下载</button></div><p>${escapeHtml(raw.shot)} · ${raw.duration} · ${raw.size}</p></li>`).join("")}</ul>
      </section>
      <section>
        <div class="section-title-row"><h3>审片与修改记录</h3><span class="mono-label">${item.history.length} EVENTS</span></div>
        <ol class="timeline">${item.history.slice().reverse().map((row) => `<li><div><strong>${escapeHtml(row.action)}</strong><p>${escapeHtml(row.note)}</p><time>${escapeHtml(row.at)} · ${escapeHtml(row.actor)}</time></div></li>`).join("")}</ol>
      </section>`;
    openDrawer("EDIT TASK", item.title, body, { type: "edit", id });
  }

  function openFinalDrawer(id) {
    const item = findFinal(id);
    if (!item) return;
    const edit = findEdit(item.editId);
    const shoot = findShoot(item.shootId);
    const topic = shoot ? findTopic(shoot.topicId) : null;
    const raws = state.raws.filter((raw) => item.rawIds.includes(raw.id));
    const overall = overallFinalStatus(item);
    const publishDisabled = !can("publish");
    const body = `
      <div class="button-row">
        ${button("登记发布", "register-publish", item.id, { primary: true, icon: "plus", disabled: publishDisabled, title: publishDisabled ? "切换到投手或运营角色登记发布" : "" })}
        ${button("下载成片", "download-demo", item.id, { icon: "download" })}
      </div>
      <div class="preview-layout">
        <div class="preview-surface" aria-label="演示成片预览占位">
          <button type="button" data-action="preview-demo" aria-label="播放演示成片预览">${icon("play")}</button>
          <div class="preview-surface__meta"><span>${escapeHtml(item.duration)} · ${escapeHtml(item.size)}</span><span>${escapeHtml(item.id)}</span></div>
        </div>
        <div>
          <div class="section-title-row"><h3>成片信息</h3>${statusBadge(overall.code, overallStatusMap)}</div>
          <dl class="definition-list">${definition("标准文件名", item.fileName)}${definition("剪辑负责人", item.editor)}${definition("审片通过", item.approvedAt)}${definition("修订版", `v${edit?.revision || 1}`)}</dl>
        </div>
      </div>
      <section>
        <div class="section-title-row"><h3>资产链路</h3><span class="mono-label">TRACEABLE</span></div>
        <ol class="lineage-list">
          <li><span class="lineage-index">01</span><div><strong>选题</strong><span>${escapeHtml(topic?.title || "未关联")}</span></div></li>
          <li><span class="lineage-index">02</span><div><strong>拍摄任务</strong><span>${escapeHtml(shoot?.name || item.shootId)}</span></div></li>
          <li><span class="lineage-index">03</span><div><strong>剪辑任务</strong><span>${escapeHtml(edit?.title || item.editId)} · v${edit?.revision || 1}</span></div></li>
          <li><span class="lineage-index">04</span><div><strong>引用原片</strong><span>${raws.map((raw) => escapeHtml(raw.shot)).join("、") || "未登记"}</span></div></li>
        </ol>
      </section>
      <section>
        <div class="section-title-row"><h3>平台发布与审核</h3><span class="mono-label">${item.platforms.length} RECORDS</span></div>
        ${item.platforms.length ? `<ul class="audit-list">${item.platforms.map((row) => renderPlatformRecord(item, row)).join("")}</ul>` : renderEmpty("还没有平台发布记录", "由投手或运营登记平台、账户、素材 ID 与审核结果。", "final")}
      </section>`;
    openDrawer("FINAL ASSET", item.title, body, { type: "final", id });
  }

  function openMaterialDrawer(id) {
    const material = findMaterial(id);
    if (!material) return;
    const descriptor = materialDescriptor(material);
    const type = materialTypeMeta[material.sourceType] || materialTypeMeta.EXTERNAL;
    const collections = materialCollections(material.id);
    const usage = materialUsage(material);
    const lineage = materialLineage(material);
    const organizeDisabled = !can("organizeMaterial");
    const reeditDisabled = !can("createReedit") || material.sourceType === "EXTERNAL" || !descriptor.shoot;
    const stageOrder = Object.entries(materialStage);
    const currentStep = materialStage[material.stage]?.step || 1;
    const body = `
      <div class="button-row">
        ${button("创建重剪任务", "create-reedit-from-material", material.id, { primary: !reeditDisabled, icon: "scissors", disabled: reeditDisabled, title: reeditDisabled ? "当前角色无权限，或该素材尚未关联拍摄任务" : "" })}
        ${button("加入集合", "add-material-to-collection", material.id, { disabled: organizeDisabled, title: organizeDisabled ? "当前角色没有素材整理权限" : "" })}
        ${button("编辑标签", "edit-material-tags", material.id, { disabled: organizeDisabled })}
        ${button("更新流转", "update-material-stage", material.id, { disabled: organizeDisabled })}
      </div>
      <div class="material-detail-hero">
        <div class="material-detail-preview" data-material-type="${material.sourceType}">
          ${icon(type.icon)}<strong>${escapeHtml(type.label)}</strong><span>${escapeHtml(material.sourceId)}</span>
        </div>
        <div class="material-detail-copy">
          <div class="material-card__status">${statusBadge(material.stage, materialStage)}${statusBadge(material.compliance, materialCompliance)}${statusBadge(material.performance, materialPerformance)}</div>
          <p>${escapeHtml(descriptor.summary || material.note)}</p>
          <div class="tag-list">${material.tags.length ? material.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "<span>暂无标签</span>"}</div>
          <dl class="definition-list">
            ${definition("素材索引", material.id)}${definition("来源对象", material.sourceId)}${definition("维护人", material.owner)}${definition("最近更新", material.updatedAt)}
          </dl>
        </div>
      </div>
      <section>
        <div class="section-title-row"><div><span class="mono-label">MATERIAL FLOW</span><h3>流转状态</h3></div><span class="mono-value">${escapeHtml(materialStage[material.stage]?.label || material.stage)}</span></div>
        <ol class="material-detail-flow">
          ${stageOrder.map(([code, meta]) => `<li class="${material.stage === code ? "is-current" : meta.step < currentStep && !["RESTRICTED", "ARCHIVED"].includes(material.stage) ? "is-complete" : ""}"><span>${String(meta.step).padStart(2, "0")}</span><strong>${escapeHtml(meta.label)}</strong></li>`).join("")}
        </ol>
        <p class="section-note">流转状态回答“这条素材现在处于哪里”；合规状态与表现标签分别回答“能不能投放”和“是否值得继续测试”，三者互不覆盖。</p>
      </section>
      <section>
        <div class="section-title-row"><div><span class="mono-label">LINEAGE</span><h3>素材血缘</h3></div><span class="mono-label">${lineage.length} NODES</span></div>
        <ol class="material-lineage-track">${lineage.map((node, index) => `<li><span class="lineage-index">${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(node.label)}</strong><span>${escapeHtml(node.value)}</span></div></li>`).join("")}</ol>
      </section>
      <section>
        <div class="section-title-row"><h3>使用记录</h3><span class="mono-label">${usage.length} RECORDS</span></div>
        ${usage.length ? `<ul class="asset-list">${usage.map((row) => renderMaterialUsage(material, row)).join("")}</ul>` : renderEmpty("尚无使用记录", "素材可以保留在可复用状态，或直接创建重剪任务。", "final")}
      </section>
      <section>
        <div class="section-title-row"><h3>所属集合</h3><span class="mono-label">${collections.length} COLLECTIONS</span></div>
        ${collections.length ? `<ul class="compact-list">${collections.map((collection) => `<li><strong>${escapeHtml(collection.name)}</strong><p>${escapeHtml(collection.description)}</p></li>`).join("")}</ul>` : renderEmpty("尚未加入集合", "集合只保存索引关系，不复制原始文件。", "raw")}
      </section>
      <section class="material-note"><span class="mono-label">INTERNAL NOTE</span><p>${escapeHtml(material.note || "暂无内部备注。")}</p></section>`;
    openDrawer("CONTENT MATERIAL", descriptor.title, body, { type: "material", id });
  }

  function materialLineage(material) {
    const descriptor = materialDescriptor(material);
    const shoot = descriptor.shoot;
    const topic = shoot ? findTopic(shoot.topicId) : null;
    if (material.sourceType === "FINAL") {
      const final = descriptor.source;
      const edit = final ? findEdit(final.editId) : null;
      const raws = (final?.rawIds || []).map((id) => findRaw(id)).filter(Boolean);
      const platformText = final?.platforms.length ? final.platforms.map((row) => `${row.platform}·${platformStatus[row.status]?.label || row.status}`).join("；") : "尚未发布";
      return [
        { label: "选题", value: topic?.title || shoot?.topic || "未关联" },
        { label: "拍摄", value: shoot?.name || final?.shootId || "未关联" },
        { label: "原片", value: raws.map((raw) => raw.shot).join("、") || "未登记" },
        { label: "剪辑", value: edit ? `${edit.title} · v${edit.revision}` : final?.editId || "未关联" },
        ...((final?.sourceMaterialIds || edit?.sourceMaterialIds || []).length ? [{ label: "复用来源", value: (final?.sourceMaterialIds || edit?.sourceMaterialIds || []).join("、") }] : []),
        { label: "成片", value: final?.fileName || material.sourceId },
        { label: "平台使用", value: platformText }
      ];
    }
    if (material.sourceType === "RAW") {
      const raw = descriptor.source;
      const finals = (raw?.usedBy || []).map((id) => findFinal(id)).filter(Boolean);
      return [
        { label: "选题", value: topic?.title || shoot?.topic || "未关联" },
        { label: "拍摄", value: shoot?.name || raw?.shootId || "未关联" },
        { label: "原片", value: raw?.fileName || material.sourceId },
        { label: "成片引用", value: finals.map((final) => final.title).join("；") || "尚未引用" },
        { label: "平台使用", value: finals.flatMap((final) => final.platforms.map((row) => row.platform)).join("、") || "尚未发布" }
      ];
    }
    if (["SCRIPT", "HOOK", "TITLE"].includes(material.sourceType)) {
      const edits = materialUsage(material);
      const finals = edits.map((edit) => edit.finalId && findFinal(edit.finalId)).filter(Boolean);
      return [
        { label: "选题", value: topic?.title || shoot?.topic || "未关联" },
        { label: materialTypeMeta[material.sourceType].label, value: descriptor.title },
        { label: "拍摄", value: shoot?.name || "未关联" },
        { label: "剪辑任务", value: edits.map((edit) => edit.title).join("；") || "尚未使用" },
        { label: "成片", value: finals.map((final) => final.title).join("；") || "尚未生成" }
      ];
    }
    return [
      { label: "外部来源", value: material.origin || "人工登记" },
      { label: "内容素材", value: descriptor.title },
      { label: "入库状态", value: materialStage[material.stage]?.label || material.stage }
    ];
  }

  function renderMaterialUsage(material, row) {
    if (material.sourceType === "FINAL") {
      return `<li class="asset-item"><div class="asset-item__top"><strong>${escapeHtml(row.platform)} · ${escapeHtml(row.account)}</strong>${statusBadge(row.status, platformStatus)}</div><p>${escapeHtml(row.materialId || "未登记素材 ID")} · ${escapeHtml(row.publishedAt || "未登记时间")}</p></li>`;
    }
    if (material.sourceType === "RAW") {
      return `<li class="asset-item"><div class="asset-item__top"><button class="task-link" type="button" data-action="open-final" data-id="${row.id}">${escapeHtml(row.title)}</button>${statusBadge(overallFinalStatus(row).code, overallStatusMap)}</div><p>${escapeHtml(row.fileName)}</p></li>`;
    }
    return `<li class="asset-item"><div class="asset-item__top"><button class="task-link" type="button" data-action="open-edit" data-id="${row.id}">${escapeHtml(row.title)}</button>${statusBadge(row.status, editStatus)}</div><p>${escapeHtml(row.editor)} · v${row.revision}</p></li>`;
  }

  function renderPlatformRecord(final, row) {
    const auditDisabled = !can("audit");
    const reopenDisabled = !can("reopenAudit") || row.status !== "REJECTED";
    return `<li class="audit-item">
      <div class="audit-item__top"><strong>${escapeHtml(row.platform)} · ${escapeHtml(row.account)}</strong>${statusBadge(row.status, platformStatus)}</div>
      <p>素材 ID：${escapeHtml(row.materialId || "未登记")} · 发布时间：${escapeHtml(row.publishedAt || "未登记")}</p>
      ${row.reason ? `<p>卡审原因：${escapeHtml(row.reason)}</p>` : ""}
      <div class="button-row">
        ${button("标记通过", "audit-approved", `${final.id}|${row.id}`, { disabled: auditDisabled || row.status === "APPROVED", title: auditDisabled ? "切换到投手或运营角色处理审核" : "" })}
        ${button("标记卡审", "audit-rejected", `${final.id}|${row.id}`, { disabled: auditDisabled || row.status === "REJECTED", title: auditDisabled ? "切换到投手或运营角色处理审核" : "" })}
        ${button("重开剪辑", "reopen-audit", `${final.id}|${row.id}`, { disabled: reopenDisabled, title: reopenDisabled ? "仅卡审记录可重开剪辑" : "" })}
      </div>
    </li>`;
  }

  function openDialog({ kicker, title, body, submitLabel, submit }) {
    runtime.dialogSubmit = submit;
    el.dialogKicker.textContent = kicker;
    el.dialogTitle.textContent = title;
    el.dialogBody.innerHTML = body;
    el.dialogSubmit.textContent = submitLabel;
    el.dialogSubmit.classList.remove("is-loading");
    el.dialog.showModal();
    requestAnimationFrame(() => el.dialogBody.querySelector("input:not([readonly]), select, textarea, summary")?.focus());
  }

  function field(name, label, value = "", options = {}) {
    const type = options.type || "text";
    const required = options.required ? "required aria-required=\"true\"" : "";
    const readonly = options.readonly ? "readonly aria-readonly=\"true\"" : "";
    const placeholder = options.placeholder ? `placeholder="${escapeHtml(options.placeholder)}"` : "";
    if (type === "textarea") {
      return `<div class="field ${options.wide ? "field--wide" : ""}"><label for="field-${name}">${escapeHtml(label)}</label><textarea class="textarea-control" id="field-${name}" name="${name}" ${required} ${placeholder}>${escapeHtml(value)}</textarea><small class="field-helper">${escapeHtml(options.helper || " ")}</small></div>`;
    }
    if (type === "select") {
      return `<div class="field ${options.wide ? "field--wide" : ""}"><label for="field-${name}">${escapeHtml(label)}</label><select class="select-control" id="field-${name}" name="${name}" ${required}>${options.options.map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}</select><small class="field-helper">${escapeHtml(options.helper || " ")}</small></div>`;
    }
    return `<div class="field ${options.wide ? "field--wide" : ""}"><label for="field-${name}">${escapeHtml(label)}</label><input class="input-control ${options.readonly ? "is-readonly" : ""}" id="field-${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required} ${readonly} ${placeholder} /><small class="field-helper">${escapeHtml(options.helper || " ")}</small></div>`;
  }

  function multiSelectField(name, label, options, selected = [], helper = "") {
    const selectedLabels = options.filter(([value]) => selected.includes(value)).map(([, optionLabel]) => optionLabel);
    return `<div class="field field--wide multi-select-field" data-multi-select-field="${name}">
      <label id="field-${name}-label">${escapeHtml(label)}</label>
      <details class="multi-select" data-multi-select="${name}">
        <summary aria-labelledby="field-${name}-label"><span data-multi-select-summary>${selectedLabels.length ? escapeHtml(selectedLabels.join("、")) : `请选择${escapeHtml(label)}`}</span><svg aria-hidden="true"><use href="#i-chevron"></use></svg></summary>
        <div class="multi-select__menu" role="group" aria-labelledby="field-${name}-label">
          ${options.map(([value, optionLabel]) => `<label class="multi-select__option"><input type="checkbox" name="${name}" value="${escapeHtml(value)}" ${selected.includes(value) ? "checked" : ""} /><span>${escapeHtml(optionLabel)}</span></label>`).join("")}
        </div>
      </details>
      <small class="field-helper">${escapeHtml(helper || "可同时选择多个业务线。")}</small>
    </div>`;
  }

  function validateRequired(formData, names) {
    let firstInvalid = null;
    names.forEach((name) => {
      const control = el.dialogBody.querySelector(`[name="${name}"]`);
      const helper = control?.closest(".field")?.querySelector(".field-helper");
      const invalid = !String(formData.get(name) || "").trim();
      control?.classList.toggle("is-error", invalid);
      control?.setAttribute("aria-invalid", String(invalid));
      if (helper) {
        helper.textContent = invalid ? `${control.labels?.[0]?.textContent || "该字段"}不能为空，请补充后保存。` : " ";
        helper.classList.toggle("is-error", invalid);
      }
      if (invalid && !firstInvalid) firstInvalid = control;
    });
    firstInvalid?.focus();
    return !firstInvalid;
  }

  function validateMultiSelect(formData, name) {
    const fieldNode = el.dialogBody.querySelector(`[data-multi-select-field="${name}"]`);
    const control = fieldNode?.querySelector(".multi-select");
    const helper = fieldNode?.querySelector(".field-helper");
    const valid = formData.getAll(name).length > 0;
    control?.classList.toggle("is-error", !valid);
    control?.setAttribute("aria-invalid", String(!valid));
    if (helper) {
      helper.textContent = valid ? "可同时选择多个业务线。" : "请至少选择一个业务线。";
      helper.classList.toggle("is-error", !valid);
    }
    if (!valid) {
      control?.setAttribute("open", "");
      control?.querySelector("input")?.focus();
    }
    return valid;
  }

  function updateMultiSelectSummary(name) {
    const fieldNode = el.dialogBody.querySelector(`[data-multi-select-field="${name}"]`);
    if (!fieldNode) return;
    const labels = [...fieldNode.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.closest("label")?.querySelector("span")?.textContent || input.value);
    const summary = fieldNode.querySelector("[data-multi-select-summary]");
    if (summary) summary.textContent = labels.length ? labels.join("、") : "请选择业务线";
    fieldNode.querySelector(".multi-select")?.classList.remove("is-error");
  }

  function splitTags(value) {
    return [...new Set(String(value || "").split(/[，,\n]/).map((tag) => tag.trim()).filter(Boolean))].slice(0, 12);
  }

  function openCreateCollectionDialog(materialId = "") {
    if (!can("createCollection")) return;
    openDialog({
      kicker: "CREATE COLLECTION",
      title: "新建素材集合",
      submitLabel: "创建集合",
      body: `<div class="form-grid">
        ${field("name", "集合名称", "", { required: true, wide: true, placeholder: "例如：开学季家长决策复用包" })}
        ${field("description", "集合说明", "", { type: "textarea", required: true, wide: true, helper: "说明使用场景、主题边界或复用目的。集合不复制源文件。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["name", "description"])) return false;
        const id = `COL-${String(Date.now()).slice(-6)}`;
        state.collections.unshift({
          id,
          name: formData.get("name").trim(),
          description: formData.get("description").trim(),
          owner: roleMeta[state.currentRole].user,
          materialIds: materialId ? [materialId] : [],
          createdAt: nowText(),
          updatedAt: nowText()
        });
        runtime.filters.materialCollection = id;
        persist(); render();
        if (materialId) openMaterialDrawer(materialId);
        announce("素材集合已创建。", true, "success");
        return true;
      }
    });
  }

  function openRegisterExternalMaterialDialog() {
    if (!can("registerExternalMaterial")) return;
    openDialog({
      kicker: "REGISTER MATERIAL",
      title: "登记外部素材",
      submitLabel: "登记并进入待整理",
      body: `<div class="form-grid">
        ${field("title", "素材名称", "", { required: true, wide: true })}
        ${field("origin", "来源", "外部内容库", { required: true, placeholder: "例如：客户提供 / 旧网盘 / 供应商" })}
        ${field("url", "来源链接或文件编号", "", { required: true, placeholder: "仅登记引用，不抓取文件" })}
        ${field("tags", "初始标签", "", { wide: true, placeholder: "使用逗号分隔，例如：家长访谈, 开学季" })}
        ${field("note", "整理说明", "", { type: "textarea", wide: true, helper: "登记后默认进入“待整理”和“未复核”，不会直接成为可投放素材。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["title", "origin", "url"])) return false;
        const id = `MAT-EXT-${String(Date.now()).slice(-8)}`;
        state.materials.unshift({
          id,
          sourceType: "EXTERNAL",
          sourceId: formData.get("url").trim(),
          title: formData.get("title").trim(),
          origin: formData.get("origin").trim(),
          url: formData.get("url").trim(),
          tags: splitTags(formData.get("tags")),
          stage: "TO_ORGANIZE",
          availability: "AVAILABLE",
          compliance: "NOT_REVIEWED",
          performance: "UNTESTED",
          owner: roleMeta[state.currentRole].user,
          note: formData.get("note").trim() || "待补充来源权属、内容标签与使用边界。",
          updatedAt: nowText()
        });
        persist(); render(); openMaterialDrawer(id);
        announce("外部素材已登记并进入待整理。", true, "success");
        return true;
      }
    });
  }

  function openEditMaterialTagsDialog(id) {
    const material = findMaterial(id);
    if (!material || !can("organizeMaterial")) return;
    openDialog({
      kicker: "EDIT TAGS",
      title: "编辑素材标签",
      submitLabel: "保存标签",
      body: `<div class="form-grid">${field("tags", "标签", material.tags.join(", "), { type: "textarea", wide: true, helper: "使用逗号或换行分隔，最多保留 12 个标签。建议描述主题、IP、场景、内容结构和复用意图。" })}</div>`,
      submit: (formData) => {
        material.tags = splitTags(formData.get("tags"));
        material.updatedAt = nowText();
        persist(); render(); openMaterialDrawer(id);
        announce("素材标签已更新。", true, "success");
        return true;
      }
    });
  }

  function openAddMaterialToCollectionDialog(id) {
    const material = findMaterial(id);
    if (!material || !can("organizeMaterial")) return;
    if (!state.collections.length) {
      openCreateCollectionDialog(id);
      return;
    }
    const current = materialCollections(id).map((collection) => collection.id);
    openDialog({
      kicker: "ADD TO COLLECTION",
      title: "加入素材集合",
      submitLabel: "保存集合关系",
      body: `<div class="collection-choice-list">${state.collections.map((collection) => `<label class="collection-choice"><input type="checkbox" name="collectionIds" value="${collection.id}" ${current.includes(collection.id) ? "checked" : ""} /><span><strong>${escapeHtml(collection.name)}</strong><small>${escapeHtml(collection.description)}</small></span></label>`).join("")}</div>`,
      submit: (formData) => {
        const selected = formData.getAll("collectionIds");
        state.collections.forEach((collection) => {
          collection.materialIds = collection.materialIds.filter((materialId) => materialId !== id);
          if (selected.includes(collection.id)) collection.materialIds.push(id);
          collection.updatedAt = nowText();
        });
        persist(); render(); openMaterialDrawer(id);
        announce("素材集合关系已更新。", true, "success");
        return true;
      }
    });
  }

  function openUpdateMaterialStageDialog(id) {
    const material = findMaterial(id);
    if (!material || !can("organizeMaterial")) return;
    openDialog({
      kicker: "UPDATE MATERIAL",
      title: "更新素材流转",
      submitLabel: "保存状态",
      body: `<div class="form-grid">
        ${field("stage", "流转状态", material.stage, { type: "select", options: Object.entries(materialStage).map(([code, meta]) => [code, meta.label]), required: true })}
        ${field("compliance", "合规状态", material.compliance, { type: "select", options: Object.entries(materialCompliance).map(([code, meta]) => [code, meta.label]), required: true })}
        ${field("performance", "表现标签", material.performance, { type: "select", options: Object.entries(materialPerformance).map(([code, meta]) => [code, meta.label]), required: true })}
        ${field("note", "内部说明", material.note, { type: "textarea", wide: true, helper: "流转、合规和表现是三个独立维度，请写清判断依据。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["stage", "compliance", "performance"])) return false;
        material.stage = formData.get("stage");
        material.compliance = formData.get("compliance");
        material.performance = formData.get("performance");
        material.availability = material.stage === "RESTRICTED" ? "RESTRICTED" : material.stage === "ARCHIVED" ? "ARCHIVED" : "AVAILABLE";
        material.note = formData.get("note").trim();
        material.updatedAt = nowText();
        persist(); render(); openMaterialDrawer(id);
        announce(`素材已进入“${materialStage[material.stage].label}”。`, true, materialStage[material.stage].tone);
        return true;
      }
    });
  }

  function openCreateReeditDialog(id) {
    const material = findMaterial(id);
    const descriptor = material ? materialDescriptor(material) : null;
    const shoot = descriptor?.shoot;
    if (!material || !shoot || !can("createReedit")) return;
    const script = material.sourceType === "FINAL" ? shoot.scripts.find((item) => item.title === findEdit(descriptor.source?.editId)?.title) || shoot.scripts[0]
      : ["SCRIPT", "HOOK", "TITLE"].includes(material.sourceType) ? descriptor.source : shoot.scripts[0];
    const defaultTitle = material.sourceType === "TITLE" ? descriptor.title : script?.title || descriptor.title;
    openDialog({
      kicker: "CREATE RE-EDIT",
      title: "从素材创建重剪任务",
      submitLabel: "创建并前往剪辑任务",
      body: `<div class="form-grid">
        ${field("title", "任务标题", defaultTitle, { required: true, wide: true })}
        ${field("editor", "剪辑负责人", "陈琳", { type: "select", options: [["陈琳", "陈琳"], ["王澈", "王澈"], ["宋言", "宋言"]], required: true })}
        ${field("priority", "优先级", material.compliance === "RISKY" ? "HIGH" : "NORMAL", { type: "select", options: Object.entries(priorityMeta).map(([code, meta]) => [code, meta.label]), required: true })}
        ${field("due", "截止日期", "2026-08-23", { type: "date", required: true })}
        ${field("note", "重剪要求", `来源素材：${material.id}\n${material.note || ""}`, { type: "textarea", wide: true, helper: "新任务保留来源素材 ID，后续成片可反查本次复用。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["title", "editor", "priority", "due"])) return false;
        const editId = `ED-R-${String(Date.now()).slice(-6)}`;
        state.edits.unshift({
          id: editId,
          shootId: shoot.id,
          title: formData.get("title").trim(),
          editor: formData.get("editor"),
          priority: formData.get("priority"),
          status: "TODO",
          due: formData.get("due"),
          selectedOpening: material.sourceType === "HOOK" ? descriptor.title : script?.opening || "",
          selectedTitle: material.sourceType === "TITLE" ? descriptor.title : "",
          revision: 0,
          finalId: null,
          sourceMaterialIds: [material.id],
          sourceFinalId: material.sourceType === "FINAL" ? material.sourceId : null,
          history: [{ at: nowText(), actor: roleMeta[state.currentRole].user, action: "从内容素材创建重剪任务", note: formData.get("note").trim() || `来源素材：${material.id}` }]
        });
        shoot.status = "IN_EDITING";
        if (material.stage === "READY") material.stage = "IN_USE";
        material.updatedAt = nowText();
        persist();
        switchView("edits");
        openEditDrawer(editId);
        announce("重剪任务已创建，并保留素材来源关系。", true, "success");
        return true;
      }
    });
  }

  function openCreateShootDialog() {
    if (!can("createShoot")) return;
    openDialog({
      kicker: "CREATE SHOOT",
      title: "新建拍摄任务",
      submitLabel: "创建任务",
      body: `<div class="form-grid">
        ${field("name", "任务名称", "", { required: true, wide: true, placeholder: "例如：0822 拍摄任务｜开学前规划" })}
        ${field("topic", "选题", "", { required: true, placeholder: "输入选题名称" })}
        ${field("ip", "出镜 IP", "阿留老师", { required: true })}
        ${field("date", "拍摄日期", "2026-08-22", { type: "date", required: true })}
        ${field("location", "拍摄场地", "深圳办公室", { required: true })}
        ${field("scriptTitle", "首条脚本标题", "", { required: true, wide: true })}
        ${field("opening", "开头", "", { type: "textarea", wide: true, helper: "拍摄前必填；用于生成拍摄文档。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["name", "topic", "ip", "date", "location", "scriptTitle"])) return false;
        const id = `ST-${String(Date.now()).slice(-6)}`;
        const topicId = `TP-${String(Date.now()).slice(-8)}`;
        state.topics.unshift({ id: topicId, title: formData.get("topic").trim(), topicType: "HOME", businessLines: ["教育规划"], product: "教育规划", ip: formData.get("ip").trim(), owner: roleMeta.director.user, scriptCount: 1, finalCount: 0, updatedAt: nowText() });
        state.shoots.unshift({
          id,
          name: formData.get("name").trim(),
          topicId,
          topic: formData.get("topic").trim(),
          status: "READY_TO_SHOOT",
          director: roleMeta.director.user,
          ip: formData.get("ip").trim(),
          location: formData.get("location").trim(),
          date: formData.get("date"),
          scenes: "待拍摄后补录",
          wardrobe: "待拍摄后补录",
          equipment: "待拍摄后补录",
          scriptCount: 1,
          rawCount: 0,
          note: "由视频管理 P0 原型创建。",
          scripts: [{ title: formData.get("scriptTitle").trim(), opening: formData.get("opening").trim() || "待补充", editNote: "待补充" }]
        });
        ensureMaterialIndex();
        persist();
        render();
        openShootDrawer(id);
        announce("拍摄任务已创建。已打开任务详情。");
        return true;
      }
    });
  }

  function openCreateTopicDialog() {
    if (!can("createTopic")) return;
    const topicId = `TP-${String(Date.now()).slice(-8)}`;
    openDialog({
      kicker: "CREATE TOPIC",
      title: "新建选题",
      submitLabel: "保存选题",
      body: `<div class="form-grid topic-form">
        ${field("topicId", "选题 ID", topicId, { required: true, readonly: true, wide: true, helper: "系统自动生成，保存后不可修改。" })}
        ${field("title", "选题名称", "", { required: true, wide: true, placeholder: "请输入选题名称" })}
        ${field("topicType", "选题脚本类型", "HOME", { type: "select", options: Object.entries(topicTypeMeta), required: true, wide: true, helper: "主页脚本用于账号日常内容；投流脚本用于广告投放内容。" })}
        ${multiSelectField("businessLines", "业务线", businessLineOptions.map((line) => [line, line]), [], "支持多选；首批业务线为教育规划、大场、豆神双语。")}
      </div>`,
      submit: (formData) => {
        const requiredValid = validateRequired(formData, ["topicId", "title", "topicType"]);
        const businessLinesValid = validateMultiSelect(formData, "businessLines");
        if (!requiredValid || !businessLinesValid) return false;
        const businessLines = formData.getAll("businessLines");
        state.topics.unshift({ id: formData.get("topicId"), title: formData.get("title").trim(), topicType: formData.get("topicType"), businessLines, product: businessLines.join("、"), ip: "待分配", owner: roleMeta.director.user, scriptCount: 0, finalCount: 0, updatedAt: nowText() });
        ensureMaterialIndex(); persist(); render(); return true;
      }
    });
  }

  function openRawUploadDialog(shootId) {
    const shoot = findShoot(shootId);
    if (!shoot || !can("uploadRaw")) return;
    openDialog({
      kicker: "UPLOAD RAW",
      title: "登记原片上传",
      submitLabel: "开始模拟上传",
      body: `<div class="form-grid">
        ${field("files", "原片文件名", `${shoot.date.slice(5).replace("-", "")}_${shoot.ip}_${shoot.topic}_机位A_镜01.mp4`, { type: "textarea", required: true, wide: true, helper: "每行一个文件名。原型只模拟进度，不读取本地文件。" })}
        ${field("scene", "场景", shoot.scenes, { required: true })}${field("camera", "机位", "A 机位", { required: true })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["files", "scene", "camera"])) return false;
        const files = formData.get("files").split("\n").map((value) => value.trim()).filter(Boolean);
        if (!files.length) return false;
        runtime.upload = { shootId, files, scene: formData.get("scene").trim(), camera: formData.get("camera").trim(), progress: 0 };
        shoot.status = "MATERIAL_UPLOADING";
        persist();
        openShootDrawer(shootId);
        runUploadSimulation();
        return true;
      }
    });
  }

  function runUploadSimulation() {
    if (!runtime.upload) return;
    const timer = window.setInterval(() => {
      if (!runtime.upload) return window.clearInterval(timer);
      runtime.upload.progress = Math.min(100, runtime.upload.progress + 10);
      const box = el.drawerBody.querySelector(`[data-upload-progress="${runtime.upload.shootId}"]`);
      box?.querySelector(".progress-track")?.style.setProperty("--progress", String(runtime.upload.progress / 100));
      const label = box?.querySelector("[data-progress-label]");
      if (label) label.textContent = `${runtime.upload.progress}%`;
      if (runtime.upload.progress >= 100) {
        window.clearInterval(timer);
        finishUploadSimulation();
      }
    }, 180);
  }

  function finishUploadSimulation() {
    const upload = runtime.upload;
    if (!upload) return;
    const shoot = findShoot(upload.shootId);
    upload.files.forEach((fileName, index) => state.raws.unshift({
      id: `RW-${String(Date.now()).slice(-6)}-${index + 1}`,
      shootId: upload.shootId,
      fileName,
      scene: upload.scene,
      camera: upload.camera,
      shot: `镜 ${String(index + 1).padStart(2, "0")}`,
      size: "待服务端回填",
      duration: "待服务端回填",
      usedBy: [],
      uploadedAt: nowText()
    }));
    shoot.rawCount = state.raws.filter((raw) => raw.shootId === shoot.id).length;
    shoot.status = "READY_TO_ASSIGN";
    runtime.upload = null;
    ensureMaterialIndex();
    persist(); render(); openShootDrawer(shoot.id);
    announce(`${upload.files.length} 条原片已登记，拍摄任务进入待分配剪辑。`);
  }

  function openAssignEditDialog(shootId) {
    const shoot = findShoot(shootId);
    if (!shoot || !can("assignEdit") || shoot.rawCount === 0) return;
    openDialog({
      kicker: "ASSIGN EDIT",
      title: "分配剪辑任务",
      submitLabel: "创建剪辑任务",
      body: `<div class="form-grid">
        ${field("script", "脚本", "0", { type: "select", options: shoot.scripts.map((script, index) => [String(index), script.title]), required: true, wide: true })}
        ${field("editor", "剪辑负责人", "陈琳", { type: "select", options: [["陈琳", "陈琳"], ["王澈", "王澈"], ["宋言", "宋言"]], required: true })}
        ${field("priority", "优先级", "NORMAL", { type: "select", options: Object.entries(priorityMeta).map(([code, meta]) => [code, meta.label]), required: true })}
        ${field("due", "截止日期", "2026-08-22", { type: "date", required: true })}
        ${field("note", "分配说明", "", { type: "textarea", wide: true, helper: "补充剪辑重点、历史卡审或交付时间要求。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["script", "editor", "priority", "due"])) return false;
        const script = shoot.scripts[Number(formData.get("script"))];
        const id = `ED-${String(Date.now()).slice(-6)}`;
        state.edits.unshift({ id, shootId, title: script.title, editor: formData.get("editor"), priority: formData.get("priority"), status: "TODO", due: formData.get("due"), selectedOpening: "", selectedTitle: "", revision: 0, finalId: null, history: [{ at: nowText(), actor: roleMeta.director.user, action: "分配剪辑任务", note: formData.get("note").trim() || "按正常流程处理。" }] });
        shoot.status = "IN_EDITING";
        persist(); render(); openEditDrawer(id); return true;
      }
    });
  }

  function startEdit(id) {
    const edit = findEdit(id);
    if (!edit || !can("startEdit")) return;
    edit.status = "IN_PROGRESS";
    edit.history.push({ at: nowText(), actor: roleMeta.editor.user, action: "开始剪辑", note: "任务进入剪辑中。" });
    persist(); render(); openEditDrawer(id);
  }

  function openSubmitEditDialog(id) {
    const edit = findEdit(id);
    const shoot = edit ? findShoot(edit.shootId) : null;
    if (!edit || !shoot || !can("submitEdit")) return;
    const script = shoot.scripts.find((row) => row.title === edit.title) || shoot.scripts[0];
    openDialog({
      kicker: "SUBMIT REVIEW",
      title: "提交成片审片",
      submitLabel: "提交审片",
      body: `<div class="form-grid">
        ${field("opening", "实际使用开头", edit.selectedOpening || script.opening, { required: true, wide: true })}
        ${field("title", "实际使用标题", edit.selectedTitle || edit.title, { required: true, wide: true })}
        ${field("file", "成片文件名", `${shoot.ip}_${shoot.topic}_${edit.title}_v${edit.revision + 1}_${shoot.date.slice(5).replace("-", "")}.mp4`, { required: true, wide: true, helper: "生产环境由服务端生成不可变资产 ID；文件名只用于识别。" })}
        ${field("note", "提交说明", "已完成本版剪辑，请审片。", { type: "textarea", wide: true })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["opening", "title", "file"])) return false;
        edit.selectedOpening = formData.get("opening").trim();
        edit.selectedTitle = formData.get("title").trim();
        edit.revision += 1;
        edit.status = "SUBMITTED";
        edit.pendingFileName = formData.get("file").trim();
        edit.history.push({ at: nowText(), actor: roleMeta.editor.user, action: `提交第 ${edit.revision} 版`, note: formData.get("note").trim() || "已提交审片。" });
        persist(); render(); openEditDrawer(id); return true;
      }
    });
  }

  function approveEdit(id) {
    const edit = findEdit(id);
    if (!edit || !can("reviewEdit") || edit.status !== "SUBMITTED") return;
    edit.status = "APPROVED";
    edit.history.push({ at: nowText(), actor: roleMeta.director.user, action: "审片通过", note: "成片已自动进入视频成片中心。" });
    let final = edit.finalId ? findFinal(edit.finalId) : null;
    if (!final) {
      const shoot = findShoot(edit.shootId);
      const idFinal = `FN-${String(Date.now()).slice(-6)}`;
      final = { id: idFinal, editId: edit.id, shootId: edit.shootId, title: edit.selectedTitle || edit.title, fileName: edit.pendingFileName || `${shoot.ip}_${shoot.topic}_${edit.title}_v${edit.revision}.mp4`, duration: "待媒体服务回填", size: "待媒体服务回填", approvedAt: nowText(), editor: edit.editor, rawIds: state.raws.filter((raw) => raw.shootId === edit.shootId).slice(0, 2).map((raw) => raw.id), sourceMaterialIds: edit.sourceMaterialIds || [], platforms: [] };
      state.finals.unshift(final);
      final.rawIds.forEach((rawId) => {
        const raw = findRaw(rawId);
        if (raw && !raw.usedBy.includes(idFinal)) raw.usedBy.push(idFinal);
      });
      edit.finalId = idFinal;
      const topic = findTopic(shoot.topicId);
      if (topic) topic.finalCount += 1;
    }
    ensureMaterialIndex();
    persist(); render(); openFinalDrawer(final.id);
    announce("审片已通过，成片已自动进入视频成片中心。");
  }

  function openRevisionDialog(id) {
    const edit = findEdit(id);
    if (!edit || !can("reviewEdit") || edit.status !== "SUBMITTED") return;
    openDialog({
      kicker: "REVISION",
      title: "退回修改",
      submitLabel: "发送修改意见",
      body: `<div class="form-grid">${field("reason", "结构化修改意见", "", { type: "textarea", required: true, wide: true, placeholder: "例如：00:18–00:26 论点重复；结尾补一个明确判断。", helper: "写明时间点、问题和期望改法。" })}</div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["reason"])) return false;
        edit.status = "REVISION_REQUIRED";
        edit.history.push({ at: nowText(), actor: roleMeta.director.user, action: "退回修改", note: formData.get("reason").trim() });
        persist(); render(); openEditDrawer(id); return true;
      }
    });
  }

  function openPublishDialog(finalId) {
    const final = findFinal(finalId);
    if (!final || !can("publish")) return;
    openDialog({
      kicker: "PUBLISH RECORD",
      title: "登记平台发布",
      submitLabel: "保存发布记录",
      body: `<div class="form-grid">
        ${field("platform", "平台", "抖音", { type: "select", options: [["抖音", "抖音"], ["小红书", "小红书"], ["快手", "快手"], ["视频号", "视频号"]], required: true })}
        ${field("account", "发布账户", "", { required: true, placeholder: "输入平台账户名称" })}
        ${field("materialId", "素材 ID / 笔记 ID", "", { required: true, helper: "手动发布时也必须登记。" })}
        ${field("publishedAt", "发布时间", "2026-08-20T12:00", { type: "datetime-local", required: true })}
        ${field("status", "平台审核状态", "UNDER_REVIEW", { type: "select", options: [["UNDER_REVIEW", "平台审核中"], ["APPROVED", "审核通过"], ["REJECTED", "审核不通过"]], required: true })}
        ${field("url", "发布链接", "", { wide: true, placeholder: "可选" })}
        ${field("reason", "卡审原因", "", { type: "textarea", wide: true, helper: "只有审核不通过时需要填写。" })}
      </div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["platform", "account", "materialId", "publishedAt", "status"])) return false;
        if (formData.get("status") === "REJECTED" && !formData.get("reason").trim()) {
          validateRequired(formData, ["reason"]); return false;
        }
        final.platforms.push({ id: `PM-${String(Date.now()).slice(-6)}`, platform: formData.get("platform"), account: formData.get("account").trim(), materialId: formData.get("materialId").trim(), url: formData.get("url").trim(), status: formData.get("status"), publishedAt: formData.get("publishedAt").replace("T", " "), reason: formData.get("reason").trim() });
        persist(); render(); openFinalDrawer(finalId); return true;
      }
    });
  }

  function updateAudit(finalId, rowId, status, reason = "") {
    const final = findFinal(finalId);
    const row = final?.platforms.find((item) => item.id === rowId);
    if (!row || !can("audit")) return;
    row.status = status;
    row.reason = status === "REJECTED" ? reason : "";
    persist(); render(); openFinalDrawer(finalId);
  }

  function openAuditRejectDialog(finalId, rowId) {
    if (!can("audit")) return;
    openDialog({
      kicker: "PLATFORM AUDIT",
      title: "登记平台卡审",
      submitLabel: "保存卡审结果",
      body: `<div class="form-grid">${field("reason", "卡审原因", "", { type: "textarea", required: true, wide: true, helper: "保留平台原始原因，并补充人工判断。" })}</div>`,
      submit: (formData) => {
        if (!validateRequired(formData, ["reason"])) return false;
        updateAudit(finalId, rowId, "REJECTED", formData.get("reason").trim());
        return true;
      }
    });
  }

  function reopenFromAudit(finalId, rowId) {
    const final = findFinal(finalId);
    const row = final?.platforms.find((item) => item.id === rowId);
    const edit = final ? findEdit(final.editId) : null;
    if (!row || row.status !== "REJECTED" || !edit || !can("reopenAudit")) return;
    edit.status = "REOPENED_FOR_AUDIT";
    edit.priority = "HIGH";
    edit.history.push({ at: nowText(), actor: roleMeta[state.currentRole].user, action: `因${row.platform}卡审重开`, note: row.reason || "平台审核不通过，重新处理。" });
    row.status = "REUPLOAD_REQUIRED";
    persist(); render(); openEditDrawer(edit.id);
    announce("已重开剪辑任务，平台记录进入待重新上传。");
  }

  function announce(message, toast = false, tone = "neutral") {
    el.announcer.textContent = message;
    if (toast) showToast(message, tone);
  }

  function showToast(message, tone = "neutral", action = null) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.tone = tone;
    toast.innerHTML = `${icon(action ? "history" : "alert")}<p>${escapeHtml(message)}</p>${action ? `<button type="button">${escapeHtml(action.label)}</button>` : ""}`;
    if (action) toast.querySelector("button").addEventListener("click", () => { action.run(); toast.remove(); });
    el.toastRegion.append(toast);
    const timer = window.setTimeout(() => toast.remove(), action ? 9000 : 5000);
    toast.addEventListener("mouseenter", () => window.clearTimeout(timer), { once: true });
  }

  function openCommandPalette() {
    runtime.activeCommandIndex = 0;
    el.commandInput.value = "";
    renderCommandResults();
    el.commandDialog.showModal();
    requestAnimationFrame(() => el.commandInput.focus());
  }

  function buildCommandItems(query = "") {
    const items = [
      ...Object.entries(viewMeta).map(([view, meta]) => ({ key: `view-${view}`, label: meta.label, meta: "功能", run: () => switchView(view) })),
      ...state.shoots.map((item) => ({ key: item.id, label: item.name, meta: `拍摄任务 · ${item.id}`, run: () => openShootDrawer(item.id) })),
      ...state.edits.map((item) => ({ key: item.id, label: item.title, meta: `剪辑任务 · ${item.id}`, run: () => openEditDrawer(item.id) })),
      ...state.finals.map((item) => ({ key: item.id, label: item.title, meta: `视频成片 · ${item.id}`, run: () => openFinalDrawer(item.id) })),
      ...state.materials.map((item) => { const descriptor = materialDescriptor(item); return { key: item.id, label: descriptor.title, meta: `内容素材 · ${materialTypeMeta[item.sourceType]?.label || "素材"} · ${item.id}`, run: () => openMaterialDrawer(item.id) }; }),
      ...state.collections.map((item) => ({ key: item.id, label: item.name, meta: `素材集合 · ${item.materialIds.length} 条`, run: () => { runtime.filters.materialCollection = item.id; switchView("materials"); } }))
    ];
    const normalized = query.trim().toLowerCase();
    return normalized ? items.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(normalized)) : items.slice(0, 12);
  }

  function renderCommandResults() {
    runtime.commandItems = buildCommandItems(el.commandInput.value);
    runtime.activeCommandIndex = Math.min(runtime.activeCommandIndex, Math.max(0, runtime.commandItems.length - 1));
    el.commandResults.innerHTML = runtime.commandItems.length ? runtime.commandItems.map((item, index) => `<button class="command-item ${index === runtime.activeCommandIndex ? "is-selected" : ""}" type="button" role="option" aria-selected="${index === runtime.activeCommandIndex}" data-command-index="${index}"><span>${escapeHtml(item.label)}</span><small>${escapeHtml(item.meta)}</small></button>`).join("") : `<div class="empty-state"><h3>没有匹配结果</h3><p>换一个任务名称、编号或功能名称。</p></div>`;
  }

  function runCommand(index) {
    const item = runtime.commandItems[index];
    if (!item) return;
    el.commandDialog.close();
    item.run();
  }

  function switchView(view) {
    if (!viewMeta[view]) return;
    state.currentView = view;
    persist();
    closeMobileNav();
    closeDrawer();
    render();
    document.querySelector("#main-content").focus({ preventScroll: true });
  }

  function closeMobileNav() {
    el.shell.classList.remove("is-nav-open");
    el.mobileMenu.setAttribute("aria-expanded", "false");
  }

  function refreshActiveDrawer() {
    if (!runtime.activeDrawer) return;
    const { type, id } = runtime.activeDrawer;
    if (type === "shoot") openShootDrawer(id);
    if (type === "edit") openEditDrawer(id);
    if (type === "final") openFinalDrawer(id);
    if (type === "material") openMaterialDrawer(id);
  }

  document.querySelector(".primary-nav").addEventListener("click", (event) => {
    const target = event.target.closest("[data-view]");
    if (target) switchView(target.dataset.view);
  });

  el.view.addEventListener("input", (event) => {
    const filter = event.target.dataset.filter;
    if (!filter) return;
    runtime.filters[filter] = event.target.value;
    const selectionStart = event.target.selectionStart;
    render();
    const next = el.view.querySelector(`[data-filter="${filter}"]`);
    next?.focus({ preventScroll: true });
    next?.setSelectionRange(selectionStart, selectionStart);
  });

  el.view.addEventListener("change", (event) => {
    const filter = event.target.dataset.materialFilter;
    if (!filter) return;
    runtime.filters[filter] = event.target.value;
    render();
  });

  function handleAction(action, id, target) {
    if (action === "open-shoot") openShootDrawer(id);
    else if (action === "open-edit") openEditDrawer(id);
    else if (action === "open-final") openFinalDrawer(id);
    else if (action === "open-material") openMaterialDrawer(id);
    else if (action === "create-shoot") openCreateShootDialog();
    else if (action === "create-topic") openCreateTopicDialog();
    else if (action === "clear-filter") { runtime.filters[target.dataset.filter] = ""; render(); }
    else if (action === "filter-edit-status") { runtime.filters.editStatus = target.dataset.status; render(); }
    else if (action === "filter-material-type") { runtime.filters.materialType = target.dataset.materialType; render(); }
    else if (action === "filter-material-stage") { runtime.filters.materialStage = target.dataset.stage; render(); }
    else if (action === "filter-material-collection") { runtime.filters.materialCollection = target.dataset.collection; render(); }
    else if (action === "set-material-view") { runtime.filters.materialView = target.dataset.viewMode; render(); }
    else if (action === "reset-material-filters") {
      runtime.filters.materials = "";
      runtime.filters.materialType = "ALL";
      runtime.filters.materialStage = "ALL";
      runtime.filters.materialCompliance = "ALL";
      runtime.filters.materialCollection = "ALL";
      render();
    }
    else if (action === "create-collection") openCreateCollectionDialog();
    else if (action === "register-external-material") openRegisterExternalMaterialDialog();
    else if (action === "edit-material-tags") openEditMaterialTagsDialog(id);
    else if (action === "add-material-to-collection") openAddMaterialToCollectionDialog(id);
    else if (action === "update-material-stage") openUpdateMaterialStageDialog(id);
    else if (action === "create-reedit-from-material") openCreateReeditDialog(id);
    else if (action === "upload-raw") openRawUploadDialog(id);
    else if (action === "assign-edit") openAssignEditDialog(id);
    else if (action === "start-edit") startEdit(id);
    else if (action === "submit-edit") openSubmitEditDialog(id);
    else if (action === "approve-edit") approveEdit(id);
    else if (action === "request-revision") openRevisionDialog(id);
    else if (action === "register-publish") openPublishDialog(id);
    else if (action === "audit-approved") { const [finalId, rowId] = id.split("|"); updateAudit(finalId, rowId, "APPROVED"); }
    else if (action === "audit-rejected") { const [finalId, rowId] = id.split("|"); openAuditRejectDialog(finalId, rowId); }
    else if (action === "reopen-audit") { const [finalId, rowId] = id.split("|"); reopenFromAudit(finalId, rowId); }
    else if (action === "print-shoot") { window.print(); }
    else if (action === "preview-demo") showToast("这是交互原型的预览占位；接入媒体服务后播放转码代理文件。", "neutral");
    else if (action === "download-demo") showToast("这是演示数据，未连接真实文件下载地址。", "neutral");
  }

  [el.view, el.drawerBody].forEach((container) => container.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (target && !target.disabled) handleAction(target.dataset.action, target.dataset.id || "", target);
  }));

  el.role.addEventListener("change", () => {
    state.currentRole = el.role.value;
    persist(); render(); refreshActiveDrawer();
    announce(`已切换为${roleMeta[state.currentRole].label}角色。`);
  });

  el.mobileMenu.addEventListener("click", () => {
    const open = !el.shell.classList.contains("is-nav-open");
    el.shell.classList.toggle("is-nav-open", open);
    el.mobileMenu.setAttribute("aria-expanded", String(open));
  });
  el.mobileScrim.addEventListener("click", closeMobileNav);
  el.closeDrawer.addEventListener("click", closeDrawer);
  el.drawerScrim.addEventListener("click", closeDrawer);

  el.dialogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!runtime.dialogSubmit) return;
    const result = runtime.dialogSubmit(new FormData(el.dialogForm));
    if (result !== false) {
      el.dialog.close();
      runtime.dialogSubmit = null;
    }
  });

  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog) el.dialog.close();
  });
  el.dialogBody.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-multi-select-field] input[type=\"checkbox\"]");
    if (checkbox) updateMultiSelectSummary(checkbox.name);
  });
  el.commandDialog.addEventListener("click", (event) => {
    if (event.target === el.commandDialog) el.commandDialog.close();
    const item = event.target.closest("[data-command-index]");
    if (item) runCommand(Number(item.dataset.commandIndex));
  });

  el.commandButton.addEventListener("click", openCommandPalette);
  el.commandInput.addEventListener("input", () => { runtime.activeCommandIndex = 0; renderCommandResults(); });
  el.commandInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") { event.preventDefault(); runtime.activeCommandIndex = Math.min(runtime.activeCommandIndex + 1, runtime.commandItems.length - 1); renderCommandResults(); }
    if (event.key === "ArrowUp") { event.preventDefault(); runtime.activeCommandIndex = Math.max(runtime.activeCommandIndex - 1, 0); renderCommandResults(); }
    if (event.key === "Enter") { event.preventDefault(); runCommand(runtime.activeCommandIndex); }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (!el.commandDialog.open) openCommandPalette();
    }
    if (event.key === "Escape") {
      closeMobileNav();
      if (el.drawer.classList.contains("is-open")) closeDrawer();
    }
  });

  el.resetDemo.addEventListener("click", () => {
    const previous = clone(state);
    state = seedState();
    ensureTopicSchema();
    ensureMaterialIndex();
    persist(); render(); closeMobileNav(); closeDrawer();
    showToast("演示数据已重置。", "neutral", { label: "撤销", run: () => { state = previous; persist(); render(); } });
  });

  render();
})();
