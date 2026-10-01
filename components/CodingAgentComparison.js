export default function CodingAgentComparison() {
  return <figure className="agent-comparison">
    <picture>
      <source media="(max-width: 700px)" srcSet="/coding-subscriptions/chart-phone.png?v=9" />
      <img src="/coding-subscriptions/chart.png?v=9" width="2400" height="2400" alt="Artificial Analysis Coding Agent Index v1.5 versus published API cost and estimated subscription cost. Thirteen available default configurations; subscription costs are unknown for nine. Logarithmic USD cost axes. Exact values are in the full dataset below." />
    </picture>
    <figcaption>One current benchmark snapshot, priced two ways. September community scenarios remain dated assumptions. The complete configuration names, values and limitations are below.</figcaption>
    <style jsx>{`
      .agent-comparison { margin:32px 0; }
      .agent-comparison img { display:block; width:100%; height:auto; }
      .agent-comparison figcaption {max-width:780px;margin:16px auto 0;font:16px/1.5 system-ui,sans-serif;color:#555;}
    `}</style>
  </figure>;
}
