(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[567],{10976:(e,s,a)=>{Promise.resolve().then(a.bind(a,25804))},32510:(e,s,a)=>{"use strict";a.d(s,{A:()=>v});var t=a(95155),l=a(12115),i=a(88081),c=a.n(i),n=a(99540),r=a.n(n);let o=["./assets/top_splash_placeholder.svg","./assets/jung_splash_placeholder.svg","./assets/mid_splash_placeholder.svg","./assets/bot_splash_placeholder.svg","./assets/sup_splash_placeholder.svg"],m=e=>{var s;return(null==e?void 0:null===(s=e.champion)||void 0===s?void 0:s.name)&&!e.champion.name.startsWith("-")},d=e=>{var s;return(null==e?void 0:null===(s=e.champion)||void 0===s?void 0:s.name)&&!e.champion.name.startsWith("-")},_=e=>{let{champion:s,isActive:a,displayName:l,spell1:i,spell2:n,config:d,position:_,onDragStart:u,onDragOver:v,onDrop:h,teamColor:g}=e;return(0,t.jsxs)("div",{className:c()(r().Pick,{[r().Active]:a}),draggable:m({champion:s}),onDragStart:e=>null==u?void 0:u(e,_),onDragOver:e=>{e.preventDefault(),null==v||v(e)},onDrop:e=>null==h?void 0:h(e,_),"data-team":g,children:[i&&n&&d.spellsEnabled&&m({champion:s})&&!a&&(0,t.jsxs)("div",{className:c()(r().SummonerSpells),children:[(0,t.jsx)("img",{src:i.icon,alt:"Spell 1"}),(0,t.jsx)("img",{src:n.icon,alt:"Spell 2"})]}),(0,t.jsx)("div",{className:c()(r().PickImage,{[r().Active]:a}),children:(0,t.jsx)("img",{src:m({champion:s})?s.loadingImg:o[_],alt:m({champion:s})?s.name:"Position ".concat(_+1)})}),(0,t.jsx)("div",{className:c()(r().PlayerName),children:(0,t.jsx)("span",{children:l})})]})},u=e=>{let{champion:s,isActive:a}=e;return(0,t.jsx)("div",{className:c()(r().Ban,{[r().Active]:a}),children:(0,t.jsx)("div",{className:c()(r().BanImage),children:(0,t.jsx)("img",{src:d({champion:s})?s.squareImg:"./assets/ban_placeholder.svg",alt:d({champion:s})?"Banned ".concat(s.name):"Ban Placeholder"})})})},v=e=>{let{globalState:s,state:a,config:i,setState:n,dropCall:o}=e,[m,d]=(0,l.useState)(r().TheAbsoluteVoid),[v,h]=(0,l.useState)(!1),g=()=>{h(!0),setTimeout(()=>{d(r().AnimationHidden),setTimeout(()=>{d("".concat(r().AnimationTimer," ").concat(r().AnimationBansPick)),setTimeout(()=>{d("".concat(r().AnimationBansPick," ").concat(r().AnimationBansPickOnly)),setTimeout(()=>{d(r().AnimationPigs)},1e3)},1450)},700)},500)};(0,l.useEffect)(()=>{a.champSelectActive&&!v&&g(),!a.champSelectActive&&v&&(h(!1),d(r().TheAbsoluteVoid))},[a.champSelectActive,v]);let p=(e,s,a)=>{e.dataTransfer.setData("text/plain",JSON.stringify({position:s,team:a}))},T=async(e,s,a)=>{e.preventDefault();let t=JSON.parse(e.dataTransfer.getData("text/plain"));o(s,t.position,t.team,a)},x=e=>{let s=e.bans.map((e,s)=>(0,t.jsx)(u,{...e},"ban-".concat(s)));return s.splice(3,0,(0,t.jsx)("div",{className:r().Spacing},"ban-spacer")),(0,t.jsx)("div",{className:c()(r().BansBox),children:s})},y=(e,s,a)=>(0,t.jsxs)("div",{className:c()(r().Team,e),children:[(0,t.jsx)("div",{className:c()(r().Picks),children:(e===r().TeamRed?[...a.picks].reverse():a.picks).map((s,a)=>(0,t.jsx)(_,{config:i,position:e===r().TeamRed?4-a:a,...s,onDragStart:(s,a)=>p(s,a,e===r().TeamBlue?"blue":"red"),onDragOver:e=>e.preventDefault(),onDrop:(s,a)=>T(s,a,e===r().TeamBlue?"blue":"red"),teamColor:e===r().TeamBlue?"blue":"red"},"pick-".concat(a)))}),(0,t.jsx)("div",{className:r().BansWrapper,children:(0,t.jsxs)("div",{className:c()(r().Bans,{[r().WithScore]:i.scoreEnabled}),children:[e===r().TeamBlue&&i.scoreEnabled&&(0,t.jsx)("div",{className:r().TeamScore,children:s.score}),x(a),(0,t.jsx)("div",{className:c()(r().TeamName,{[r().WithoutCoaches]:!i.coachesEnabled}),children:i.coachesEnabled&&(0,t.jsxs)("div",{className:r().CoachName,children:["Coach: ",s.coach]})}),e===r().TeamRed&&i.scoreEnabled&&(0,t.jsx)("div",{className:r().TeamScore,children:s.score})]})})]});return(0,t.jsxs)("div",{className:c()(r().Overlay,r().Europe,m),style:{"--color-red":"rgb(162,8,8)","--color-blue":"rgb(25,173,208)"},children:[0===Object.keys(a).length&&(0,t.jsx)("div",{className:c()(r().infoBox),children:"Not connected to backend service!"}),0!==Object.keys(a).length&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:c()(r().ProgressBar,{[r().Blue]:a.blueTeam.isActive,[r().Red]:a.redTeam.isActive,[r().Default]:!a.blueTeam.isActive&&!a.redTeam.isActive}),style:{width:"".concat(parseInt(a.timer)/30*100,"%"),left:0,zIndex:1,marginTop:"701px",marginLeft:"81px",marginRight:"81px"}}),(0,t.jsxs)("div",{className:c()(r().ChampSelect,{[r().BlueBackground]:a.blueTeam.isActive&&!a.redTeam.isActive,[r().RedBackground]:a.redTeam.isActive&&!a.blueTeam.isActive,[r().DefaultBackground]:!a.blueTeam.isActive&&!a.redTeam.isActive}),children:[(0,t.jsxs)("div",{className:c()(r().MiddleBox,{[r().Blue]:a.blueTeam.isActive&&!a.redTeam.isActive,[r().Red]:a.redTeam.isActive&&!a.blueTeam.isActive,[r().Default]:!a.blueTeam.isActive&&!a.redTeam.isActive}),children:[(0,t.jsx)("div",{className:c()(r().Logo),children:(!a.blueTeam.isActive&&!a.redTeam.isActive||a.blueTeam.isActive&&!a.redTeam.isActive&&i.blueTeam.logo||i.redTeam.logo)&&(0,t.jsx)("img",{src:a.blueTeam.isActive||a.redTeam.isActive?a.blueTeam.isActive&&!a.redTeam.isActive?i.blueTeam.logo:i.redTeam.logo:"./images/w2alogo.svg",alt:"Team Logo"})}),(0,t.jsx)("div",{className:c()(r().Patch),children:a.blueTeam.isActive||a.redTeam.isActive?a.blueTeam.isActive&&!a.redTeam.isActive?i.blueTeam.name:i.redTeam.name:i.tournamentName})]}),y(r().TeamBlue,i.blueTeam,a.blueTeam),y(r().TeamRed,i.redTeam,a.redTeam)]})]})]})}},25804:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>o});var t=a(95155),l=a(12115),i=a(17891),c=a(99540),n=a.n(c),r=a(32510);function o(){let[e,s]=(0,l.useState)(""),[a,c]=(0,l.useState)(""),[o,m]=(0,l.useState)(null),[d,_]=(0,l.useState)("disconnected"),[u,v]=(0,l.useState)(null),[h,g]=(0,l.useState)("disconnected"),[p,T]=(0,l.useState)(null);return((0,l.useEffect)(()=>{var a=null;m(a=""===e?new i.xM:new i.xM(e)),a.on("open",e=>{s(e),_("ready"),console.log("Peer ID: ".concat(e))})},[]),p)?(0,t.jsx)("div",{className:"".concat(n().root," ").concat(n().App),children:(0,t.jsx)(r.A,{globalState:p,state:p.viewGame.state,config:p.viewGame.state.config,setState:T,dropCall:()=>{}})}):(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("h1",{className:"text-xl mb-4",children:"Picks"}),(0,t.jsxs)("div",{className:"flex gap-4 items-center",children:[(0,t.jsx)("input",{value:a,onChange:e=>c(e.target.value),type:"text",placeholder:"Enter peer ID",className:"border p-2 rounded"}),(0,t.jsx)("button",{className:"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",onClick:()=>{if("ready"===d){let e=o.connect(a);v(e),e.on("error",e=>{console.error("Connection error:",e),g("error: "+e.type)}),e.on("open",()=>{g("connected"),console.log("Connected to peer:",a),e.send("Hello!")}),e.on("data",e=>{console.log("RECEIVING MESSAGE"),console.log(e),T({...e})})}},disabled:"connected"===h,children:"Connect"})]}),(0,t.jsxs)("div",{className:"mt-4",children:["Status: ",h]})]})}},99540:e=>{e.exports={root:"styles_root__7SkVR",TheAbsoluteVoid:"styles_TheAbsoluteVoid__uI87O",AnimationHidden:"styles_AnimationHidden__jTip8",Timer:"styles_Timer__LWrJJ",timer:"styles_timer__qxsEW",Blue:"styles_Blue__IQxzj",Red:"styles_Red__UpHgM",Team:"styles_Team__Fh8rt",Logo:"styles_Logo__I_LWA",Patch:"styles_Patch__kCcNP",AnimationTimer:"styles_AnimationTimer__LsYRA","timer-colors":"styles_timer-colors__gqE3X",TeamBlue:"styles_TeamBlue__2gSbR",Bans:"styles_Bans__qlxTu","bans-fadein":"styles_bans-fadein__7_eaL",TeamRed:"styles_TeamRed__S1Nfr",AnimationBansPick:"styles_AnimationBansPick__zbmkL",Pick:"styles_Pick__5dKSh","pick-move-up":"styles_pick-move-up__pm2Rp",AnimationBansPickOnly:"styles_AnimationBansPickOnly__K3CMC",TeamName:"styles_TeamName__gu2gq",WithoutCoaches:"styles_WithoutCoaches__O3mBm",CoachName:"styles_CoachName__4ivT5",TeamScore:"styles_TeamScore__rHMrE",Picks:"styles_Picks__cay06",Active:"styles_Active__U_siI",PlayerName:"styles_PlayerName__Mqoe9",PickImage:"styles_PickImage__GfAHl",shimmer:"styles_shimmer__lmf68",dragOver:"styles_dragOver__rNubV",BansBox:"styles_BansBox__xNg2L",Ban:"styles_Ban__DfyUz",BanImage:"styles_BanImage__whOih",Spacing:"styles_Spacing__G4R_x",BansWrapper:"styles_BansWrapper__9rHjA",Background:"styles_Background__MRRSE",TimerChars:"styles_TimerChars__7GKtV",Europe:"styles_Europe__K3r_R",MiddleBox:"styles_MiddleBox__oN9Ux",Default:"styles_Default__IN73_",ProgressBar:"styles_ProgressBar__vP8KG",ChampSelect:"styles_ChampSelect__JRdk0",BlueBackground:"styles_BlueBackground__Xrgxf",RedBackground:"styles_RedBackground__gexqQ",DefaultBackground:"styles_DefaultBackground__tGtXX"}}},e=>{var s=s=>e(e.s=s);e.O(0,[43,395,441,517,358],()=>s(10976)),_N_E=e.O()}]);