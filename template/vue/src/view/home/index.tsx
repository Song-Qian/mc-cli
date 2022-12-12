/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 */

import { inject, ref, computed, onMounted, onUnmounted, render, defineComponent, ComponentOptionsWithoutProps, Ref } from 'vue'
import { search } from '~/commons/api'
import { TinyEmitter } from 'tiny-emitter'
import user from '~/models/user'

type Props = {}

export default defineComponent<ComponentOptionsWithoutProps<Readonly<Props>>, {}, {}>({
    name: 'home',
    setup(props: ComponentOptionsWithoutProps<Readonly<Props>>, { attrs, emit, slots }) : typeof render {
        const emitter = new TinyEmitter();
        let deg : Ref<number> = ref<number>(45);

        let styles = inject<any>(Symbol.for("__varibles"));
        let theme = inject<Ref<string>>(Symbol.for("__theme")) || ref<string>("");

        const transform = computed<string>(() => `transform: translate(-50%, -50%) rotateX(345deg) rotateY(${deg.value}deg);`);

        const UserSearch = () => search<user>('/api/user');

        const onUpdateAnimation = () => {
            let counter = setInterval(() => { deg.value -= 90 }, 5000);
            emitter.once("clearAnimtion", () => clearInterval(counter));
        }

        onMounted(onUpdateAnimation)

        onUnmounted(() => emitter.emit("clearAnimtion"))

        return () => (
            <div class="mc-preserve" style={{ backgroundColor: ({ "mc-other-theme" : styles.otherMagicCube }[theme.value]) }}>
                <div class="mc-shell">
                    <div class="mc-shell-side1" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme.value]) }}></div>
                    <div class="mc-shell-side2" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme.value]) }}></div>
                    <div class="mc-shell-side3" style={{ borderTopColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), borderLeftColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeShell }[theme.value]) }}></div>
                </div>
                <div class="mc-core" style={transform.value} >
                    <svg class='mc-core-side1' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M150,500 L150,150 500,150 500,500 275,500 275,300 400,300 400,400'  fill='none' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round"/>
                        </g>
                    </svg>
                    <svg class='mc-core-side2' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M0,350 L0,0 350,0 L350,200' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])}  stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M235,100 110,100 110,350 235,350 235,200'  stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])}  stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                        </g>
                    </svg>
                    <svg class='mc-core-side3' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M275,0 500,0 L500,350 300,350 500,350 L300,350'  stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M150,350 L150,100 300,100'  stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M400,100 L400,225 250,225'  stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                        </g>
                    </svg>
                    <svg class='mc-core-side4' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M150,500 L150,150 500,150 500,500 275,500 275,300 400,300 400,400' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} fill='none' stroke-width='40' stroke-linejoin="round" stroke-linecap="round"/>
                        </g>
                    </svg>
                    <svg class='mc-core-side5' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M0,350 L0,0 350,0 L350,200'  stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M235,100 110,100 110,350 235,350 235,200' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                        </g>
                    </svg>
                    <svg class='mc-core-side6' style={{ borderColor: ({ "mc-other-theme" : styles.otherMagicCubeBorderColor }[theme.value]), backgroundColor: ({ "mc-other-theme" : styles.otherMagicCubeCore }[theme.value]) }} xmlns='http://www.w3.org/2000/svg' xlinkHref='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 500 500' preserveAspectRatio='none meet'>
                        <g>
                            <path d='M275,0 500,0 L500,350 300,350 500,350 L300,350' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M150,350 L150,100 300,100' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                            <path d='M400,100 L400,225 250,225' stroke={({ "mc-other-theme" : styles.otherMagicCubeSvgLine }[theme.value])} stroke-width='40' stroke-linejoin="round" stroke-linecap="round" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>
        )

    }
})