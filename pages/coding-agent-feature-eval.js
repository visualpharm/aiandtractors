import Head from 'next/head';
import Layout from '../components/Layout';
import ModelEvalChart, { fmt, totalTokens } from '../components/ModelEvalChart';
import FeatureEvalStyles from '../components/FeatureEvalStyles';
import data from '../public/model-eval/experiment-data.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-feature-eval/';
const GITHUB = 'https://github.com/visualpharm/coding-agent-feature-eval';
const TITLE = 'Which agent is the best subagent?';
const DESCRIPTION = 'Six coding-agent configurations, one real feature: audited token usage, estimated subscription costs and a shared grading rubric.';
const MODEL_NAMES = {'claude-fable-5-1':'Fable 5.1','claude-opus-5':'Opus 5','claude-sonnet-5':'Sonnet 5','claude-opus-4-7':'Opus 4.7 automatic review','glm-5.3':'GLM 5.3','glm-5.3 · session 1':'GLM 5.3, session 1','glm-5.3 · session 2':'GLM 5.3, session 2','gpt-6-astra':'GPT-6 Astra'};
const runName = r => r.label;

function CostDetails({ run, experiment }) {
  return <details className="cost-detail"><summary>{runName(run)}</summary><div className="cost-components">
    {Object.entries(run.cost_components).map(([key,c]) => {
      const p=experiment.prices_per_million[key.split(' · ')[0]];
      const oneHour=c.one_hour_cache_write_tokens || 0;
      const rows=[['Fresh input',c.tokens.input,p.input],['Cache write, 5 min',c.tokens.cache_write-oneHour,p.cache_write],['Cache write, 1 hour',oneHour,p.cache_write_1h || p.input*2],['Cached input',c.tokens.cache_read,p.cache_read],['Output',c.tokens.output,p.output]];
      return <section className="component" key={key}><h3>{MODEL_NAMES[key] || key}</h3>
        <table className="detail-table"><thead><tr><th>Token type</th><th className="num">Tokens</th><th className="num">$ / 1M</th><th className="num">API $</th></tr></thead>
          <tbody>{rows.filter(([,n])=>n>0).map(([name,n,rate])=><tr key={name}><td>{name}</td><td className="num" title={fmt.int(n)}>{fmt.tokens(n)}</td><td className="num">{fmt.price(rate)}</td><td className="num">{fmt.money(n*rate/1e6)}</td></tr>)}</tbody>
        </table><div className="component-total"><span>API-equivalent <strong>{fmt.money(c.api_usd)}</strong></span><span>Estimated subscription <strong>{fmt.money(c.sub_usd)}</strong></span></div>
      </section>;
    })}
    <p>{run.cost_basis === 'mean_per_session' ? 'Session average' : 'Run total'}: <strong>{fmt.money(run.api_usd)} API-equivalent</strong>, <strong>{fmt.money(run.sub_usd)} estimated subscription</strong>. {fmt.tokens(totalTokens(run))} tokens; {fmt.pct(run.weekly_share_pct)} of a week&rsquo;s allowance.</p>
  </div></details>;
}

export default function CodingAgentFeatureEval() {
  const {experiment,runs,rubric_items}=data;
  const byScore=[...runs].sort((a,b)=>b.score-a.score);
  const find=id=>runs.find(r=>r.id===id);
  const fable=find('fable-low'),opus=find('opus-low'),sonnet=find('sonnet-medium'),glm=find('glm-claude-code'),codex=find('codex-astra-low');
  const plans=[['Claude Max · Fable',100,1875],['Claude Max · Opus / Sonnet',100,1750],['GLM Pro annual',56,1300],['Codex Pro',200,7000]];
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
      <table className="results-table"><thead><tr><th>Agent</th><th className="num">Score / 10</th><th className="num">Subscription / task</th><th className="num">Wall time</th><th className="num">API-equivalent</th></tr></thead>
        <tbody>{byScore.map(r=><tr key={r.id}><td>{runName(r)}</td><td className="num score-cell" data-label="Score / 10">{fmt.score(r.score/2)}</td><td className="num cost-cell" data-label="Subscription / task">{fmt.money(r.sub_usd)}</td><td className="num" data-label="Wall time">{fmt.minutes(r.wall_min)}</td><td className="num" data-label="API-equivalent">{fmt.money(r.api_usd)}</td></tr>)}</tbody>
      </table>
    </section>
    <section className="article-section prose"><h2>What I would use</h2><ul>
      <li><strong>Fable for the highest score.</strong> {fmt.score(fable.score/2)} out of 10 for about {fmt.money(fable.sub_usd)}. Opus scored {fmt.score(opus.score/2)} and cost {fmt.money(opus.sub_usd)}. Fable was better and cheaper in this evaluation.</li>
      <li><strong>GLM for the middle ground.</strong> Claude Code scored {fmt.score(glm.score/2)} for about {fmt.money(glm.sub_usd)}. ZCode averaged $0.19 per session and scored 8.75 on the shared final branch. Its average session cost was lower, with a slightly lower grade.</li>
      <li><strong>Codex for the cheapest run.</strong> {codex.wall_min} minutes, {fmt.money(codex.sub_usd)} and {fmt.score(codex.score/2)} out of 10. It had the cleanest code lane, but strict parsers and a failed live report check held it back.</li>
      <li><strong>Sonnet is off the frontier.</strong> {fmt.score(sonnet.score/2)} out of 10 for {fmt.money(sonnet.sub_usd)}, tied for slowest at {sonnet.wall_min} minutes. It labelled an ARS total as USD and never passed bill answers through to sizing. It was not the most expensive.</li>
    </ul><p>The curve connects the <strong>cost-quality frontier</strong>: Codex Astra low, GLM via ZCode, GLM via Claude Code and Fable. It is a visual guide between observed configurations, not a prediction of intermediate results.</p></section>
    <section className="article-section"><h2>Where the cost comes from</h2>
      <p><strong>Tokens are observed. Subscription dollars are estimates.</strong> Each model&rsquo;s token usage is priced at its list rates, then multiplied by the monthly plan fee divided by its estimated monthly API-equivalent allowance. Automatic review calls are included at their own model&rsquo;s rates.</p>
      {byScore.map(r=><CostDetails key={r.id} run={r} experiment={experiment}/>)}
    </section>
    <section className="article-section"><h2>The subscription assumptions</h2>
      <table className="detail-table plan-table"><thead><tr><th>Plan</th><th className="num">Monthly fee</th><th className="num">Monthly API-equivalent allowance</th></tr></thead><tbody>{plans.map(([name,fee,allowance])=><tr key={name}><td>{name}</td><td className="num" data-label="Monthly fee">{fmt.money(fee)}</td><td className="num" data-label="API-equivalent allowance">${fmt.int(allowance)}</td></tr>)}</tbody></table>
      <div className="prose" style={{marginTop:24}}><p>These are the <a href="/coding-agent-subscription-costs/">subscription comparison</a>&rsquo;s existing allowance assumptions. The Claude $100 estimates are one quarter of the measured $200 plan allowances. GLM&rsquo;s $1,300 estimate came from three weekly exhaustion windows. Codex uses the comparison&rsquo;s central case.</p><p><strong>The usage audit did not remeasure those allowances.</strong> These costs allocate a subscription fee; they are not per-task charges. Weekly share is the estimated subscription cost divided by the monthly fee, multiplied by 4.33.</p></div>
    </section>
    <section className="article-section prose"><h2>One feature, six configurations</h2>
      <p>The task was to rebuild Bruno&rsquo;s public chat bot so a price question runs the real solar estimator in conversation form. The configurations started from the same base commit in isolated worktrees. For ZCode, cost and token usage are the arithmetic mean of two sessions: $0.21 and $0.17 become $0.19 per session. The 8.75 grade and recorded wall time describe their shared final branch, not independently graded attempts.</p>
      <p>Fable and Opus ran at low effort, Sonnet at medium, and Codex Astra at low. GLM used Claude Code&rsquo;s default thinking and ZCode&rsquo;s max reasoning variant. These are the configurations tested, not identical reasoning budgets.</p>
      <p>One Fable 5.1 reviewer graded the branches with file-level evidence and re-ran the chat tests. Each rubric item scores 0 to 2; the total is divided by 2 for a maximum of 10. Self-reports were treated as claims, not evidence.</p>
      <details><summary>The 10-item rubric</summary><ol>{rubric_items.map((item,i)=><li key={i}>{item}</li>)}</ol></details>
      <p style={{marginTop:24}}>The code under test is private, so the exact task cannot be re-run from the public repository. The <a href={`${GITHUB}/tree/main/prompts`}>redacted prompt</a>, <a href={`${GITHUB}/blob/main/grading.md`}>grading evidence</a>, reports and extraction scripts are public. One feature evaluation does not establish a universal model ranking.</p>
    </section>
    <section className="article-section prose"><h2>The cost correction</h2>
      <p>The first version double-counted repeated assistant-message records, priced one-hour cache writes as five-minute writes, and priced automatic review calls as the main model. This version counts each message once, uses the correct cache duration and prices each model separately.</p>
      <p>GLM via Claude Code uses its final aggregate usage summary. ZCode averages the unique provider request totals from its two sessions. Codex uses its final cumulative turn usage, with cached input separated from fresh input. <a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic&rsquo;s list prices</a> supply the model and cache rates.</p>
      <nav className="article-links" aria-label="Further evaluation resources"><a href={`${GITHUB}/tree/main/scripts`}>Extraction scripts</a><a href="/model-eval/cost-audit.json">Cost audit</a><a href="/model-eval/best-subagent.svg">Vector chart</a></nav>
    </section>
  </article><FeatureEvalStyles/></Layout>;
}
