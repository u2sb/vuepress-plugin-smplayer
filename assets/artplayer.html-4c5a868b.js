import{_ as u}from"./app-cd9cfd2a.js";import{_ as v,M as r,p as m,q as C,N as a,V as e,a1 as o}from"./framework-12368d4f.js";const E=o(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>可以插入 artplayer 播放器。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>一般情况下无需手动设置</p></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// .vuepress/config.ts</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">defineUserConfig</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;vuepress&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">smplayer</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;vuepress-plugin-smplayer&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">defineUserConfig</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">plugins</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#61AFEF;">smplayer</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">artplayer</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">width</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;100%&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">ratio</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">16</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">9</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">src</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">fullscreen</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">autoSize</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">setting</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">whitelist</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;*&quot;</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">//所有 artplayer 配置项都可以配置</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    }),</span></span>
<span class="line"><span style="color:#ABB2BF;">  ],</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3>`,7),b=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">url</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;/assets/video/s_720.mp4&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hls" tabindex="-1"><a class="header-anchor" href="#hls" aria-hidden="true">#</a> HLS</h3>`,2),h=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">url</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;/assets/video/dash/master.m3u8&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flv" tabindex="-1"><a class="header-anchor" href="#flv" aria-hidden="true">#</a> FLV</h3>`,2),D=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">url</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;/assets/video/s_720.flv&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dash" tabindex="-1"><a class="header-anchor" href="#dash" aria-hidden="true">#</a> DASH</h3>`,2),f=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">url</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;/assets/video/dash/stream.mpd&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="customtype" tabindex="-1"><a class="header-anchor" href="#customtype" aria-hidden="true">#</a> CustomType</h3>`,2),g=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">:src</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;art4&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">setup</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">art4</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;/assets/video/dash/master.m3u8&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;customHLS&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">customType</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#61AFEF;">customHLS</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">mediaElement</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">src</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">player</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">mediaElement</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">canPlayType</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;application/x-mpegURL&quot;</span><span style="color:#ABB2BF;">) </span><span style="color:#56B6C2;">||</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">mediaElement</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">canPlayType</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;application/vnd.apple.mpegURL&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        ) {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">mediaElement</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">src</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">src</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        } </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">default</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Hls</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">import</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;hls.js/dist/hls.min.js&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">// @ts-ignore</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">hls</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">new</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">Hls</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">hls</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">attachMedia</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">mediaElement</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">hls</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">Hls</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Events</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">MEDIA_ATTACHED</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">            </span><span style="color:#E5C07B;">hls</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">loadSource</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">src</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">          });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">player</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;destroy&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">            </span><span style="color:#E5C07B;">hls</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">destroy</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">          });</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  };</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="弹幕" tabindex="-1"><a class="header-anchor" href="#弹幕" aria-hidden="true">#</a> 弹幕</h3>`,2),q=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="shiki one-dark-pro" style="background-color:#282c34;"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">ArtPlayer</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">url</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;/assets/video/s_720.mp4&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">:player</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;player5&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">:pluginDanmuKu</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;danmu5&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">ClientOnly</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">setup</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">danmakuId</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;cENuyhsT2rMOCohK&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">danmakuApi</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;https://danmu.u2sb.com/api/artplayer/v1&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">bilibiliDanmaku</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">\`</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">danmakuApi</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">/bilibili/BV1zt411t79A.json\`</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">danmu5</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#61AFEF;">danmuku</span><span style="color:#ABB2BF;">: () </span><span style="color:#C678DD;">=&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E5C07B;">Promise</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">allSettled</span><span style="color:#ABB2BF;">([</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">bilibiliDanmaku</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">res</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">res</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">json</span><span style="color:#ABB2BF;">()),</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">danmakuApi</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">/</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">danmakuId</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">.json\`</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">res</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">res</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">json</span><span style="color:#ABB2BF;">()),</span></span>
<span class="line"><span style="color:#ABB2BF;">      ])</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">res</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E5C07B;">res</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">r</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">r</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">status</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">===</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;fulfilled&quot;</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">map</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">r</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">r</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">value</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">        )</span></span>
<span class="line"><span style="color:#ABB2BF;">        .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">res</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">res</span></span>
<span class="line"><span style="color:#ABB2BF;">            .</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">(</span></span>
<span class="line"><span style="color:#ABB2BF;">              (</span><span style="color:#E06C75;font-style:italic;">r</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">                </span><span style="color:#E06C75;">r</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&quot;code&quot;</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">!==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">undefined</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span></span>
<span class="line"><span style="color:#ABB2BF;">                </span><span style="color:#E06C75;">r</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&quot;code&quot;</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">===</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span></span>
<span class="line"><span style="color:#ABB2BF;">                </span><span style="color:#E06C75;">r</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&quot;data&quot;</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">!==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">undefined</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span></span>
<span class="line"><span style="color:#ABB2BF;">                </span><span style="color:#E06C75;">r</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&quot;data&quot;</span><span style="color:#ABB2BF;">].</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">0</span></span>
<span class="line"><span style="color:#ABB2BF;">            )</span></span>
<span class="line"><span style="color:#ABB2BF;">            .</span><span style="color:#61AFEF;">reduce</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">acc</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">cur</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">acc</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">concat</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">cur</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&quot;data&quot;</span><span style="color:#ABB2BF;">]), [])</span></span>
<span class="line"><span style="color:#ABB2BF;">        ),</span></span>
<span class="line"><span style="color:#ABB2BF;">  };</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">player5</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">player</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">player</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;artplayerPluginDanmuku:emit&quot;</span><span style="color:#ABB2BF;">, (</span><span style="color:#E06C75;font-style:italic;">danmu</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">danmu</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">danmakuApi</span><span style="color:#ABB2BF;">, {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">method</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;POST&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">headers</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#98C379;">&quot;Content-Type&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;application/json&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">Accept</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;application/json&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">body</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">JSON</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stringify</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">Id</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">danmakuId</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">Referer</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">window</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">location</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">origin</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">window</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">location</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">pathname</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          ...</span><span style="color:#E06C75;">danmu</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        }),</span></span>
<span class="line"><span style="color:#ABB2BF;">      });</span></span>
<span class="line"><span style="color:#ABB2BF;">    });</span></span>
<span class="line"><span style="color:#ABB2BF;">  };</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_={__name:"artplayer.html",setup(k){const i={url:"/assets/video/dash/master.m3u8",type:"customHLS",customType:{customHLS:async(n,s,l)=>{if(n.canPlayType("application/x-mpegURL")||n.canPlayType("application/vnd.apple.mpegURL"))n.src=s;else{const{default:p}=await u(()=>import("./hls.min-671b5c10.js").then(F=>F.h),["assets/hls.min-671b5c10.js","assets/commonjsHelpers-725317a4.js"]),t=new p;t.attachMedia(n),t.on(p.Events.MEDIA_ATTACHED,function(){t.loadSource(s)}),l.on("destroy",function(){t.destroy()})}}}},c="cENuyhsT2rMOCohK",B="https://danmu.u2sb.com/api/artplayer/v1",y=`${B}/bilibili/BV1zt411t79A.json`,d={danmuku:()=>Promise.allSettled([fetch(y).then(n=>n.json()),fetch(`${B}/${c}.json`).then(n=>n.json())]).then(n=>n.filter(s=>s.status==="fulfilled").map(s=>s.value)).then(n=>n.filter(s=>s.code!==void 0&&s.code===0&&s.data!==void 0&&s.data.length>0).reduce((s,l)=>s.concat(l.data),[]))},A=n=>{n.on("artplayerPluginDanmuku:emit",s=>{console.log(s),fetch(B,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({Id:c,Referer:window.location.origin+window.location.pathname,...s})})})};return(n,s)=>{const l=r("ArtPlayer"),p=r("ClientOnly");return m(),C("div",null,[E,a(p,null,{default:e(()=>[a(l,{url:"/assets/video/s_720.mp4"})]),_:1}),b,a(p,null,{default:e(()=>[a(l,{url:"/assets/video/dash/master.m3u8"})]),_:1}),h,a(p,null,{default:e(()=>[a(l,{url:"/assets/video/s_720.flv"})]),_:1}),D,a(p,null,{default:e(()=>[a(l,{url:"/assets/video/dash/stream.mpd"})]),_:1}),f,a(p,null,{default:e(()=>[a(l,{src:i})]),_:1}),g,a(p,null,{default:e(()=>[a(l,{url:"/assets/video/s_720.mp4",player:A,pluginDanmuKu:d})]),_:1}),q])}}},P=v(_,[["__file","artplayer.html.vue"]]);export{P as default};