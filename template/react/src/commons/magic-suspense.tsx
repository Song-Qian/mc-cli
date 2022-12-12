/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   因React.Suspense不支持SSR功能，因此Magic.Suspense出来工作!!! 期待后期版本 React.Suspense 完整SSR能力 
 */
import * as React from "react"
import useSwr from 'swr'

type Props = {
    name: string
    fallback ?: React.ComponentType<any>
    element: () => Promise<{ default: React.ComponentType }>
}

export default function MagicSuspense(props : Readonly<Props>) {

    let { data } = useSwr(props.name, () => props.element().then((it) => it.default), { revalidateIfStale: true, revalidateOnReconnect: true, revalidateOnFocus: true, fallbackData: props.fallback })

    let C = data ? data : null;

    return (
        <>
            {
                C ? <C /> : null
            }
        </>
    )

}
