import { Pinia, createPinia, PiniaPluginContext } from 'pinia'
import { markRaw } from 'vue'
import { Router } from 'vue-router';

const pinia : Pinia = createPinia();

export const useRouter = function(router: Router) : Pinia {
    pinia.use(({ store } : PiniaPluginContext) => {
        store.$router = markRaw(router);
    })
    return pinia;
}

export default pinia;