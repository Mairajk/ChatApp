


export default (() => {

    const data = []

    const isUnread = false

    for (let i = 0; i < 20; i++) {

        isUnread = i % 2 === 0
        const obj = {
            isUnread,
            from: 'me',
            to: 'otherOne',
            text: `This is message ${i}`
        }

        data.push(obj)
    }
    console.log(data);
    return data

})()