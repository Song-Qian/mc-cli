/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   欢迎页
 */

import * as React from 'react'
import { ThemeContext, StylesContext } from '~/commons/provide'


export default function() : React.ReactElement {
    const [deg, setDeg] = React.useState(45);
    const [transformAnimated, setTransformAnimated] = React.useState({ transform : `translate(-50%, -50%) rotateX(345deg) rotateY(${deg}deg)`})

    React.useEffect(() => setTransformAnimated({ transform : `translate(-50%, -50%) rotateX(345deg) rotateY(${deg}deg)`}), [deg])
    React.useEffect(() => {
        let counter = setInterval(() => setDeg(deg - 90), 5000);
        return () => {
            clearInterval(counter);
        }
    })

    return (
        <ThemeContext.Consumer >
            {
                (theme) => (
                    <StylesContext.Consumer>
                        {
                            (styles : any) => (
                                <div className="mc-preserve" style={{ backgroundColor: ({ "mc-other-theme" : styles.otherMagicCube }[theme]) }}>
                                    <div className="mc-shell">
                                        <div className="mc-shell-side1" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme]) }}></div>
                                        <div className="mc-shell-side2" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme]) }}></div>
                                        <div className="mc-shell-side3" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme]) }}></div>
                                    </div>
                                    <div className="mc-core" style={transformAnimated} >
                                        <svg className='mc-core-side1' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M150,500 L150,150 500,150 500,500 275,500 275,300 400,300 400,400' stroke='#b32216' fill='none' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                        <svg className='mc-core-side2' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M0,350 L0,0 350,0 L350,200' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M235,100 110,100 110,350 235,350 235,200' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                            </g>
                                        </svg>
                                        <svg className='mc-core-side3' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M275,0 500,0 L500,350 300,350 500,350 L300,350' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M150,350 L150,100 300,100' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M400,100 L400,225 250,225' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                            </g>
                                        </svg>
                                        <svg className='mc-core-side4' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M150,500 L150,150 500,150 500,500 275,500 275,300 400,300 400,400' stroke='#b32216' fill='none' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round"/>
                                            </g>
                                        </svg>
                                        <svg className='mc-core-side5' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M0,350 L0,0 350,0 L350,200' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M235,100 110,100 110,350 235,350 235,200' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                            </g>
                                        </svg>
                                        <svg className='mc-core-side6' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                                            <g>
                                                <path d='M275,0 500,0 L500,350 300,350 500,350 L300,350' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M150,350 L150,100 300,100' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                                <path d='M400,100 L400,225 250,225' stroke='#b32216' strokeWidth='40' strokeLinejoin="round" strokeLinecap="round" fill="none" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            )
                        }
                    </StylesContext.Consumer>
                )
            }
        </ThemeContext.Consumer>
    )
}