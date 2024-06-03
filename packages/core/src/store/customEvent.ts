export class Custom {
    // 监听事件回调
    public on(name: string, cb: (e: any) => void) {
        window.addEventListener(name, (e: any) => {
            cb(e.detail)
        })
    }
    // 触发事件
    public emit(name: string, data: any) {
        const event = new CustomEvent(name, {
            detail: data
        })
        window.dispatchEvent(event)
    }
}