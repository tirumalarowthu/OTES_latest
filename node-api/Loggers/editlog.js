const {createLogger,transports,format}= require('winston')
const WinstonCloudWatch = require('winston-aws-cloudwatch');
 
const path = require('path');

// Create a log folder if it doesn't exist
const logFolder = path.join(__dirname, 'logs');
if (!require('fs').existsSync(logFolder)) {
    require('fs').mkdirSync(logFolder);
}

const EditLog = createLogger({
    transports:[
        new transports.File({
            filename:path.join(logFolder,"edit.log"),
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:path.join(logFolder,"edit-error.log"),
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        }),
        // new WinstonCloudWatch({
            // logGroupName: 'P2F-onlineassessment-logs',
            // logStreamName: 'online-assessment-logs-stream',
            // awsRegion: 'ap-south-1', // Replace with your desired AWS region
            // region : 'ap-south-1',
            // awsAccessKeyId: 'p2f-online-logger-user', // Replace with your AWS access key ID
            // awsSecretKey: 'f7PS7}IP' // Replace with your AWS secret access key
        //   })
        
    ]
})
module.exports ={EditLog}