mdlr('[html]mmzsource-spotify-dinges',(e=>{e.html`<audio src="/noise.mp3" type="audio/mpeg" controls=true></audio>`})),mdlr('audio:experiment',(e=>{window.document.body.style.overflow='hidden';const{FFT:t}=e.require('audio:fft'),n=e.require('colormap:inferno'),o={spectogramSlice:1e3/60,spectogramLimit:32767,frequencyRange:[0,16e3]},a=4096,l=128,s=1/32768,c=new t({sampleRate:o.frequencyRange[1]<<1,timeSlice:o.spectogramSlice,windowSize:a}),i=[];let r=null;function d(e,t){let n=0;for(let t=0,o=e.length;t<o;++t){const o=Math.abs(e[t]);n<o&&(n=o)}const o=t/n;for(let t=0,n=e.length;t<n;++t)e[t]*=o}function m(e,t,n=l){let o=document.createElement('canvas');return o.width=t,o.height=n,o.style.cssText=`\n      position: absolute;\n      left: 8px;\n      width: ${t}px;\n      top: ${e}px;\n      height: ${n}px;\n      border: solid 1px gray;\n    `,o}function h(e,t=!1){return e.getContext('2d',{willReadFrequently:!1,desynchronized:!0,alpha:t})}function u(e){const t=h(e);return t.lineWidth=1,t.strokeStyle='cyan',t.translate(.5,.5),t.imageSmoothingEnabled=!1,t}function g(e,t){const n=h(e);n.translate(.5,.5),n.imageSmoothingEnabled=!1;let l=0;{const e=t.sampleRate;console.log(`fft-samples-duration: ${(1e3*a/e).toFixed(2)}ms`);const n=c.windowValues;let o=0,s=0;for(let e=0;e<n.length;++e)n[e]>=.5?(o+=n[e],++l):s+=n[e];console.log(l,o,s),console.log(`fft-windowed-samples-duration: ${(1e3*l/e).toFixed(3)}ms`)}let s=Math.floor(t.length/t.sampleRate*1e3/o.spectogramSlice);return s>=o.spectogramLimit&&(s=o.spectogramLimit),e.height=a>>1,e.width=s,n}function p(e,t){const n=h(e);n.lineWidth=1,n.fillStyle='none',n.translate(.5,.5),n.imageSmoothingEnabled=!1,n.strokeStyle='gray',n.beginPath();const o=e.height/2;for(let e=0;e<t.length;++e){const[a,l]=t[e],s=a*o,c=l*o;n.moveTo(e,o-s),n.lineTo(e,o-c)}n.stroke(),n.strokeStyle='lightgray',n.beginPath();for(let e=0;e<t.length;++e){const[,,a,l]=t[e],s=a*o,c=l*o;n.moveTo(e,o-s),n.lineTo(e,o-c)}n.stroke()}function f(e,t,n){let o=0,a=0,l=0,s=0,c=0,i=0;for(let r=t>>>0;r<n>>>0;++r){const t=e[r];t>=0?(t>s&&(s=t),i+=t,++c):(t<o&&(o=t),l+=t,++a)}return[o,s,a?l/a:0,c?i/c:0]}const b=new AudioContext({sampleRate:2*o.frequencyRange[1]>>>0});function y(e){b.decodeAudioData(e,(e=>{console.log(e),document.body.style.margin='8px',document.body.innerHTML='<button disabled=true>play</button><button>calc</button><span></span>';const[t,y,x]=document.body.childNodes;var v;(v=x).style.cssText='float:right;',setInterval((()=>{v.textContent=`${(performance.memory.usedJSHeapSize/1024/1024).toFixed(1)}M`}),250),t.addEventListener('click',(()=>{t.disabled=!0,function(e,t,n,o){function l(t){const n=b.currentTime-s;let c=o.canvas.width,r=Math.min(n/e.duration*c,c);o.clearRect(0,0,c,10),r<0&&(r=0),r>=c||(requestAnimationFrame(l),o.lineWidth=3,o.strokeStyle='rgba(0,128,255,0.75)',o.imageSmoothingEnabled=!1,o.beginPath(),o.moveTo(r,0),o.lineTo(r,1),o.stroke(),i.forEach((t=>{const n=a>>1,o=t.fftdata.length/n;let l=r/c*e.length>>0;l=Math.max(l,0),l=Math.min(l,e.length-a);const s=l/(e.length/o)>>>0;if(t.lastSliceId!==s){!function(e,t,n){const o=e.frequencyContext,a=o.canvas.width,l=o.canvas.height;o.clearRect(0,0,a,l),o.beginPath(),t.length;for(let e=0;e<t.length;++e){const n=Math.max(1,t[e]);o.moveTo(e,255),o.lineTo(e,255-n)}o.stroke()}(t,new Uint8Array(t.fftdata.buffer,s*n,n),e.sampleRate),t.lastSliceId=s}})))}w=b.createBufferSource(),w.buffer=e,w.connect(b.destination),w.start(),w.addEventListener('ended',(e=>{document.body.firstChild.disabled=!1})),window.audioContext=b,window.audioSource=w;const s=b.currentTime;l(performance.now())}(e,0,0,r)})),y.addEventListener('click',(()=>{y.disabled=!0,console.time('calculate');const l=Math.log2;i.forEach((t=>{let{width:i,height:r}=t.spectographContext.canvas;r=c.windowValues.length>>1,console.log(`texture: ${i}x${r} : ${c.windowValues.length>>1}`);let d=Math.floor(e.length/i);console.log('**',e.length,t.spectographContext.canvas.width,d);const m=new Float32Array(i*r);let h=0,u=0;console.time("calculate spectogram data");const g=-l(s),p=d>>1;t.buffer=m,t.bufferIndex=0;const f=o.spectogramSlice/1e3*e.sampleRate;console.log('#slices:',e.length/f,f,d,e.length/d);for(let n=p,o=e.length-p;n<o;n+=d){const e=c.calculateSpectrum(t.samples,(n>>0)-(a>>1));for(let n=0;n<e.length;++n)e[n]>=1||(e[n]>t.spectogram.max&&(t.spectogram.max=e[n]),m[h++]=e[n]<s?s:e[n]);++u}console.log(`columns: ${u}`),console.timeEnd("calculate spectogram data"),console.time("scale spectogram data");console.log(t.spectogram.max,1);const b=255/(g-1);t.fftdata=new Uint8ClampedArray(m.length);const y=t.spectographContext.createImageData(u,a>>1),w=new Uint32Array(y.data.buffer);for(let e=0;e<m.length;++e){let o=255-(-l(m[e])-1)*b>>0;t.fftdata[e]=o;w[(e/(a>>1)>>0)+u*((a>>1)-e%(a>>1))]=n[o]}console.timeEnd("scale spectogram data"),console.time("update spectogram texture"),t.spectographContext.putImageData(y,0,0),console.timeEnd("update spectogram texture"),t.buffer=null})),console.timeEnd('calculate'),console.log(i),t.disabled=!1}));const S=document.body.clientWidth,E=e.length/S;console.log([S,E,e.length/512*256]);for(let t=0;t<e.numberOfChannels;++t){const n=40+t*(3*(l+8)+l);let o=m(n+0*(l+8),S);document.body.appendChild(o);let s=m(n+1*(l+8),S,2*l);document.body.appendChild(s);const c=g(s,e);console.log(s.width);c.createImageData(1,s.height);let r=m(n+2*(l+8)+l,S);r.height=l<<1,r.width=a>>1,document.body.appendChild(r);const h=e.getChannelData(t),b=new Float32Array(h.buffer);d(b,.98),i.push({canvas:{samples:o,spectrum:s,frequency:r},frequencyContext:u(r),spectographContext:c,samples:b,spectogram:{min:+Number.MAX_SAFE_INTEGER,max:+Number.MIN_SAFE_INTEGER},lastSliceId:-1}),o.width=s.width;const y=[],w=b.length/o.width;for(let e=0;e<o.width;++e)y.push(f(h,e*w,e*w+w));p(o,y)}let C=document.createElement('canvas');C.width=S,C.height=1,C.style.cssText=`\n        pointer-events: none;\n        position: absolute;\n        left: 8px;\n        width: ${S}px;\n        top: 40px;\n        height: ${e.numberOfChannels*(4*l+24)-8}px;\n        border: solid 1px transparent;\n      `,document.body.appendChild(C),r=h(C,!0),r.lineWidth=3,r.strokeStyle='rgba(0,128,255,0.75)',r.imageSmoothingEnabled=!1}))}document.body.innerHTML='drop a file...';let w=null;!function e(){requestAnimationFrame(e)}();new ResizeObserver((e=>{const t=e[e.length-1];i.forEach((e=>{const n=t.borderBoxSize[0].inlineSize;e.canvas.samples.style.width=`${n}px`,e.canvas.spectrum.style.width=`${n}px`,e.canvas.frequency.style.width=`${n}px`,r.canvas.style.width=`${n}px`,r.canvas.width=n}))})).observe(document.body),document.addEventListener('dragover',(function(e){e.stopPropagation(),e.preventDefault()}),!1),document.addEventListener('drop',(function(e){e.stopPropagation(),e.preventDefault(),[...e.dataTransfer?e.dataTransfer.files:e.target.files].forEach((e=>function(e){var t=new FileReader;t.onload=function(t){console.log(e,e.size),y(t.target.result)},t.readAsArrayBuffer(e)}(e)))}),!1)}));
mdlr('audio:fft',(t=>{function e(t){const{sampleRate:e,timeSlice:o,windowSize:l}=t,s=this.windowValues,r=4*o/1e3*e,a=(Math.ceil(Math.log2(r)),l);console.log('*',a,l);const n=(l-1)/a,i=(l>>1)-(a>>1);console.log('#',i,a),s.fill(0);for(let t=0,e=a>>1;t<e;++t){const e=.5*(1-Math.cos(2*Math.PI*t*n/(l-1)));s[i+t>>>0]=e;s[i+a-1-t>>>0]=e}}return{FFT:function(t){const{sampleRate:o,windowSize:l}=t,s=new Float32Array(l),r=new Float32Array(l);this.real=new Float32Array(l),this.imag=new Float32Array(l),this.windowValues=new Float32Array(l),this.reverseTable=new Uint32Array(l),this.spectrum=new Float32Array(l/2),e.call(this,t);let a=1,n=l>>1;for(;a<l;){for(let t=0;t<a;++t){const e=this.reverseTable[t]+n;this.reverseTable[t+a]=e}a<<=1,n>>=1}for(let t=0;t<l;t++)s[t]=Math.sin(-Math.PI/t),r[t]=Math.cos(-Math.PI/t);this.calculateSpectrum=function(t,e=0){const o=this.reverseTable,a=this.windowValues,n=this.real,i=this.imag;let c=1;for(let s=0;s<l;++s){let l=o[s];n[s]=t[e+l]*a[l],i[s]=0}for(;c<l;){const t=r[c],e=s[c];let o=1,a=0;for(let s=0;s<c;++s){let r=s;for(;r<l;){const t=r+c,e=o*n[t]-a*i[t],l=o*i[t]+a*n[t];n[t]=n[r]-e,n[r]+=e,i[t]=i[r]-l,i[r]+=l,r+=c<<1}const h=o;o=h*t-a*e,a=h*e+a*t}c<<=1}const h=this.spectrum,w=2/l,f=Math.sqrt;for(let t=0,e=h.length;t<e;++t){const e=w*f(n[t]*n[t]+i[t]*i[t]);h[t]=e}return h}}}}));
mdlr('colormap:inferno',(m=>[[.001462,466e-6,.013866],[.002267,.00127,.01857],[.003299,.002249,.024239],[.004547,.003392,.030909],[.006006,.004692,.038558],[.007676,.006136,.046836],[.009561,.007713,.055143],[.011663,.009417,.06346],[.013995,.011225,.071862],[.016561,.013136,.080282],[.019373,.015133,.088767],[.022447,.017199,.097327],[.025793,.019331,.10593],[.029432,.021503,.114621],[.033385,.023702,.123397],[.037668,.025921,.132232],[.042253,.028139,.141141],[.046915,.030324,.150164],[.051644,.032474,.159254],[.056449,.034569,.168414],[.06134,.03659,.177642],[.066331,.038504,.186962],[.071429,.040294,.196354],[.076637,.041905,.205799],[.081962,.043328,.215289],[.087411,.044556,.224813],[.09299,.045583,.234358],[.098702,.046402,.243904],[.104551,.047008,.25343],[.110536,.047399,.262912],[.116656,.047574,.272321],[.122908,.047536,.281624],[.129285,.047293,.290788],[.135778,.046856,.299776],[.142378,.046242,.308553],[.149073,.045468,.317085],[.15585,.044559,.325338],[.162689,.043554,.333277],[.169575,.042489,.340874],[.176493,.041402,.348111],[.183429,.040329,.354971],[.190367,.039309,.361447],[.197297,.0384,.367535],[.204209,.037632,.373238],[.211095,.03703,.378563],[.217949,.036615,.383522],[.224763,.036405,.388129],[.231538,.036405,.3924],[.238273,.036621,.396353],[.244967,.037055,.400007],[.25162,.037705,.403378],[.258234,.038571,.406485],[.26481,.039647,.409345],[.271347,.040922,.411976],[.27785,.042353,.414392],[.284321,.043933,.416608],[.290763,.045644,.418637],[.297178,.04747,.420491],[.303568,.049396,.422182],[.309935,.051407,.423721],[.316282,.05349,.425116],[.32261,.055634,.426377],[.328921,.057827,.427511],[.335217,.06006,.428524],[.3415,.062325,.429425],[.347771,.064616,.430217],[.354032,.066925,.430906],[.360284,.069247,.431497],[.366529,.071579,.431994],[.372768,.073915,.4324],[.379001,.076253,.432719],[.385228,.078591,.432955],[.391453,.080927,.433109],[.397674,.083257,.433183],[.403894,.08558,.433179],[.410113,.087896,.433098],[.416331,.090203,.432943],[.422549,.092501,.432714],[.428768,.09479,.432412],[.434987,.097069,.432039],[.441207,.099338,.431594],[.447428,.101597,.43108],[.453651,.103848,.430498],[.459875,.106089,.429846],[.4661,.108322,.429125],[.472328,.110547,.428334],[.478558,.112764,.427475],[.484789,.114974,.426548],[.491022,.117179,.425552],[.497257,.119379,.424488],[.503493,.121575,.423356],[.50973,.123769,.422156],[.515967,.12596,.420887],[.522206,.12815,.419549],[.528444,.130341,.418142],[.534683,.132534,.416667],[.54092,.134729,.415123],[.547157,.136929,.413511],[.553392,.139134,.411829],[.559624,.141346,.410078],[.565854,.143567,.408258],[.572081,.145797,.406369],[.578304,.148039,.404411],[.584521,.150294,.402385],[.590734,.152563,.40029],[.59694,.154848,.398125],[.603139,.157151,.395891],[.60933,.159474,.393589],[.615513,.161817,.391219],[.621685,.164184,.388781],[.627847,.166575,.386276],[.633998,.168992,.383704],[.640135,.171438,.381065],[.64626,.173914,.378359],[.652369,.176421,.375586],[.658463,.178962,.372748],[.66454,.181539,.369846],[.670599,.184153,.366879],[.676638,.186807,.363849],[.682656,.189501,.360757],[.688653,.192239,.357603],[.694627,.195021,.354388],[.700576,.197851,.351113],[.7065,.200728,.347777],[.712396,.203656,.344383],[.718264,.206636,.340931],[.724103,.20967,.337424],[.729909,.212759,.333861],[.735683,.215906,.330245],[.741423,.219112,.326576],[.747127,.222378,.322856],[.752794,.225706,.319085],[.758422,.229097,.315266],[.76401,.232554,.311399],[.769556,.236077,.307485],[.775059,.239667,.303526],[.780517,.243327,.299523],[.785929,.247056,.295477],[.791293,.250856,.29139],[.796607,.254728,.287264],[.801871,.258674,.283099],[.807082,.262692,.278898],[.812239,.266786,.274661],[.817341,.270954,.27039],[.822386,.275197,.266085],[.827372,.279517,.26175],[.832299,.283913,.257383],[.837165,.288385,.252988],[.841969,.292933,.248564],[.846709,.297559,.244113],[.851384,.30226,.239636],[.855992,.307038,.235133],[.860533,.311892,.230606],[.865006,.316822,.226055],[.869409,.321827,.221482],[.873741,.326906,.216886],[.878001,.33206,.212268],[.882188,.337287,.207628],[.886302,.342586,.202968],[.890341,.347957,.198286],[.894305,.353399,.193584],[.898192,.358911,.18886],[.902003,.364492,.184116],[.905735,.37014,.17935],[.90939,.375856,.174563],[.912966,.381636,.169755],[.916462,.387481,.164924],[.919879,.393389,.16007],[.923215,.399359,.155193],[.92647,.405389,.150292],[.929644,.411479,.145367],[.932737,.417627,.140417],[.935747,.423831,.13544],[.938675,.430091,.130438],[.941521,.436405,.125409],[.944285,.442772,.120354],[.946965,.449191,.115272],[.949562,.45566,.110164],[.952075,.462178,.105031],[.954506,.468744,.099874],[.956852,.475356,.094695],[.959114,.482014,.089499],[.961293,.488716,.084289],[.963387,.495462,.079073],[.965397,.502249,.073859],[.967322,.509078,.068659],[.969163,.515946,.063488],[.970919,.522853,.058367],[.97259,.529798,.053324],[.974176,.53678,.048392],[.975677,.543798,.043618],[.977092,.55085,.03905],[.978422,.557937,.034931],[.979666,.565057,.031409],[.980824,.572209,.028508],[.981895,.579392,.02625],[.982881,.586606,.024661],[.983779,.593849,.02377],[.984591,.601122,.023606],[.985315,.608422,.024202],[.985952,.61575,.025592],[.986502,.623105,.027814],[.986964,.630485,.030908],[.987337,.63789,.034916],[.987622,.64532,.039886],[.987819,.652773,.045581],[.987926,.66025,.05175],[.987945,.667748,.058329],[.987874,.675267,.065257],[.987714,.682807,.072489],[.987464,.690366,.07999],[.987124,.697944,.087731],[.986694,.70554,.095694],[.986175,.713153,.103863],[.985566,.720782,.112229],[.984865,.728427,.120785],[.984075,.736087,.129527],[.983196,.743758,.138453],[.982228,.751442,.147565],[.981173,.759135,.156863],[.980032,.766837,.166353],[.978806,.774545,.176037],[.977497,.782258,.185923],[.976108,.789974,.196018],[.974638,.797692,.206332],[.973088,.805409,.216877],[.971468,.813122,.227658],[.969783,.820825,.238686],[.968041,.828515,.249972],[.966243,.836191,.261534],[.964394,.843848,.273391],[.962517,.851476,.285546],[.960626,.859069,.29801],[.95872,.866624,.31082],[.956834,.874129,.323974],[.954997,.881569,.337475],[.953215,.888942,.351369],[.951546,.896226,.365627],[.950018,.903409,.380271],[.948683,.910473,.395289],[.947594,.917399,.410665],[.946809,.924168,.426373],[.946392,.930761,.442367],[.946403,.937159,.458592],[.946903,.943348,.47497],[.947937,.949318,.491426],[.949545,.955063,.50786],[.95174,.960587,.524203],[.954529,.965896,.540361],[.957896,.971003,.556275],[.961812,.975924,.571925],[.966249,.980678,.587206],[.971162,.985282,.602154],[.976511,.989753,.61676],[.982257,.994109,.631017],[.988362,.998364,.644924]].map((([m,o,r])=>4278190080+(256*r>>>0<<16)+(256*o>>>0<<8)+(256*m>>>0)))));
mdlr('colormap:magma',(m=>[[.001462,466e-6,.013866],[.002258,.001295,.018331],[.003279,.002305,.023708],[.004512,.00349,.029965],[.00595,.004843,.03713],[.007588,.006356,.044973],[.009426,.008022,.052844],[.011465,.009828,.06075],[.013708,.011771,.068667],[.016156,.01384,.076603],[.018815,.016026,.084584],[.021692,.01832,.09261],[.024792,.020715,.100676],[.028123,.023201,.108787],[.031696,.025765,.116965],[.03552,.028397,.125209],[.039608,.03109,.133515],[.04383,.03383,.141886],[.048062,.036607,.150327],[.05232,.039407,.158841],[.056615,.04216,.167446],[.060949,.044794,.176129],[.06533,.047318,.184892],[.069764,.049726,.193735],[.074257,.052017,.20266],[.078815,.054184,.211667],[.083446,.056225,.220755],[.088155,.058133,.229922],[.092949,.059904,.239164],[.097833,.061531,.248477],[.102815,.06301,.257854],[.107899,.064335,.267289],[.113094,.065492,.276784],[.118405,.066479,.286321],[.123833,.067295,.295879],[.12938,.067935,.305443],[.135053,.068391,.315],[.140858,.068654,.324538],[.146785,.068738,.334011],[.152839,.068637,.343404],[.159018,.068354,.352688],[.165308,.067911,.361816],[.171713,.067305,.370771],[.178212,.066576,.379497],[.184801,.065732,.387973],[.19146,.064818,.396152],[.198177,.063862,.404009],[.204935,.062907,.411514],[.211718,.061992,.418647],[.218512,.061158,.425392],[.225302,.060445,.431742],[.232077,.059889,.437695],[.238826,.059517,.443256],[.245543,.059352,.448436],[.25222,.059415,.453248],[.258857,.059706,.45771],[.265447,.060237,.46184],[.271994,.060994,.46566],[.278493,.061978,.46919],[.284951,.063168,.472451],[.291366,.064553,.475462],[.29774,.066117,.478243],[.304081,.067835,.480812],[.310382,.069702,.483186],[.316654,.07169,.48538],[.322899,.073782,.487408],[.329114,.075972,.489287],[.335308,.078236,.491024],[.341482,.080564,.492631],[.347636,.082946,.494121],[.353773,.085373,.495501],[.359898,.087831,.496778],[.366012,.090314,.49796],[.372116,.092816,.499053],[.378211,.095332,.500067],[.384299,.097855,.501002],[.390384,.100379,.501864],[.396467,.102902,.502658],[.402548,.10542,.503386],[.408629,.10793,.504052],[.414709,.110431,.504662],[.420791,.11292,.505215],[.426877,.115395,.505714],[.432967,.117855,.50616],[.439062,.120298,.506555],[.445163,.122724,.506901],[.451271,.125132,.507198],[.457386,.127522,.507448],[.463508,.129893,.507652],[.46964,.132245,.507809],[.47578,.134577,.507921],[.481929,.136891,.507989],[.488088,.139186,.508011],[.494258,.141462,.507988],[.500438,.143719,.50792],[.506629,.145958,.507806],[.512831,.148179,.507648],[.519045,.150383,.507443],[.52527,.152569,.507192],[.531507,.154739,.506895],[.537755,.156894,.506551],[.544015,.159033,.506159],[.550287,.161158,.505719],[.556571,.163269,.50523],[.562866,.165368,.504692],[.569172,.167454,.504105],[.57549,.16953,.503466],[.581819,.171596,.502777],[.588158,.173652,.502035],[.594508,.175701,.501241],[.600868,.177743,.500394],[.607238,.179779,.499492],[.613617,.181811,.498536],[.620005,.18384,.497524],[.626401,.185867,.496456],[.632805,.187893,.495332],[.639216,.189921,.49415],[.645633,.191952,.49291],[.652056,.193986,.491611],[.658483,.196027,.490253],[.664915,.198075,.488836],[.671349,.200133,.487358],[.677786,.202203,.485819],[.684224,.204286,.484219],[.690661,.206384,.482558],[.697098,.208501,.480835],[.703532,.210638,.479049],[.709962,.212797,.477201],[.716387,.214982,.47529],[.722805,.217194,.473316],[.729216,.219437,.471279],[.735616,.221713,.46918],[.742004,.224025,.467018],[.748378,.226377,.464794],[.754737,.228772,.462509],[.761077,.231214,.460162],[.767398,.233705,.457755],[.773695,.236249,.455289],[.779968,.238851,.452765],[.786212,.241514,.450184],[.792427,.244242,.447543],[.798608,.24704,.444848],[.804752,.249911,.442102],[.810855,.252861,.439305],[.816914,.255895,.436461],[.822926,.259016,.433573],[.828886,.262229,.430644],[.834791,.26554,.427671],[.840636,.268953,.424666],[.846416,.272473,.421631],[.852126,.276106,.418573],[.857763,.279857,.415496],[.86332,.283729,.412403],[.868793,.287728,.409303],[.874176,.291859,.406205],[.879464,.296125,.403118],[.884651,.30053,.400047],[.889731,.305079,.397002],[.8947,.309773,.393995],[.899552,.314616,.391037],[.904281,.31961,.388137],[.908884,.324755,.385308],[.913354,.330052,.382563],[.917689,.3355,.379915],[.921884,.341098,.377376],[.925937,.346844,.374959],[.929845,.352734,.372677],[.933606,.358764,.370541],[.937221,.364929,.368567],[.940687,.371224,.366762],[.944006,.377643,.365136],[.94718,.384178,.363701],[.95021,.39082,.362468],[.953099,.397563,.361438],[.955849,.4044,.360619],[.958464,.411324,.360014],[.960949,.418323,.35963],[.96331,.42539,.359469],[.965549,.432519,.359529],[.967671,.439703,.35981],[.96968,.446936,.360311],[.971582,.45421,.36103],[.973381,.46152,.361965],[.975082,.468861,.363111],[.97669,.476226,.364466],[.97821,.483612,.366025],[.979645,.491014,.367783],[.981,.498428,.369734],[.982279,.505851,.371874],[.983485,.51328,.374198],[.984622,.520713,.376698],[.985693,.528148,.379371],[.9867,.535582,.38221],[.987646,.543015,.38521],[.988533,.550446,.388365],[.989363,.557873,.391671],[.990138,.565296,.395122],[.990871,.572706,.398714],[.991558,.580107,.402441],[.992196,.587502,.406299],[.992785,.594891,.410283],[.993326,.602275,.41439],[.993834,.609644,.418613],[.994309,.616999,.42295],[.994738,.62435,.427397],[.995122,.631696,.431951],[.99548,.639027,.436607],[.99581,.646344,.441361],[.996096,.653659,.446213],[.996341,.660969,.45116],[.99658,.668256,.456192],[.996775,.675541,.461314],[.996925,.682828,.466526],[.997077,.690088,.471811],[.997186,.697349,.477182],[.997254,.704611,.482635],[.997325,.711848,.488154],[.997351,.719089,.493755],[.997351,.726324,.499428],[.997341,.733545,.505167],[.997285,.740772,.510983],[.997228,.747981,.516859],[.997138,.75519,.522806],[.997019,.762398,.528821],[.996898,.769591,.534892],[.996727,.776795,.541039],[.996571,.783977,.547233],[.996369,.791167,.553499],[.996162,.798348,.55982],[.995932,.805527,.566202],[.99568,.812706,.572645],[.995424,.819875,.57914],[.995131,.827052,.585701],[.994851,.834213,.592307],[.994524,.841387,.598983],[.994222,.84854,.605696],[.993866,.855711,.612482],[.993545,.862859,.619299],[.99317,.870024,.626189],[.992831,.877168,.633109],[.99244,.88433,.640099],[.992089,.89147,.647116],[.991688,.898627,.654202],[.991332,.905763,.661309],[.99093,.912915,.668481],[.99057,.920049,.675675],[.990175,.927196,.682926],[.989815,.934329,.690198],[.989434,.94147,.697519],[.989077,.948604,.704863],[.988717,.955742,.712242],[.988367,.962878,.719649],[.988033,.970012,.727077],[.987691,.977154,.734536],[.987387,.984288,.742002],[.987053,.991438,.749504]].map((([m,a,l])=>4278190080+(256*l>>>0<<16)+(256*a>>>0<<8)+(256*m>>>0)))));
mdlr('[html]tutorial-input',(t=>(t.html`<input value={content} on={input} /><div>hello, {content}</div>`,t.css`div { 
    color: white; 
    padding: 0.5em;
  }`,class{content='default';input(n){this.content=n.target.value,t.render(this)}})));
mdlr('[html]tutorial-numeric-input',(a=>(a.html`
  <label>
    <input type=number value={a} on={input:changeA} min=0 max=10 />
    <input type=range value={a} on={input:changeA} min=0 max=10 />
  </label>
  <br/>
  <label>
    <input type=number value={b} on={input:changeB} min=0 max=10 />
    <input type=range value={b} on={input:changeB} min=0 max=10 />
  </label>

  <p>{a} + {b} = {+a + +b}</p>`,a.css`
  :root {
    display: inline-block;
    background-color: #111;
    color: #ccc;
    padding: 0.5em;
  }

  p {
    margin: 0.5em 0 0 0;
  }`,class{a=0;b=0;changeA(n){this.a=n.target.value,a.render(this)}changeB(n){this.b=n.target.value,a.render(this)}})));
mdlr('[html]blog-overview-item',(e=>(e.html`
  <a href={'#'+slug}>
  <h1>{title}</h1><h2>{tldr}</h2>
  <span>more...</span>
  {#each tag in tags}<li>{tag}</li>{/each}
  </a>`,e.css`
  :root {
    display: block;
    padding: 0 1em;
  }
  li {
    all: unset;
    box-sizing: border-box;
    border: 1px solid #777;
    font-size:0.8em;
    line-height: 1.0em;
    height: 1.3em;
    padding: 0 0.5em;
    border-radius: 0.9em;
    color: #777;
    float: right;
    margin: 0 0.25em;
    cursor: pointer
  }

  li + li {
    margin: 0 0 0 0.25em;
  }

  h1 {
    margin: 0;
    padding-top: 0.25em;
    font-size: 1.5em;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.25em;
    color: #777;
    font-weight: unset;
    font-size: 1.1em;
  }

  a {
    all: inherit;
    cursor: pointer;
  }

  span {
    text-decoration: underline #bbb;
    color: #777;
    font-size: 0.8em;
  }`,class{title=null;tldr=null;slug=null;tags=null})));
mdlr('[html]blog-overview',(e=>(e.require('[html]blog-post-title'),e.require('[html]blog-overview-item'),e.html`
  <blog-post-title{=} />
  <div>
  {#each post in blog}
    <blog-overview-item{=post} />
    <hr />
  {:else}
    <span>...</span>
  {/each}
  </div>
  `,e.css`
  :root {
    display: grid;
  }

  :root > div {
    overflow-y: auto;
  }
  blog-post-title {
    line-height: 8vh;
    height: 8vh;
  }
  
  blog-overview-item {
    margin: 0.5em 0;
  }
  
  blog-overview-item + blog-overview-item {
    border-top: 0;
  }`,class{blog=null;title='The official blog'})));
mdlr('[html]blog-post-section-text',(e=>{const{md:t}=e.require('markdown');return e.html`{@html md([post?.body ?? '...'])}`,e.css`
  :root {
    display: inline-block;
    text-align: justify;
    font-size: 1.2em;
    line-height: 1.2em;
    width: 100%;
    padding: 1em 3em;
  }

  li {
    list-style-position: outside;
  }

  s {
    text-decoration: underline;
    text-underline-offset: -.25em;
    text-decoration-skip-ink: none;
  }

  sup, sub {
    line-height: 0;
    font-size: 70%;
  }

  iframe, img {
    border: 0;
    position: relative;
    height: 7.2em;
    width: auto;
  }

  iframe {
    aspect-ratio: 1 / 1;
  }
  
  .float-left {
    float: left;
    padding: 0 0.6em 0.5em 0;
  }
  
  .float-right {
    float: right;
    padding: 0 0 0.5em 0.6em;
  }
  
  .center {
    display: block;
    padding: 0.5em;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  pre {
    font-family: monospace;
    border-left: 0.25em solid #aaa;
    padding-left: 0.75em;
    font-size: 0.9em;
    line-height: 1.4em;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: #444;
  }

  code {
    display:inline;
    font-family: monospace;
    background: #888;
    border-radius: 0.7em;
    padding: 0 0.5em 0.1em 0.5em;
    font-size: 0.9em;
    line-height: 1.4em;
    display: inline;
    top: -0.1em;
    position: relative;
    color: #fff;
  }`,class{md=t;post=null}}));
mdlr('[html]blog-post-sections',(t=>(t.require('[html]blog-post-section-text'),t.html`
  {#if post?.type !== "code"}
  <a href="https://github.com/kootstra-rene/mdlr-tutorials/tree/main/docs/{post?.slug}">edit</a>
  {/if}
  <blog-post-section-text{=} />`,t.css`
  * {
    box-sizing: border-box;
    user-select: none;
    font-family: sans-serif;
  }
  :root {
    height: 100%;
    overflow-y: auto;
    display: block;
    box-shadow: 0 0 black;
  }
  :root > a {
    position:absolute;
    right:0.75em;
    top:0em;
    height: 2em;
    line-height:2em;
  }`,class{post=null})));
mdlr('[html]blog-post-title',(t=>(t.html`<div>{title ?? ''}</div>`,t.css`
  :root {
    display: block;
    white-space: nowrap;
    font-size: 2em;
    text-align: center;
    background-color: #555;
    font-weight: bold;
    font-spacing:0.1em;
    box-shadow: inset 0 0px 50px #333;
  }
  
  div {
    color: #ffffffe0;
    text-shadow: 1px 2px 4px #000, 0 0 0 #000, 1px 2px 4px #555;
  }`,class{title=null})));
mdlr('[html]blog-post-tldr',(t=>(t.html`<div>{post?.tldr ?? ''}</div>`,t.css`
  :root {
    display: block;
    white-space: nowrap;
    line-height: 1.2em;
    text-align: center;
    padding: 0.5em 0;
    color: #777;
    font-weight: unset;
    font-size: 1.1em;
  }`,class{post=null})));
mdlr('[html]blog-post',(t=>{const{$raw:s}=t.require('www-root');t.require('[html]blog-post-title'),t.require('[html]blog-post-sections'),t.html`
  <blog-post-title title={post?.title} />
  <blog-post-sections{=} />`,t.css`
  :root {
    display: flex;
    flex-direction: column;
  }

  blog-post-title {
    line-height: 3em;
    height: 3em;
    flex: none;
  }

  blog-post-sections {
    flex: 1;
  }`;const e=/-{3}\n(?<head>.*)-{3}\s*(?<body>[^$]*)/s;return class{slug=null;body=null;post=null;async connected(){const e=this.body??await fetch(`${s}${this.slug}`,{cache:'no-cache'}).then((t=>t.text()));this.post=this.#t(e),t.redraw(this)}#t(t){return function({head:t,body:s},e){const o=t.split(/\n/g).filter((t=>t)).map((t=>t.split(/\s*:\s*/g))).reduce(((t,[s,e])=>(t[s]=JSON.parse(e),t)),{});return Object.assign({slug:e},o,{body:s})}(e.exec(t).groups,this.slug)}}}));
mdlr('blog-indexer',(e=>{const{args:r}=e.require('args'),{foreach:o}=e.require('foreach'),s=e.require('[node]fs'),t=/-{3}\n(?<head>.*)-{3}\s*(?<body>[^$]*)/s,c=[];function n({v:e},r){const o=`${this.path}/${e}`;console.log(o),s.readFile(o,'utf8',((e,s)=>{const n=t.exec(s)?.groups;try{n&&c.push(function({head:e,body:r},o){const s=e.split(/\n/g).filter((e=>e)).map((e=>e.split(/\s*:\s*/g))).reduce(((e,[r,o])=>(e[r]=JSON.parse(o),e)),{});return'code'===s.type&&(s.body=`---\n${e}---\n${r}`),s.slug=o,s}(n,o.replace('docs','')))}catch(e){}r()}))}r.path.forEach((e=>{s.readdir(e,((t,a)=>{if(t)return console.error(t);o(a).call({path:e},n,(e=>{c.sort(((e,r)=>r.slug.localeCompare(e.slug))),s.writeFileSync(r.out[0],JSON.stringify(c))}))}))}))}));
mdlr('[unit]markdown',(e=>{const{$raw:t}=e.require('www-root'),r=/(^\s*)|(\s*$)/gm,o=/\u0020{2,4}\n/gm,n=/^\u0020{0,3}(#{1,6})\u0020*([^\n]*)/gm,i=/(\\?)(!?)\[([^\]]*)\]\(([^\)\|]*)(?:\|([^\)]*))?\)/g,l=/(\*{1,3})([^*]+)(\*{1,3})/g,a=/(~{1,2})([^~]+)(~{1,2})/g,s=/(\^{1,2})([^^]+)(\^{1,2})/g,c=/((?:\\?)`{3,3})((?:[^`]+?|`)*?)(`{3,3})|((?:\\?)`([^`]+)`)/gm,h=/^(\u0020{0,6})([-][\u0020]*)([^\n]*)/gm,g={otag:['<i>','<b>','<b><i>'],etag:['</i>','</b>','</i></b>']},u={otag:['<u>','<s>'],etag:['</u>','</s>']},d={otag:['<sub>','<sup>'],etag:['</sub>','</sup>']};function p(e,t,r,o){if(t.length!==o.length)return e;const n=t.length-1;return`${g.otag[n]}${r}${g.etag[n]}`}function m(e,t,r,o){if(t.length!==o.length)return e;const n=t.length-1;return`${u.otag[n]}${r}${u.etag[n]}`}function f(e,t,r,o){if(t.length!==o.length)return e;const n=t.length-1;return`${d.otag[n]}${r}${d.etag[n]}`}function $(e){return e.replace(/</g,'&lt;').replace(/\u0020/g,'&nbsp;')}function w(e,t,r,o,n){return n?.length?'\\'===n[0]?e.slice(1):`<code>${n.slice(1,n.length-1)}</code>`:'\\'===t[0]?$(e.slice(1)):`<pre>${$(r)}</pre>`}function b(e){const t=e.length-1>>1;return'<br>'.repeat(t)}function v(e,t,r){return`<h${t.length}>${r.trim()}</h${t.length}>`}function x(e,t,r,o){return`<li style="padding-left:${t.length>>1}em">${o}</li>`}function k(e,...r){let[o,n,i,l,a]=r;return l.startsWith('link:')?`<a href="${l.slice(5)}" onclick="const { hash, href } = globalThis.location; globalThis.location.href = href.replace(hash, ${l.slice(5)});">${i}</a>`:(l=l.replace('#/',t),n?o?`\`${e.slice(1)}\``:l.endsWith('.png')?`<img alt="${i}" src="${l}" ${a||''}/>`:l.startsWith('mdlr:')?`<iframe title="${i}" src="${l.replace('mdlr:','https:')}" ${a||''}></iframe>`:`<iframe title="${i}" src="${l}" sandbox="allow-scripts allow-same-origin" ${a||''}></iframe>`:`<a href="${l}">${i}</a>`)}return{md:function(e,...t){return String.raw({raw:e},...t).replace(i,k).replace(h,x).replace(n,v).replace(l,p).replace(a,m).replace(s,f).replace(c,w).replace(o,b).replace(r,'')}}})),mdlr('[unit]www-root',(e=>{const t=window.location,r='/bundler/html'===t.pathname?`${t.origin}/docs/`:t.href.split('#')[0];return{$root:t.href.replace(t.hash,''),$raw:r}})),mdlr('[html]mdlr-blog',(e=>{const{Router:t}=e.require('core:router'),{$root:r,$raw:o}=e.require('www-root');return e.require('[html]blog-overview'),e.require('[html]blog-post'),e.html`
  <header><a href="${r}"><img src="${o}resources/mdlr.svg"/></a></header>
  {#if !post}
    <blog-overview{=} />
  {:else}
    <blog-post{=post} />
  {/if}
  <footer><a href="https://github.com/kootstra-rene/mdlr-tutorials"><img src="${o}resources/github.png" /></a></footer>`,e.css`
  :root {
    display:flex;
    flex-direction: column;
    width: 80vw;
    height: 100%;
    transform: translate(10vw,0);
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 32px 0px, rgba(0, 0, 0, 0.6) 0px 6px 16px 0px;
    background-color: #fff;
  }
  blog-post, blog-overview {
    width: 80vw;
    flex: 1;
    overflow: hidden;
  }
  header, footer {
    width: 100%;
    background-color: #ccc;
    flex: none;
    text-align: center;
    line-height: 2em;
    height: 2em;
    overflow: hidden;
  }
  header > a {
    display: inline-block;
    height: 100%;
  }
  header > a > img {
    aspect-ratio: 2/1;
    height: 100%;
  }

  footer {
    line-height: 1.6em;
    height:1.6em;
  }
  
  footer > a > img {
    position:relative;
    top: 0.2em;
    height:1.2em;
  }`,class{blog=[];post=null;#e=new t;constructor(){this.#e.get('/',(()=>{this.post=null,e.redraw(this)})),this.#e.get('/posts/:slug',(({path:t})=>{this.post=this.blog.find((e=>e.slug===t)),e.redraw(this)}))}async connected(){const t=document.createElement('meta');t.name=e.name,t.content="Created with mdlr",document.head.append(t),document.title=e.name,document.body.style.cssText="\n        height: 100vh;\n        width: 100vw;\n        overflow-y: hidden;\n        position: absolute;\n        background-color:#666;\n      ",this.blog=await fetch(`${o}all.json`).then((e=>e.json())),this.#e.connect(window.location.href)}disconnected(){this.#e.disconnect()}}}));
mdlr('[html]tutorial-buienradar',(t=>(t.html`
  {#if feed}
    <table>
    {#each station in feed.actual.stationmeasurements.sort((a, b) => a.regio.localeCompare(b.regio))}
      <tr>
        <td>{station.regio}</td>
        <td>{station.temperature ?? '-'}</td>
        <td><img src="{station.iconurl}" /></td>
        <td>{station.weatherdescription}</td>
      </tr>
    {/each}
    </table>
  {:else}
    <div>Loading...</div>
  {/if}`,t.css`
  tr, img {
    line-height: 1em;
    height: 1em;
  }`,class{feed=null;async connected(){this.feed=await fetch("https://data.buienradar.nl/2.0/feed/json").then((t=>t.json())),t.redraw(this)}})));
mdlr('[html]tutorial-button',(t=>(t.html`<button on={click}>clicked {count} times</button>`,class{count=0;click(){++this.count,t.render(this)}}))),mdlr('[html]tutorial-button-styled',(t=>(t.html`<button on={click}>clicked {count} times</button>`,t.css`
    :where(*) {
      all: unset;
    }

    button {
      color: orange;
      border: orange solid 1px;
      border-radius: 0.5em;
      padding: 0.5em 1.0em;
      background-color: #111;
      user-select: none;
      cursor: pointer;
    }`,class{count=0;click(){++this.count,t.render(this)}})));
mdlr('[html]tutorial-calculator',(m=>(m.html`
    <div class="output">
      <span>{input || 0}</span>
      <span>{result}</span>
    </div>
    <div class="keypad">
    {#each control in ['/','*','+','-','C']}
      <button class="control" on={click}>{control}</button>
    {/each}
    {#each digit in [1,2,3,4,5,6,7,8,9,'.',0,'=']}
      <button class="digit" on={click}>{digit}</button>
    {/each}
    </div>
  `,m.css`
    :root {
      display: block;
      /* box-shadow: 0px 0px 100px #cccccc;  */
      margin: 20px auto;
      width: 500px;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    
    div.output {
      height: 140px;
      box-shadow: inset 0px 0px 20px #888;
      text-align: right;
      font-size: 80px;
      opacity: 46.5%;
      background-color: #ccc;
      border: 1px solid black;
      flex-direction: column;
      padding: 0.1em;
    }

    span {
      display: block;
    }

    div.output > span:last-child {
      font-size: 40px;
    }
    
    div.output > span {
      opacity: 26.5%;
    }
    
    div.keypad {
      width: 100%;
    }

    button {
      font-size: 40px;
    }

    button.control {
      border: solid 1px #888;
      background-color: #999;
      box-shadow: inset 0px 0px 20px #aaa;
      width: calc(500px / 5);
      height: 100px;  
    }

    button.control:hover {
      background-color: #ccc;
    }

    button.digit {
      border: solid 1px #888;
      background-color: #bbb;
      box-shadow: inset 0px 0px 20px #ccc;
      width: calc(500px / 3);
      height: 100px;  
    }

    button.digit:hover {
      background-color: #ccc;
    }`,class{input='';result='';click(t){const o=t.target.textContent;switch(o){case'C':this.input='',this.result='';break;case'=':this.input=this.#t();break;default:this.input+=o,this.result=this.#t()}m.render(this)}#t(){try{return`${eval(this.input||'0')}`}catch(t){return this.result}}})));
mdlr('[html]tutorial-canvas-gradient',(t=>(t.html`
  <canvas{} height={} width={} />`,t.css`
  :root {
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: #222;
  }
  canvas {
    height:100vh;
    width: 100vw;
    -webkit-mask: url(/user/resources/mdlr.svg) 50% 50% no-repeat;
  }`,class{canvas=null;height=8;width=8;connected(){!function(t){const{height:a,width:e}=t.canvas,n=t.getImageData(0,0,e,a);!function h(s){requestAnimationFrame(h);const c=64*Math.sin(s/1e3),i=64*Math.cos(s/1400);for(let t=0;t<n.data.length;t+=4){const h=t/4,s=64+128*(h%e>>>0)/e+c,o=64+128*(h/a>>>0)/a+i,d=128;n.data[t+0]=s,n.data[t+1]=o,n.data[t+2]=d,n.data[t+3]=255}t.putImageData(n,0,0)}(0)}(this.canvas.getContext('2d'))}})));
mdlr('[html]tutorial-mouse-events',(e=>(e.html`<div on={mousemove}>mouse-position: {x}, {y}</div>`,e.css`
  div {
    width: 100vw;
    height: 100vh;
    color: white;
    background-color: #333;
    line-height: 100vh;
    text-align: center;
    user-select: none;
  }`,class{x=0;y=0;mousemove(t){({x:this.x,y:this.y}=t),e.render(this)}})));
mdlr('[html]tutorial-pointer-events',(e=>(e.html`<div on={pointermove}>pointer-position: {x.toFixed(2)}, {y.toFixed(2)} {e}</div>`,e.css`
  div {
    width: 100vw;
    height: 100vh;
    color: white;
    background-color: #333;
    line-height: 100vh;
    text-align: center;
    user-select: none;
  }`,class{x=0;y=0;e={};pointermove(t){({x:this.x,y:this.y}=t);const{pressure:i,tangentialPressure:r}=t;this.e=JSON.stringify({pressure:i}),e.render(this)}})));
mdlr('[mdlr]compress',(e=>{const t=e.require('[node]fs'),{args:o}=e.require('args'),n=t.readFileSync(o.path[0],'utf8'),r=/([a-zA-Z]+)/g,l=[];let s;new TextEncoder;for(;null!==(s=r.exec(n));){let e='block';const t=s[0];l.push({id:t,type:e})}const c=new Map;for(let{id:e,type:t}of l){if('utf8'===t)continue;e.toLocaleLowerCase();let o=c.get(e)||0;c.set(e,o+1)}function a([e,t]){return(t-1)*(e.length-1)}const i=[...c];i.sort(((e,t)=>a(t)-a(e)));let f=0;i.forEach((([e,t],o)=>{const n=a([e,t]);n<=0||(o<=127&&(f+=n),console.log(n,t,e))})),console.error('estimatedSavings:',f,'of',n.length,'~'+(f/n.length*100).toFixed(1)+'%')}));
mdlr('stream:dsv-splitter',(e=>({stream:e=>new TransformStream({regex:new RegExp(`(?:"([^"]*(?:""[^"]*)+)"|"([^"]*)"|([^${e}]*?))(?:(?:${e})|($))`,'g'),start(e){},transform(e,t){const s=e.map((e=>{let t;this.regex.lastIndex=0;const s=[];for(;null!==(t=this.regex.exec(e));){let e=t[1],i=t[2]||t[3],r=void 0!==t[4];if(void 0!==e?s.push(e.replace(/""/g,'"')):void 0!==i&&s.push(i),r)break}return s}));t.enqueue(s)},flush(e){}})}))),mdlr('stream:splitter',(e=>({stream:e=>new TransformStream({lastBlock:'',blocks:0,start(e){this.lastBlock=''},transform(t,s){if(Array.isArray(t)){const i=t.map((t=>t.split(e)));s.enqueue(i)}else{const i=t.split(e);i[0]=this.lastBlock+i[0],this.lastBlock=i.pop(),this.blocks+=i.length,s.enqueue(i)}},flush(e){this.lastBlock&&(e.enqueue([this.lastBlock]),++this.blocks),console.log('#blocks:',this.blocks)}})}))),mdlr('stream:pipeline',(e=>({pipeline:function(...e){const t=e.pop();let s=e.shift();e.filter((e=>e)).forEach((e=>{s=s.pipeThrough(e)})),s.pipeTo(new WritableStream({write(e){},close(){t(null)},abort(e){t(e)}}))}}))),mdlr('[html]tutorial-filesystem',(e=>{const{stream:t}=e.require('stream:dsv-splitter'),{stream:s}=e.require('stream:splitter'),{pipeline:i}=e.require('stream:pipeline');async function r(e,t){const{root:s,map:i}=t;for await(const o of e.values())if('.'!==o.name[0])if('directory'===o.kind)await r(o,t);else{const e=await s.resolve(o);i.set(e.join('/'),o)}}return e.html`
  {#if map.size < 1}
  <button on={click}>open folder</button>
  {:else}
  <div>
    {#each e in files()}
    <div><span>{e.k}</span></div>
    {/each}
  </div>
  <div>{info}</div>
  {/if}`,e.css`
  > div {
    display: block;
    overflow: auto;
    height: 100vh;
  }
  > div {
    width: 50%;
  }
  
  > div + div {
    position:absolute;
    right:0;
    top:0;
  }`,class{map=new Map;info='';connected(e){const t=this;e.addEventListener('click',(async e=>{if('span'===e.target.localName){const s=e.target.innerText;t.#e(s)}}))}async click(t){const s=await window.showDirectoryPicker({id:'id',mode:'readwrite'});await r(s,{root:s,map:this.map}),e.redraw(this)}files(){return[...this.map].map((([e,t])=>({k:e,v:t})))}async#e(e){const r=await this.map.get(e).getFile(),o=/\.gz$/.test(e)?new DecompressionStream("gzip"):null,a=s('\n');console.time(e),i(r.stream(),o,new TextDecoderStream,a,t('\t'),(t=>{console.log(t),console.timeEnd(e)}))}}}));
mdlr('[html]tutorial-firewatch',(t=>(t.html`
  <a href="https://www.firewatchgame.com">
    {#each layer in layers}
      <img style="transform: translate(0, {-y * layer / (layers.length - 1)}px)" src="https://www.firewatchgame.com/images/parallax/parallax{layer}.png" />
    {/each}
  </a>
  <div>
    <span style="opacity:{opacity}">scroll down</span>
    <div>You have scrolled {y} pixels</div>
  </div>`,t.css`
  :root {
    all: unset;
    display: block;
    background-color: rgb(32,0,1);
  }

  a {
    position: fixed;
    width: 2400px;
    height: 712px;
    left: 50%;
    transform: translate(-50%,0);
  }

  img {
    position: fixed;
    width: 100%;
    will-change: transform;
  }

  img:last-child::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(45,10,13);
  }

  div {
    position: relative;
    width: 100%;
    height: 300vh;
    color: rgb(220,113,43);
    text-align: center;
    padding: 4em 0.5em 0.5em 0.5em;
    box-sizing: border-box;
    pointer-events: none;
  }

  span {
    display: block;
    font-size: 1em;
    text-transform: uppercase;
    will-change: transform, opacity;
  }

  div > div {
    position: absolute;
    top: 711px;
    left: 0;
    width: 100%;
    height: calc(100% - 712px);
    background-color: rgb(32,0,1);
    color: white;
    padding: 50vh 0 0 0;
  }`,class{layers=[0,1,2,3,4,5,6,7,8];opacity=1;y=0;connected(){document.body.style.overflow="auto",document.addEventListener('scroll',(e=>{this.y=window.scrollY,this.opacity=1-Math.max(0,this.y/40),t.render(this)}))}})));
mdlr('[html]tutorial-form',(r=>{r.html`
    <form action="/api/form" method="post">
      <label for="name">name:</label><input type="text" id="name" name="user_name"/><br/>
      <label for="mail">e-mail:</label><input type="email" id="mail" name="user_mail"/><br/>
      <br/>
      <button type="submit">submit</button>
    </form>`,r.css`
    :root {
      color: white;
      background-color: #222;
      display: inline-block;
    }
    label {
      display: inline-block;
      width: 5em;
    }
  `})),mdlr('tutorial-form:router',(r=>{const{ok:e}=r.require('[mdlr]server-response'),t=r.require('[mdlr]router'),o=r.require('stream-reader');return t.post('/api/form',((r,t)=>{o(r,((t,o)=>{e(r,`form was submitted with: '${o}'`)}))})),t})),mdlr('[html]tutorial-form-app',(r=>{r.require('[html]tutorial-form');const{setRoute:e}=r.require('repl:backend-api');e('tutorial-form:router',(r=>{console.log('set-route:',r)})),r.html`<tutorial-form />`}));
mdlr('[html]tutorial-grid-viewer',(r=>(r.html`
    <table>
      {#each row, r in rows}
      <tr>
        {#each col, c in cols}
          <td>{getCell(r,c)}</td>
        {/each}
      </tr>
      {/each}
    </table>
    <div on={mousemove:scrolly}></div><div on={mousemove:scrollx}></div><div></div>`,r.css`
    :root {
      display: inline-grid;
      grid-template-columns: auto 1vh;
      grid-template-rows: auto 1vh;
      grid-template-areas: 
        "body scrolly"
        "scrollx scroll"
    }

    table {
      grid-area: body;
      background-color: #888;
    }

    div:nth-child(2) {
      background-color: #111;
      grid-area: scrolly;
    }
    div:nth-child(3) {
      height: 0.75em;
      background-color: #111;
      grid-area: scrollx;
    }
    div:nth-child(4) {
      height: 0.75em;
      background-color: #444;
      grid-area: scroll;
    }

    td {
      border: 1px solid black;
      width: 5em;
      height: 1.5em;
      text-align: center;
    }`,class{cols=Array.from({length:10}).fill('x');rows=Array.from({length:20}).fill('y');rowOffset=10;colOffset=10;getCell(r,l){return`${this.rowOffset+r}, ${this.colOffset+l}`}scrollx(l){const t=Math.round(l.x/(l.target.clientWidth-1)*(100-this.cols.length));this.colOffset=t,r.render(this)}scrolly(l){const t=Math.round(l.y/(l.target.clientHeight-1)*(1e4-this.rows.length));this.rowOffset=t,r.render(this)}})));
mdlr('[html]tutorial-hacker-news',(e=>(e.html`
    {#each item in newsItems}
      <a href="{item.url}">{item.title}</a><br/>
    {/each}`,e.css`
    :root {
      display: block;
      background-color: #111;
      color: white;
      height: 100%;
      text-align: center;
      line-height: 2em;
    }

    a {
      color: white;
    }

    a:visited {
      color: gray;
    }`,class{newsItems=[];async connected(){this.newsItems=await fetch("https://api.hackerwebapp.com/news").then((e=>e.json())),e.redraw(this)}})));
mdlr('[html]tutorial-hello',(l=>{l.html`<div>hello, world</div>`})),mdlr('[html]tutorial-hello-named',(l=>(l.html`<div>hello, {name}</div>`,class{name='noname'}))),mdlr('[html]tutorial-hello-styled',(l=>{l.css`
    :root {
      all: unset;
      display: block;
      background-color: #111;
      border: orange solid 1px;
      border-radius: 0.5em;
      padding: 0.5em;
      margin-bottom: 0.25em;
    }

    div {
      color: orange;
    }`,l.html`<div>hello, world</div>`}));
mdlr('[html]tutorial-if-block',(e=>(e.html`
      {#if value > 10}
        <span>{value} is greater than 10</span>
      {:elseif value < 5}
        <span>{value} is less than 5</span>
      {:else}
        <span>{value} is between 5 and 10</span>
      {/if}`,e.css`
      :root {
        background-color: #111;
        white-space: pre;
        flex: 1;
        padding: 0.5em;
        color: white;
      }`,class{value=7})));
mdlr('[html]tutorial-navigator-usermedia',(e=>(e.html`<video control playsinline></video>`,e.css`
  :root {
    display: block;
    padding: 2em;
  }

  video { 
    transform: scale(-1, 1) !important;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  video::-webkit-media-controls-panel {
    transform: scale(-1,1);
  }`,class{connected(){navigator.mediaDevices.getUserMedia({video:{width:1280,height:960}}).then((e=>{const o=document.querySelector('video');o.srcObject=e,o.onloadedmetadata=()=>{o.play()}})).catch((e=>{console.error(`${e.name}: ${e.message}`)}))}})));
mdlr('[html]tutorials-notch',(a=>(a.html`<canvas id="game" width="424" height="240" />`,a.css`
  canvas {
    transform: translate(20vw, 20vh);
    width: 60vw;
    height: 60vh;
  }`,class{connected(){var a,t,r=424,o=240,n=new Array(262144),e=new Array(12288);function h(){!function(){const a=Date.now();var h=.4*Math.sin(a%1e4/1e4*Math.PI*2)+Math.PI/2,v=.4*Math.cos(a%1e4/1e4*Math.PI*2),s=Math.cos(v),d=Math.sin(v),M=Math.cos(h),c=Math.sin(h),f=32.5+a%1e4/1e4*64,m=32.5,i=32.5;0;for(var l=0;l<r;l++)for(var g=(l-r/2)/o,w=0;w<o;w++){for(var I=(w-o/2)/o,u=1,y=u*s+I*d,D=I*s-u*d,P=g*M+y*c,q=y*M-g*c,A=0,p=255,x=0,B=24,C=0;C<3;C++){var E=P;1==C&&(E=D),2==C&&(E=q);var b=1/(E<0?-E:E),j=P*b,k=D*b,z=q*b,F=f-(0|f);1==C&&(F=m-(0|m)),2==C&&(F=i-(0|i)),E>0&&(F=1-F);var G=b*F,H=f+j*F,J=m+k*F,K=i+z*F;for(E<0&&(0==C&&H--,1==C&&J--,2==C&&K--);G<B;){var L=n[(63&K)<<12|(63&J)<<6|63&H];if(L>0){var N=16*(H+K)&15,O=16+(16*J&15);1==C&&(N=16*H&15,O=16*K&15,k<0&&(O+=32));var Q=e[N+16*O+256*L*3];Q>0&&(A=Q,x=255-(G/32*255|0),p=255*(255-(C+2)%3*50)/255,B=G)}H+=j,J+=k,K+=z,G+=b}}const a=p*x/65025;var R=(A>>16&255)*a,S=(A>>8&255)*a,T=(A>>0&255)*a;const h=4*(l+w*r);t.data[h+0]=R,t.data[h+1]=S,t.data[h+2]=T}}(),a.putImageData(t,0,0)}!function(){for(var v=1;v<16;v++)for(var s=255-(96*Math.random()|0),d=0;d<48;d++)for(var M=0;M<16;M++){var c=9858122;if(4==v&&(c=8355711),4==v&&0!=(3*Math.random()|0)||(s=255-(96*Math.random()|0)),1==v&&d<18+(M*M*3+81*M>>2&3)?c=6990400:1==v&&d<19+(M*M*3+81*M>>2&3)&&(s=2*s/3),7==v)if(c=6771249,M>0&&M<15&&(d>0&&d<15||d>32&&d<47)){c=12359778;var f=M-7;f<0&&(f=1-f),(g=(15&d)-7)<0&&(g=1-g),g>f&&(f=g),s=196-(32*Math.random()|0)+f%3*32}else 0==(2*Math.random()|0)&&(s=s*(150-100*(1&M))/100);5==v&&(c=11876885,(M+4*(d>>2))%8!=0&&d%4!=0||(c=12365733)),9==v&&(c=4210943);var m=s;d>=32&&(m/=2),8==v&&(c=5298487,0==(2*Math.random()|0)&&(c=0,m=255));var i=(c>>16&255)*m/255<<16|(c>>8&255)*m/255<<8|(255&c)*m/255;e[M+16*d+256*v*3]=i}for(a=document.getElementById('game').getContext('2d'),M=0;M<64;M++)for(d=0;d<64;d++)for(var l=0;l<64;l++){var g=.4*(d-32.5),w=.4*(l-32.5);n[v=l<<12|d<<6|M]=16*Math.random()|0,Math.random()>Math.sqrt(Math.sqrt(g*g+w*w))-.8&&(n[v]=0)}for(t=a.createImageData(r,o),v=0;v<r*o;v++)t.data[4*v+3]=255;setInterval(h,20)}()}})));
mdlr('external-callback-api',(e=>({getUser:function(e,r){setTimeout((()=>{const s=1e4*Math.random()>>>0;r(null,{name:e,id:s})}),500)},getUserDetails:function(e,r){setTimeout((()=>{const s=Object.assign({},e,{details:e.name+" userDetails"});r(null,s)}),500)},storeUserDetails:function({name:e,id:r,details:s},t){setTimeout((()=>{console.log(`${e}, ${r}, ${s}`),t(null,`${e} was hacked.`)}),500)}}))),mdlr('external-promise-api',(e=>{const{getUser:r,getUserDetails:s,storeUserDetails:t}=e.require('external-callback-api'),{promisify:o}=e.require('promise');return{getUser:function(e,s){return o(r,e)},getUserDetails:function(e,r){return o(s,e)},storeUserDetails:function(e,r){return o(t,e)}}})),mdlr('compare-callback',(e=>{const{chain:r}=e.require('chain'),{foreach:s}=e.require('foreach'),{getUser:t,getUserDetails:o,storeUserDetails:l}=e.require('external-callback-api');s(['MM','AA','BB','CC','DD','EE','FF','GG','HH','II']).with({concurrency:4}).do((function({v:e},s){r([t,o,l]).do(e,((e,r)=>{console.log('mdlr: '+r),s(null)}))}),(()=>{console.log('All Users Hacked!')})),console.clear(),t("CB",((e,r)=>{o(r,((e,r)=>{l(r,((e,r)=>{console.log('callback: '+r)}))}))})),r([t,o,l]).do("MD",((e,r)=>{console.log('mdlr: '+r)}))})),mdlr('compare-promise',(e=>{const{getUser:r,getUserDetails:s,storeUserDetails:t}=e.require('external-promise-api');console.clear(),r("PM").then((e=>s(e))).then((e=>t(e))).then((e=>console.log('promise: '+e))),async function(){const e=await r("AA"),o=await s(e),l=await t(o);console.log('async await: '+l)}()})),mdlr('promise',(e=>({promisify:function(e,...r){return new Promise(((s,t)=>{e(...r,((e,r)=>e?t(e):s(r)))}))}}))),mdlr('credentials-reader',(e=>{const{readFile:r}=e.require('[node]fs');var s;s=(e,r)=>{console.log(r)},r("./user/posts-code/credentials.csv",'utf8',((e,r)=>{if(e)return s(e);const t=[];r.split('\n').map((e=>e.split(','))).map((([e,r])=>t.push(r.trim()))),s(null,t)}))}));
mdlr('[html]tutorial-propagate-receiver',(e=>(e.html`<div>{one}, {two}, {three}</div>`,class{one=null;two=null;three=null}))),mdlr('[html]tutorial-propagate',(e=>(e.require('[html]tutorial-propagate-receiver'),e.html`<tutorial-propagate-receiver{=} />`,class{one='one';two='two';four='four'})));
mdlr('scale',(n=>({linear:function(){const n={dMin:0,dMax:0,rMin:0,rMax:0,domain:(r,M)=>(n.dMin=r,n.dMax=M,n),range:(r,M)=>(n.rMin=r,n.rMax=M,r=>{const{dMin:M,dMax:a,rMin:i,rMax:d}=n;return i+(r-M)/(a-M)*(d-i)})};return n}})));
mdlr('tutorial-scatterplot:data',(x=>({a:[{x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},{x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},{x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}],b:[{x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},{x:11,y:9.26},{x:14,y:8.1},{x:6,y:6.13},{x:4,y:3.1},{x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}],c:[{x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},{x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},{x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}],d:[{x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},{x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.5},{x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}]})));
mdlr('[html]tutorial-scatterplot-graph',(t=>{const{linear:i}=t.require('scale');return t.html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
        <g class="axis y-axis">
          {#each tick in yTicks}
            <g class="tick" transform="translate(0, {yScale(tick)})">
              <line x1="{padding.left}" x2="{xScale(22)}"/>
              <text x="{padding.left - 8}" y="+4">{tick}</text>
            </g>
          {/each}
        </g>
  
        <g class="axis x-axis">
          {#each tick in xTicks}
            <g class="tick" transform="translate({xScale(tick)},0)">
              <line y1="{yScale(0)}" y2="{yScale(13)}"/>
              <text y="{height - padding.bottom + 16}">{tick}</text>
            </g>
          {/each}
        </g>
  
        {#each point in points}
          <circle cx={xScale(point.x)} cy={yScale(point.y)} r="5"/>
        {/each}
      </svg>`,t.css`
      :root {
        display: inline-block;
        height: 50%;
        width: 50%;
      }
  
      .tick line {
        stroke: #999;
        stroke-dasharray: 2;
      }
  
      .x-axis text {
        text-anchor: middle;
      }
    
      .y-axis text {
        text-anchor: end;
      }
  
      text {
        font-size: 12px;
        fill: #999;
      }
  
      svg {
        width: 100%;
        height: 100%;
      }
      
      circle {
        fill: orange;
        fill-opacity: 0.6;
        stroke: rgba(0, 0, 0, 0.5);
        stroke-width: 0.5;
      }`,class{width=320;height=240;points=[];xTicks=[0,4,8,12,16,20];yTicks=[0,4,8,12];padding={top:20,right:40,bottom:40,left:25};xScale=i().domain(0,20).range(this.padding.left,this.width-this.padding.right);yScale=i().domain(0,12).range(this.height-this.padding.bottom,this.padding.top)}}));
mdlr('[html]tutorial-scatterplot',(t=>{const a=t.require('tutorial-scatterplot:data');return t.require('[html]tutorial-scatterplot-graph'),t.html`
    <div class="chart">
      <h2>Anscombe's quartet</h2>
      {#each set in dataset}
        <tutorial-scatterplot-graph points={set.data} />
      {/each}
    </div>`,t.css`
    :root {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);      
    }

    .chart {
      background-color: #ccc;
      width: 100%;
      max-width: 100%;
      padding: 1em;
    }`,class{dataset=['a','b','c','d'].map((t=>({data:a[t]})))}}));
mdlr('[html]tutorial-scroll',(o=>{o.html`
    <div id="container">
    {#each i in [0,1,2,3,4,5,6,7,8,9]}
      {#each j in [0,1,2,3,4,5,6,7,8,9]}
        <div>{i}, {j}</div>
      {/each}
    {/each}
    </div>`,o.css`
    :root {
      background-color: #111;
      color: white;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
    
    #container {
      overflow-y: scroll;
      height: 100%;
    }`}));
mdlr('[html]tutorial-svg-clock',(t=>{const e=(new Date).getTimezoneOffset();return t.html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
    <circle class="dialplate" r="48" />
    <text x="0" y="18" dominant-baseline="middle" text-anchor="middle" >{logo}</text>

    {#each m in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
      <line class="major" y1="35" y2="45" transform="rotate({6 * m})" />

      {#each o in [1, 2, 3, 4]}
        <line class="minor" y1="42" y2="45" transform="rotate({6 * (m + o)})" />
      {/each}
    {/each}

    <line class="hours" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" />
    <line class="minutes" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" />
    <line class="seconds" y1="10" y2="-38" transform="rotate({6 * seconds})" />
  </svg>`,t.css`
  :root {
    position: absolute;
    left: 0;
    top: 0;
    right:0;
    bottom: 0;
  }

  svg > * {
    stroke-linecap: round;
  }

  .dialplate {
    stroke: #eee;
    fill: #111;
  }
  
  .major {
    stroke: #666;
    stroke-width: 1;
  }

  .minor {
    stroke: #999;
    stroke-width: 0.5;
  }

  .hours {
    stroke: #555;
  }

  .minutes {
    stroke: #666;
  }

  .seconds {
    stroke: #b00;
  }

  text {
    font: bold 7px sans-serif;
    fill: #999;
  }

  svg {
    width: 100%;
    height: 100%;
  }`,class{logo='mdlr';offset=0;hours=0;minutes=0;seconds=0;connected(){setInterval(this.#t.bind(this),500),this.#t()}#t(){const s=60*(this.offset+e)*1e3;let o=new Date(Date.now()+s);this.hours=o.getHours(),this.minutes=o.getMinutes(),this.seconds=o.getSeconds(),t.render(this)}}}));
mdlr('[html]tutorial-clocks',(o=>(o.require('[html]tutorial-svg-clock'),o.html`
  {#each location in locations}
    <div>
      <tutorial-svg-clock offset={location.offset} logo={location.name}/>
    </div>
  {/each}
  `,o.css`
  :root {
    height: 100vh;
    display: grid;
  }
  div {
    position: relative;
  }
  `,class{locations=[{name:'UTC',offset:0},{name:'UTC-06:00',offset:-360}]})));
mdlr('[html]tutorial-todo-overview',(t=>{const{html:o,css:e}=t;return o`
    {#each todo in todoList}
      <span>- {todo.description}</span><br/>
    {:else}
      <span>You have nothing todo.</span>
    {/each}`,e`
    :root {
      background-color: #111;
      white-space: pre;
      flex: 1;
      padding: 0.5em;
    }`,class{todoList=[];addItem(o){this.todoList.push(o),t.redraw(this)}}})),mdlr('[html]tutorial-todo-input',(t=>{const{EventEmitter:o}=t.require('event-emitter'),{html:e,css:i}=t;return e`<input{input} /><button on={click}>create</button>`,i`
    :root {
      padding: 0.5em;
      background-color: #333;
      display: flex;
      flex-direction: row
    }
    input {
      flex: 1;
    }
    button {
      cursor: pointer;
    }`,class extends o{input=null;click(){this.emit('create',{description:this.input.value})}}})),mdlr('[html]tutorial-todo',(t=>{const{log:o}=t.require('html-logger');t.require('[html]tutorial-todo-overview'),t.require('[html]tutorial-todo-input');const{html:e,css:i}=t;return e`
    <header><h1>TODO list</h1></header>
    <tutorial-todo-input{input} />
    <tutorial-todo-overview{todoList} />`,i`
    :where(*) {
      box-sizing: border-box;
      user-select: none;
    }
    :root {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      color: white;
    }
    header {
      background-color: #444;
      text-align: center;
    }`,class{connected(){this.input.subscribe('create',(t=>{o(`added '${t.description}' to list`),this.todoList.addItem(t)}))}}}));
mdlr('[html]web-component',(l=>{l.html`<span>hello world!</span>`})),mdlr('[html]web-component-css',(l=>{l.html`<span>Hello world!</span>`,l.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`})),mdlr('[html]web-component-state',(l=>(l.html`<span>Hello world{bang}</span>`,class{bang='!!!'}))),mdlr('[html]web-component-css-state',(l=>(l.html`<span>Hello world{bang}</span>`,l.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`,class{bang='!!!'})));
