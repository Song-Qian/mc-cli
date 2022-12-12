/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   UI界面的开始
 */

import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import MagicSuspense from '~/commons/magic-suspense'

import "~/css/index.scss"

const App = function(props: Readonly<any>) : React.ReactElement {

    const loading = () => <div>loading...</div>;

    let Home = <MagicSuspense name="magic.page:./home/index" fallback={ loading } element={ () => import("./home/index")  } />
    let WelCome = <MagicSuspense name="magic.page:./home/welcome" fallback={ loading } element={ () => import("./home/welcome")} />

    return (
        <Routes location={props.base}>
            <Route path="/" element={ Home }>
                <Route element={WelCome} index/>
            </Route>
        </Routes>
    )
}

export default App;
