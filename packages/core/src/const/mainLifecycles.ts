import { ILifeCycle } from '../types/index'


let mainLifecycle: ILifeCycle = {}

export const getMainLifecycle = (): ILifeCycle => mainLifecycle

export const setMainLifecycle = (data: ILifeCycle) => {
    mainLifecycle = data
}

