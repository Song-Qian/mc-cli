/**
 * Developer    :   SongQian
 * Time         :   2022/01/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   RESTFUL API
 */
import { default as axios, AxiosResponse, AxiosRequestConfig } from 'axios'

/**
 * 查询所有条件的数据
 * @param uri 请求地址
 * @param config axios 配置项
 * @returns Promise<Result> => Array<T>
 */
export const search = <R, D = any>(uri: string, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.get<R, AxiosResponse<R>, D>(uri, config).then(resolve).catch(reject);
    })
}

/**
 * 查询唯一条件的数据
 * @param uri 请求地址
 * @param id 唯一键
 * @param config axios 配置项
 * @returns Promise<Result> => T
 */
export const get = <R, D = any>(uri: string, id : string, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.get<R, AxiosResponse<R>, D>(`${uri}/${id}`, config).then(resolve).catch(reject);
    })
}

/**
 * 新增一条数据
 * @param uri 请求地址
 * @param it Data 实体
 * @param config axios 配置项
 * @returns Promise<Result> => T
 */
export const add = <R, D = any>(uri: string, it : D, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.post<R, AxiosResponse<R>, D>(uri, it, config).then(resolve).catch(reject);
    })
}

/**
 * 新增批量数据
 * @param uri 请求地址
 * @param it Array<Data[]>
 * @param config axios 配置项
 * @returns Promise<Result> => T[]
 */
export const batch = <R, D = any>(uri: string, it : Array<D>, config ?: AxiosRequestConfig<D[]>) => {
    return new Promise<AxiosResponse<R, Array<D>>>((resolve, reject) => {
        axios.post<R, AxiosResponse<R>, Array<D>>(uri, it, config).then(resolve).catch(reject);
    })
}

/**
 * 更新或者新增
 * @param uri 请求地址
 * @param id 判断新增还是更新的唯一值
 * @param it 保存、更新数据体
 * @param config axios 配置项
 * @returns Promise<Result> => T
 */
export const saveOnModify = <R, D = any>(uri: string, id : string, it : D, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.patch<R, AxiosResponse<R>, D>(`${uri}/${id}`, it, config).then(resolve).catch(reject);
    })
}

/**
 * 修改数据信息
 * @param uri 请求地址
 * @param id 修改数据记录唯一标准值
 * @param it 更数数据体
 * @param config axios 配置项
 * @returns Promise<Result> => T
 */
export const modify = <R, D = any>(uri: string, id: string, it : D, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.put<R, AxiosResponse<R>, D>(`${uri}/${id}`, it, config).then(resolve).catch(reject);
    })
}

/**
 * 永久删除数据
 * @param uri 请求地址
 * @param id 删除记录唯一值
 * @param config axios 配置项
 * @returns Promise<Result> => T
 */
export const drop = <R, D = any>(uri: string, id: string, config ?: AxiosRequestConfig<D>) => {
    return new Promise<AxiosResponse<R, D>>((resolve, reject) => {
        axios.delete<R, AxiosResponse<R>, D>(`${uri}/${id}`, config).then(resolve).catch(reject);
    })
}