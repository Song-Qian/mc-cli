/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/10 23:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 用户Demo业务服务类
 */

import { Id, Paginated, Params } from '@feathersjs/feathers';
import { ApiController, HttpService } from '@skysong/magic-cube'
import User from '../models/user'

@ApiController("/api/user")
class UserService extends HttpService<User> {

    constructor() {
        super();
        this.init();
    }

    public init() {
        this.raw = {
            code : 200,
            map : new Map<number, string>([
                [200, "ok"],
                [1001, "用户不存在"],
                [1002, "用户密码错误"],
                [1003, "用户权限不够"],
                [1004, "用户被冻结"],
                [1005, "用户禁止更新"],
                [1006, "用户邮箱错误"],
                [1007, "用户查询结果异常"],
                [1008, "用户禁止删除"],
                [1009, "用户测试禁止"],
            ])
        }
    }

    public async find(params?: Params): Promise<User | User[] | Paginated<User>> {
        const me = this;
        me.state = ~~params?.query?.code || 200;
        return Promise.resolve<User[]>([
            { id : '1', name: 'song', age: 20, eMail : '1172559463@qq.com', sex: false }, 
            { id : '2', name: 'song1', age: 21, eMail : '1172559463@qq.com', sex : false }
        ])
    }

    public async get(id: Id, params?: Params): Promise<User> {
        return Promise.resolve<User>({ id : '1', name: 'song', age: 20, eMail : '1172559463@qq.com', sex: false })
    }

    public async create(data: Partial<User> | Array<Partial<User>>, params?: Params): Promise<User | User[]> {
        return Promise.resolve<User>(<User>data);
    }

    public async patch(id: Id, data: Partial<User>, params?: Params): Promise<User | User[]> {
        return Promise.resolve<User>(<User>data);
    }

    public async remove(id: Id, params?: Params): Promise<User | User[]> {
        return Promise.resolve<User>({ id : '1', name: 'song', age: 20, eMail : '1172559463@qq.com', sex: false });
    }
    
    public async update(id: Id, data: User, params?: Params): Promise<User | User[]> {
        return Promise.resolve<User>(data);
    }
}

export default UserService