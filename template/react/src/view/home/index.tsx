/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   UI界面的开始
 */

import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { search } from '~/commons/api'
import { ThemeContext, StylesContext } from '~/commons/provide'
import user from '~/models/user'
import useSWR from 'swr'

import variables from '~/css/_variables.scss'

const Home = function() : React.ReactElement {
    let [ styles, setStyles ] = React.useState(variables);
    let [ theme, setTheme ] = React.useState("mc-base-theme");


    let modifyThemeSkin = (evt : React.MouseEvent, _theme: string) => {
        setTheme(_theme);
    }

    let modifyColorValue = (evt: React.FormEvent, key: string) => {
        setStyles({ ...styles, [key] : (evt.target as HTMLInputElement).value || "" });
    }
    
    const UserSearch = useSWR("api::user", (key) => search<user>('/api/user'));

    return (
        <ThemeContext.Provider value={theme}> 
            <StylesContext.Provider value={styles}>
                <div style={{ width: '100%', height: '100%', backgroundColor: ({ "mc-other-theme" : styles.otherBackground }[theme]) }}  className={theme}>
                    <div className='mc-header' style={{ backgroundColor: theme === 'mc-other-theme' ? styles.otherHeader : '', color : theme === 'mc-other-theme' ? styles.otherTextColor : '' }}>
                        <i className='mc-logo'></i><span className='mc-title'>Magic Cube Cli</span>
                        <ul>
                            <li>GITHUB</li>
                            <li>Api</li>
                            <li>DOC</li>
                            <li>Configure</li>
                        </ul>
                    </div>
                    <div className='mc-container'>
                        <h2>感谢使用 《魔方》</h2>
                        <h3>魔方是一款分布式即时通信B/S架构框架, 使用魔方，将会带给你不一样的前端开发体验。</h3>
                        <h3>当前皮肤：
                            <span style={{ color: theme === 'mc-base-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-base-theme') }>经典色</span>
                            <span style={{ color: theme === 'mc-macaron-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-macaron-theme') }>马卡龙</span>
                            <span style={{ color: theme === 'mc-china-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-china-theme') }>中国风</span>
                            <span style={{ color: theme === 'mc-other-theme' ? '#409EFF' : '#333', cursor: "pointer", padding: "5px", display: "inline-block", boxSizing: "border-box", borderRadius: "5px" }} onClick={ (evt) => modifyThemeSkin(evt, 'mc-other-theme') }>自定义</span>
                        </h3>
                        <Outlet />
                        <div className="mc-colors" style={{ display: theme === 'mc-other-theme' ? 'block' : 'none' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', textIndent: '1em' }}>调色板：</div>
                            <div style={{ display: "flex", flexFlow: "row wrap" }}>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">导航背景色:</label> <input type="color" value={styles.otherHeader} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherHeader") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">背景色:</label> <input type="color" value={styles.otherBackground} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherBackground") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">字体颜色:</label> <input type="color" value={styles.otherTextColor} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherTextColor") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">Logo背景色:</label> <input type="color" value={styles.otherMagicCube} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherMagicCube") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">Logo边框颜色:</label> <input type="color" value={styles.otherMagicCubeBorderColor} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherMagicCubeBorderColor") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">Logo 外壳矩形颜色:</label> <input type="color" value={styles.otherMagicCubeShell} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherMagicCubeShell") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">Logo 内壳矩形颜色:</label> <input type="color" value={styles.otherMagicCubeCore} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherMagicCubeCore") } />
                                </div>
                                <div style={{ flex: "0 0 260px", padding: "10px", boxSizing: "border-box" }}>
                                    <label htmlFor="header">logo 内容线条颜色:</label> <input type="color" value={styles.otherMagicCubeSvgLine} onInput={ (evt : React.FormEvent) => modifyColorValue(evt, "otherMagicCubeSvgLine") } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StylesContext.Provider>
        </ThemeContext.Provider>
    )
}

export default Home;