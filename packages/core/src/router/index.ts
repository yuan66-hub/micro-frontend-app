import { lifecycle } from "../lifecycle/index"
import { patchRouter,isTurnChild } from "./util"
// 重写路由
export const rewriteRouter = () => {
    window.history.pushState = patchRouter(window.history.pushState,'micro_push')
    window.history.replaceState = patchRouter(window.history.replaceState,'micro_replace')
    
    window.addEventListener('micro_push',turnApp)
    window.addEventListener('micro_replace',turnApp)
    // 回退路由事件监听
    window.onpopstate = function (){
        turnApp()
    }

}


// 切换APP
export const turnApp = async () =>{
    // 是否是路由变化
   if(isTurnChild()){
       // 路由变化，同步修改子应用
       await lifecycle()
   }
}


