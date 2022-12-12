/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/22 22:25
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Repositroy 层实例注入配置 (同步方式)
 */
 import { interfaces } from 'inversify'

 import { IServiceSynchResolverModule } from '@skysong/magic-cube'
 import UserRepository from '../user_repositroy'
 import RoleRepository from '../role_repositroy'
 import UserRoleRepository from '../user_role_repositroy'
 import DepartmentRepository from '../department_repositroy'
 import Example from '../example'
 import JurisdictionView from '../jurisdiction_view'
  
export default class RepositorySynchResolverModule implements IServiceSynchResolverModule {
 
  constructor () {
    this.registry = this.loader
  }
 
  id!: number
 
  public registry!: interfaces.ContainerModuleCallBack
 
  public get loader(): interfaces.ContainerModuleCallBack {
    return (bind, unbind, isBound, rebind) => {
       
      bind(Symbol.for('magic:table')).to(DepartmentRepository);
      bind(Symbol.for('magic:table')).to(UserRepository);
      bind(Symbol.for('magic:table')).to(RoleRepository);
      bind(Symbol.for('magic:table')).to(UserRoleRepository);
      bind(Symbol.for('magic:table')).to(Example);

      /// View Create
      bind(Symbol.for('magic:table')).to(JurisdictionView);
      
    }
  }
   
}
  