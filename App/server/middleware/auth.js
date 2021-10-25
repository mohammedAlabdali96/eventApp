import jwt from 'jsonwebtoken';


const auth = async (req, res, next) =>{
    try {
        console.log(req.header.authorization)
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')

            console.log(decodedData)

            req.userId = decodedData.id
        } else {
            decodedData =jwt.decode(token)

            console.log('ssdsdsds')

            req.userId = decodedData? decodedData.sub : decodedData;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth