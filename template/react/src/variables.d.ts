/**
 * Developer    :   SongQian
 * Time         :   2022-01-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   TS兼容SASS
 */

declare module '*.css' {
    const  variables: { readonly [key: string]: any };
    export default  variables;
}


declare module '*.sass' {
    const  variables: { readonly [key: string]: any };
    export default  variables;
}

declare module '*.scss' {
    const  variables: { readonly [key: string]: any };
    export default  variables;
}