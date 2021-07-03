const express = require('express')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express()
const port = 3333

app.use(cors())
app.use(bodyParser.json());
app.use(fileUpload({}));

const handlerOnlyPhone = ({phone}) => {
    return phone
}

const handlerFullField = ({phone, agree, smsCode}) => {
    return phone && agree && smsCode
}

app.post('/sms', (req, res) => {
    try {
        const { type } = req.body
        setTimeout(() => {
            if (!type) {
                res.sendStatus(404)
                return
            }
            if (type === 'onlyPhoneField' && handlerOnlyPhone(req.body)) {
                res.sendStatus(200)
                return
            }
            if (type === 'fullField' && handlerFullField(req.body)) {
                const { smsCode } = req.body
                if (smsCode === '1111') {
                    res.sendStatus(200);
                    return;
                }
                if (smsCode === '2222') {
                    throw new Error('asd')
                }
                res.sendStatus(403);
                return
            }
            res.sendStatus(404)
        }, 1000)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})