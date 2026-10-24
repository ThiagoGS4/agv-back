export function checkNum(message: string){
    if(message !== "" && !isNaN(Number(message))){
        return true
    } else {
        return false
    }
}