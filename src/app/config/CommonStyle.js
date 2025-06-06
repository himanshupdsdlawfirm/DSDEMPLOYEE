import { Platform } from "react-native"

export const topPadding = ()=>{
    return Platform.OS === 'ios' ? 60 : 10
}