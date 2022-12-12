/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/10 23:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: @skysong/magic cube 工程入口
 */
import MagicCube, { IRestMultiplexer, IViewMultiplexer, CreateVueRoot } from "@skysong/magic-cube"
import ServiceSynchResolverModule from './services/resolver_modules/service_synch_resolver_module'
import RepositorySynchResolverModule from './repositroy/resolve_modules/repository_synch_resolve'
import EntryVueSetup from './view/entry-server'

const config = MagicCube.Config();
const mc = new MagicCube.Cube({ config });
mc.useMultiplexer<IRestMultiplexer>("defaultMultiplexer", IRestMultiplexer);
mc.useMultiplexer<IViewMultiplexer>("viewMultiplexer", IViewMultiplexer, "./dist/index.html", CreateVueRoot(EntryVueSetup));
mc.dependencyResolvers(new ServiceSynchResolverModule(), new RepositorySynchResolverModule());
mc.Run();