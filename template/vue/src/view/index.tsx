/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   UI界面的开始
 */

import { defineComponent, render, provide, ref, reactive, computed } from 'vue'

import "~/css/index.scss"
import  variables from '~/css/_variables.scss'

const App = defineComponent({

    setup(props, { attrs, slots, emit }) : typeof render {
        let theme = ref<string>("mc-base-theme");
        let styles = reactive<any>(variables);

        provide(Symbol.for("__varibles"), styles);
        provide(Symbol.for("__theme"), theme);

        let modifyThemeSkin = (evt : MouseEvent, _theme: string) => {
            theme.value = _theme;
        }

        let modifyColorValue = (evt: Event, key: string) => {
            styles[key] = (evt.target as HTMLInputElement).value || "";
        }

        return () => (
            <div style={{ width: '100%', height: '100%', backgroundColor: ({ "mc-other-theme" : styles.otherBackground }[theme.value]) }} class={theme.value}>
                <div class='mc-header' style={{ backgroundColor: theme.value === 'mc-other-theme' ? styles.otherHeader : '', color : theme.value === 'mc-other-theme' ? styles.otherTextColor : '' }}>
                    <i class='mc-logo' /><span class='mc-title'>Magic Cube Cli</span>
                    <ul>
                        <li>GITHUB</li>
                        <li>Api</li>
                        <li>DOC</li>
                        <li>Configure</li>
                    </ul>
                </div>
                <div class='mc-container'>
                    <h2>感谢使用 《魔方》</h2>
                    <h3>魔方是一款分布式即时通信B/S架构框架, 使用魔方，将会带给你不一样的前端开发体验。</h3>
                    <h3>当前皮肤：
                        <span style={{ color: theme.value === 'mc-base-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-base-theme') }>经典色</span>
                        <span style={{ color: theme.value === 'mc-macaron-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-macaron-theme') }>马卡龙</span>
                        <span style={{ color: theme.value === 'mc-china-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-china-theme') }>中国风</span>
                        <span style={{ color: theme.value === 'mc-other-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-other-theme') }>自定义</span>
                    </h3>
                    <router-view />
                    <div class="mc-colors" style={{ display: theme.value === 'mc-other-theme' ? 'block' : 'none' }}>
                        <div style="font-size: 24px; font-weight: bold; text-align: left; text-indent: 1em;">调色板：</div>
                        <div style="display: flex; flex-flow: row wrap;">
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">导航背景色:</label> <input type="color" value={styles.otherHeader} onInput={ (evt : Event) => modifyColorValue(evt, "otherHeader") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">背景色:</label> <input type="color" value={styles.otherBackground} onInput={ (evt : Event) => modifyColorValue(evt, "otherBackground") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">字体颜色:</label> <input type="color" value={styles.otherTextColor} onInput={ (evt : Event) => modifyColorValue(evt, "otherTextColor") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">Logo背景色:</label> <input type="color" value={styles.otherMagicCube} onInput={ (evt : Event) => modifyColorValue(evt, "otherMagicCube") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">Logo边框颜色:</label> <input type="color" value={styles.otherMagicCubeBorderColor} onInput={ (evt : Event) => modifyColorValue(evt, "otherMagicCubeBorderColor") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">Logo 外壳矩形颜色:</label> <input type="color" value={styles.otherMagicCubeShell} onInput={ (evt : Event) => modifyColorValue(evt, "otherMagicCubeShell") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">Logo 内壳矩形颜色:</label> <input type="color" value={styles.otherMagicCubeCore} onInput={ (evt : Event) => modifyColorValue(evt, "otherMagicCubeCore") } />
                            </div>
                            <div style="flex: 0 0 260px; padding: 10px; box-sizing: border-box;">
                                <label for="header">logo 内容线条颜色:</label> <input type="color" value={styles.otherMagicCubeSvgLine} onInput={ (evt : Event) => modifyColorValue(evt, "otherMagicCubeSvgLine") } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default App;