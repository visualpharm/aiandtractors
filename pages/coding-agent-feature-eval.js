import Head from 'next/head';
import Layout from '../components/Layout';
import ModelEvalChart, { fmt } from '../components/ModelEvalChart';
import FeatureEvalStyles from '../components/FeatureEvalStyles';
import data from '../public/model-eval/experiment-data.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-feature-eval/';
const GITHUB = 'https://github.com/visualpharm/coding-agent-feature-eval';
const TITLE = 'Which agent is the best subagent?';
const DESCRIPTION = 'Six coding-agent configurations, one real feature: audited token usage, estimated subscription costs and a shared grading rubric.';
const MODEL_NAMES = {'claude-fable-5-1':'Fable 5.1','claude-opus-5':'Opus 5','claude-sonnet-5':'Sonnet 5','claude-opus-4-7':'Opus 4.7 automatic review','glm-5.3':'GLM 5.3','gpt-6-astra':'GPT-6 Astra'};
const RUBRIC_HEADS = {'fable-low':'Fable 5.1 low','opus-low':'Opus 5 low','glm-claude-code':'GLM 5.3 · Claude Code','glm-zcode':'GLM 5.3 · ZCode','sonnet-medium':'Sonnet 5 medium','codex-astra-low':'GPT-6 Astra low'};
const PLAN_NAMES = {claude_max_100:'Claude Max',glm_pro_annual:'GLM Pro annual',codex_pro:'Codex Pro'};
const perM = v => v == null ? '–' : `$${v % 1 ? v.toFixed(2) : v.toFixed(0)}`;

export default function CodingAgentFeatureEval() {
  const {experiment,runs,rubric_items}=data;
  const byScore=[...runs].sort((a,b)=>b.score-a.score);
  const find=id=>runs.find(r=>r.id===id);
  const fable=find('fable-low'),opus=find('opus-low'),sonnet=find('sonnet-medium'),glm=find('glm-claude-code'),codex=find('codex-astra-low');
  const allowanceOf=r=>{const a=experiment.allowances[r.plan];return r.model==='claude-fable-5-1'?a.fable_monthly_api_equiv_usd:a.monthly_api_equiv_usd;};
  return <Layout><Head>
    <title>{TITLE} | Ivan Braun</title><meta name="description" content={DESCRIPTION}/><link rel="canonical" href={PAGE_URL}/>
    <meta property="og:type" content="article"/><meta property="og:title" content={TITLE}/><meta property="og:description" content={DESCRIPTION}/><meta property="og:url" content={PAGE_URL}/>
    <meta property="og:image" content="https://aiandtractors.com/model-eval/best-subagent.png"/><meta name="twitter:card" content="summary_large_image"/>
  </Head><article className="subscription-article eval-article">
    <h1>{TITLE}</h1>
    <p className="intro">I gave six agent setups one real feature in <a href="https://usabruno.com/">Bruno</a>, then graded the code against the same rubric. Fable scored highest. Codex was cheapest. GLM via Claude Code sits between them.</p>
    <nav className="article-links" aria-label="Evaluation resources"><a href={GITHUB}>GitHub protocol</a><a href="/model-eval/experiment-data.json">Evaluation data</a><a href="/model-eval/best-subagent.png">Chart image</a></nav>
    <ModelEvalChart runs={runs}/>
    <section className="article-section"><h2>The results</h2>
      <div className="table-scroll"><table className="results-table">
        <thead><tr><th>Run</th><th>Harness</th><th>Model · effort</th><th className="num">Score / 10</th><th className="num">Wall time</th><th className="num">Subscription $/task</th><th className="num">Share of a week</th></tr></thead>
        <tbody>{byScore.map(r=><tr key={r.id}>
          <td>{r.label}</td><td>{r.harness}</td><td>{MODEL_NAMES[r.model]||r.model} · {r.effort}</td>
          <td className="num">{fmt.score(r.score/2)}</td><td className="num">{fmt.minutes(r.wall_min)}</td>
          <td className="num">{fmt.money(r.sub_usd)}</td><td className="num">{fmt.pct(r.weekly_share_pct)}</td>
        </tr>)}</tbody>
      </table></div>
    </section>
    <section className="article-section prose"><h2>What I would use</h2><ul>
      <li><strong>Fable for the highest score.</strong> {fmt.score(fable.score/2)} out of 10 for about {fmt.money(fable.sub_usd)}. Opus scored {fmt.score(opus.score/2)} and cost {fmt.money(opus.sub_usd)}. Fable was better and cheaper in this evaluation.</li>
      <li><strong>GLM for the middle ground.</strong> Claude Code scored {fmt.score(glm.score/2)} for about {fmt.money(glm.sub_usd)}. ZCode averaged $0.19 per session and scored 8.75 on the shared final branch. Its average session cost was lower, with a slightly lower grade.</li>
      <li><strong>Codex for the cheapest run.</strong> {codex.wall_min} minutes, {fmt.money(codex.sub_usd)} and {fmt.score(codex.score/2)} out of 10. It had the cleanest code lane, but strict parsers and a failed live report check held it back.</li>
      <li><strong>Sonnet is off the frontier.</strong> {fmt.score(sonnet.score/2)} out of 10 for {fmt.money(sonnet.sub_usd)}, tied for slowest at {sonnet.wall_min} minutes. It labelled an ARS total as USD and never passed bill answers through to sizing. It was not the most expensive.</li>
    </ul><p>The line connects the <strong>cost-quality frontier</strong>: Codex Astra low, GLM via ZCode, GLM via Claude Code and Fable. It is a visual guide between observed configurations, not a prediction of intermediate results.</p></section>
    <section className="article-section"><h2>How the cost is computed</h2>
      <p><strong>Tokens are observed. Subscription dollars are estimates.</strong> Each model&rsquo;s token usage is priced at its list rates, then multiplied by the monthly plan fee divided by its estimated monthly API-equivalent allowance. Automatic review calls are included at their own model&rsquo;s rates.</p>
      <div className="table-scroll"><table className="cost-table">
        <thead>
          <tr><th rowSpan="2">Run</th><th colSpan="4">Tokens</th><th colSpan="4">Price per million</th><th rowSpan="2">API-equivalent $</th><th rowSpan="2">Plan</th><th rowSpan="2">Allowance / month</th><th rowSpan="2">Multiplier</th><th rowSpan="2">Subscription $/task</th><th rowSpan="2">Share of a week</th></tr>
          <tr><th className="num">Fresh input</th><th className="num">Cache read</th><th className="num">Cache write</th><th className="num">Output</th><th className="num">Input</th><th className="num">Cache read</th><th className="num">Cache write</th><th className="num">Output</th></tr>
        </thead>
        <tbody>{byScore.map(r=>{const p=experiment.prices_per_million[r.model],a=experiment.allowances[r.plan];return <tr key={r.id}>
          <td>{r.label}</td>
          <td className="num">{fmt.tokens(r.tokens.input)}</td><td className="num">{fmt.tokens(r.tokens.cache_read)}</td><td className="num">{fmt.tokens(r.tokens.cache_write)}</td><td className="num">{fmt.tokens(r.tokens.output)}</td>
          <td className="num">{perM(p.input)}</td><td className="num">{perM(p.cache_read)}</td><td className="num">{perM(p.cache_write)}</td><td className="num">{perM(p.output)}</td>
          <td className="num">{fmt.money(r.api_usd)}</td>
          <td>{PLAN_NAMES[r.plan]} · ${a.fee_usd}/mo</td>
          <td className="num">${fmt.int(allowanceOf(r))}</td>
          <td className="num">{(a.fee_usd/allowanceOf(r)).toFixed(4)}</td>
          <td className="num">{fmt.money(r.sub_usd)}</td>
          <td className="num">{fmt.pct(r.weekly_share_pct)}</td>
        </tr>;})}</tbody>
      </table></div>
    </section>
    <section className="article-section prose"><h2>The subscription assumptions</h2>
      <p>These are the <a href="/coding-agent-subscription-costs/">subscription comparison</a>&rsquo;s existing allowance assumptions. The Claude $100 estimates are one quarter of the measured $200 plan allowances. GLM&rsquo;s $1,300 estimate came from three weekly exhaustion windows. Codex uses the comparison&rsquo;s central case.</p><p><strong>The usage audit did not remeasure those allowances.</strong> These costs allocate a subscription fee; they are not per-task charges. Weekly share is the estimated subscription cost divided by the monthly fee, multiplied by 4.33.</p>
    </section>
    <section className="article-section prose"><h2>One feature, six configurations</h2>
      <p>The task was to rebuild Bruno&rsquo;s public chat bot so a price question runs the real solar estimator in conversation form. The configurations started from the same base commit in isolated worktrees. For ZCode, cost and token usage are the arithmetic mean of two sessions: $0.21 and $0.17 become $0.19 per session. The 8.75 grade and recorded wall time describe their shared final branch, not independently graded attempts.</p>
      <p>Fable and Opus ran at low effort, Sonnet at medium, and Codex Astra at low. GLM used Claude Code&rsquo;s default thinking and ZCode&rsquo;s max reasoning variant. These are the configurations tested, not identical reasoning budgets.</p>
      <p>One Fable 5.1 reviewer graded the branches with file-level evidence and re-ran the chat tests. Each rubric item scores 0 to 2; the total is divided by 2 for a maximum of 10. Self-reports were treated as claims, not evidence.</p>
      <p style={{marginTop:24}}>The code under test is private, so the exact task cannot be re-run from the public repository. The <a href={`${GITHUB}/tree/main/prompts`}>redacted prompt</a>, <a href={`${GITHUB}/blob/main/grading.md`}>grading evidence</a>, reports and extraction scripts are public. One feature evaluation does not establish a universal model ranking.</p>
    </section>
    <section className="article-section"><h2>The rubric</h2>
      <div className="table-scroll"><table className="rubric-table">
        <thead><tr><th>Item</th>{byScore.map(r=><th key={r.id} className="num">{RUBRIC_HEADS[r.id]}</th>)}</tr></thead>
        <tbody>{rubric_items.map((item,i)=><tr key={i}><td>{item}</td>{byScore.map(r=><td key={r.id} className="num">{r.rubric[i]}</td>)}</tr>)}</tbody>
      </table></div>
    </section>
    <section className="article-section prose"><h2>The cost correction</h2>
      <p>The first version double-counted repeated assistant-message records, priced one-hour cache writes as five-minute writes, and priced automatic review calls as the main model. This version counts each message once, uses the correct cache duration and prices each model separately.</p>
      <p>GLM via Claude Code uses its final aggregate usage summary. ZCode averages the unique provider request totals from its two sessions. Codex uses its final cumulative turn usage, with cached input separated from fresh input. <a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic&rsquo;s list prices</a> supply the model and cache rates.</p>
      <nav className="article-links" aria-label="Further evaluation resources"><a href={`${GITHUB}/tree/main/scripts`}>Extraction scripts</a><a href="/model-eval/cost-audit.json">Cost audit</a><a href="/model-eval/best-subagent.svg">Vector chart</a></nav>
    </section>
  </article><FeatureEvalStyles/></Layout>;
}
