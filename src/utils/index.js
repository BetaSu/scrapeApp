export default {
    formatDate (date) {
        let d = new Date(date)
        return `${d.getMonth() + 1}.${d.getDay()} ${d.getHours()}:${d.getMinutes()}`
    }
}