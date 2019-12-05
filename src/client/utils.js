export function dateToString(now, yesterday, date){
    if(date.isSame(now, 'day')){
        return 'сегодня в ' + date.format("HH:mm");
    }
    if(date.isSame(yesterday, 'day')){
        return 'вчера в ' + date.format("HH:mm");
    }
    return date.format("DD.MM.YYYY");
}
