/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/22 22:25
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Repositroy 层实例注入配置 (同步方式)
 */
 import { interfaces } from 'inversify'

 import MagicCube, { IServiceSynchResolverModule, ConnectionFactory } from '@skysong/magic-cube'
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
      
      const config = MagicCube.Config();
      bind(Symbol.for('magic:dbContext')).toDynamicValue(ConnectionFactory(config.get("database"))).inSingletonScope();

      bind(Symbol.for('magic:table')).to(DepartmentRepository).whenTargetNamed(Symbol.for('magic:department'));
      bind(Symbol.for('magic:table')).to(UserRepository).whenTargetNamed(Symbol.for('magic:user'));
      bind(Symbol.for('magic:table')).to(RoleRepository).whenTargetNamed(Symbol.for('magic:role'));
      bind(Symbol.for('magic:table')).to(UserRoleRepository).whenTargetNamed(Symbol.for('magic:user_role'));
      bind(Symbol.for('magic:table')).to(Example).whenTargetNamed(Symbol.for('magic:example'));

      /// View Create
      bind(Symbol.for('magic:table')).to(JurisdictionView).whenTargetNamed(Symbol.for('magic:jurisdiction'));
      
    }
  }
   
}
  