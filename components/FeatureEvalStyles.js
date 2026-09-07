export default function FeatureEvalStyles(){return <style jsx global>{`
body{text-wrap:pretty}
.eval-article{max-width:1296px;margin:0 auto;padding:48px 28px 80px;font:18px/1.65 system-ui,sans-serif;color:#252525}
.eval-article *{box-sizing:border-box}
.eval-article h1{font:600 42px/1.15 system-ui,sans-serif;letter-spacing:-1.2px;max-width:960px;margin:0 0 24px;text-wrap:balance}
.eval-article h2{font:600 27px/1.25 system-ui,sans-serif;letter-spacing:-.4px;margin:0 0 24px}
.eval-article p{margin:0 0 20px;max-width:790px}
.eval-article .intro{font-size:20px;line-height:1.65}
.eval-article .article-links{display:flex;gap:16px 28px;flex-wrap:wrap;margin:26px 0 36px}
.eval-article .article-section{padding:38px 0;border-top:1px solid #d9dcdf}
.eval-article .prose{max-width:790px}
.eval-article ul,.eval-article ol{padding-left:24px;margin:0 0 20px}
.eval-article li{padding-left:5px;margin:0 0 18px}
.eval-article ol{list-style:decimal}
.eval-article ul{list-style:disc}
.eval-article strong{font-weight:600}
.eval-article a{color:#344abb;text-decoration:none}
.eval-article a:hover{color:#26378d}
.eval-article a:focus-visible,.eval-article button:focus-visible{outline:2px solid #344abb;outline-offset:4px}
.model-eval-chart{margin:24px 0 34px}
.eval-axis{display:flex;width:fit-content;max-width:100%;border:1px solid #2b2b2b;border-radius:9px;overflow:hidden;margin:0 0 10px}
.eval-axis button{font:16px/1.2 system-ui,sans-serif;padding:15px 20px;border:0;background:#fff;color:#454545;min-height:50px;white-space:nowrap;cursor:pointer}
.eval-axis button+button{border-left:1px solid #d9dcdf}
.eval-axis button.on{background:#252525;color:#fff}
.eval-article .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:4px 0 28px}
.eval-article .table-scroll table{border-collapse:collapse;font:17px/1.5 system-ui,sans-serif;font-variant-numeric:tabular-nums;margin:0}
.eval-article .table-scroll th,.eval-article .table-scroll td{padding:13px 28px 13px 0;border-bottom:1px solid #ddd;text-align:left;white-space:nowrap}
.eval-article .table-scroll th{font-weight:600;color:#252525;vertical-align:bottom}
.eval-article .table-scroll td{vertical-align:middle}
.eval-article .table-scroll th.num,.eval-article .table-scroll td.num{text-align:right}
.eval-article .results-table{min-width:880px}
.eval-article .rubric-table{min-width:1040px}
.eval-article .cost-table{min-width:1560px}
@media(max-width:600px){
.eval-article{padding:30px 20px 56px}
.eval-article h1{font-size:34px;letter-spacing:-.8px}
.eval-article h2{font-size:25px}
.eval-article .intro{font-size:18px}
.eval-article .article-links{gap:12px 20px}
.eval-article .article-section{padding:30px 0}
.eval-axis{width:100%}
.eval-axis button{flex:1;min-width:0;padding:12px 6px;font-size:15px;line-height:1.3;white-space:normal;text-align:center}
.eval-article .table-scroll th,.eval-article .table-scroll td{padding:11px 20px 11px 0}
}
`}</style>;}
