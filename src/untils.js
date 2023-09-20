export const isJsonString = (data) => {
    try {
        // kiem tra thu json khi parse thi co bi loi khong
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}
