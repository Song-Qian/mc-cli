/**
 * Developer    :   SongQian
 * Time         :   2018-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Server 层实例注入配置 (同步方式)
 */
import { interfaces } from 'inversify'

import { IServiceSynchResolverModule, HttpService } from '@skysong/magic-cube'
import UserService from '../user.service'
 
export default class ServiceSynchResolverModule implements IServiceSynchResolverModule {

  constructor () {
    this.registry = this.loader
  }

  id!: number

  public registry!: interfaces.ContainerModuleCallBack

  public get loader(): interfaces.ContainerModuleCallBack {
    return (bind, unbind, isBound, rebind) => {
      // bind<HttpService<any>>(Symbol.for('magic:rest')).to(UserService).whenTargetNamed(Symbol.for('magic:user'));
      bind<HttpService<any>>(Symbol.for('magic:rest')).to(UserService);
      
    }
  }
  
}
 