import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  assetLibrary,
  audiences,
  brandKnowledge,
  contentDirections,
  contentOpportunities,
  developerReviewMode,
  draftTemplate,
  formats,
  goals,
  imageBriefTemplate,
  materialTypes,
  products,
  reviewRows,
  topicTemplates,
  videoScriptTemplate
} from "./data.js";
import "./index.css";

const navItems = [
  { id: "dashboard", label: "首页" },
  { id: "decision", label: "内容决策" },
  { id: "topics", label: "选题生成" },
  { id: "draft", label: "笔记生成" },
  { id: "assets", label: "内容资产库" },
  { id: "review", label: "数据复盘" }
];

const today = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "long"
}).format(new Date());

function cnNumber(value) {
  return Number(value).toLocaleString("zh-CN");
}

function getBrand(id) {
  return brandKnowledge.find((brand) => brand.id === id) ?? brandKnowledge[0];
}

function getProduct(id) {
  return products.find((product) => product.id === id) ?? products[0];
}

function scoreColor(score) {
  if (score >= 90) return "text-brandGreen bg-emerald-50 border-emerald-100";
  if (score >= 82) return "text-brandGold bg-amber-50 border-amber-100";
  return "text-brandNavy bg-slate-50 border-slate-100";
}

function App() {
  const hiddenPath = window.location.pathname;
  const [page, setPage] = useState("dashboard");
  const [selectedBrand, setSelectedBrand] = useState("jzt");
  const [selectedProduct, setSelectedProduct] = useState("jzt-oil");
  const [selectedGoal, setSelectedGoal] = useState("万宁转化");
  const [selectedDirection, setSelectedDirection] = useState(contentDirections[0]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [materialType, setMaterialType] = useState(materialTypes[0]);
  const [generatedAssets, setGeneratedAssets] = useState([]);

  const topics = useMemo(() => {
    const product = getProduct(selectedProduct);
    return topicTemplates.map((title, index) => ({
      id: `topic-${index + 1}`,
      title,
      product: product.name,
      audience: audiences[index % audiences.length],
      format: formats[index % formats.length],
      reason:
        index % 3 === 0
          ? "搜索场景明确，适合承接香港旅游和万宁购物需求。"
          : index % 3 === 1
            ? "用户痛点真实，适合做轻度种草和真实体验。"
            : "适合把产品放进生活场景，减少广告感。",
      score: Math.max(76, selectedDirection.score.total - (index % 7) * 2 + (index % 2 ? 1 : 0))
    }));
  }, [selectedProduct, selectedDirection]);

  function chooseDirection(direction) {
    setSelectedDirection(direction);
    setPage("topics");
  }

  function chooseTopic(topic) {
    setSelectedTopic(topic);
    setPage("draft");
  }

  function saveDraft() {
    if (!selectedTopic) return;
    const brand = getBrand(selectedBrand);
    const product = getProduct(selectedProduct);
    const nextAsset = {
      id: `asset-new-${Date.now()}`,
      title: selectedTopic.title,
      brand: brand.name,
      product: product.name,
      direction: selectedDirection.name,
      format: selectedTopic.format,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "待审核"
    };
    setGeneratedAssets((prev) => [nextAsset, ...prev]);
    setPage("assets");
  }

  if (hiddenPath === "/review") {
    return <InternalReview />;
  }

  if (hiddenPath === "/product-spec") {
    return <ProductSpec />;
  }

  return (
    <div className="min-h-screen bg-brandCream">
      <TopBar page={page} setPage={setPage} />
      <main className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-5 lg:px-8">
        <Sidebar page={page} setPage={setPage} />
        <section className="min-w-0 flex-1">
          {page === "dashboard" && (
            <Dashboard
              setPage={setPage}
              chooseDirection={chooseDirection}
              setSelectedBrand={setSelectedBrand}
              setSelectedProduct={setSelectedProduct}
            />
          )}
          {page === "decision" && (
            <Decision
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              selectedGoal={selectedGoal}
              setSelectedBrand={setSelectedBrand}
              setSelectedProduct={setSelectedProduct}
              setSelectedGoal={setSelectedGoal}
              chooseDirection={chooseDirection}
            />
          )}
          {page === "topics" && (
            <Topics
              direction={selectedDirection}
              topics={topics}
              chooseTopic={chooseTopic}
              setPage={setPage}
            />
          )}
          {page === "draft" && (
            <Draft
              selectedTopic={selectedTopic ?? topics[0]}
              selectedDirection={selectedDirection}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              materialType={materialType}
              setMaterialType={setMaterialType}
              saveDraft={saveDraft}
              setPage={setPage}
            />
          )}
          {page === "assets" && <Assets generatedAssets={generatedAssets} setPage={setPage} />}
          {page === "review" && <Review />}
        </section>
      </main>
    </div>
  );
}

function TopBar({ page, setPage }) {
  return (
    <header className="sticky top-0 z-20 border-b border-brandLine bg-brandCream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <button className="flex items-center gap-3 text-left" onClick={() => setPage("dashboard")}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandGreen text-sm font-bold text-white">
            BC
          </span>
          <span>
            <span className="block text-lg font-bold text-brandNavy">Brand Content Engine</span>
            <span className="block text-xs text-brandMuted">MVP V1.0 · 小红书品牌内容决策系统</span>
          </span>
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-brandLine bg-white px-3 py-2 text-sm text-brandMuted shadow-sm md:flex">
          <span className="h-2 w-2 rounded-full bg-brandGreen" />
          当前模块：{navItems.find((item) => item.id === page)?.label}
        </div>
      </div>
    </header>
  );
}

function Sidebar({ page, setPage }) {
  return (
    <aside className="no-print hidden w-56 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-brandLine bg-white p-3 shadow-card">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`mb-1 w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              page === item.id
                ? "bg-brandGreen text-white"
                : "text-brandMuted hover:bg-brandSoft hover:text-brandNavy"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

function PageTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm font-bold text-brandGreen">{eyebrow}</p>
      <h1 className="text-3xl font-bold tracking-tight text-brandNavy md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-3xl text-base font-medium text-brandMuted">{description}</p>}
    </div>
  );
}

function Dashboard({ setPage, chooseDirection, setSelectedBrand, setSelectedProduct }) {
  const best = contentOpportunities[0];

  function startPlanning() {
    const brand = brandKnowledge.find((item) => item.name === best.recommendedBrand);
    const product = products.find((item) => item.name === best.recommendedProduct);
    setSelectedBrand(brand?.id ?? "jzt");
    setSelectedProduct(product?.id ?? "jzt-oil");
    setPage("decision");
  }

  return (
    <div>
      <PageTitle
        eyebrow="Dashboard"
        title="AI驱动的小红书品牌内容决策系统"
        description="系统重点不是直接写文案，而是先判断今天最值得写什么内容，再进入选题和笔记生产。"
      />

      <div className="mb-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="bg-brandGreen text-white">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <p className="text-sm font-semibold text-white/70">今日日期</p>
              <p className="mt-1 text-2xl font-bold">{today}</p>
              <h2 className="mt-8 text-3xl font-bold">今日推荐内容机会</h2>
              <p className="mt-3 text-5xl font-bold text-brandGold">{best.title}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">{best.reason}</p>
            </div>
            <div className="min-w-52 rounded-2xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm text-white/70">综合推荐评分</p>
              <p className="mt-2 text-6xl font-bold text-white">{best.score}</p>
              <p className="mt-5 text-sm text-white/75">推荐品牌：{best.recommendedBrand}</p>
              <p className="mt-2 text-sm text-white/75">推荐产品：{best.recommendedProduct}</p>
              <button
                onClick={startPlanning}
                className="mt-6 w-full rounded-xl bg-brandGold px-4 py-3 text-sm font-bold text-brandNavy"
              >
                开始今日内容策划
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-brandNavy">品牌知识库</h3>
          <div className="mt-4 space-y-4">
            {brandKnowledge.map((brand) => (
              <div key={brand.id} className="rounded-xl border border-brandLine bg-brandSoft p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-brandNavy">{brand.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brandGreen">
                    {brand.coreProduct}
                  </span>
                </div>
                <p className="mt-2 text-sm text-brandMuted">{brand.positioning}</p>
                <p className="mt-2 text-xs font-semibold text-brandMuted">购买渠道：{brand.channels}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contentOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} chooseDirection={chooseDirection} />
        ))}
      </div>
    </div>
  );
}

function OpportunityCard({ opportunity, chooseDirection }) {
  return (
    <Card className="hover:-translate-y-1 hover:border-brandGreen/30">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-brandNavy">{opportunity.title}</h3>
        <span className={`rounded-full border px-3 py-1 text-sm font-bold ${scoreColor(opportunity.score)}`}>
          {opportunity.score}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <MiniMetric label="热点匹配" value={opportunity.hotMatch} />
        <MiniMetric label="品牌匹配" value={opportunity.brandMatch} />
      </div>
      <p className="mt-4 text-sm font-semibold text-brandGreen">{opportunity.productScene}</p>
      <p className="mt-3 text-sm leading-6 text-brandMuted">{opportunity.reason}</p>
      <button
        onClick={() => chooseDirection(contentDirections[0])}
        className="mt-5 rounded-xl border border-brandLine px-4 py-2 text-sm font-bold text-brandNavy hover:border-brandGreen hover:text-brandGreen"
      >
        进入方向判断
      </button>
    </Card>
  );
}

function Decision({
  selectedBrand,
  selectedProduct,
  selectedGoal,
  setSelectedBrand,
  setSelectedProduct,
  setSelectedGoal,
  chooseDirection
}) {
  const brandProducts = products.filter((product) => product.brandId === selectedBrand);
  const activeBrand = getBrand(selectedBrand);

  function changeBrand(nextBrand) {
    setSelectedBrand(nextBrand);
    const nextProduct = products.find((product) => product.brandId === nextBrand);
    setSelectedProduct(nextProduct?.id ?? products[0].id);
  }

  return (
    <div>
      <PageTitle
        eyebrow="Content Decision"
        title="先判断内容方向，再生成选题"
        description="选择品牌、产品和内容目标后，系统会用评分模型推荐当前更值得做的内容方向。"
      />

      <Card className="mb-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <SelectField label="品牌" value={selectedBrand} onChange={changeBrand}>
            {brandKnowledge.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="产品" value={selectedProduct} onChange={setSelectedProduct}>
            {brandProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="内容目标" value={selectedGoal} onChange={setSelectedGoal}>
            {goals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </SelectField>
        </div>
        <div className="mt-5 rounded-2xl bg-brandSoft p-4">
          <p className="text-sm font-bold text-brandNavy">{activeBrand.positioning}</p>
          <p className="mt-2 text-sm leading-6 text-brandMuted">
            产品场景：{activeBrand.scenes.join(" / ")}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contentDirections.map((direction) => (
          <DirectionCard key={direction.id} direction={direction} chooseDirection={chooseDirection} />
        ))}
      </div>
    </div>
  );
}

function DirectionCard({ direction, chooseDirection }) {
  const dimensions = [
    ["平台热点", direction.score.hot, 20],
    ["营销节点", direction.score.node, 20],
    ["品牌契合", direction.score.brand, 20],
    ["产品卖点", direction.score.product, 15],
    ["场景真实", direction.score.scene, 15],
    ["搜索需求", direction.score.search, 10]
  ];

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-brandNavy">{direction.name}</h3>
          <p className="mt-2 text-sm leading-6 text-brandMuted">{direction.description}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-sm font-bold ${scoreColor(direction.score.total)}`}>
          {direction.score.total}
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {dimensions.map(([label, value, max]) => (
          <ScoreBar key={label} label={`${label} ${max}%`} value={value} max={max} />
        ))}
      </div>
      <button
        onClick={() => chooseDirection(direction)}
        className="mt-5 w-full rounded-xl bg-brandGreen px-4 py-3 text-sm font-bold text-white"
      >
        生成该方向选题
      </button>
    </Card>
  );
}

function Topics({ direction, topics, chooseTopic, setPage }) {
  return (
    <div>
      <PageTitle
        eyebrow="Topic Generator"
        title={`${direction.name}：20个小红书选题`}
        description="选题先解决“今天写什么”，再进入单篇笔记生成。每个选题都带产品、人群、形式和推荐理由。"
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brandLine bg-white p-4 shadow-card">
        <p className="font-bold text-brandNavy">当前内容方向：{direction.name}</p>
        <button onClick={() => setPage("decision")} className="rounded-xl border border-brandLine px-4 py-2 text-sm font-bold">
          返回方向选择
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {topics.map((topic, index) => (
          <Card key={topic.id}>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brandGreen text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-7 text-brandNavy">{topic.title}</h3>
                  <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${scoreColor(topic.score)}`}>
                    {topic.score}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <Tag>{topic.product}</Tag>
                  <Tag>{topic.audience}</Tag>
                  <Tag>{topic.format}</Tag>
                </div>
                <p className="mt-3 text-sm leading-6 text-brandMuted">{topic.reason}</p>
                <button
                  onClick={() => chooseTopic(topic)}
                  className="mt-4 rounded-xl bg-brandGreen px-4 py-2 text-sm font-bold text-white"
                >
                  生成笔记草稿
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Draft({
  selectedTopic,
  selectedDirection,
  selectedBrand,
  selectedProduct,
  materialType,
  setMaterialType,
  saveDraft,
  setPage
}) {
  const brand = getBrand(selectedBrand);
  const product = getProduct(selectedProduct);

  return (
    <div>
      <PageTitle
        eyebrow="Note Draft"
        title="小红书笔记草稿"
        description="草稿遵循：场景 → 痛点 → 产品出现 → 购买渠道 → 轻度种草。先保证真实感，再考虑投流和搜索。"
      />
      <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <Card>
          <p className="text-sm font-bold text-brandGreen">当前选题</p>
          <h2 className="mt-3 text-2xl font-bold leading-9 text-brandNavy">{selectedTopic.title}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <InfoRow label="品牌" value={brand.name} />
            <InfoRow label="产品" value={product.name} />
            <InfoRow label="方向" value={selectedDirection.name} />
            <InfoRow label="形式" value={selectedTopic.format} />
            <InfoRow label="达人类型" value={draftTemplate.creatorType} />
          </div>
          <div className="mt-5">
            <SelectField label="素材类型" value={materialType} onChange={setMaterialType}>
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="mt-5 rounded-2xl bg-brandSoft p-4">
            <p className="text-sm font-bold text-brandNavy">是否建议投流</p>
            <p className="mt-2 text-sm leading-6 text-brandMuted">{draftTemplate.boost}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setPage("topics")} className="flex-1 rounded-xl border border-brandLine px-4 py-3 text-sm font-bold">
              返回选题
            </button>
            <button onClick={saveDraft} className="flex-1 rounded-xl bg-brandGreen px-4 py-3 text-sm font-bold text-white">
              保存到资产库
            </button>
          </div>
        </Card>

        <Card>
          <SectionBlock title="标题备选">
            <div className="grid gap-2 md:grid-cols-2">
              {draftTemplate.titles.map((title) => (
                <div key={title} className="rounded-xl border border-brandLine bg-brandSoft p-3 text-sm font-bold text-brandNavy">
                  {title}
                </div>
              ))}
            </div>
          </SectionBlock>
          <SectionBlock title="封面建议">
            <p className="text-sm leading-6 text-brandMuted">{draftTemplate.cover}</p>
          </SectionBlock>
          <SectionBlock title="正文">
            <div className="whitespace-pre-line rounded-2xl border border-brandLine bg-brandSoft p-4 text-sm leading-7 text-brandNavy">
              {draftTemplate.body}
            </div>
          </SectionBlock>
          <SectionBlock title="图片/视频拍摄建议">
            <div className="flex flex-wrap gap-2">
              {draftTemplate.shooting.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </SectionBlock>
          <SectionBlock title="评论引导">
            <ul className="space-y-2 text-sm text-brandMuted">
              {draftTemplate.comments.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </SectionBlock>
          <SectionBlock title="关键词标签">
            <div className="flex flex-wrap gap-2">
              {draftTemplate.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brandGreen px-3 py-1 text-xs font-bold text-white">
                  #{tag}
                </span>
              ))}
            </div>
          </SectionBlock>
        </Card>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <ImageBrief brief={imageBriefTemplate} topic={selectedTopic} materialType={materialType} />
        <VideoScript script={videoScriptTemplate} topic={selectedTopic} materialType={materialType} />
      </div>
    </div>
  );
}

function ImageBrief({ brief, topic, materialType }) {
  const copyText = [
    `选题：${topic.title}`,
    `素材类型：${materialType}`,
    "Image Brief",
    ...brief.coverPlans.map(
      (plan, index) =>
        `${index + 1}. ${plan.type}\n画面描述：${plan.visual}\n画面元素：${plan.elements.join("、")}\n主标题：${plan.title}\n副标题：${plan.subtitle}\n拍摄角度：${plan.angle}\nAI生成Prompt：${plan.prompt}`
    ),
    `图片拍摄清单：${brief.shootingChecklist.join("、")}`,
    `图片构图建议：${brief.compositionTips.join("、")}`,
    `图片文案建议：${brief.copySuggestions.join("、")}`,
    `适合AI生成Prompt：${brief.aiPrompts.join("\n")}`,
    `适合真人实拍：${brief.realShotList.join("、")}`,
    `禁止出现：${brief.forbidden.join("、")}`
  ].join("\n\n");

  return (
    <Card>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold text-brandGreen">Image Brief</p>
          <h2 className="mt-2 text-2xl font-bold text-brandNavy">图片生成方案</h2>
          <p className="mt-2 text-sm leading-6 text-brandMuted">根据当前选题生成封面、构图、拍摄清单和 AI 图片 Prompt。</p>
        </div>
        <CopyButton text={copyText} />
      </div>

      <div className="grid gap-3">
        {brief.coverPlans.map((plan, index) => (
          <div key={plan.type} className="rounded-2xl border border-brandLine bg-brandSoft p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-bold text-brandGold">封面方案 {index + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-brandNavy">{plan.type}</h3>
              </div>
              <CopyButton text={plan.prompt} compact />
            </div>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brandMuted">
              <InfoLine label="画面描述" value={plan.visual} />
              <InfoLine label="主标题" value={plan.title} />
              <InfoLine label="副标题" value={plan.subtitle} />
              <InfoLine label="拍摄角度" value={plan.angle} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.elements.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-brandLine bg-white p-3 text-xs leading-5 text-brandMuted">
              <span className="font-bold text-brandNavy">AI生成Prompt：</span>
              {plan.prompt}
            </div>
          </div>
        ))}
      </div>

      <BriefList title="图片拍摄清单" items={brief.shootingChecklist} />
      <BriefList title="图片构图建议" items={brief.compositionTips} />
      <BriefList title="图片文案建议" items={brief.copySuggestions} />
      <BriefList title="适合用 AI 生成的图片 Prompt" items={brief.aiPrompts} boxed />
      <BriefList title="适合真人实拍的图片清单" items={brief.realShotList} />
      <BriefList title="禁止出现的画面/表达" items={brief.forbidden} warning />
    </Card>
  );
}

function VideoScript({ script, topic, materialType }) {
  const copyText = [
    `选题：${topic.title}`,
    `素材类型：${materialType}`,
    `视频标题：${script.title}`,
    `视频时长建议：${script.recommendedDuration}（可选：${script.durationOptions.join(" / ")}）`,
    "分镜脚本：",
    ...script.shots.map(
      (shot) =>
        `${shot.shot}\n时间：${shot.time}\n画面：${shot.visual}\n口播：${shot.voice}\n字幕：${shot.subtitle}\n拍摄建议：${shot.tip}`
    ),
    `口播文案：${script.voiceover}`,
    `画面镜头：${script.visualShots.join("、")}`,
    `字幕文案：${script.subtitles.join("、")}`,
    `B-roll素材建议：${script.broll.join("、")}`,
    `结尾引导：${script.ending}`,
    `适合达人类型：${script.creatorType}`
  ].join("\n\n");

  return (
    <Card>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold text-brandGreen">Video Script</p>
          <h2 className="mt-2 text-2xl font-bold text-brandNavy">短视频脚本</h2>
          <p className="mt-2 text-sm leading-6 text-brandMuted">根据当前选题生成分镜、口播、字幕和 B-roll 素材建议。</p>
        </div>
        <CopyButton text={copyText} />
      </div>

      <div className="rounded-2xl border border-brandLine bg-brandSoft p-4">
        <p className="text-xs font-bold text-brandMuted">视频标题</p>
        <h3 className="mt-2 text-xl font-bold leading-8 text-brandNavy">{script.title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {script.durationOptions.map((duration) => (
            <span
              key={duration}
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                duration === script.recommendedDuration
                  ? "border-emerald-100 bg-emerald-50 text-brandGreen"
                  : "border-brandLine bg-white text-brandMuted"
              }`}
            >
              {duration}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {script.shots.map((shot) => (
          <div key={shot.shot} className="rounded-2xl border border-brandLine bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-brandNavy">{shot.shot}</h3>
              <span className="rounded-full bg-brandSoft px-3 py-1 text-xs font-bold text-brandMuted">{shot.time}</span>
            </div>
            <div className="space-y-3 text-sm leading-6 text-brandMuted">
              <InfoLine label="画面" value={shot.visual} />
              <InfoLine label="口播" value={shot.voice} />
              <InfoLine label="字幕" value={shot.subtitle} />
              <InfoLine label="拍摄建议" value={shot.tip} />
            </div>
          </div>
        ))}
      </div>

      <SectionBlock title="口播文案">
        <div className="rounded-2xl border border-brandLine bg-brandSoft p-4 text-sm leading-7 text-brandNavy">
          {script.voiceover}
        </div>
      </SectionBlock>
      <BriefList title="画面镜头" items={script.visualShots} />
      <BriefList title="字幕文案" items={script.subtitles} />
      <BriefList title="B-roll素材建议" items={script.broll} />
      <SectionBlock title="结尾引导">
        <p className="text-sm leading-6 text-brandMuted">{script.ending}</p>
      </SectionBlock>
      <SectionBlock title="适合达人类型">
        <p className="text-sm leading-6 text-brandMuted">{script.creatorType}</p>
      </SectionBlock>
    </Card>
  );
}

function Assets({ generatedAssets, setPage }) {
  const rows = [...generatedAssets, ...assetLibrary];
  return (
    <div>
      <PageTitle
        eyebrow="Content Assets"
        title="内容资产库"
        description="沉淀所有已生成内容，方便审核、发布和后续复盘。"
      />
      <Card>
        <ResponsiveTable
          columns={["标题", "品牌", "产品", "内容方向", "内容形式", "创建时间", "状态", "操作"]}
          rows={rows.map((row) => [
            <span className="font-bold text-brandNavy">{row.title}</span>,
            row.brand,
            row.product,
            row.direction,
            row.format,
            row.createdAt,
            <Status status={row.status} />,
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-brandLine px-3 py-1 text-xs font-bold">查看</button>
              <button className="rounded-lg border border-brandLine px-3 py-1 text-xs font-bold">编辑</button>
              <button onClick={() => setPage("review")} className="rounded-lg bg-brandGreen px-3 py-1 text-xs font-bold text-white">
                复盘
              </button>
            </div>
          ])}
        />
      </Card>
    </div>
  );
}

function Review() {
  return (
    <div>
      <PageTitle
        eyebrow="Performance Review"
        title="数据复盘"
        description="记录发布后的内容数据，并由模拟 AI 给出是否值得复用和下一步延展建议。"
      />
      <div className="grid gap-4">
        {reviewRows.map((row) => (
          <Card key={row.id}>
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-brandNavy">{row.title}</h3>
                  <span className="rounded-full bg-brandSoft px-3 py-1 text-xs font-bold text-brandGreen">
                    值得复用：{row.reusable}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
                  <MiniMetric label="曝光" value={cnNumber(row.exposure)} />
                  <MiniMetric label="阅读" value={cnNumber(row.reads)} />
                  <MiniMetric label="点赞" value={cnNumber(row.likes)} />
                  <MiniMetric label="收藏" value={cnNumber(row.saves)} />
                  <MiniMetric label="评论" value={cnNumber(row.comments)} />
                  <MiniMetric label="分享" value={cnNumber(row.shares)} />
                  <MiniMetric label="CTR" value={row.ctr} />
                  <MiniMetric label="互动率" value={row.engagement} />
                </div>
              </div>
              <div className="rounded-2xl bg-brandSoft p-4 xl:w-96">
                <p className="text-sm font-bold text-brandNavy">AI复盘建议</p>
                <p className="mt-2 text-sm leading-6 text-brandMuted">{row.advice}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InternalReview() {
  const previewPages = [
    {
      name: "首页 Dashboard",
      purpose: "让运营人员先判断今天最值得写什么内容，而不是直接进入写作。",
      preview: ["今日推荐内容机会", "推荐品牌 / 产品", "综合推荐评分", "推荐理由", "开始今日内容策划"]
    },
    {
      name: "内容决策页",
      purpose: "选择品牌、产品和内容目标，系统给出适合继续推进的内容方向。",
      preview: ["品牌选择", "产品选择", "内容目标", "Content Score", "方向推荐"]
    },
    {
      name: "选题生成页",
      purpose: "围绕当前方向生成 20 个小红书选题，并展示人群、形式、理由和评分。",
      preview: ["选题标题", "适合产品", "适合人群", "内容形式", "内容评分"]
    },
    {
      name: "笔记生成页",
      purpose: "生成小红书笔记草稿，并扩展图片 Brief 和短视频脚本。",
      preview: ["标题备选", "正文草稿", "Image Brief", "Video Script", "复制按钮"]
    },
    {
      name: "内容资产库",
      purpose: "沉淀生成后的内容，支持后续审核、发布和复盘。",
      preview: ["标题", "品牌", "产品", "内容方向", "状态", "操作"]
    },
    {
      name: "数据复盘页",
      purpose: "记录内容发布后的数据表现，并给出是否值得复用的复盘建议。",
      preview: ["曝光", "阅读", "点赞", "收藏", "互动率", "AI复盘建议"]
    }
  ];

  return (
    <InternalShell eyebrow="Hidden Review" title="Brand Content Engine 内部产品评审">
      <Card className="mb-5">
        <h2 className="text-2xl font-bold text-brandNavy">用户流程图</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-7">
          {["品牌", "产品", "机会判断", "选题生成", "笔记生成", "内容资产库", "数据复盘"].map((step, index) => (
            <div key={step} className="relative rounded-2xl border border-brandLine bg-brandSoft p-4 text-center">
              <p className="text-xs font-bold text-brandGreen">Step {index + 1}</p>
              <p className="mt-2 text-sm font-bold text-brandNavy">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        {previewPages.map((page) => (
          <Card key={page.name}>
            <p className="text-sm font-bold text-brandGreen">页面嵌入预览</p>
            <h2 className="mt-2 text-xl font-bold text-brandNavy">{page.name}</h2>
            <p className="mt-2 text-sm leading-6 text-brandMuted">{page.purpose}</p>
            <div className="mt-4 rounded-2xl border border-brandLine bg-brandSoft p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-300" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <span className="ml-2 text-xs font-bold text-brandMuted">Static preview</span>
              </div>
              <div className="grid gap-2">
                {page.preview.map((item) => (
                  <div key={item} className="rounded-xl border border-brandLine bg-white px-3 py-2 text-sm font-semibold text-brandNavy">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card>
          <SectionBlock title="当前模拟数据">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <MiniMetric label="品牌" value={brandKnowledge.length} />
              <MiniMetric label="产品" value={products.length} />
              <MiniMetric label="内容机会" value={contentOpportunities.length} />
              <MiniMetric label="内容方向" value={contentDirections.length} />
              <MiniMetric label="选题模板" value={topicTemplates.length} />
              <MiniMetric label="复盘样本" value={reviewRows.length} />
            </div>
          </SectionBlock>
          <SectionBlock title="核心数据样例">
            <ResponsiveTable
              columns={["类型", "样例"]}
              rows={[
                ["品牌", brandKnowledge.map((item) => item.name).join(" / ")],
                ["产品", products.map((item) => item.name).join(" / ")],
                ["内容机会", contentOpportunities.map((item) => item.title).join(" / ")],
                ["素材类型", materialTypes.join(" / ")]
              ]}
            />
          </SectionBlock>
        </Card>

        <Card>
          <SectionBlock title="后续可优化点">
            <div className="space-y-3">
              {[
                "接入真实 AI：内容机会判断、选题生成、笔记生成、复盘建议。",
                "接入真实内容数据：曝光、阅读、互动、收藏、评论、分享。",
                "内容资产库持久化：保存审核状态、发布状态、复盘状态。",
                "品牌知识库可编辑：品牌定位、产品卖点、禁用词、合规边界。",
                "增加多人协作：运营、审核、老板查看权限。",
                "增加导出能力：导出选题、笔记、图片 Brief、视频脚本。"
              ].map((item) => (
                <div key={item} className="rounded-xl border border-brandLine bg-brandSoft p-3 text-sm leading-6 text-brandMuted">
                  {item}
                </div>
              ))}
            </div>
          </SectionBlock>
        </Card>
      </div>
    </InternalShell>
  );
}

function ProductSpec() {
  return (
    <InternalShell eyebrow="Product Spec" title="Brand Content Engine 产品说明">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <SectionBlock title="产品定位">
            <p className="text-sm leading-7 text-brandMuted">
              Brand Content Engine 是小红书品牌内容决策与生产系统，核心不是普通 AI 写作，而是帮助品牌运营人员判断今天最值得写什么内容，并完成从机会判断到内容复盘的闭环。
            </p>
          </SectionBlock>
          <SectionBlock title="目标用户">
            <div className="flex flex-wrap gap-2">
              {["品牌运营", "内容策划", "媒介投放", "达人合作负责人", "增长负责人"].map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </SectionBlock>
        </Card>

        <Card>
          <SectionBlock title="用户流程">
            <div className="space-y-3">
              {["选择品牌与产品", "判断今日内容机会", "选择内容方向", "生成 20 个选题", "生成笔记 / 图片 Brief / 视频脚本", "进入内容资产库", "发布后数据复盘"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-brandLine bg-brandSoft p-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGreen text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-brandNavy">{item}</span>
                  </div>
                )
              )}
            </div>
          </SectionBlock>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card>
          <SectionBlock title="功能模块">
            <ResponsiveTable
              columns={["模块", "说明"]}
              rows={[
                ["Dashboard", "展示今日推荐内容机会、推荐品牌、推荐产品、推荐理由。"],
                ["内容决策", "选择品牌、产品、内容目标，并输出内容方向评分。"],
                ["选题生成", "生成 20 个小红书选题，包含人群、形式、理由和评分。"],
                ["笔记生成", "生成标题、封面建议、正文、评论引导、关键词标签。"],
                ["Image Brief", "生成封面方案、拍摄清单、构图建议、AI 图片 Prompt。"],
                ["Video Script", "生成短视频标题、时长、分镜、口播、字幕和 B-roll。"],
                ["内容资产库", "沉淀内容资产，支持审核、发布和复盘入口。"],
                ["数据复盘", "记录内容数据，输出是否值得复用和优化建议。"]
              ]}
            />
          </SectionBlock>
        </Card>

        <Card>
          <SectionBlock title="数据结构">
            <ResponsiveTable
              columns={["数据表", "当前字段/内容"]}
              rows={[
                ["brandKnowledge", "品牌定位、核心产品、购买渠道、使用场景、语气"],
                ["products", "品牌ID、产品名、卖点、渠道"],
                ["contentOpportunities", "机会标题、评分、热点匹配、品牌匹配、推荐理由"],
                ["contentDirections", "方向名称、说明、评分维度"],
                ["topicTemplates", "选题标题模板"],
                ["draftTemplate", "标题、封面、正文、拍摄建议、评论、标签"],
                ["imageBriefTemplate", "封面方案、拍摄清单、Prompt、禁用表达"],
                ["videoScriptTemplate", "标题、时长、分镜、口播、字幕、B-roll"],
                ["assetLibrary", "标题、品牌、产品、方向、形式、时间、状态"],
                ["reviewRows", "曝光、阅读、点赞、收藏、评论、分享、CTR、互动率"]
              ]}
            />
          </SectionBlock>
        </Card>
      </div>

      <Card className="mt-5">
        <SectionBlock title="未来 Roadmap">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { phase: "V1.1", text: "品牌知识库可编辑，支持新增产品和禁用词。" },
              { phase: "V1.2", text: "接入真实 AI 生成，替换当前模拟模板。" },
              { phase: "V1.3", text: "接入内容数据表，形成真实复盘闭环。" },
              { phase: "V2.0", text: "支持团队协作、权限、审核流和导出。" }
            ].map((item) => (
              <div key={item.phase} className="rounded-2xl border border-brandLine bg-brandSoft p-4">
                <p className="text-sm font-bold text-brandGreen">{item.phase}</p>
                <p className="mt-2 text-sm leading-6 text-brandMuted">{item.text}</p>
              </div>
            ))}
          </div>
        </SectionBlock>
      </Card>
    </InternalShell>
  );
}

function InternalShell({ eyebrow, title, children }) {
  return (
    <div className="min-h-screen bg-brandCream">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-brandLine pb-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-bold text-brandGreen">{eyebrow}</p>
            <h1 className="text-3xl font-bold tracking-tight text-brandNavy md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brandMuted">
              隐藏内部页面，仅用于产品评审和开发沟通；不会出现在正常导航和用户流程中。
            </p>
          </div>
          <a href="/" className="rounded-xl border border-brandLine bg-white px-4 py-3 text-sm font-bold text-brandNavy shadow-sm">
            返回首页
          </a>
        </div>
        {children}
      </main>
    </div>
  );
}

function DeveloperReview({ generatedAssets }) {
  const staticAssets = assetLibrary.length;
  const totalAssets = staticAssets + generatedAssets.length;
  const stats = [
    { label: "品牌数", value: brandKnowledge.length },
    { label: "产品数", value: products.length },
    { label: "内容机会", value: contentOpportunities.length },
    { label: "内容方向", value: contentDirections.length },
    { label: "选题模板", value: topicTemplates.length },
    { label: "素材类型", value: materialTypes.length },
    { label: "内容资产", value: totalAssets },
    { label: "复盘样本", value: reviewRows.length }
  ];

  return (
    <div>
      <PageTitle
        eyebrow="Developer Review Mode"
        title="开发审查模式"
        description="用于检查当前 MVP 的模块完成度、数据来源、上线状态和后续 API 接入位置。这个页面面向开发和内部检查，不影响日常内容生产流程。"
      />

      <Card className="mb-5">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-bold text-brandGreen">MVP Build Status</p>
            <h2 className="mt-2 text-2xl font-bold text-brandNavy">Brand Content Engine MVP V1.0</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-brandMuted">
              当前版本使用静态数据运行，已完成内容机会判断、选题生成、笔记草稿、图片 Brief、视频脚本和数据复盘基础链路。
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-brandGreen">
            <p className="text-xs font-bold">当前状态</p>
            <p className="mt-1 text-2xl font-bold">可运行</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((item) => (
            <MiniMetric key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <SectionBlock title="模块完成度">
            <div className="grid gap-3">
              {developerReviewMode.systemStatus.map((item) => (
                <ReviewRow key={item.module} title={item.module} status={item.status} note={item.note} />
              ))}
            </div>
          </SectionBlock>
        </Card>

        <Card>
          <SectionBlock title="上线检查项">
            <div className="grid gap-3">
              {developerReviewMode.launchChecklist.map((item) => (
                <ChecklistRow key={item.item} item={item.item} status={item.status} />
              ))}
            </div>
          </SectionBlock>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card>
          <SectionBlock title="数据源状态">
            <ResponsiveTable
              columns={["数据源", "文件/位置", "类型", "状态"]}
              rows={developerReviewMode.dataSources.map((source) => [
                <span className="font-bold text-brandNavy">{source.name}</span>,
                source.file,
                source.type,
                <StatusPill status={source.status} />
              ])}
            />
          </SectionBlock>
        </Card>

        <Card>
          <SectionBlock title="后续 API 接入清单">
            <div className="space-y-3">
              {developerReviewMode.apiRoadmap.map((item) => (
                <div key={item} className="rounded-xl border border-brandLine bg-brandSoft p-3 text-sm leading-6 text-brandMuted">
                  {item}
                </div>
              ))}
            </div>
          </SectionBlock>
        </Card>
      </div>
    </div>
  );
}

function ReviewRow({ title, status, note }) {
  return (
    <div className="rounded-2xl border border-brandLine bg-brandSoft p-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h3 className="font-bold text-brandNavy">{title}</h3>
        <StatusPill status={status} />
      </div>
      <p className="mt-2 text-sm leading-6 text-brandMuted">{note}</p>
    </div>
  );
}

function ChecklistRow({ item, status }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-brandLine bg-brandSoft px-4 py-3">
      <span className="text-sm font-semibold text-brandNavy">{item}</span>
      <StatusPill status={status} />
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    已完成: "border-emerald-100 bg-emerald-50 text-brandGreen",
    已接入: "border-emerald-100 bg-emerald-50 text-brandGreen",
    通过: "border-emerald-100 bg-emerald-50 text-brandGreen",
    MVP: "border-amber-100 bg-amber-50 text-brandGold",
    待接入: "border-slate-200 bg-slate-50 text-brandMuted",
    待开发: "border-slate-200 bg-slate-50 text-brandMuted"
  };
  return (
    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${styles[status] ?? styles["待开发"]}`}>
      {status}
    </span>
  );
}

function CopyButton({ text, compact = false }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      onClick={copy}
      className={`shrink-0 rounded-xl border border-brandLine bg-white font-bold text-brandNavy shadow-sm transition hover:border-brandGreen ${
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
      }`}
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}

function BriefList({ title, items, boxed = false, warning = false }) {
  return (
    <SectionBlock title={title}>
      <div className={boxed ? "grid gap-2" : "flex flex-wrap gap-2"}>
        {items.map((item) =>
          boxed ? (
            <div key={item} className="rounded-xl border border-brandLine bg-brandSoft p-3 text-sm leading-6 text-brandMuted">
              {item}
            </div>
          ) : (
            <span
              key={item}
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                warning ? "border-amber-100 bg-amber-50 text-brandGold" : "border-brandLine bg-white text-brandMuted"
              }`}
            >
              {item}
            </span>
          )
        )}
      </div>
    </SectionBlock>
  );
}

function InfoLine({ label, value }) {
  return (
    <div>
      <span className="font-bold text-brandNavy">{label}：</span>
      <span>{value}</span>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-brandLine bg-white p-5 shadow-card transition ${className}`}>
      {children}
    </div>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-brandNavy">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-brandLine bg-white px-4 py-3 text-sm font-semibold text-brandNavy outline-none focus:border-brandGreen"
      >
        {children}
      </select>
    </label>
  );
}

function ScoreBar({ label, value, max }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold text-brandMuted">
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>
      <div className="h-2 rounded-full bg-brandSoft">
        <div className="h-2 rounded-full bg-brandGreen" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-brandLine bg-brandSoft p-3">
      <p className="text-xs font-bold text-brandMuted">{label}</p>
      <p className="mt-1 text-lg font-bold text-brandNavy">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-brandLine bg-brandSoft px-3 py-2">
      <span className="text-brandMuted">{label}</span>
      <span className="text-right font-bold text-brandNavy">{value}</span>
    </div>
  );
}

function SectionBlock({ title, children }) {
  return (
    <section className="mb-6 last:mb-0">
      <h3 className="mb-3 text-lg font-bold text-brandNavy">{title}</h3>
      {children}
    </section>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-brandLine bg-white px-3 py-1 text-xs font-bold text-brandMuted">
      {children}
    </span>
  );
}

function Status({ status }) {
  const styles = {
    待审核: "bg-amber-50 text-brandGold border-amber-100",
    已通过: "bg-emerald-50 text-brandGreen border-emerald-100",
    已发布: "bg-blue-50 text-brandNavy border-blue-100",
    已复盘: "bg-slate-50 text-brandMuted border-slate-100"
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}

function ResponsiveTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[960px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-brandLine text-xs text-brandMuted">
            {columns.map((column) => (
              <th key={column} className="px-3 py-3 font-bold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-brandLine last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-4 align-top text-brandMuted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
